import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ABA Consórcios",
    short_name: "ABA",
    description: "Consórcios automotivos em Pernambuco. Conquistas que te movem.",
    start_url: "/",
    display: "browser",
    background_color: "#0B122B",
    theme_color: "#0B122B",
    lang: "pt-BR",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
