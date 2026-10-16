import { Button, Container, Eyebrow, d } from "@/components/ui";
import { closing } from "@/data/content";

export function Closing({ hideStands = false }: { hideStands?: boolean }) {
  return (
    <section aria-labelledby="closing-title" className="relative overflow-hidden bg-mist-50 py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] border border-navy/10 bg-white px-6 py-14 sm:px-12 lg:px-20 lg:py-20">
          <div
            aria-hidden="true"
            className="tab-piece absolute left-6 top-0 h-1.5 w-20 bg-turq sm:left-12 lg:left-20"
          />
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow className="text-blue">{closing.eyebrow}</Eyebrow>
              <h2 id="closing-title" data-reveal className="mt-6 text-h2 font-extrabold">
                {closing.title}
              </h2>
              <p data-reveal style={d(1)} className="mt-6 max-w-[44ch] text-lede text-navy/80">
                {closing.text}
              </p>
            </div>
            <div
              data-reveal
              style={d(2)}
              className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-5 lg:justify-end"
            >
              {!hideStands && (
                <Button href={closing.primary.href} variant="solid">
                  {closing.primary.label}
                </Button>
              )}
              <Button href={closing.secondary.href} variant={hideStands ? "solid" : "outline"}>
                {closing.secondary.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
