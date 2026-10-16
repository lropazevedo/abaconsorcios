export type NavItem = { label: string; href: string };

/** Menu principal. As âncoras (#) apontam para seções da Home. */
export const mainNav: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Quem somos", href: "/quem-somos/" },
  { label: "Nossa equipe", href: "/nossa-equipe/" },
  { label: "Como trabalhamos", href: "/#como-trabalhamos" },
  { label: "Marcas", href: "/#marcas" },
  { label: "Pós-venda", href: "/#pos-venda" },
  { label: "Onde estamos", href: "/onde-estamos/" },
  { label: "Contato", href: "/contato/" },
];

export const legalNav: NavItem[] = [
  { label: "Política de Privacidade", href: "/politica-de-privacidade/" },
  { label: "Termos de Uso", href: "/termos-de-uso/" },
];
