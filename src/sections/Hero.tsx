import { Photo } from "@/components/Photo";
import { Button, Container, d } from "@/components/ui";
import { hero } from "@/data/content";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="on-dark relative isolate overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10 hidden lg:block" />
      <div aria-hidden="true" className="halo -z-10 -left-48 top-20 hidden size-[720px] lg:block" />
      <div aria-hidden="true" className="halo halo-blue -z-10 -bottom-96 right-0 size-[900px]" />

      <Container className="grid min-h-[100svh] grid-cols-1 lg:min-h-[min(100svh,1000px)] lg:grid-cols-12 lg:items-center lg:gap-10">
        {/* Foto principal: fundo inteiro no celular, quadro editorial no desktop */}
        <div className="absolute inset-0 -z-20 lg:relative lg:inset-auto lg:z-0 lg:order-2 lg:col-span-6 lg:col-start-7 lg:py-28">
          <div className="relative h-full w-full overflow-hidden lg:aspect-[4/5] lg:h-auto lg:rounded-[28px]">
            <Photo
              name="stand-jeep-lideranca"
              alt="Integrantes da ABA Consórcios em frente ao stand no shopping, com o carro em exposição"
              sizes="(min-width: 1024px) 46vw, 100vw"
              focus="50% 42%"
              priority
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/5 lg:hidden"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-navy/80 to-transparent lg:hidden"
            />
          </div>

          {/* Etiqueta em forma de aba, no desktop */}
          <div
            style={d(5)}
            className="rise absolute -left-14 bottom-[9rem] z-10 hidden w-60 rounded-2xl border border-white/10 bg-navy/90 p-5 shadow-2xl backdrop-blur-md lg:block"
          >
            <span aria-hidden="true" className="tab-piece absolute -top-1.5 left-5 h-1.5 w-12 bg-turq" />
            <p className="text-sm font-medium leading-relaxed text-white/90">
              Stands em shoppings, atendimento individualizado, olho no olho.
            </p>
          </div>
        </div>

        <div className="relative flex flex-col justify-end pb-12 pt-32 lg:order-1 lg:col-span-6 lg:justify-center lg:py-32">
          <p style={d(0)} className="rise eyebrow text-white/85">
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" style={d(1)} className="rise mt-6 max-w-[11ch] text-display font-extrabold">
            {hero.title}
          </h1>
          <p style={d(2)} className="rise mt-6 max-w-[34ch] text-lede text-white/85 lg:mt-8">
            {hero.subtitle}
          </p>
          <p style={d(3)} className="rise mt-4 max-w-[44ch] text-[0.95rem] leading-relaxed text-white/65">
            {hero.support}
          </p>
          <div style={d(4)} className="rise mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={hero.primary.href} variant="light">
              {hero.primary.label}
            </Button>
            <Button href={hero.secondary.href} variant="ghost">
              {hero.secondary.label}
            </Button>
          </div>
          <p
            style={d(6)}
            className="rise mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.2em] text-white/55 lg:mt-14"
          >
            <span>Fiat</span>
            <span aria-hidden="true">·</span>
            <span>Jeep</span>
            <span aria-hidden="true">·</span>
            <span>Citroën</span>
            <span aria-hidden="true" className="mx-1 h-3 w-px bg-white/25" />
            <span>Ecossistema Stellantis</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
