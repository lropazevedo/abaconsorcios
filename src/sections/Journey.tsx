import { Container, Eyebrow, d } from "@/components/ui";
import { journey } from "@/data/content";

export function Journey() {
  return (
    <section
      id="como-trabalhamos"
      aria-labelledby="journey-title"
      className="on-dark relative overflow-hidden bg-navy py-20 text-white sm:py-28 lg:py-36"
    >
      <div aria-hidden="true" className="grid-lines absolute inset-0" />
      <div aria-hidden="true" className="halo right-[-10%] top-[-20%] size-[700px]" />
      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow className="text-white/80">{journey.eyebrow}</Eyebrow>
            <h2 id="journey-title" data-reveal className="mt-6 text-h2 font-extrabold">
              {journey.title}
            </h2>
          </div>
          <p
            data-reveal
            style={d(1)}
            className="max-w-[40ch] text-lede text-white/75 lg:col-span-4 lg:col-start-9 lg:self-end"
          >
            {journey.text}
          </p>
        </div>

        <ol className="relative mt-16 grid gap-0 lg:mt-24 lg:grid-cols-5 lg:gap-6">
          {/* Linha que se desenha: vertical no celular, horizontal no desktop */}
          <span
            aria-hidden="true"
            data-draw="y"
            className="absolute bottom-6 left-[11px] top-3 w-px bg-gradient-to-b from-turq via-white/30 to-white/10 lg:hidden"
          />
          <span
            aria-hidden="true"
            data-draw
            className="absolute left-0 right-0 top-[11px] hidden h-px bg-gradient-to-r from-turq via-white/30 to-white/10 lg:block"
          />

          {journey.steps.map((s, i) => (
            <li
              key={s.n}
              data-reveal
              style={d(i + 1)}
              className="relative pb-10 pl-12 last:pb-0 lg:pb-0 lg:pl-0 lg:pt-14"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 flex size-6 items-center justify-center rounded-full border border-white/25 bg-navy lg:top-0"
              >
                <span className={`size-2 rounded-full ${i === journey.steps.length - 1 ? "bg-turq" : "bg-white/80"}`} />
              </span>
              <p className="font-mono text-sm text-turq">{s.n}</p>
              <h3 className="mt-2 text-h3 font-bold">{s.k}</h3>
              <p className="mt-3 max-w-[28ch] leading-relaxed text-white/70">{s.t}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
