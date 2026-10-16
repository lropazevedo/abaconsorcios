import manifest from "@/data/images.generated.json";

type ManifestEntry = { width: number; height: number; widths: number[] };
const images = manifest as Record<string, ManifestEntry>;

type PhotoProps = {
  /** Nome do arquivo em assets-src/fotos, sem extensão. */
  name: string;
  alt: string;
  /** Largura em que a imagem aparece na tela (atributo sizes). */
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Enquadramento: CSS object-position, ex. "50% 30%". */
  focus?: string;
};

/**
 * Fotografia real otimizada (WebP responsivo, gerado por scripts/optimize-images.mjs).
 */
export function Photo({ name, alt, sizes, priority = false, className = "", focus }: PhotoProps) {
  const entry = images[name];
  if (!entry) {
    throw new Error(`Foto "${name}" não encontrada. Coloque o arquivo em assets-src/fotos e rode npm run images.`);
  }
  const srcSet = entry.widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(", ");
  const fallback = entry.widths[Math.min(1, entry.widths.length - 1)];

  return (
    <img
      src={`/images/${name}-${fallback}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={entry.width}
      height={entry.height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
      className={`h-full w-full object-cover ${className}`}
      style={focus ? { objectPosition: focus } : undefined}
    />
  );
}
