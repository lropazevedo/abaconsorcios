import type { CSSProperties, ReactNode } from "react";
import { Logo } from "@/components/Logo";
import { brands } from "@/data/brands";
import { regras } from "@/data/trimestre";
import { brlCurto, dataBR, type DadosTrimestre, type StandCalc, type VendedorCalc } from "@/lib/trimestre";
import { Avatar } from "./Avatar";

export const GOLD = "#F2C14E";

/** Moldura das páginas do Trimestre: fundo, barra superior e logo da campanha. */
export function TdsShell({
  children,
  saudacao,
  gestor = false,
}: {
  children: ReactNode;
  saudacao?: string;
  gestor?: boolean;
}) {
  return (
    <div className="on-dark min-h-[100svh] bg-navy-900 text-white" style={{ "--gold": GOLD } as CSSProperties}>
      <style>{`
        @keyframes tds-grow { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        @keyframes tds-in { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none } }
        @keyframes tds-flame { 0%,100% { transform: translate(-50%,-62%) scale(1) rotate(-4deg) } 50% { transform: translate(-50%,-70%) scale(1.15) rotate(5deg) } }
        @keyframes tds-sq { from { opacity: 0; transform: scale(.4) } to { opacity: 1; transform: none } }
        @keyframes tds-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
        .tds-fill { transform-origin: left center; animation: tds-grow 1.4s var(--ease-out) both; }
        .tds-row { animation: tds-in .7s var(--ease-out) both; }
        .tds-flame { animation: tds-flame 1.1s ease-in-out infinite; filter: drop-shadow(0 0 8px rgba(255,140,0,.75)); }
        .tds-sq-on { animation: tds-sq .45s var(--ease-out) both; }
        .tds-float { animation: tds-float 5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .tds-fill, .tds-row, .tds-flame, .tds-sq-on, .tds-float { animation: none !important; } }
      `}</style>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-900/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Logo variant="negativo" width={128} />
            {gestor && (
              <span className="rounded-full bg-[var(--gold)] px-2.5 py-0.5 text-xs font-bold text-navy-900">
                Gestor
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {saudacao && <span className="hidden text-sm text-white/70 sm:inline">{saudacao}</span>}
            <form method="post" action="/api/trimestre/sair/">
              <button
                type="submit"
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 hover:border-white hover:text-white"
              >
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
        <div className="relative flex justify-center pb-4 pt-8 sm:pt-10">
          <div aria-hidden="true" className="halo left-1/2 top-0 size-[520px] -translate-x-1/2" />
          <h1 className="relative w-full max-w-[520px]">
            <img
              src="/trimestredossonhos/img/logo-trimestre.webp"
              alt="Trimestre dos Sonhos"
              width={1200}
              height={439}
              className="tds-float h-auto w-full"
            />
          </h1>
        </div>
        {children}
      </main>
    </div>
  );
}

export function SectionTitle({ children, id }: { children: ReactNode; id: string }) {
  return (
    <h2 id={id} className="text-xl font-extrabold tracking-tight sm:text-2xl">
      {children}
    </h2>
  );
}

/** Pista com foguinho na ponta. */
export function Pista({
  pct,
  cor,
  marcos,
  altura = "h-3",
  rotulos = true,
}: {
  pct: number;
  cor: string;
  marcos: { pct: number; emoji: string; label: string }[];
  altura?: string;
  /** Mostra o valor embaixo de cada ícone (desligar quando os marcos ficam muito próximos). */
  rotulos?: boolean;
}) {
  const p = Math.max(0, Math.min(1, pct)) * 100;
  return (
    <div className={`relative mt-10 ${altura} rounded-full bg-white/10`} aria-hidden="true">
      <div
        className="tds-fill absolute inset-y-0 left-0 rounded-full"
        style={{ width: `${Math.max(p, 1)}%`, background: `linear-gradient(90deg, ${cor}, #ff8a00)` }}
      />
      {marcos.map((m) => (
        <span key={m.label} className="absolute top-0 h-full" style={{ left: `${m.pct * 100}%` }}>
          <span
            className={`absolute -top-8 left-0 whitespace-nowrap text-base leading-none ${
              m.pct >= 0.99 ? "-translate-x-[85%] text-right" : "-translate-x-1/2 text-center"
            }`}
          >
            {m.emoji}
            {rotulos && <span className="mt-1 hidden text-[10px] font-semibold text-white/60 sm:block">{m.label}</span>}
          </span>
          <span className="absolute -top-1 left-0 h-[calc(100%+8px)] w-px bg-white/40" />
        </span>
      ))}
      <span className="tds-flame absolute top-1/2 text-2xl" style={{ left: `${Math.max(p, 1)}%` }}>
        🔥
      </span>
    </div>
  );
}

/** Bloco principal do colaborador: resultado, barra com foguinho, 103 quadrados e média do iPhone. */
export function MeuResultado({ v, d }: { v: VendedorCalc; d: DadosTrimestre }) {
  const { cal, metas } = d;
  const acima = v.saldoMediaIphone >= 0;
  return (
    <section
      aria-labelledby="meu-resultado"
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 sm:p-8"
    >
      <div className="flex items-center gap-4">
        <Avatar nome={v.nome} foto={v.foto} cor={v.standInfo.cor} size={72} />
        <div className="min-w-0 flex-1">
          <p className="text-sm text-white/65">Seu resultado</p>
          <h2 id="meu-resultado" className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
            {v.nome}
          </h2>
          <p className="text-sm text-white/60">{v.standInfo.nome}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">Ranking</p>
          <p className="text-3xl font-extrabold text-[var(--gold)]">{v.posicao ? `${v.posicao}º` : "–"}</p>
        </div>
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Produção no trimestre</p>
      <p className="mt-1 text-5xl font-extrabold tabular-nums tracking-tight sm:text-6xl">{brlCurto(v.vendas)}</p>

      {/* Padrão 1: a pista com foguinho */}
      <div className="mt-4">
        <Pista
          pct={v.pctIphone}
          cor={v.standInfo.cor}
          marcos={[
            { pct: metas.sorteio / metas.iphone, emoji: "✈️", label: "R$ 3 mi" },
            { pct: 1, emoji: "📱", label: "R$ 3,8 mi" },
          ]}
        />
        <div className="mt-4 grid gap-2 text-sm text-white/75 sm:grid-cols-2">
          <p>
            {v.bateuSorteio ? (
              <strong className="text-turq">✈️ Você já está no sorteio da viagem!</strong>
            ) : (
              <>
                Faltam <strong className="text-white">{brlCurto(v.faltaSorteio)}</strong> para o sorteio ✈️
              </>
            )}
          </p>
          <p className="sm:text-right">
            {v.bateuIphone ? (
              <strong className="text-[var(--gold)]">
                📱 Meta do iPhone batida{v.iphoneLiberado ? "!" : ". Falta o stand chegar a R$ 8 mi."}
              </strong>
            ) : (
              <>
                Faltam <strong className="text-white">{brlCurto(v.faltaIphone)}</strong> para o iPhone 📱
              </>
            )}
          </p>
        </div>
      </div>

      {/* Média do iPhone */}
      <div
        className={`mt-6 rounded-2xl border p-4 ${acima ? "border-turq/40 bg-turq/10" : "border-[var(--gold)]/40 bg-[var(--gold)]/[0.08]"}`}
      >
        <p className="text-sm text-white/80">
          Para estar na <strong className="text-white">média do iPhone</strong> hoje, você deveria ter{" "}
          <strong className="text-white">{brlCurto(v.esperadoIphoneHoje)}</strong>.
        </p>
        <p className={`mt-1 text-lg font-extrabold ${acima ? "text-turq" : "text-[var(--gold)]"}`}>
          {acima
            ? `Você está ${brlCurto(v.saldoMediaIphone)} acima da média. Segue assim!`
            : `Faltam ${brlCurto(-v.saldoMediaIphone)} para alcançar a média.`}
        </p>
      </div>

      {/* Padrão 2: os 103 quadrados */}
      <div className="mt-8">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h3 className="text-lg font-bold">Seus {cal.total} dias rumo ao iPhone</h3>
          <p className="text-sm text-white/65">
            <strong className="text-white">{v.quadrados}</strong> de {cal.total} preenchidos
          </p>
        </div>
        <p className="mt-1 text-xs text-white/55">
          Cada quadrado vale {brlCurto(d.valorQuadrado)} em vendas (1 dia da meta do iPhone). Os quadrados com contorno
          são os dias que já passaram.
        </p>
        <Quadrados total={cal.total} preenchidos={v.quadrados} hoje={cal.decorridos} />
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/60">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-3 rounded-[3px] bg-gradient-to-br from-[var(--gold)] to-[#ff8a00]" /> Conquistado
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-3 rounded-[3px] border border-turq/70" /> Dia que já passou
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-3 rounded-[3px] bg-white/10" /> Dias à frente
          </span>
        </div>
      </div>

      {/* Rodapé do bloco: dias */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
        <p className="text-sm text-white/70">
          {cal.status === "antes" ? (
            <>
              Começa em <strong className="text-white">{cal.comecaEm} dias</strong>
            </>
          ) : cal.status === "encerrado" ? (
            <strong className="text-white">Campanha encerrada</strong>
          ) : (
            <>
              Faltam <strong className="text-2xl font-extrabold text-white">{cal.restantes}</strong> dias · Dia{" "}
              {cal.decorridos} de {cal.total}
            </>
          )}
        </p>
        <p className="text-xs text-white/50">
          {dataBR(d.campanha.inicio)} a {dataBR(d.campanha.fim)}
        </p>
      </div>
    </section>
  );
}

export function Quadrados({ total, preenchidos, hoje }: { total: number; preenchidos: number; hoje: number }) {
  return (
    <ol
      className="mt-4 grid gap-[4px]"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(18px, 1fr))" }}
      aria-label={`${preenchidos} de ${total} quadrados preenchidos`}
    >
      {Array.from({ length: total }, (_, i) => {
        const on = i < preenchidos;
        const passou = i < hoje;
        const ehHoje = i === hoje - 1;
        return (
          <li
            key={i}
            aria-hidden="true"
            className={`aspect-square rounded-[4px] ${
              on
                ? "tds-sq-on bg-gradient-to-br from-[var(--gold)] to-[#ff8a00] shadow-[0_0_8px_rgba(255,160,0,.35)]"
                : passou
                  ? "border border-turq/70"
                  : "bg-white/10"
            } ${ehHoje ? "ring-2 ring-white ring-offset-2 ring-offset-navy-900" : ""}`}
            style={on ? { animationDelay: `${i * 18}ms` } : undefined}
          />
        );
      })}
    </ol>
  );
}

export function StandCard({
  s,
  d,
  mostrarValores = false,
}: {
  s: StandCalc;
  d: DadosTrimestre;
  mostrarValores?: boolean;
}) {
  const logo = brands.find((b) => b.name === s.marca);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <div className="flex items-center gap-4">
        {logo && (
          <span className="flex h-10 w-14 shrink-0 items-center justify-center rounded-lg bg-white p-1.5">
            <img
              src={logo.logo}
              alt={logo.name}
              width={logo.logoW}
              height={logo.logoH}
              className="max-h-full w-auto object-contain"
            />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="font-bold leading-tight">{s.nome}</p>
          <p className="text-xs text-white/60">{s.posicao}º entre os stands</p>
        </div>
        <p className="text-right text-xl font-extrabold tabular-nums">{brlCurto(s.total)}</p>
      </div>
      <Pista
        pct={s.pctJantar}
        cor={s.cor}
        marcos={[
          { pct: d.metas.iphoneStandMinimo / d.metas.jantar, emoji: "📱", label: "R$ 8 mi" },
          { pct: 1, emoji: "🥂", label: "R$ 9 mi" },
        ]}
        rotulos={false}
      />
      <p className="mt-5 text-sm text-white/70">
        {s.bateuJantar ? (
          <strong className="text-[var(--gold)]">🥂 Jantar dos Campeões garantido!</strong>
        ) : (
          <>
            Faltam <strong className="text-white">{brlCurto(s.faltaJantar)}</strong> para o jantar
            {s.liberaIphone ? " · iPhone liberado ✅" : <> · {brlCurto(s.faltaLiberaIphone)} para liberar o iPhone</>}
          </>
        )}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {s.membros.map((m) => (
          <span
            key={m.login}
            className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] py-1 pl-1 pr-3 text-xs"
          >
            <Avatar nome={m.nome} foto={m.foto} cor={s.cor} size={24} />
            {m.nome}
            {mostrarValores && <span className="text-white/50">{brlCurto(m.vendas)}</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

const premiosInfo = [
  {
    img: "premio-jantar",
    titulo: "Jantar dos Campeões",
    quem: "O stand que bater R$ 9 milhões no período. O time inteiro senta na mesa.",
  },
  {
    img: "premio-iphone",
    titulo: "iPhone 16",
    quem: "Quem atingir R$ 3,8 milhões individuais, com o stand em pelo menos R$ 8 milhões.",
  },
  {
    img: "premio-rio",
    titulo: "Viagem ao Rio de Janeiro",
    quem: "4 dias com acompanhante. Para o 1º colocado e 1 sorteado entre quem bater R$ 3 milhões.",
  },
];

export function Premios() {
  return (
    <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {premiosInfo.map((p) => (
        <li
          key={p.img}
          className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:flex-col sm:items-stretch sm:p-5 sm:text-center"
        >
          <img
            src={`/trimestredossonhos/img/${p.img}.webp`}
            alt={p.titulo}
            width={600}
            height={600}
            loading="lazy"
            className="size-24 shrink-0 object-contain sm:mx-auto sm:size-40"
          />
          <div>
            <h3 className="text-lg font-extrabold leading-tight text-[var(--gold)]">{p.titulo}</h3>
            <p className="mt-1 text-sm leading-relaxed text-white/70">{p.quem}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Pódio compacto com os 3 primeiros (empates aparecem juntos). */
export function Podio({ top3 }: { top3: VendedorCalc[] }) {
  const grupos = [1, 2, 3]
    .map((pos) => ({ pos, pessoas: top3.filter((v) => v.posicao === pos) }))
    .filter((g) => g.pessoas.length);
  if (!grupos.length) return <p className="mt-4 text-white/60">Ninguém pontuou ainda.</p>;
  const medalha = ["🥇", "🥈", "🥉"];
  return (
    <ol className="mt-4 grid gap-2">
      {grupos.map((g) =>
        g.pessoas.map((p) => (
          <li
            key={p.login}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${g.pos === 1 ? "bg-[var(--gold)]/15 ring-1 ring-[var(--gold)]/40" : "bg-white/[0.04]"}`}
          >
            <span className="w-7 text-center text-xl" aria-label={`${g.pos}º lugar`}>
              {medalha[g.pos - 1]}
            </span>
            <Avatar nome={p.nome} foto={p.foto} cor={p.standInfo.cor} size={36} />
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold leading-tight">{p.nome}</p>
              <p className="truncate text-xs text-white/55">{p.standInfo.nome}</p>
            </div>
            <p className="font-extrabold tabular-nums">{brlCurto(p.vendas)}</p>
          </li>
        )),
      )}
    </ol>
  );
}

export function Regras() {
  return (
    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
      {regras.map((r) => (
        <li
          key={r}
          className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm leading-relaxed text-white/80"
        >
          <span aria-hidden="true">✅</span>
          {r}
        </li>
      ))}
    </ul>
  );
}
