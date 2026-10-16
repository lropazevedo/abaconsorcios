/**
 * EQUIPE
 * Para incluir alguém: copie um bloco, ajuste os campos e coloque a foto
 * em assets-src/fotos/ (o nome do arquivo, sem extensão, vai em `photo`).
 * Depois rode `npm run images`.
 *
 * group: "lideranca" | "gestao" | "comercial" | "pos-venda"
 * Campos vazios ("") não aparecem no site publicado.
 */
export type TeamGroup = "lideranca" | "gestao" | "comercial" | "pos-venda";

export type TeamMember = {
  name: string;
  role: string;
  unit: string;
  group: TeamGroup;
  /** Nome da foto em assets-src/fotos (sem extensão). null = monograma ABA. */
  photo: string | null;
  /** Ajuste de enquadramento da foto (CSS object-position). */
  focus?: string;
  quote?: string;
};

export const teamGroups: Record<TeamGroup, string> = {
  lideranca: "Liderança",
  gestao: "Gestão",
  comercial: "Consultoria comercial",
  "pos-venda": "Pós-venda",
};

export const team: TeamMember[] = [
  {
    name: "Átila Nascimento",
    role: "Diretor Comercial",
    unit: "ABA Consórcios",
    group: "lideranca",
    photo: "equipe-atila",
    focus: "50% 30%",
  },
  {
    name: "Matheus Oliveira",
    role: "Diretor Administrativo",
    unit: "ABA Consórcios",
    group: "lideranca",
    photo: "equipe-matheus",
    focus: "50% 22%",
  },
  {
    name: "Raquel Medeiros",
    role: "Diretora de Pós-Vendas",
    unit: "ABA Consórcios",
    group: "lideranca",
    photo: "equipe-raquel",
    focus: "50% 22%",
  },
];

/**
 * TIMES DOS STANDS
 * Um card por stand. Para incluir um stand novo, copie um bloco.
 * brand precisa ser um nome cadastrado em src/data/brands.ts (Fiat, Jeep, Citroën).
 */
export type StandTeam = {
  brand: "Fiat" | "Jeep" | "Citroën";
  mall: string;
  city: string;
  photo: string;
  alt: string;
  focus?: string;
};

export const standTeams: StandTeam[] = [
  {
    brand: "Jeep",
    mall: "Shopping Tacaruna",
    city: "Recife",
    photo: "time-jeep-tacaruna",
    alt: "Quatro consultores da ABA de braços cruzados em frente ao stand Jeep no Shopping Tacaruna",
    focus: "50% 40%",
  },
  {
    brand: "Fiat",
    mall: "Shopping Tacaruna",
    city: "Recife",
    photo: "time-fiat-tacaruna",
    alt: "Consultoras da ABA em selfie no stand Fiat do Shopping Tacaruna, com a chave cenográfica Fiat",
    focus: "50% 45%",
  },
  {
    brand: "Jeep",
    mall: "Shopping Guararapes",
    city: "Jaboatão dos Guararapes",
    photo: "equipe-jeep-guararapes",
    alt: "Sete consultores da ABA de uniforme preto em frente ao stand Jeep no Shopping Guararapes",
    focus: "50% 50%",
  },
  {
    brand: "Citroën",
    mall: "Shopping Guararapes",
    city: "Jaboatão dos Guararapes",
    photo: "time-citroen-guararapes",
    alt: "Três consultoras da ABA com uniforme Citroën em frente ao stand no Shopping Guararapes",
    focus: "50% 50%",
  },
];

/** Foto da equipe completa, usada na página Nossa Equipe. */
export const teamGroupPhoto = {
  photo: "equipe-treinamento",
  alt: "Equipe ABA reunida em sala de treinamento, todos sorrindo",
  focus: "50% 42%",
};
