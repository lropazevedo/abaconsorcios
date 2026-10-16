/**
 * DEPOIMENTOS DE CLIENTES
 * Somente depoimentos REAIS, com autorização de uso de imagem e texto assinada.
 * Enquanto esta lista estiver vazia, a seção "Clientes" NÃO aparece no site publicado
 * (em desenvolvimento aparece um exemplo marcado como placeholder).
 */
export type Testimonial = {
  name: string;
  city: string;
  vehicle: string;
  quote: string;
  /** Nome da foto em assets-src/fotos (sem extensão). */
  photo?: string;
};

export const testimonials: Testimonial[] = [];

/** Usado SOMENTE em desenvolvimento para visualizar o componente. */
export const testimonialPlaceholders: Testimonial[] = [1, 2, 3].map(() => ({
  name: "Nome do cliente",
  city: "Cidade · PE",
  vehicle: "Veículo conquistado",
  quote: "Espaço reservado para um depoimento real, com autorização assinada.",
}));

/**
 * CONQUISTAS: fotos reais de entregas feitas pelos consultores.
 * ATENÇÃO: publicar apenas com autorização de uso de imagem assinada
 * (obrigatória quando houver menores de idade na foto).
 * A foto da família com duas crianças foi retirada a pedido (sem autorização).
 */
export const conquests = [
  {
    photo: "entrega-fiat-cliente",
    alt: "Consultora da ABA e cliente sorrindo com a chave Fiat em frente a um carro branco",
    brand: "Fiat",
    focus: "50% 45%",
  },
  {
    photo: "entrega-citroen-selfie",
    alt: "Consultora da ABA em selfie com cliente segurando a chave em frente a um Citroën",
    brand: "Citroën",
    focus: "50% 45%",
  },
  {
    photo: "entrega-fiat-selfie",
    alt: "Consultora da ABA em selfie com clientes segurando a chave Fiat",
    brand: "Fiat",
    focus: "50% 40%",
  },
] as const;
