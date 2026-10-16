import type { TeamMember } from "@/data/team";
import type { Testimonial } from "@/data/testimonials";
import type { Unit } from "@/data/units";
import { Icon } from "./Icon";
import { Photo } from "./Photo";
import { DevNote, d } from "./ui";

/** Card de colaborador. Sem foto, mostra o monograma oficial da ABA. */
export function TeamCard({ member, index = 0 }: { member: TeamMember; index?: number }) {
  return (
    <article data-reveal style={d(index)} className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-navy">
        {member.photo ? (
          <Photo
            name={member.photo}
            alt={`${member.name}${member.role ? `, ${member.role}` : ""} da ABA Consórcios`}
            sizes="(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 92vw"
            focus={member.focus}
            className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-navy">
            <div aria-hidden="true" className="grid-lines absolute inset-0" />
            <img
              src="/brand/aba-monograma-negativo.svg"
              alt=""
              width={120}
              height={120}
              className="relative w-[34%] opacity-90"
            />
          </div>
        )}
        <div aria-hidden="true" className="tab-piece absolute bottom-0 left-6 h-1.5 w-14 bg-turq" />
      </div>
      <div className="mt-4 sm:mt-5">
        <h3 className="text-[0.95rem] font-bold leading-tight tracking-tight sm:text-xl">{member.name}</h3>
        {member.role && <p className="mt-1 text-xs font-medium leading-snug text-blue sm:text-base">{member.role}</p>}
        {member.unit && <p className="mt-0.5 hidden text-sm text-slate-ink sm:block">{member.unit}</p>}
        {member.quote && <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-slate-ink">“{member.quote}”</p>}
        {!member.photo && <DevNote>foto de {member.name}.</DevNote>}
        {!member.role && <DevNote>cargo de {member.name}.</DevNote>}
      </div>
    </article>
  );
}

export function UnitCard({ unit, index = 0, priority = false }: { unit: Unit; index?: number; priority?: boolean }) {
  return (
    <article
      data-reveal
      style={d(index)}
      className="flex h-full flex-col overflow-hidden rounded-[22px] border border-navy/10 bg-white"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <Photo
          name={unit.photo}
          alt={`${unit.name} da ABA no ${unit.mall}`}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          focus={unit.focus}
          priority={priority}
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {unit.brands.map((b) => (
            <span key={b} className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-navy">
              {b}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">{unit.name}</p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight">{unit.mall}</h3>
        <p className="mt-1 text-slate-ink">
          {unit.city}, {unit.state}
        </p>
        {unit.address && <p className="mt-1 text-sm text-slate-ink">{unit.address}</p>}
        <p className="mt-4 flex items-start gap-2 text-sm text-navy">
          <Icon name="clock" className="mt-0.5 size-4 shrink-0 text-blue" />
          {unit.hours || "Horário de funcionamento do shopping"}
        </p>
        {unit.pending && <DevNote>unidade com dados a confirmar. Fica oculta no site publicado.</DevNote>}
        {!unit.hours && !unit.pending && <DevNote>horário do stand em src/data/units.ts.</DevNote>}
        <div className="mt-auto pt-6">
          {unit.mapsUrl ? (
            <a
              href={unit.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex items-center gap-2 rounded-full border border-navy/20 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              <Icon name="pin" className="size-4" />
              Ver localização
              <span className="sr-only"> de {unit.mall} (abre em nova janela)</span>
            </a>
          ) : (
            <span className="text-sm text-slate-ink">Localização em breve</span>
          )}
        </div>
      </div>
    </article>
  );
}

export function TestimonialCard({
  item,
  placeholder = false,
  index = 0,
}: {
  item: Testimonial;
  placeholder?: boolean;
  index?: number;
}) {
  return (
    <figure
      data-reveal
      style={d(index)}
      className={`flex h-full flex-col rounded-[22px] border bg-white p-7 ${placeholder ? "border-dashed border-turq" : "border-navy/10"}`}
    >
      {placeholder && (
        <p className="mb-4 self-start rounded-full bg-turq/15 px-3 py-1 font-mono text-[0.7rem] font-semibold uppercase tracking-wider text-navy">
          Placeholder de desenvolvimento
        </p>
      )}
      <svg aria-hidden="true" viewBox="0 0 32 24" className="h-6 w-8 text-turq">
        <path
          d="M0 24V14C0 6 4.5 1.2 12 0l1.2 3C8.6 4.6 6.6 7.4 6.4 11H12v13H0zm19 0V14c0-8 4.5-12.8 12-14l1 3c-4.6 1.6-6.6 4.4-6.8 8H31v13H19z"
          fill="currentColor"
        />
      </svg>
      <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-navy">“{item.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-4 border-t border-navy/10 pt-5">
        {item.photo && (
          <span className="size-12 shrink-0 overflow-hidden rounded-full">
            <Photo name={item.photo} alt="" sizes="48px" />
          </span>
        )}
        <span>
          <span className="block font-semibold">{item.name}</span>
          <span className="block text-sm text-slate-ink">
            {item.city} · {item.vehicle}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
