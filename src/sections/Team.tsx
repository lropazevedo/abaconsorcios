import { TeamCard } from "@/components/cards";
import { StandTeams } from "@/components/StandTeams";
import { Button, Container, Eyebrow, d } from "@/components/ui";
import { teamSection } from "@/data/content";
import { team } from "@/data/team";

export function Team() {
  const leaders = team.filter((m) => m.group === "lideranca").slice(0, 3);

  return (
    <section id="equipe" aria-labelledby="team-title" className="relative bg-paper py-20 sm:py-28 lg:py-36">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow className="text-blue">{teamSection.eyebrow}</Eyebrow>
            <h2 id="team-title" data-reveal className="mt-6 max-w-[13ch] text-h2 font-extrabold">
              {teamSection.title}
            </h2>
          </div>
          <p data-reveal style={d(1)} className="max-w-[38ch] text-lede text-navy/80 lg:pb-2">
            {teamSection.text}
          </p>
        </div>

        {/* Diretoria */}
        <div className="mt-14 grid gap-8 border-t border-navy/10 pt-10 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h3 data-reveal className="text-h3 font-bold">
              {teamSection.leadersTitle}
            </h3>
            <p data-reveal style={d(1)} className="mt-3 max-w-[34ch] leading-relaxed text-slate-ink">
              {teamSection.leadersText}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:col-span-8">
            {leaders.map((m, i) => (
              <TeamCard key={m.name} member={m} index={i} />
            ))}
          </div>
        </div>

        {/* Um time em cada stand */}
        <div className="mt-16 border-t border-navy/10 pt-10 lg:mt-24">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <h3 data-reveal className="text-h3 font-bold">
              {teamSection.standsTitle}
            </h3>
            <p data-reveal style={d(1)} className="max-w-[46ch] leading-relaxed text-slate-ink">
              {teamSection.standsText}
            </p>
          </div>
          <div className="mt-8">
            <StandTeams />
          </div>
        </div>

        <div data-reveal className="mt-10 flex justify-start">
          <Button href={teamSection.cta.href} variant="solid">
            {teamSection.cta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
