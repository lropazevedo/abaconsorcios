/**
 * Dados gerais da ABA Consórcios.
 * Campos vazios ("") ficam ocultos no site publicado e aparecem como
 * aviso de PENDENTE apenas em desenvolvimento (npm run dev).
 */
export const site = {
  name: "ABA Consórcios",
  url: "https://www.abaconsorcios.com.br",
  domain: "www.abaconsorcios.com.br",
  slogan: "Conquistas que te movem.",
  retailSignature: "Seu sonho começa aqui.",
  region: "Pernambuco",

  /** Número no formato internacional, só dígitos. Ex.: "5581999999999". */
  whatsapp: "",
  /** Mensagem que já aparece escrita quando a pessoa abre o WhatsApp. */
  whatsappMessage: "Olá! Conheci a ABA Consórcios pelo site e gostaria de falar com o time.",
  /** E-mail público de atendimento. Ex.: "contato@abaconsorcios.com.br". */
  email: "atendimento@abaconsorcios.com.br",
  /** Telefone exibido. Ex.: "(81) 0000-0000". */
  phone: "",

  social: {
    instagram: { handle: "@abaconsorcios", url: "https://www.instagram.com/abaconsorcios/" },
  },

  /** Dados jurídicos exibidos no rodapé. Preencher antes da publicação. */
  legal: {
    razaoSocial: "ABA Consórcios",
    cnpj: "60.776.299/0001-00",
  },
} as const;

export function whatsappLink(message: string = site.whatsappMessage) {
  if (!site.whatsapp) return "";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const isDev = process.env.NODE_ENV !== "production";
