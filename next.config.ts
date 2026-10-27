import type { NextConfig } from "next";

/**
 * O site roda como app Next.js na Vercel (não mais como export estático),
 * porque a área /trimestredossonhos precisa de login verificado no servidor.
 * As imagens já são otimizadas por `scripts/optimize-images.mjs`.
 */
const nextConfig: NextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  // /crm_teste é um protótipo estático (public/crm_teste/index.html) para avaliação do CRM.
  async rewrites() {
    return [{ source: "/crm_teste/", destination: "/crm_teste/index.html" }];
  },
  async headers() {
    return [{ source: "/crm_teste/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
