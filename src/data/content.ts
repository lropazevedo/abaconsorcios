/**
 * TEXTOS DO SITE
 * Todo o texto institucional fica aqui, separado dos componentes.
 * Regras de voz (Brand Manual, cap. IX): falar com "você", explicar estratégia,
 * nunca prometer prazo de contemplação.
 *
 * `scale.claim` aparece na seção "A operação" e na página Quem Somos.
 * Não afirme "a maior de Pernambuco" sem documento que comprove.
 */

export const scale = {
  claim: "Estamos no coração de Pernambuco 🩵",
  short: "Referência em consórcio automotivo em Pernambuco.",
};

export const hero = {
  eyebrow: "Consórcio automotivo · Pernambuco",
  title: "Conquistas que te movem.",
  subtitle: "Informação, planejamento e acompanhamento para realizar sonhos.",
  support: "Consórcios automotivos com atendimento de ponta a ponta em Pernambuco.",
  primary: { label: "Conheça a ABA", href: "#quem-somos" },
  secondary: { label: "Conheça nossos stands", href: "/onde-estamos/" },
};

export const credibility = {
  eyebrow: "A operação",
  title: "Uma operação construída para ser grande.",
  text: "A ABA nasceu para levar ao varejo automotivo uma experiência de consórcio baseada em informação, atendimento consultivo e acompanhamento contínuo.",
  pillars: [
    { title: "Recife", text: "Nascemos aqui. Esse é o nosso ponto de partida." },
    { title: "Presença física", text: "Stands em shopping, com gente de verdade para te receber." },
    { title: "Equipe especializada", text: "Consultores treinados para explicar antes de vender." },
    { title: "Ponta a ponta", text: "Do primeiro contato à entrega, a mesma operação cuidando de você." },
    { title: "Pós-venda", text: "A assinatura não encerra a conversa. Ela começa outra." },
  ],
};

export const about = {
  eyebrow: "Quem somos",
  title: ["Mais do que consórcio.", "Uma empresa de pessoas."],
  paragraphs: [
    "A ABA Consórcios nasceu com a visão de construir uma operação com a linguagem, a presença e o atendimento que o varejo automotivo exige.",
    "Uma empresa capaz de aproximar informação, planejamento e oportunidade de pessoas que muitas vezes sequer sabem que existem outras formas de conquistar seu veículo.",
  ],
  concept:
    "Assim como abrimos uma nova aba para acessar uma nova possibilidade, a ABA nasceu para abrir novos caminhos para nossos clientes.",
  nameNote: "ABA não é sigla. O nome vem de um gesto simples: abrir uma nova aba.",
  tabs: {
    closedHint: "Clique no + para abrir uma nova aba",
    a: {
      label: "Parcelas e juros",
      lines: ["Quanto fica no fim?", "E se apertar no meio do caminho?", "Juros em cima de juros."],
    },
    b: {
      label: "Dúvidas",
      lines: ["Consórcio demora?", "Será que cabe no meu bolso?", "Ninguém me explicou direito."],
    },
    c: {
      label: "Nova possibilidade",
      title: "Existe um caminho. Deixa a gente te mostrar.",
      steps: [
        { k: "Entender", t: "O que você precisa hoje: primeiro carro ou troca." },
        { k: "Planejar", t: "A estratégia certa para o seu momento, sem promessa de prazo." },
        { k: "Conquistar", t: "E a gente segue junto até a chave na sua mão." },
      ],
    },
  },
};

export const essence = {
  purpose: {
    k: "Propósito",
    t: "Transformar vidas por meio de acesso, informação e planejamento.",
  },
  mission: {
    k: "Missão",
    t: "Democratizar o acesso ao crédito planejado por meio de informação clara, atendimento consultivo, segurança e acompanhamento de ponta a ponta.",
  },
  vision: {
    k: "Visão",
    t: "Ser a maior e mais reconhecida operação de consórcios automotivos do Nordeste, referência em confiança, experiência do cliente e excelência comercial.",
    note: "Uma ambição declarada, não um fato atual.",
  },
  values: [
    { k: "Cliente no centro", t: "A decisão começa pela sua necessidade, não pela meta da empresa." },
    { k: "Transparência", t: "Explicar possibilidades e limitações com a mesma clareza." },
    { k: "Responsabilidade", t: "Consórcio é planejamento financeiro. Não prometemos o que não controlamos." },
    { k: "Proximidade", t: "Falamos a sua língua." },
    { k: "Atitude", t: "Não esperamos a oportunidade chegar. Vamos até ela." },
    { k: "Excelência", t: "Venda, atendimento e pós-venda são uma experiência só." },
    { k: "Consistência", t: "Grandes marcas se constroem fazendo o básico muito bem, todo dia." },
  ],
};

