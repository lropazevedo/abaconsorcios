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
};

export default nextConfig;
