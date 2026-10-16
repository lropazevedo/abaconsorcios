import { Photo } from "@/components/Photo";
import { Container, Eyebrow, d } from "@/components/ui";
import { credibility, scale } from "@/data/content";

const strip = [
  {
    name: "stand-jeep-selfie",
    alt: "Equipe da ABA reunida no stand do shopping, com o carro em exposição",
    caption: "Ponto de venda",
    focus: "50% 55%",
  },
  {
    name: "atendimento-fiat",
    alt: "Consultora da ABA atendendo um cliente sentado à mesa do stand, com notebook aberto",
    caption: "Atendimento consultivo",
    focus: "50% 40%",
  },
  {
    name: "equipe-treinamento",
    alt: "Equipe da ABA reunida em sala de treinamento",
    caption: "Equipe treinada",
    focus: "50% 40%",
  },
];

export function Credibility() {
  return (
    <section aria-labelledby="cred-title" className="relative bg-paper py-20 sm:py-28 lg:py-36">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow className="text-blue">{credibility.eyebrow}</Eyebrow>
            <h2 id="cred-title" data-reveal className="mt-6 max-w-[14ch] text-h2 font-extrabold">
              {credibility.title}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-14">
            <p data-reveal style={d(1)} className="text-lede text-navy/80">
              {credibility.text}
            </p>
            <p data-reveal style={d(2)} className="mt-6 flex items-start gap-3 text-sm font-semibold text-blue">
              <span aria-hidden="true" className="tab-piece mt-1.5 h-1.5 w-6 shrink-0 bg-turq" />
              {scale.claim}
            </p>
          </div>
        </div>

        <ol className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-5">
          {credibility.pillars.map((p, i) => (
            <li key={p.title} className="relative pt-6">
              <span aria-hidden="true" data-draw style={d(i)} className="absolute inset-x-0 top-0 h-px bg-navy/20" />
              <span aria-hidden="true" data-draw style={d(i)} className="absolute left-0 top-0 h-[3px] w-10 bg-turq" />
              <div data-reveal style={d(i + 1)}>
                <p className="font-mono text-xs text-slate-ink">0{i + 1}</p>
                <h3 className="mt-3 text-lg font-bold tracking-tight">{p.title}</h3>
                <p className="mt-2 max-w-[30ch] text-[0.95rem] leading-relaxed text-slate-ink">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-24 lg:grid-cols-3 lg:gap-6">
          {strip.map((s, i) => (
            <figure
              key={s.name}
              data-reveal
              style={d(i)}
              className={`group relative overflow-hidden rounded-[20px] bg-mist ${i === 0 ? "col-span-2 aspect-[16/11] lg:col-span-1 lg:aspect-[4/5]" : "aspect-[4/5]"}`}
            >
              <Photo
                name={s.name}
                alt={s.alt}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                focus={s.focus}
                className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 to-transparent p-4 pt-16 text-sm font-semibold text-white sm:p-5 sm:pt-20">
                {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
