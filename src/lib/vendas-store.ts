import "server-only";

/**
 * Onde ficam as vendas cadastradas pelo gestor.
 *
 * - Na Vercel: banco Upstash Redis (Vercel → Storage / Marketplace → Upstash for Redis).
 *   A integração cria sozinha as variáveis KV_REST_API_URL e KV_REST_API_TOKEN
 *   (ou UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN).
 * - No computador, sem essas variáveis: arquivo .data/vendas.json (não vai para o GitHub).
 */
export type Venda = {
  id: string;
  /** Login do vendedor (ex.: "paula"). */
  vendedor: string;
  /** Valor em reais. Negativo = ajuste (ex.: correção). */
  valor: number;
  /** Data da venda, AAAA-MM-DD. */
  data: string;
  obs: string;
  criadoEm: string;
  criadoPor: string;
  /** Preenchidos quando o gestor corrige o lançamento. */
  editadoEm?: string;
  editadoPor?: string;
};

const CHAVE = "tds:vendas";

function redisConfig() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

async function redis(cmd: (string | number)[]) {
  const cfg = redisConfig()!;
  const res = await fetch(cfg.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Banco de vendas respondeu ${res.status}`);
  const json = (await res.json()) as { result?: unknown; error?: string };
  if (json.error) throw new Error(json.error);
  return json.result;
}

async function arquivo() {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const file = path.join(process.cwd(), ".data", "vendas.json");
  return { fs, path, file };
}

export function origemDoBanco(): "redis" | "arquivo" | "indisponivel" {
  if (redisConfig()) return "redis";
  return process.env.VERCEL ? "indisponivel" : "arquivo";
}

export async function listarVendas(): Promise<Venda[]> {
  const origem = origemDoBanco();
  if (origem === "redis") {
    const raw = (await redis(["GET", CHAVE])) as string | null;
    return raw ? (JSON.parse(raw) as Venda[]) : [];
  }
  if (origem === "arquivo") {
    const { fs, file } = await arquivo();
    try {
      return JSON.parse(await fs.readFile(file, "utf8")) as Venda[];
    } catch {
      return [];
    }
  }
  return [];
}

async function salvar(vendas: Venda[]) {
  const origem = origemDoBanco();
  if (origem === "redis") {
    await redis(["SET", CHAVE, JSON.stringify(vendas)]);
    return;
  }
  if (origem === "arquivo") {
    const { fs, path, file } = await arquivo();
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, JSON.stringify(vendas, null, 2));
    return;
  }
  throw new Error("Banco de vendas não configurado na Vercel.");
}

export async function adicionarVenda(v: Omit<Venda, "id" | "criadoEm">) {
  const vendas = await listarVendas();
  vendas.push({ ...v, id: crypto.randomUUID(), criadoEm: new Date().toISOString() });
  await salvar(vendas);
}

export async function removerVenda(id: string) {
  const vendas = await listarVendas();
  await salvar(vendas.filter((v) => v.id !== id));
}

/** Corrige um lançamento já cadastrado. Devolve false se o id não existir mais. */
export async function atualizarVenda(
  id: string,
  dados: Pick<Venda, "vendedor" | "valor" | "data" | "obs">,
  editadoPor: string,
) {
  const vendas = await listarVendas();
  const i = vendas.findIndex((v) => v.id === id);
  if (i < 0) return false;
  vendas[i] = { ...vendas[i], ...dados, editadoEm: new Date().toISOString(), editadoPor };
  await salvar(vendas);
  return true;
}
