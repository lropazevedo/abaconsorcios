/**
 * UNIDADES / STANDS
 * Para cadastrar uma unidade, copie um bloco e preencha.
 * - photo: nome da foto em assets-src/fotos (sem extensão)
 * - mapsUrl: link do Google Maps (botão "Ver localização")
 * - pending: true = só aparece em desenvolvimento (dados ainda não confirmados)
 */
export type Unit = {
  name: string;
  mall: string;
  city: string;
  state: string;
  address: string;
  brands: string[];
  photo: string;
  focus?: string;
  hours: string;
  mapsUrl: string;
  pending?: boolean;
};

export const units: Unit[] = [
  {
    name: "Stands Jeep e Fiat",
    mall: "Shopping Tacaruna",
    city: "Recife",
    state: "PE",
    address: "Av. Governador Agamenon Magalhães, 153, Santo Amaro",
    brands: ["Jeep", "Fiat"],
    photo: "stand-jeep-equipe",
    focus: "50% 55%",
    hours: "Todos os dias, das 9h às 22h",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Shopping+Tacaruna+Recife",
  },
  {
    name: "Stands Jeep e Citroën",
    mall: "Shopping Guararapes",
    city: "Jaboatão dos Guararapes",
    state: "PE",
    address: "Av. Barreto de Menezes, 800, Piedade, CEP 54410-100",
    brands: ["Jeep", "Citroën"],
    photo: "equipe-jeep-guararapes-4",
    focus: "50% 50%",
    hours: "Todos os dias, das 9h às 22h",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Shopping+Guararapes+Jaboat%C3%A3o+dos+Guararapes",
  },
];
