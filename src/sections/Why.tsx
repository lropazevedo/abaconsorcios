import { Icon } from "@/components/Icon";
import { Container, Eyebrow, d } from "@/components/ui";
import { why } from "@/data/content";

export function Why() {
  return (
    <section aria-labelledby="why-title" className="relative bg-mist-50 py-20 sm:py-28 lg:py-36">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center text-blue">{why.eyebrow}</Eyebrow>
          <h2 id="why-title" data-reveal className="mx-auto mt-6 max-w-[16ch] text-h2 font-extrabold">
            {why.title}
          </h2>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-5 lg:gap-5">
          {why.pillars.map((p, i) => (
            <li
              key={p.k}
              data-reveal
              style={d(i)}
              className="group relative flex flex-col rounded-[22px] border border-navy/10 bg-white p-5 transition-[transform,box-shadow] duration-500 sm:p-7 ease-out hover:-translate-y-1 hover:shadow-[0_24px_60px_-32px_rgb(11_18_43/0.35)] last:col-span-2 lg:last:col-span-1"
            >
              <span className="relative flex size-12 items-center justify-center rounded-2xl bg-navy text-white">
                <Icon name={p.icon} className="size-6" />
                <span
                  aria-hidden="true"
                  className="tab-piece absolute -bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 bg-turq"
                />
              </span>
              <h3 className="mt-6 text-base font-bold tracking-tight sm:mt-7 sm:text-lg">{p.k}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-ink sm:text-[0.95rem]">{p.t}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
