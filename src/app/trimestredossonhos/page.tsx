import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { MeuResultado, Podio, Premios, Regras, SectionTitle, StandCard, TdsShell } from "@/components/trimestre/blocks";
import { exigirSessao } from "@/lib/sessao";
import { dadosTrimestre } from "@/lib/trimestre";

export const metadata: Metadata = {
  title: "Trimestre dos Sonhos",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/**
 * Visão do colaborador: só o resultado dele, o do stand dele e os 3 primeiros colocados.
 */
export default async function TrimestrePage() {
  const sessao = await exigirSessao();
  if (sessao.admin) redirect("/trimestredossonhos/gestor/");

  const d = await dadosTrimestre();
  const eu = d.vendedores.find((v) => v.login === sessao.login);

  if (!eu) {
    return (
      <TdsShell>
        <p className="mx-auto mt-10 max-w-md text-center text-white/75">
          Seu login ainda não está ligado a um colaborador da campanha. Fale com o gestor.
        </p>
      </TdsShell>
    );
  }

  const meuStand = d.stands.find((s) => s.id === eu.stand)!;

  return (
    <TdsShell saudacao={`Olá, ${eu.nome.split(" ")[0]}!`}>
      <MeuResultado v={eu} d={d} />

      <section aria-labelledby="meu-stand" className="mt-12">
        <SectionTitle id="meu-stand">Seu stand</SectionTitle>
        <div className="mt-5">
          <StandCard s={meuStand} d={d} />
        </div>
      </section>

      <section aria-labelledby="podio" className="mt-12">
        <SectionTitle id="podio">Os 3 primeiros</SectionTitle>
        <Podio top3={d.top3} />
      </section>

      <section aria-labelledby="premios" className="mt-12">
        <SectionTitle id="premios">Os prêmios</SectionTitle>
        <Premios />
      </section>

      <section aria-labelledby="regras" className="mt-12">
        <SectionTitle id="regras">Regras gerais</SectionTitle>
        <Regras />
      </section>
    </TdsShell>
  );
}
