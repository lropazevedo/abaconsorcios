import type { Metadata } from "next";
import { TeamCard } from "@/components/cards";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { StandTeams } from "@/components/StandTeams";
import { Container, Eyebrow, d } from "@/components/ui";
import { teamSection } from "@/data/content";
import { team, teamGroupPhoto, teamGroups, type TeamGroup } from "@/data/team";
import { AfterSales } from "@/sections/AfterSales";
import { Closing } from "@/sections/Closing";

export const metadata: Metadata = {
  title: "Nossa equipe",
  description:
    "Conheça as pessoas da ABA Consórcios: diretoria e os times dos stands Jeep, Fiat e Citroën nos shoppings Tacaruna e Guararapes.",
  alternates: { canonical: "/nossa-equipe/" },
};

export default function NossaEquipePage() {
  const groups = (Object.keys(teamGroups) as TeamGroup[])
    .map((g) => ({ key: g, label: teamGroups[g], members: team.filter((m) => m.group === g) }))
    .filter((g) => g.members.length > 0);

  return (
    <>
      <PageHero eyebrow={teamSection.eyebrow} title={teamSection.title} lede={teamSection.text} />

      {groups.map((g) => (
        <section key={g.key} aria-labelledby={`grupo-${g.key}`} className="bg-paper pt-16 sm:pt-20 lg:pt-28">
          <Container>
            <Eyebrow className="text-blue">Equipe</Eyebrow>
            <h2 id={`grupo-${g.key}`} data-reveal className="mt-5 text-h2 font-extrabold">
              {g.key === "lideranca" ? teamSection.leadersTitle : g.label}
            </h2>
            <div className="mt-12 grid max-w-5xl grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 lg:grid-cols-3">
              {g.members.map((m, i) => (
                <TeamCard key={m.name} member={m} index={i} />
              ))}
            </div>
          </Container>
        </section>
      ))}

      <section aria-labelledby="stands-title" className="bg-paper py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Eyebrow className="text-blue">Nos shoppings</Eyebrow>
              <h2 id="stands-title" data-reveal className="mt-5 text-h2 font-extrabold">
                {teamSection.standsTitle}
              </h2>
            </div>
            <p data-reveal style={d(1)} className="max-w-[44ch] text-lede text-navy/80">
              {teamSection.standsText}
            </p>
          </div>
          <div className="mt-12">
            <StandTeams />
          </div>

          <figure data-reveal className="relative mt-16 overflow-hidden rounded-[24px] bg-navy lg:mt-24">
            <div className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]">
              <Photo
                name={teamGroupPhoto.photo}
                alt={teamGroupPhoto.alt}
                sizes="(min-width: 1320px) 1240px, 100vw"
                focus={teamGroupPhoto.focus}
              />
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/85 to-transparent p-6 pt-28 text-white sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-turq">Uma equipe só</p>
              <p className="mt-2 max-w-[40ch] text-lg font-semibold sm:text-xl">
                Diretoria, consultores e pós-venda, treinados juntos.
              </p>
            </figcaption>
          </figure>
        </Container>
      </section>

      <AfterSales />
      <Closing />
    </>
  );
}
