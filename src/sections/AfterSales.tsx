import { Photo } from "@/components/Photo";
import { Container, Eyebrow, d } from "@/components/ui";
import { afterSales } from "@/data/content";

export function AfterSales() {
  return (
    <section id="pos-venda" aria-labelledby="after-title" className="relative bg-paper py-20 sm:py-28 lg:py-36">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-6">
            <figure data-reveal className="relative overflow-hidden rounded-[28px] bg-mist">
              <div className="aspect-[4/5]">
                <Photo
                  name="entrega-citroen-casal"
                  alt="Consultores da ABA com um casal de clientes segurando a chave cenográfica em frente a um Citroën preto"
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  focus="50% 55%"
                />
              </div>
            </figure>
            <div
              data-reveal
              style={d(2)}
              className="on-dark relative -mt-16 ml-4 mr-4 rounded-2xl bg-navy p-6 text-white shadow-2xl sm:ml-10 sm:mr-auto sm:max-w-sm lg:absolute lg:-bottom-10 lg:-right-10 lg:ml-0 lg:mr-0 lg:mt-0"
            >
              <span aria-hidden="true" className="tab-piece absolute -top-1.5 left-6 h-1.5 w-12 bg-turq" />
              <p className="text-[0.95rem] font-medium leading-relaxed">{afterSales.rule}</p>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Eyebrow className="text-blue">{afterSales.eyebrow}</Eyebrow>
            <h2 id="after-title" data-reveal className="mt-6 max-w-[14ch] text-h2 font-extrabold">
              {afterSales.title}
            </h2>
            <p data-reveal style={d(1)} className="mt-6 max-w-[40ch] text-lede text-navy/80">
              {afterSales.text}
            </p>
            <ul className="mt-10 border-t border-navy/10">
              {afterSales.items.map((it, i) => (
                <li
                  key={it.k}
                  data-reveal
                  style={d(i + 2)}
                  className="grid gap-1 border-b border-navy/10 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6"
                >
                  <h3 className="font-bold tracking-tight">{it.k}</h3>
                  <p className="leading-relaxed text-slate-ink">{it.t}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
