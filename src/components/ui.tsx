import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { isDev } from "@/data/site";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>;
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost" | "light" | "outline";
  className?: string;
  external?: boolean;
};

const variants = {
  /** Fundo escuro: botão branco com texto marinho */
  light: "bg-white text-navy hover:bg-mist",
  /** Fundo escuro: contorno branco */
  ghost: "border border-white/30 text-white hover:border-white hover:bg-white/5",
  /** Fundo claro: botão marinho */
  solid: "bg-navy text-white hover:bg-blue",
  /** Fundo claro: contorno marinho */
  outline: "border border-navy/25 text-navy hover:border-navy hover:bg-navy/[0.03]",
};

export function Button({ href, children, variant = "solid", className = "", external }: ButtonProps) {
  const cls = `btn group inline-flex whitespace-nowrap items-center justify-center gap-3 rounded-full px-6 py-3.5 text-[0.95rem] font-semibold transition-colors duration-300 ease-out ${variants[variant]} ${className}`;
  const arrow = (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
    >
      <path
        d="M3 8h9.5M8.5 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
        {arrow}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {arrow}
    </Link>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

/** Atraso de entrada escalonado (multiplicado por 90ms no CSS). */
export function d(n: number): CSSProperties {
  return { ["--d" as string]: n } as CSSProperties;
}

/**
 * Aviso de conteúdo pendente. Aparece SOMENTE em desenvolvimento (npm run dev),
 * nunca no site publicado.
 */
export function DevNote({ children }: { children: ReactNode }) {
  if (!isDev) return null;
  return (
    <p className="my-3 rounded-lg border border-dashed border-turq bg-turq/10 px-3 py-2 font-mono text-xs leading-relaxed text-current">
      <strong>PENDENTE (só aparece em dev):</strong> {children}
    </p>
  );
}
