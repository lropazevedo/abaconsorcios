import type { Metadata } from "next";
import { UnitCard } from "@/components/cards";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { Container, d } from "@/components/ui";
import { presence } from "@/data/content";
import { Closing } from "@/sections/Closing";
import { visibleUnits } from "@/sections/Presence";

export const metadata: Metadata = {
  title: "Onde estamos",
  description:
    "Stands da ABA Consórcios em shoppings de Pernambuco. Atendimento presencial, equipe uniformizada e carro no stand.",
  alternates: { canonical: "/onde-estamos/" },
};

export default function OndeEstamosPage() {
  const list = visibleUnits();
  return (
    <>
      <PageHero eyebrow={presence.eyebrow} title={presence.title} lede={presence.text}>
        <ul className="mt-10 flex flex-wrap gap-3">
          {presence.points.map((p, i) => (
            <li
              key={p}
              data-reveal
              style={d(i + 3)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/85"
            >
              <Icon name="pin" className="size-4 text-turq" />
              {p}
            </li>
          ))}
        </ul>
      </PageHero>

      <section aria-label="Unidades" className="bg-paper py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((u, i) => (
              <UnitCard key={u.name + u.mall} unit={u} index={i} priority={i === 0} />
            ))}
          </div>
          <p className="mt-10 max-w-[70ch] text-sm leading-relaxed text-slate-ink">
            Novas unidades são anunciadas aqui e no Instagram @abaconsorcios. Pernambuco é o ponto de partida.
          </p>
        </Container>
      </section>
      <Closing hideStands />
    </>
  );
}
