import type { Metadata } from "next";
import { Podio, SectionTitle, StandCard, TdsShell } from "@/components/trimestre/blocks";
import { SellerRace } from "@/components/trimestre/SellerRace";
import { stands as standsBase, vendedores as base } from "@/data/trimestre";
import { exigirGestor } from "@/lib/sessao";
import { brl, brlCurto, dadosTrimestre, dataBR, hojeRecife } from "@/lib/trimestre";
import { origemDoBanco } from "@/lib/vendas-store";
import { cadastrarVenda, excluirVenda } from "./actions";

export const metadata: Metadata = {
  title: "Trimestre dos Sonhos · Gestor",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const campo =
  "h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-white outline-none transition-colors focus:border-turq";

export default async function GestorPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; erro?: string; excluida?: string }>;
}) {
  await exigirGestor();
  const q = await searchParams;
  const d = await dadosTrimestre();
  const banco = origemDoBanco();
  const nomeDe = (login: string) => base.find((v) => v.login === login)?.nome ?? login;

  return (
    <TdsShell gestor saudacao="Painel do gestor">
      {/* Cadastro de venda */}
      <section aria-labelledby="cadastrar" className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 sm:p-8">
        <SectionTitle id="cadastrar">Cadastrar venda</SectionTitle>
        <p className="mt-1 text-sm text-white/65">
          Conta venda válida: ficha assinada, lançada no Convert+ em até 48h, cadastro aprovado e reserva paga.
        </p>

        {banco === "indisponivel" && (
          <p role="alert" className="mt-4 rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-200">
            O banco de vendas ainda não está ligado na Vercel. Siga o passo a passo do README (Upstash Redis).
          </p>
        )}
        {q.ok && (
          <p role="status" className="mt-4 rounded-xl bg-turq/15 px-4 py-3 text-sm text-turq">
            Venda cadastrada para {nomeDe(q.ok)}. A página de todos já está atualizada.
          </p>
        )}
        {q.excluida && (
          <p role="status" className="mt-4 rounded-xl bg-white/10 px-4 py-3 text-sm text-white/80">
            Lançamento excluído.
          </p>
        )}
        {q.erro && (
          <p role="alert" className="mt-4 rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-200">
            Confira os campos: escolha o vendedor, informe um valor maior que zero e a data.
          </p>
        )}

        <form action={cadastrarVenda} className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="vendedor" className="mb-2 block text-sm font-medium text-white/80">
              Vendedor
            </label>
            <select id="vendedor" name="vendedor" required defaultValue="" className={`${campo} appearance-none`}>
              <option value="" disabled>
                Escolha...
              </option>
              {standsBase.map((s) => (
                <optgroup key={s.id} label={s.nome} className="bg-navy-900">
                  {base
                    .filter((v) => v.stand === s.id)
                    .map((v) => (
                      <option key={v.login} value={v.login} className="bg-navy-900">
                        {v.nome}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="valor" className="mb-2 block text-sm font-medium text-white/80">
              Valor da venda (R$)
            </label>
            <input
              id="valor"
              name="valor"
              inputMode="decimal"
              placeholder="Ex.: 85.000,00"
              required
              className={campo}
            />
          </div>
          <div>
            <label htmlFor="data" className="mb-2 block text-sm font-medium text-white/80">
              Data da venda
            </label>
            <input
              id="data"
              name="data"
              type="date"
              required
              defaultValue={hojeRecife()}
              min={d.campanha.inicio}
              max={d.campanha.fim}
              className={`${campo} [color-scheme:dark]`}
            />
          </div>
          <div>
            <label htmlFor="obs" className="mb-2 block text-sm font-medium text-white/80">
              Observação (opcional)
            </label>
            <input id="obs" name="obs" maxLength={140} placeholder="Ex.: cliente, grupo, cota" className={campo} />
          </div>
          <label className="flex items-center gap-3 text-sm text-white/75 sm:col-span-2">
            <input type="checkbox" name="ajuste" className="size-5 shrink-0 accent-[#F2C14E]" />
            <span>
              É um ajuste para <strong className="text-white">tirar</strong> valor (venda cancelada ou correção)
            </span>
          </label>
          <button
            type="submit"
            className="h-12 rounded-xl bg-turq font-semibold text-navy-900 transition-colors hover:bg-white sm:col-span-2"
          >
            Cadastrar
          </button>
        </form>
      </section>

      {/* Lançamentos */}
      <section aria-labelledby="lancamentos" className="mt-12">
        <SectionTitle id="lancamentos">Últimos lançamentos</SectionTitle>
        {d.vendas.length === 0 ? (
          <p className="mt-4 text-white/60">
            Nenhuma venda cadastrada pelo painel ainda. Os valores atuais vêm da produção registrada até 26/10/2026.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-white/10 rounded-2xl border border-white/10">
            {d.vendas.slice(0, 40).map((v) => (
              <li key={v.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3">
                <span className="w-24 text-sm text-white/60">{dataBR(v.data)}</span>
                <span className="min-w-0 flex-1 font-semibold">
                  {nomeDe(v.vendedor)}
                  {v.obs && <span className="ml-2 text-sm font-normal text-white/55">{v.obs}</span>}
                </span>
                <span className={`font-extrabold tabular-nums ${v.valor < 0 ? "text-red-300" : ""}`}>
                  {brl(v.valor)}
                </span>
                <form action={excluirVenda}>
                  <input type="hidden" name="id" value={v.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70 hover:border-red-300 hover:text-red-200"
                    aria-label={`Excluir lançamento de ${nomeDe(v.vendedor)} de ${brl(v.valor)}`}
                  >
                    Excluir
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="podio" className="mt-12">
        <SectionTitle id="podio">Os 3 primeiros</SectionTitle>
        <Podio top3={d.top3} />
      </section>

      <section aria-labelledby="todos" className="mt-12">
        <SectionTitle id="todos">Todos os colaboradores</SectionTitle>
        <p className="mt-1 text-sm text-white/60">
          Só o gestor vê esta lista. Cada colaborador vê apenas o próprio resultado, o do stand e os 3 primeiros. Total
          geral: {brlCurto(d.totalGeral)}.
        </p>
        <div className="mt-5">
          <SellerRace
            vendedores={d.vendedores}
            stands={standsBase}
            metas={d.metas}
            fim={dataBR(d.campanha.fim).slice(0, 5)}
          />
        </div>
      </section>

      <section aria-labelledby="stands" className="mt-12">
        <SectionTitle id="stands">Corrida dos stands</SectionTitle>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {d.stands.map((s) => (
            <StandCard key={s.id} s={s} d={d} mostrarValores />
          ))}
        </div>
      </section>
    </TdsShell>
  );
}
