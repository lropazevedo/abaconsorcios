/**
 * TRIMESTRE DOS SONHOS · dados fixos da campanha
 *
 * As VENDAS do dia a dia são cadastradas pelo gestor em /trimestredossonhos/gestor
 * e somam em cima do `inicial` de cada pessoa (produção registrada antes do painel existir).
 *
 * FOTOS: arquivos em public/trimestredossonhos/avatares/<foto>.webp.
 * Preencha `foto` com o nome do arquivo (sem extensão). null = iniciais na cor do stand.
 *
 * LOGIN: o campo `login` precisa ser igual ao login cadastrado em TRIMESTRE_USUARIOS.
 */

export type StandId = "jeep-guararapes" | "jeep-tacaruna" | "fiat-tacaruna" | "citroen-guararapes";

export type Stand = {
  id: StandId;
  nome: string;
  marca: "Jeep" | "Fiat" | "Citroën";
  shopping: string;
  /** Cor de destaque do stand na página. */
  cor: string;
};

export type Vendedor = {
  /** Login de acesso (igual ao de TRIMESTRE_USUARIOS). */
  login: string;
  nome: string;
  stand: StandId;
  /** Produção registrada antes do painel de vendas (até 26/10/2026), em reais. */
  inicial: number;
  /** Caricatura em public/trimestredossonhos/avatares/<foto>.webp. null = iniciais. */
  foto: string | null;
};

export const campanha = {
  nome: "Trimestre dos Sonhos",
  inicio: "2026-10-22",
  fim: "2027-02-01",
};

export const metas = {
  /** Prêmio 1: stand que bater esse valor ganha o Jantar dos Campeões. */
  jantar: 9_000_000,
  /** Prêmio 2: vendedor que atingir esse valor ganha o iPhone 16... */
  iphone: 3_800_000,
  /** ...desde que o stand dele tenha feito pelo menos esse valor. */
  iphoneStandMinimo: 8_000_000,
  /** Prêmio 3: quem bater esse valor concorre ao sorteio da viagem. */
  sorteio: 3_000_000,
};

export const stands: Stand[] = [
  { id: "jeep-guararapes", nome: "Jeep Guararapes", marca: "Jeep", shopping: "Shopping Guararapes", cor: "#3B82F6" },
  { id: "fiat-tacaruna", nome: "Fiat Tacaruna", marca: "Fiat", shopping: "Shopping Tacaruna", cor: "#E5484D" },
  { id: "jeep-tacaruna", nome: "Jeep Tacaruna", marca: "Jeep", shopping: "Shopping Tacaruna", cor: "#00A79D" },
  {
    id: "citroen-guararapes",
    nome: "Citroën Guararapes",
    marca: "Citroën",
    shopping: "Shopping Guararapes",
    cor: "#A78BFA",
  },
];

export const vendedores: Vendedor[] = [
  { login: "matheus", nome: "Matheus", stand: "jeep-guararapes", inicial: 240_000, foto: "matheus" },
  { login: "paula", nome: "Paula", stand: "fiat-tacaruna", inicial: 200_000, foto: "paula" },
  { login: "alexandre", nome: "Alexandre", stand: "jeep-tacaruna", inicial: 140_000, foto: "alexandre" },
  { login: "arthur", nome: "Arthur Vinicio", stand: "jeep-guararapes", inicial: 140_000, foto: "arthur" },
  { login: "joaovitor", nome: "João Vitor", stand: "jeep-tacaruna", inicial: 135_000, foto: "joaovitor" },
  { login: "suellen", nome: "Suellen", stand: "jeep-guararapes", inicial: 120_000, foto: "suellen" },
  { login: "rose", nome: "Rose", stand: "jeep-tacaruna", inicial: 80_000, foto: "rose" },
  { login: "nair", nome: "Nair", stand: "citroen-guararapes", inicial: 50_000, foto: "nair" },
  { login: "mayra", nome: "Mayra", stand: "fiat-tacaruna", inicial: 45_000, foto: "mayra" },
  { login: "natalia", nome: "Natália", stand: "citroen-guararapes", inicial: 45_000, foto: "natalia" },
  { login: "stefany", nome: "Stefany", stand: "citroen-guararapes", inicial: 0, foto: "stefany" },
  { login: "leandro", nome: "Leandro", stand: "fiat-tacaruna", inicial: 0, foto: "leandro" },
  { login: "leylane", nome: "Leylane", stand: "fiat-tacaruna", inicial: 0, foto: "leylane" },
];

export const regras = [
  "Todos os prêmios são acumulativos: dá para ganhar mais de um.",
  "Os prêmios valem junto com os variáveis mensais, que continuam intactos.",
  "Conta venda válida: ficha assinada, lançada no Convert+ em até 48h, cadastro aprovado e reserva paga.",
  "Venda cancelada não conta.",
];
