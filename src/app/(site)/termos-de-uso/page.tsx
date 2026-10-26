import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { coBrandingNote } from "@/data/brands";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de uso do site institucional da ABA Consórcios.",
  alternates: { canonical: "/termos-de-uso/" },
};

export default function TermosPage() {
  return (
    <LegalPage title="Termos de Uso" updated="outubro de 2026">
      <p>
        Ao acessar {site.domain}, você concorda com estes termos. Se não concordar, recomendamos não utilizar o site.
      </p>

      <h2>1. Finalidade do site</h2>
      <p>
        Este é o site institucional da {site.name}. O conteúdo tem caráter informativo e não constitui oferta, proposta
        ou contrato. As condições de cada plano de consórcio são apresentadas no atendimento e constam no contrato da
        administradora.
      </p>

      <h2>2. Contemplação</h2>
      <p>
        A contemplação acontece por sorteio ou lance, conforme as regras de cada grupo. A ABA não promete prazo de
        contemplação. Qualquer estimativa apresentada no atendimento é uma referência, não uma garantia.
      </p>

      <h2>3. Marcas</h2>
      <p>{coBrandingNote}</p>
      <p>A marca, o logotipo e os materiais da ABA Consórcios são protegidos e não podem ser usados sem autorização.</p>

      <h2>4. Imagens</h2>
      <p>
        As fotografias publicadas mostram a equipe, os pontos de venda e clientes reais da ABA, usadas com autorização.
        Não é permitida a reprodução sem consentimento.
      </p>

      <h2>5. Links externos</h2>
      <p>
        O site pode conter links para outros sites, como redes sociais. A ABA não se responsabiliza pelo conteúdo deles.
      </p>

      <h2>6. Privacidade</h2>
      <p>
        O tratamento de dados pessoais segue a nossa{" "}
        <Link href="/politica-de-privacidade/">Política de Privacidade</Link>.
      </p>

      <h2>7. Contato</h2>
      <p>
        Dúvidas sobre estes termos podem ser enviadas pelos canais da página de <Link href="/contato/">Contato</Link>.
      </p>
    </LegalPage>
  );
}
