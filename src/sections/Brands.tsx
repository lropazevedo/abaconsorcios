import { Photo } from "@/components/Photo";
import { Container, Eyebrow, d } from "@/components/ui";
import { brands, coBrandingNote, stellantis } from "@/data/brands";
import { brandsSection } from "@/data/content";

export function Brands() {
  return (
    <section
      id="marcas"
      aria-labelledby="brands-title"
      className="on-dark relative overflow-hidden bg-navy py-20 text-white sm:py-28 lg:py-36"
    >
      <div aria-hidden="true" className="halo halo-blue -left-60 top-1/3 size-[900px]" />
      <Container className="relative">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow className="text-white/80">{brandsSection.eyebrow}</Eyebrow>
            <h2 id="brands-title" data-reveal className="mt-6 max-w-[16ch] text-h2 font-extrabold">
              {brandsSection.title}
            </h2>
            <p data-reveal style={d(1)} className="mt-6 max-w-[52ch] text-lede text-white/75">
              {brandsSection.text}
            </p>
          </div>
          <figure data-reveal style={d(2)} className="lg:col-span-4 lg:col-start-9">
            <div className="overflow-hidden rounded-[20px] ring-1 ring-white/10">
              <img
                src={stellantis.logo}
                alt="Stellantis"
                width={stellantis.width}
                height={stellantis.height}
                loading="lazy"
                decoding="async"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 text-xs text-white/55">
              Fiat, Jeep e Citroën são marcas do grupo Stellantis.
            </figcaption>
          </figure>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-3 lg:mt-20 lg:gap-6">
          {brands.map((b, i) => (
            <li
              key={b.name}
              data-reveal
              style={d(i)}
              className="group relative overflow-hidden rounded-[24px] bg-navy-800"
            >
              <div className="aspect-[4/5]">
                <Photo
                  name={b.photo}
                  alt={b.alt}
                  sizes="(min-width: 640px) 31vw, 100vw"
                  focus={b.focus}
                  className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="absolute left-5 top-5 flex h-16 w-24 items-center justify-center rounded-xl bg-white p-3 shadow-lg">
                <img
                  src={b.logo}
                  alt={b.name}
                  width={b.logoW}
                  height={b.logoH}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full w-auto max-w-full object-contain"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/75 to-transparent p-6 pt-28">
                <h3 className="text-2xl font-bold tracking-tight">{b.name}</h3>
                <p className="mt-2 max-w-[32ch] text-sm leading-relaxed text-white/80">{b.line}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-[90ch] text-xs leading-relaxed text-white/55">{coBrandingNote}</p>
      </Container>
    </section>
  );
}
