import Link from "next/link";
import { coBrandingNote } from "@/data/brands";
import { legalNav, mainNav } from "@/data/navigation";
import { site, whatsappLink } from "@/data/site";
import { units } from "@/data/units";
import { Logo } from "./Logo";
import { Icon } from "./Icon";
import { Container, DevNote } from "./ui";

export function Footer() {
  const wa = whatsappLink();
  const liveUnits = units.filter((u) => !u.pending);
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark relative overflow-hidden bg-navy-900 text-white">
      <div aria-hidden="true" className="tab-piece absolute left-[8%] top-0 h-1 w-24 bg-turq" />
      <Container className="pb-10 pt-16 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="negativo" width={200} />
            <p className="mt-6 max-w-[34ch] text-lede font-semibold tracking-tight">{site.slogan}</p>
            <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-white/65">
              Consórcios automotivos com atendimento de ponta a ponta em Pernambuco.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={site.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-medium transition-colors hover:border-white"
              >
                <Icon name="instagram" className="size-[18px]" />
                {site.social.instagram.handle}
              </a>
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-medium transition-colors hover:border-white"
                >
                  <Icon name="whatsapp" className="size-[18px]" />
                  WhatsApp
                </a>
              )}
            </div>
          </div>

          <nav aria-label="Institucional" className="lg:col-span-3 lg:col-start-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Institucional</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm lg:grid-cols-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/80 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Unidades</h2>
            <ul className="mt-5 space-y-4 text-sm">
              {liveUnits.map((u) => (
                <li key={u.name + u.mall}>
                  <p className="font-semibold">{u.mall}</p>
                  <p className="text-white/65">
                    {u.name} · {u.city}, {u.state}
                  </p>
                </li>
              ))}
            </ul>
            <Link
              href="/onde-estamos/"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-turq hover:text-white"
            >
              Ver todas as unidades
              <Icon name="arrowUpRight" className="size-4" />
            </Link>

            <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Contato</h2>
            <ul className="mt-5 space-y-2 text-sm text-white/80">
              <li>{site.domain}</li>
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="hover:text-white">
                    {site.email}
                  </a>
                </li>
              )}
              {site.phone && <li>{site.phone}</li>}
              <li>
                <Link href="/contato/" className="hover:text-white">
                  Todos os canais
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-xs leading-relaxed text-white/55">
          <p className="max-w-[110ch]">{coBrandingNote}</p>
          <p className="mt-3 max-w-[110ch]">
            As condições de cada grupo de consórcio, como prazos, taxas e regras de contemplação, constam no contrato da
            administradora. A contemplação acontece por sorteio ou lance, conforme as regras do grupo, e não existe
            prazo garantido.
          </p>
          {!site.legal.cnpj && <DevNote>preencher razão social e CNPJ em src/data/site.ts (legal).</DevNote>}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {site.legal.razaoSocial || site.name}
              {site.legal.cnpj && <> · CNPJ {site.legal.cnpj}</>}. Todos os direitos reservados.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
