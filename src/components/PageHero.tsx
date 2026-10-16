import type { ReactNode } from "react";
import { Container, Eyebrow, d } from "./ui";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
};

/** Abertura das páginas internas: azul-marinho, título grande, halo discreto. */
export function PageHero({ eyebrow, title, lede, children }: PageHeroProps) {
  return (
    <section className="on-dark relative overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="grid-lines absolute inset-0" />
      <div aria-hidden="true" className="halo -right-40 -top-32 size-[640px]" />
      <div aria-hidden="true" className="halo halo-blue -bottom-80 -left-40 size-[720px]" />
      <Container className="relative pb-16 pt-36 sm:pb-20 lg:pb-28 lg:pt-48">
        <Eyebrow className="text-white/80">{eyebrow}</Eyebrow>
        <h1
          data-reveal
          style={d(1)}
          className="mt-6 max-w-[18ch] text-h2 font-extrabold lg:text-[clamp(3rem,2rem+3.4vw,5rem)]"
        >
          {title}
        </h1>
        {lede && (
          <p data-reveal style={d(2)} className="mt-6 max-w-[56ch] text-lede text-white/75">
            {lede}
          </p>
        )}
        {children}
      </Container>
      <div
        aria-hidden="true"
        className="tab-piece absolute bottom-0 left-[max(1rem,calc((100vw-1320px)/2+2.5rem))] h-1.5 w-20 bg-turq"
      />
    </section>
  );
}
