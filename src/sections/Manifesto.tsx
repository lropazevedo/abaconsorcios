import { Container, d } from "@/components/ui";
import { manifesto } from "@/data/content";

export function Manifesto() {
  return (
    <section
      aria-labelledby="manifesto-title"
      className="on-dark relative overflow-hidden bg-navy-900 py-24 text-white sm:py-32 lg:py-44"
    >
      <div aria-hidden="true" className="halo left-[calc(50%-550px)] top-1/4 size-[1100px]" />
      <img
        aria-hidden="true"
        src="/brand/aba-monograma-negativo.svg"
        alt=""
        width={600}
        height={600}
        loading="lazy"
        className="pointer-events-none absolute -right-16 bottom-[-6%] w-[460px] max-w-[70vw] opacity-[0.04]"
      />
      <Container className="relative">
        <p className="eyebrow text-white/80">Manifesto</p>
        <h2 id="manifesto-title" data-reveal className="mt-8 max-w-[13ch] text-display font-extrabold">
          {manifesto.title}
        </h2>

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-6">
            {manifesto.lines.map((l, i) => (
              <p key={l} data-reveal style={d(i)} className="max-w-[40ch] text-lede text-white/75">
                {l}
              </p>
            ))}
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p data-reveal className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {manifesto.turn}
            </p>
            <ul className="mt-8 space-y-3">
              {manifesto.verbs.map((v, i) => (
                <li
                  key={v}
                  data-reveal
                  style={d(i + 1)}
                  className="flex items-baseline gap-4 text-xl font-semibold tracking-tight sm:text-2xl"
                >
                  <span
                    aria-hidden="true"
                    className="tab-piece inline-block h-2 w-5 shrink-0 translate-y-[-0.2em] bg-turq"
                  />
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          data-reveal
          className="mt-20 flex flex-col gap-2 border-t border-white/10 pt-10 sm:flex-row sm:items-baseline sm:justify-between lg:mt-28"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">{manifesto.signature[0]}</p>
          <p className="text-3xl font-extrabold tracking-tight sm:text-4xl">{manifesto.signature[1]}</p>
        </div>
      </Container>
    </section>
  );
}
