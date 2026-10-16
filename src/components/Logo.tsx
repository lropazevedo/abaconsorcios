/**
 * Logomarca oficial da ABA (arquivos do Kit de Marca, nunca recriada).
 * - "negativo": para fundos escuros (azul-marinho)
 * - "cor": para fundos claros
 */
const files = {
  negativo: "/brand/aba-horizontal-negativo.svg",
  cor: "/brand/aba-horizontal-cor.svg",
} as const;

type LogoProps = {
  variant?: keyof typeof files;
  className?: string;
  /** Mínimo oficial da assinatura horizontal: 160px. */
  width?: number;
};

export function Logo({ variant = "negativo", className = "", width = 168 }: LogoProps) {
  return (
    <img
      src={files[variant]}
      alt="ABA Consórcios"
      width={width}
      height={Math.round((width * 1098) / 6687)}
      className={className}
      decoding="async"
    />
  );
}