export const teamSection = {
  eyebrow: "Nossa equipe",
  title: "Quem faz a ABA acontecer.",
  text: "Tecnologia ajuda. Produto importa. Mas são as pessoas que constroem confiança.",
  leadersTitle: "Diretoria",
  leadersText: "Quem responde pela operação, do primeiro atendimento ao pós-venda.",
  standsTitle: "Um time em cada stand.",
  standsText: "Cada stand tem a sua equipe, treinada para explicar antes de vender. É ela que te recebe no shopping.",
  cta: { label: "Conheça a equipe", href: "/nossa-equipe/" },
};

export const journey = {
  eyebrow: "Como trabalhamos",
  title: "A venda é só o começo.",
  text: "Você não compra e desaparece da nossa rotina. Cada etapa tem alguém da ABA ao seu lado.",
  steps: [
    { n: "01", k: "Entender", t: "Primeiro entendemos o que você precisa." },
    { n: "02", k: "Orientar", t: "Apresentamos as possibilidades com clareza." },
    { n: "03", k: "Planejar", t: "Construímos a estratégia adequada ao seu momento." },
    { n: "04", k: "Acompanhar", t: "Você não fica sozinho depois da contratação." },
    { n: "05", k: "Pós-venda", t: "Continuamos acompanhando a sua jornada." },
  ],
};

export const afterSales = {
  eyebrow: "Pós-venda",
  title: "Nosso trabalho não termina na assinatura.",
  text: "Uma boa venda começa antes do contrato e continua muito depois dele.",
  items: [
    { k: "Equipe", t: "Gente da ABA dedicada a quem já é cliente." },
    { k: "Acompanhamento", t: "Você sabe em que etapa está, sem precisar correr atrás." },
    { k: "Orientação", t: "Assembleias, lances e próximos passos explicados em linguagem simples." },
    { k: "Suporte", t: "Um canal direto para tirar dúvidas quando elas aparecerem." },
    { k: "Relacionamento", t: "A conversa continua até a chave na mão, e depois dela." },
  ],
  rule: "Não prometemos prazo de contemplação. Prometemos estratégia, clareza e acompanhamento em cada etapa.",
};

export const brandsSection = {
  eyebrow: "Marcas",
  title: "Ao lado de grandes marcas do setor automotivo.",
  text: "A ABA atua no ecossistema de algumas das marcas automotivas mais reconhecidas do mundo, com atuação comercial autorizada com produtos Fiat, Jeep e Citroën, do grupo Stellantis.",
};

export const presence = {
  eyebrow: "Onde estamos",
  title: "A ABA está onde as pessoas estão.",
  text: "Nossos stands ficam nos corredores dos shoppings, no caminho de quem trabalha, passeia e planeja. Você conversa com uma pessoa, vê o carro de perto e sai com tudo explicado.",
  points: ["Stands em shopping", "Equipe uniformizada", "Atendimento presencial", "Carro no stand"],
  cta: { label: "Ver todas as unidades", href: "/onde-estamos/" },
};

export const why = {
  eyebrow: "Por que ABA",
  title: "Cinco motivos para seguir a conversa.",
  pillars: [
    { icon: "shield", k: "Segurança", t: "Produtos de grandes marcas, contrato claro e nenhuma promessa fácil." },
    { icon: "chat", k: "Atendimento consultivo", t: "Primeiro entendemos o seu momento. Depois mostramos o caminho." },
    { icon: "pin", k: "Presença física", t: "Você sabe onde nos encontrar. Estamos no shopping, de portas abertas." },
    { icon: "loop", k: "Pós-venda", t: "Continuamos com você depois da assinatura, etapa por etapa." },
    { icon: "car", k: "Grandes marcas", t: "Fiat, Jeep e Citroën, do ecossistema Stellantis." },
  ],
};

export const conquestsSection = {
  eyebrow: "Conquistas",
  title: "Gente de verdade. Conquista de verdade.",
  text: "Cada chave entregue começou com uma conversa no stand.",
};

export const testimonialsSection = {
  eyebrow: "Clientes",
  title: "Quem já conquistou com a ABA.",
};

export const manifesto = {
  title: "Todo sonho precisa de um começo.",
  lines: [
    "Nem sempre o problema é falta de vontade.",
    "Às vezes é falta de informação.",
    "Falta alguém mostrar que existe outro caminho.",
    "Que existem possibilidades.",
    "Que planejamento pode transformar aquilo que parecia distante em uma decisão possível.",
  ],
  turn: "É por isso que a ABA existe.",
  verbs: ["Para abrir caminhos.", "Para explicar.", "Para aproximar.", "Para transformar planejamento em conquista."],
  signature: ["ABA Consórcios", "Seu sonho começa aqui."],
};

export const closing = {
  eyebrow: "Pernambuco é o ponto de partida",
  title: "Conheça a ABA de perto.",
  text: "Estamos em Pernambuco construindo uma nova referência em consórcios automotivos.",
  primary: { label: "Conheça nossos stands", href: "/onde-estamos/" },
  secondary: { label: "Fale com nosso time", href: "/contato/" },
};
