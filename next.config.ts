import type { NextConfig } from "next";

/**
 * Export estático: `npm run build` gera a pasta `out/`, pronta para qualquer
 * hospedagem (HostGator, Vercel, Netlify, S3...). Não há servidor Node em produção.
 * As imagens já são otimizadas por `scripts/optimize-images.mjs`.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
