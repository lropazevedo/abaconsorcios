import "server-only";
import { campanha, metas, stands, vendedores as base, type Stand, type StandId, type Vendedor } from "@/data/trimestre";
import { listarVendas, type Venda } from "./vendas-store";

export type VendedorCalc = Omit<Vendedor, "inicial"> & {
  /** Produção total no período (inicial + vendas cadastradas). */
  vendas: number;
  posicao: number | null;
  standInfo: Stand;
  pctSorteio: number;
  pctIphone: number;
  faltaSorteio: number;
  faltaIphone: number;
  bateuSorteio: boolean;
  bateuIphone: boolean;
  iphoneLiberado: boolean;
  /** Quanto precisaria vender por dia daqui até o fim para chegar ao sorteio. */
  ritmoSorteioDia: number;
  /** Quanto deveria ter hoje para estar na média do iPhone. */
  esperadoIphoneHoje: number;
  /** Diferença para a média do iPhone (positivo = acima). */
  saldoMediaIphone: number;
  /** Quadrados preenchidos (cada quadrado = 1 dia de meta do iPhone). */
  quadrados: number;
};

export type StandCalc = Stand & {
  total: number;
  pctJantar: number;
  faltaJantar: number;
  faltaLiberaIphone: number;
  bateuJantar: boolean;
  liberaIphone: boolean;
  membros: VendedorCalc[];
  posicao: number;
};

const DAY = 86_400_000;

/** Data de hoje no fuso de Recife, como AAAA-MM-DD. */
export function hojeRecife() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Recife" }).format(new Date());
}

function diaUTC(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

export function calendario(hoje = hojeRecife()) {
  const inicio = diaUTC(campanha.inicio);
  const fim = diaUTC(campanha.fim);
  const agora = diaUTC(hoje);
  const total = Math.round((fim - inicio) / DAY) + 1;
  const decorridos = Math.min(total, Math.max(0, Math.round((agora - inicio) / DAY) + 1));
  const restantes = Math.max(0, Math.round((fim - agora) / DAY) + (agora <= fim ? 1 : 0));
  const status = agora < inicio ? "antes" : agora > fim ? "encerrado" : "andamento";
  const comecaEm = Math.max(0, Math.round((inicio - agora) / DAY));
  return { total, decorridos, restantes, status, comecaEm, pct: decorridos / total, hoje };
}

export async function dadosTrimestre() {
  const vendas = await listarVendas();
  const cal = calendario();
  const diasRestantes = Math.max(1, cal.restantes);
  const valorQuadrado = metas.iphone / cal.total;

  const somaPorLogin = new Map<string, number>();
  for (const v of vendas) somaPorLogin.set(v.vendedor, (somaPorLogin.get(v.vendedor) ?? 0) + v.valor);
  const lista = base.map(({ inicial, ...v }) => ({
    ...v,
    vendas: Math.max(0, inicial + (somaPorLogin.get(v.login) ?? 0)),
  }));

  const totaisStand = new Map<StandId, number>();
  for (const v of lista) totaisStand.set(v.stand, (totaisStand.get(v.stand) ?? 0) + v.vendas);

  const esperadoIphoneHoje = metas.iphone * (cal.decorridos / cal.total);
  const ordenados = [...lista].sort((a, b) => b.vendas - a.vendas || a.nome.localeCompare(b.nome));
  const vendedores: VendedorCalc[] = ordenados.map((v) => {
    const standInfo = stands.find((s) => s.id === v.stand)!;
    return {
      ...v,
      posicao: v.vendas > 0 ? ordenados.filter((o) => o.vendas > v.vendas).length + 1 : null,
      standInfo,
      pctSorteio: Math.min(1, v.vendas / metas.sorteio),
      pctIphone: Math.min(1, v.vendas / metas.iphone),
      faltaSorteio: Math.max(0, metas.sorteio - v.vendas),
      faltaIphone: Math.max(0, metas.iphone - v.vendas),
      bateuSorteio: v.vendas >= metas.sorteio,
      bateuIphone: v.vendas >= metas.iphone,
      iphoneLiberado: (totaisStand.get(v.stand) ?? 0) >= metas.iphoneStandMinimo,
      ritmoSorteioDia: Math.max(0, metas.sorteio - v.vendas) / diasRestantes,
      esperadoIphoneHoje,
      saldoMediaIphone: v.vendas - esperadoIphoneHoje,
      quadrados: Math.min(cal.total, Math.floor(v.vendas / valorQuadrado)),
    };
  });

  const standsCalc: StandCalc[] = stands
    .map((s) => {
      const total = totaisStand.get(s.id) ?? 0;
      return {
        ...s,
        total,
        pctJantar: Math.min(1, total / metas.jantar),
        faltaJantar: Math.max(0, metas.jantar - total),
        faltaLiberaIphone: Math.max(0, metas.iphoneStandMinimo - total),
        bateuJantar: total >= metas.jantar,
        liberaIphone: total >= metas.iphoneStandMinimo,
        membros: vendedores.filter((v) => v.stand === s.id),
        posicao: 0,
      };
    })
    .sort((a, b) => b.total - a.total)
    .map((s, _i, arr) => ({ ...s, posicao: arr.filter((o) => o.total > s.total).length + 1 }));

  return {
    campanha,
    metas,
    cal,
    valorQuadrado,
    vendas: [...vendas].sort((a, b) => b.data.localeCompare(a.data) || b.criadoEm.localeCompare(a.criadoEm)),
    vendedores,
    stands: standsCalc,
    totalGeral: lista.reduce((acc, v) => acc + v.vendas, 0),
    top3: vendedores.filter((v) => v.posicao !== null && v.posicao <= 3),
    noSorteio: vendedores.filter((v) => v.bateuSorteio),
  };
}

export type DadosTrimestre = Awaited<ReturnType<typeof dadosTrimestre>>;
export type { Venda };

export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

/** R$ 240 mil, R$ 3,8 mi */
export function brlCurto(n: number) {
  const s = n < 0 ? "- " : "";
  const a = Math.abs(n);
  if (a >= 1_000_000) return `${s}R$ ${(a / 1_000_000).toLocaleString("pt-BR", { maximumFractionDigits: 2 })} mi`;
  if (a >= 1_000) return `${s}R$ ${(a / 1_000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} mil`;
  return `${s}${brl(a)}`;
}

export function dataBR(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
