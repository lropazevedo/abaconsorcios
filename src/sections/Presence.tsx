import { UnitCard } from "@/components/cards";
import { Icon } from "@/components/Icon";
import { Button, Container, Eyebrow, d } from "@/components/ui";
import { presence } from "@/data/content";
import { isDev } from "@/data/site";
import { units } from "@/data/units";

export function visibleUnits() {
  return units.filter((u) => isDev || !u.pending);
}

export function Presence() {
  const list = visibleUnits();
  return (
    <section id="onde-estamos" aria-labelledby="presence-title" className="relative bg-paper py-20 sm:py-28 lg:py-36">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
            <Eyebrow className="text-blue">{presence.eyebrow}</Eyebrow>
            <h2 id="presence-title" data-reveal className="mt-6 max-w-[13ch] text-h2 font-extrabold">
              {presence.title}
            </h2>
            <p data-reveal style={d(1)} className="mt-6 max-w-[44ch] text-lede text-navy/80">
              {presence.text}
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-3">
              {presence.points.map((p, i) => (
                <li
                  key={p}
                  data-reveal
                  style={d(i + 2)}
                  className="flex items-center gap-2.5 rounded-xl bg-mist-50 px-4 py-3 text-sm font-semibold"
                >
                  <Icon name="pin" className="size-4 shrink-0 text-blue" />
                  {p}
                </li>
              ))}
            </ul>
            <div data-reveal style={d(4)} className="mt-10">
              <Button href={presence.cta.href} variant="outline">
                {presence.cta.label}
              </Button>
            </div>
          </div>

          <div className={`grid gap-6 lg:col-span-7 ${list.length > 1 ? "sm:grid-cols-2" : ""}`}>
            {list.map((u, i) => (
              <UnitCard key={u.name + u.mall} unit={u} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
