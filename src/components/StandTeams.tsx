import { brands } from "@/data/brands";
import { standTeams } from "@/data/team";
import { Photo } from "./Photo";
import { d } from "./ui";

/** Um card por stand: a foto do time, a marca e o shopping. */
export function StandTeams() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
      {standTeams.map((s, i) => {
        const brand = brands.find((b) => b.name === s.brand);
        return (
          <li key={s.photo} data-reveal style={d(i)} className="group relative overflow-hidden rounded-[22px] bg-navy">
            <div className="aspect-[3/4]">
              <Photo
                name={s.photo}
                alt={s.alt}
                sizes="(min-width: 1024px) 23vw, 48vw"
                focus={s.focus}
                className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
              />
            </div>
            {brand && (
              <div className="absolute left-3 top-3 flex h-10 w-16 items-center justify-center rounded-lg bg-white p-2 shadow-lg sm:left-4 sm:top-4 sm:h-12 sm:w-20 sm:rounded-xl">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  width={brand.logoW}
                  height={brand.logoH}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full w-auto max-w-full object-contain"
                />
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/75 to-transparent p-4 pt-20 text-white sm:p-5 sm:pt-24">
              <span aria-hidden="true" className="tab-piece mb-3 block h-1 w-8 bg-turq" />
              <h3 className="text-base font-bold leading-tight tracking-tight sm:text-lg">Time {s.brand}</h3>
              <p className="mt-1 text-xs leading-snug text-white/80 sm:text-sm">{s.mall}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
