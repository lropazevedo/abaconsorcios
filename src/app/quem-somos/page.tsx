import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Eyebrow, d } from "@/components/ui";
import { essence, scale } from "@/data/content";
import { About } from "@/sections/About";
import { Closing } from "@/sections/Closing";
import { Manifesto } from "@/sections/Manifesto";

export const metadata: Metadata = {
  title: "Quem somos",
  description:
    "A ABA Consórcios nasceu para aproximar informação, planejamento e oportunidade. Conheça nossa história, propósito, missão e valores.",
  alternates: { canonical: "/quem-somos/" },
};

export default function QuemSomosPage() {
  return (
    <>
      <PageHero
        eyebrow="Quem somos"
        title="Existe um caminho. Deixa a gente te mostrar."
        lede="A ABA não espera que você descubra sozinho. A gente vai até você, explica, orienta, apresenta possibilidades, constrói a estratégia e acompanha depois da venda."
      />
      <About showLink={false} />

      <section aria-labelledby="essence-title" className="bg-paper py-20 sm:py-28 lg:py-36">
        <Container>
          <Eyebrow className="text-blue">Essência</Eyebrow>
          <h2 id="essence-title" data-reveal className="mt-6 max-w-[18ch] text-h2 font-extrabold">
            {essence.purpose.t}
          </h2>
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {[{ ...essence.mission, note: "" }, essence.vision].map((item, i) => (
              <article
                key={item.k}
                data-reveal
                style={d(i)}
                className="relative rounded-[22px] border border-navy/10 bg-white p-8 lg:p-10"
              >
                <span aria-hidden="true" className="tab-piece absolute left-8 top-0 h-1.5 w-12 bg-turq lg:left-10" />
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-blue">{item.k}</h3>
                <p className="mt-4 text-xl font-semibold leading-snug tracking-tight sm:text-2xl">{item.t}</p>
                {item.note && <p className="mt-4 text-sm text-slate-ink">{item.note}</p>}
              </article>
            ))}
          </div>
          <p data-reveal className="mt-8 flex items-start gap-3 text-sm font-semibold text-blue">
            <span aria-hidden="true" className="tab-piece mt-1.5 h-1.5 w-6 shrink-0 bg-turq" />
            {scale.claim}
          </p>
        </Container>
      </section>

      <section aria-labelledby="values-title" className="bg-mist-50 py-20 sm:py-28 lg:py-36">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Eyebrow className="text-blue">Valores</Eyebrow>
              <h2 id="values-title" data-reveal className="mt-6 text-h2 font-extrabold">
                Sete valores. Uma régua.
              </h2>
            </div>
            <p data-reveal style={d(1)} className="max-w-[40ch] text-lede text-navy/80 lg:col-span-5 lg:col-start-8">
              Se uma venda fere um valor, ela não é uma boa venda.
            </p>
          </div>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[22px] border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-4">
            {essence.values.map((v, i) => (
              <li key={v.k} data-reveal="fade" style={d(i)} className="bg-white p-7">
                <p className="font-mono text-xs text-slate-ink">0{i + 1}</p>
                <h3 className="mt-3 text-lg font-bold tracking-tight">{v.k}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-ink">{v.t}</p>
              </li>
            ))}
            <li className="on-dark flex items-end bg-navy p-7 text-white">
              <p className="text-xl font-bold leading-snug tracking-tight">
                Explicar estratégia. Nunca prometer prazo.
              </p>
            </li>
          </ol>
        </Container>
      </section>

      <Manifesto />
      <Closing />
    </>
  );
}
