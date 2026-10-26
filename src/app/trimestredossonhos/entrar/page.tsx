import type { Metadata } from "next";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Trimestre dos Sonhos · Entrar",
  robots: { index: false, follow: false },
};

export default async function EntrarPage({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const { erro } = await searchParams;
  return (
    <main className="on-dark relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-navy-900 px-4 py-16 text-white">
      <div aria-hidden="true" className="grid-lines absolute inset-0" />
      <div aria-hidden="true" className="halo -left-40 -top-40 size-[700px]" />
      <div aria-hidden="true" className="halo halo-blue -bottom-60 -right-40 size-[800px]" />

      <div className="relative w-full max-w-sm">
        <Logo variant="negativo" width={170} />
        <p className="mt-10 text-xs font-semibold uppercase tracking-[0.25em] text-turq">Área do colaborador</p>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight">Trimestre dos Sonhos</h1>
        <p className="mt-3 text-white/70">Entre para acompanhar a sua corrida rumo aos prêmios.</p>

        <form method="post" action="/api/trimestre/entrar/" className="mt-10 space-y-4">
          <div>
            <label htmlFor="login" className="mb-2 block text-sm font-medium text-white/80">
              Login
            </label>
            <input
              id="login"
              name="login"
              autoComplete="username"
              autoCapitalize="none"
              required
              className="h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-white outline-none transition-colors placeholder:text-white/35 focus:border-turq"
            />
          </div>
          <div>
            <label htmlFor="senha" className="mb-2 block text-sm font-medium text-white/80">
              Senha
            </label>
            <input
              id="senha"
              name="senha"
              type="password"
              autoComplete="current-password"
              required
              className="h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-white outline-none transition-colors focus:border-turq"
            />
          </div>
          {erro && (
            <p role="alert" className="rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-200">
              Login ou senha incorretos. Tente de novo.
            </p>
          )}
          <button
            type="submit"
            className="h-12 w-full rounded-xl bg-turq font-semibold text-navy-900 transition-colors hover:bg-white"
          >
            Entrar
          </button>
        </form>
        <p className="mt-8 text-xs text-white/45">Acesso exclusivo para colaboradores da ABA Consórcios.</p>
      </div>
    </main>
  );
}
