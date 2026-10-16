import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { Container, d } from "@/components/ui";
import { site, whatsappLink } from "@/data/site";
import { visibleUnits } from "@/sections/Presence";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a ABA Consórcios pelo WhatsApp, Instagram ou visite um dos nossos stands em Pernambuco.",
  alternates: { canonical: "/contato/" },
};

type Channel = { icon: string; label: string; value: string; href: string; external?: boolean };

export default function ContatoPage() {
  const wa = whatsappLink();
  const channels: Channel[] = [
    ...(wa ? [{ icon: "whatsapp", label: "WhatsApp", value: "Fale com o nosso time", href: wa, external: true }] : []),
    {
      icon: "instagram",
      label: "Instagram",
      value: site.social.instagram.handle,
      href: site.social.instagram.url,
      external: true,
    },
    ...(site.email ? [{ icon: "mail", label: "E-mail", value: site.email, href: `mailto:${site.email}` }] : []),
  ];
  const units = visibleUnits().filter((u) => !u.pending);

  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Fale com a ABA."
        lede="A gente entende primeiro. Depois explica. Escolha o canal que for melhor para você, ou venha conversar pessoalmente em um dos nossos stands."
      />

      <section aria-labelledby="canais-title" className="bg-paper py-16 sm:py-20 lg:py-28">
        <Container>
          <h2 id="canais-title" className="sr-only">
            Canais de atendimento
          </h2>
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {channels.map((c, i) => (
              <li key={c.label} data-reveal style={d(i)}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full flex-col rounded-[22px] border border-navy/10 bg-white p-7 transition-[border-color,box-shadow] duration-500 hover:border-navy/30 hover:shadow-[0_24px_60px_-32px_rgb(11_18_43/0.35)]"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-navy text-white">
                    <Icon name={c.icon} className="size-6" />
                  </span>
                  <span className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-blue">{c.label}</span>
                  <span className="mt-2 flex items-center gap-2 text-lg font-bold tracking-tight [overflow-wrap:anywhere] sm:text-xl">
                    {c.value}
                    <Icon
                      name="arrowUpRight"
                      className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </a>
              </li>
            ))}
            {units.map((u, i) => (
              <li key={u.mall} data-reveal style={d(channels.length + i)}>
                <Link
                  href="/onde-estamos/"
                  className="on-dark group flex h-full flex-col rounded-[22px] bg-navy p-7 text-white transition-colors duration-500 hover:bg-navy-800"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-turq">
                    <Icon name="pin" className="size-6" />
                  </span>
                  <span className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-turq">
                    Visite um stand
                  </span>
                  <span className="mt-2 text-xl font-bold tracking-tight">{u.mall}</span>
                  <span className="mt-1 text-sm text-white/70">
                    {u.name} · {u.city}, {u.state}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-12 max-w-[70ch] text-sm leading-relaxed text-slate-ink">
            Ao falar com a ABA, seus dados são usados só para o atendimento que você pediu. Veja a nossa{" "}
            <Link href="/politica-de-privacidade/" className="font-semibold text-blue underline underline-offset-4">
              Política de Privacidade
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
