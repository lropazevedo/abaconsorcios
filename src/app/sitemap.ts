import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export const dynamic = "force-static";

const routes = [
  { path: "/", priority: 1 },
  { path: "/quem-somos/", priority: 0.8 },
  { path: "/nossa-equipe/", priority: 0.8 },
  { path: "/onde-estamos/", priority: 0.8 },
  { path: "/contato/", priority: 0.7 },
  { path: "/politica-de-privacidade/", priority: 0.3 },
  { path: "/termos-de-uso/", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
