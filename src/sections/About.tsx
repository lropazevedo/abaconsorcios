import { AbaTabs } from "@/components/AbaTabs";
import { Button, Container, Eyebrow, d } from "@/components/ui";
import { about } from "@/data/content";

export function About({ showLink = true }: { showLink?: boolean }) {
  return (
    <section
      id="quem-somos"
      aria-labelledby="about-title"
      className="relative overflow-hidden bg-mist-50 py-20 sm:py-28 lg:py-36"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow className="text-blue">{about.eyebrow}</Eyebrow>
            <h2 id="about-title" data-reveal className="mt-6 text-h2 font-extrabold">
              <span className="block">{about.title[0]}</span>
              <span className="block text-blue">{about.title[1]}</span>
            </h2>
            <div className="mt-8 space-y-5">
              {about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  data-reveal
                  style={d(i + 1)}
                  className="max-w-[52ch] text-[1.05rem] leading-relaxed text-navy/80"
                >
                  {p}
                </p>
              ))}
            </div>
            {showLink && (
              <div data-reveal style={d(3)} className="mt-10">
                <Button href="/quem-somos/" variant="outline">
                  Nossa história
                </Button>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 lg:pt-6">
            <p data-reveal className="max-w-[30ch] text-2xl font-semibold leading-snug tracking-tight sm:text-[1.7rem]">
              {about.concept}
            </p>
            <p data-reveal style={d(1)} className="mt-4 text-sm font-medium text-slate-ink">
              {about.nameNote}
            </p>
            <div data-reveal style={d(2)} className="mt-10">
              <AbaTabs />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
