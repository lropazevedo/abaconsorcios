import { site } from "@/data/site";

/** Dados estruturados (schema.org) da organização e do site. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/icon-512.png`,
        image: `${site.url}/og.jpg`,
        slogan: site.slogan,
        description:
          "Consórcios automotivos com atendimento consultivo, presença física em shoppings e acompanhamento de ponta a ponta em Pernambuco.",
        areaServed: { "@type": "State", name: "Pernambuco" },
        sameAs: [site.social.instagram.url],
        ...(site.email ? { email: site.email } : {}),
        ...(site.phone ? { telephone: site.phone } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: "pt-BR",
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
