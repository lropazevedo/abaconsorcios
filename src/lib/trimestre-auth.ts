/**
 * Login da área interna /trimestredossonhos. Cada colaborador tem o seu login.
 *
 * Os logins e senhas NÃO ficam no código. Vêm das variáveis de ambiente
 * (na Vercel: Settings → Environment Variables; no computador: arquivo .env.local):
 *
 *   TRIMESTRE_USUARIOS = login:senha;login:senha;...
 *   TRIMESTRE_ADMINS   = gestor            (logins que cadastram vendas, separados por vírgula)
 *   TRIMESTRE_SEGREDO  = texto longo e aleatório (assina as sessões)
 *
 * Trocar a senha de alguém derruba só a sessão daquela pessoa.
 */
export const AUTH_COOKIE = "aba_tds";
export const AUTH_MAX_AGE = 60 * 60 * 24 * 30; // 30 dias

export type Sessao = { login: string; admin: boolean };

function usuarios() {
  const mapa = new Map<string, string>();
  for (const par of (process.env.TRIMESTRE_USUARIOS ?? "").split(";")) {
    const i = par.indexOf(":");
    if (i > 0) mapa.set(par.slice(0, i).trim().toLowerCase(), par.slice(i + 1).trim());
  }
  return mapa;
}

function admins() {
  return new Set(
    (process.env.TRIMESTRE_ADMINS ?? "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
  );
}

const segredo = () => process.env.TRIMESTRE_SEGREDO ?? "";

async function assinar(texto: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(segredo()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(texto));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Confere login e senha. Devolve o login normalizado ou null. */
export function conferirCredenciais(login: string, senha: string) {
  const l = login.trim().toLowerCase();
  const certa = usuarios().get(l);
  if (!segredo() || !certa || certa !== senha) return null;
  return l;
}

/** Valor do cookie para um login válido. */
export async function criarToken(login: string) {
  const senha = usuarios().get(login) ?? "";
  return `${login}.${await assinar(`${login}:${senha}`)}`;
}

/** Lê o cookie e devolve a sessão, ou null se for inválido. */
export async function lerSessao(cookie: string | undefined): Promise<Sessao | null> {
  if (!cookie || !segredo()) return null;
  const i = cookie.lastIndexOf(".");
  if (i <= 0) return null;
  const login = cookie.slice(0, i);
  const senha = usuarios().get(login);
  if (senha === undefined) return null;
  if (cookie.slice(i + 1) !== (await assinar(`${login}:${senha}`))) return null;
  return { login, admin: admins().has(login) };
}
