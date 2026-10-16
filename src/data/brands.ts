/**
 * MARCAS PARCEIRAS
 * Logos oficiais ficam em assets-src/logos/ e são copiados para public/logos/
 * por `npm run images`. Nunca recriar, recolorir ou gerar logos.
 */
export const stellantis = {
  name: "Stellantis",
  logo: "/logos/stellantis.png",
  width: 640,
  height: 366,
};

export const brands = [
  {
    name: "Fiat",
    logo: "/logos/fiat.png",
    logoW: 640,
    logoH: 485,
    photo: "entrega-fiat-usaflex",
    focus: "50% 42%",
    alt: "Consultor da ABA de camisa Fiat entregando a chave cenográfica a um cliente ao lado de uma picape preta",
    line: "Consultores dedicados, do primeiro contato até a entrega da chave.",
  },
  {
    name: "Jeep",
    logo: "/logos/jeep.png",
    logoW: 488,
    logoH: 196,
    photo: "stand-jeep-equipe",
    focus: "50% 60%",
    alt: "Três consultoras da ABA em frente ao stand Jeep, com um Jeep branco ao fundo",
    line: "Presença no shopping, com equipe dedicada e estrutura de stand.",
  },
  {
    name: "Citroën",
    logo: "/logos/citroen.png",
    logoW: 288,
    logoH: 282,
    photo: "entrega-citroen-cliente",
    focus: "50% 45%",
    alt: "Consultora da ABA e cliente segurando a chave cenográfica ao lado de um Citroën preto",
    line: "Atendimento próximo, com a mesma equipe por perto em cada etapa.",
  },
] as const;

export const coBrandingNote =
  "A ABA Consórcios tem atuação comercial autorizada com produtos do ecossistema Stellantis. A ABA não pertence à Stellantis nem às marcas Fiat, Jeep e Citroën. Marcas e logotipos são de propriedade de seus respectivos titulares.";
