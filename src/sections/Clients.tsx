import { TestimonialCard } from "@/components/cards";
import { Photo } from "@/components/Photo";
import { Container, Eyebrow, d } from "@/components/ui";
import { conquestsSection, testimonialsSection } from "@/data/content";
import { isDev } from "@/data/site";
import { conquests, testimonialPlaceholders, testimonials } from "@/data/testimonials";

/**
 * Clientes: fotos reais de conquistas + depoimentos.
 * Depoimentos só aparecem quando existirem de verdade em src/data/testimonials.ts.
 */
export function Clients() {
  const hasReal = testimonials.length > 0;
  const showPlaceholders = !hasReal && isDev;

  return (
    <section aria-labelledby="clients-title" className="relative bg-paper py-20 sm:py-28 lg:py-36">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow className="text-blue">{conquestsSection.eyebrow}</Eyebrow>
            <h2 id="clients-title" data-reveal className="mt-6 max-w-[16ch] text-h2 font-extrabold">
              {conquestsSection.title}
            </h2>
          </div>
          <p
            data-reveal
            style={d(1)}
            className="max-w-[36ch] text-lede text-navy/80 lg:col-span-4 lg:col-start-9 lg:pb-2"
          >
            {conquestsSection.text}
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:mt-20 lg:gap-6">
          {conquests.map((c, i) => (
            <li
              key={c.photo}
              data-reveal
              style={d(i)}
              className="group relative overflow-hidden rounded-[20px] bg-mist first:col-span-2 sm:first:col-span-1"
            >
              <div className="aspect-[3/4] [li:first-child_&]:aspect-[4/3] sm:[li:first-child_&]:aspect-[3/4]">
                <Photo
                  name={c.photo}
                  alt={c.alt}
                  sizes="(min-width: 640px) 31vw, 92vw"
                  focus={c.focus}
                  className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <p className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-navy">
                <span aria-hidden="true" className="tab-piece h-1.5 w-3 bg-turq" />
                Conquista {c.brand}
              </p>
            </li>
          ))}
        </ul>

        {(hasReal || showPlaceholders) && (
          <div className="mt-20 lg:mt-28">
            <h3 className="text-h3 font-bold">{testimonialsSection.title}</h3>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {(hasReal ? testimonials : testimonialPlaceholders).map((t, i) => (
                <TestimonialCard key={i} item={t} index={i} placeholder={!hasReal} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
