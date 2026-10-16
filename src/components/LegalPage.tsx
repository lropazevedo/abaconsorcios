import type { ReactNode } from "react";
import { PageHero } from "./PageHero";
import { Container, DevNote } from "./ui";

/** Estrutura das páginas legais (Privacidade, Termos). */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Documento" title={title} lede={`Última atualização: ${updated}.`} />
      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <Container>
          <DevNote>texto-base preparado para revisão jurídica antes da publicação.</DevNote>
          <div className="legal max-w-[72ch] text-[1.02rem] leading-relaxed text-navy/85">{children}</div>
        </Container>
      </section>
      <style>{`
        .legal h2 { margin-top: 2.75rem; font-size: 1.35rem; font-weight: 700; letter-spacing: -0.015em; color: var(--color-navy); }
        .legal p, .legal ul { margin-top: 1rem; }
        .legal ul { list-style: disc; padding-left: 1.25rem; }
        .legal li + li { margin-top: .4rem; }
        .legal a { color: var(--color-blue); font-weight: 600; text-decoration: underline; text-underline-offset: 4px; }
      `}</style>
    </>
  );
}
