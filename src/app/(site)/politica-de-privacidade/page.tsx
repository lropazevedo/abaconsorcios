import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a ABA Consórcios trata os seus dados pessoais, em conformidade com a LGPD.",
  alternates: { canonical: "/politica-de-privacidade/" },
};

export default function PrivacidadePage() {
  return (
    <LegalPage title="Política de Privacidade" updated="outubro de 2026">
      <p>
        Esta política explica como a {site.legal.razaoSocial || site.name}
        {site.legal.cnpj && <> (CNPJ {site.legal.cnpj})</>} trata dados pessoais de quem visita este site ou fala com a
        nossa equipe, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
      </p>

      <h2>1. Quais dados coletamos</h2>
      <ul>
        <li>Dados que você nos envia ao entrar em contato: nome, telefone, e-mail e o assunto da conversa.</li>
        <li>Dados de navegação, como páginas visitadas e tipo de dispositivo, de forma agregada.</li>
      </ul>

      <h2>2. Para que usamos</h2>
      <ul>
        <li>Responder ao seu contato e prestar o atendimento que você pediu.</li>
        <li>Apresentar informações sobre produtos de consórcio, quando você solicitar.</li>
        <li>Cumprir obrigações legais e regulatórias.</li>
        <li>Melhorar o site e a experiência de atendimento.</li>
      </ul>

      <h2>3. Com quem compartilhamos</h2>
      <p>
        Compartilhamos dados apenas quando necessário para o atendimento, como com a administradora do consórcio no
        momento de uma proposta, ou quando exigido por lei. Não vendemos dados pessoais.
      </p>

      <h2>4. Por quanto tempo guardamos</h2>
      <p>Pelo tempo necessário para a finalidade do atendimento ou pelo prazo exigido em lei.</p>

      <h2>5. Seus direitos</h2>
      <p>
        Você pode pedir a confirmação, o acesso, a correção, a portabilidade ou a exclusão dos seus dados, além de
        revogar consentimentos. Para isso, fale com a gente pelos canais da página de{" "}
        <Link href="/contato/">Contato</Link>.
      </p>

      <h2>6. Cookies</h2>
      <p>
        Este site não usa cookies de publicidade. Caso ferramentas de medição sejam adicionadas no futuro, esta política
        será atualizada.
      </p>

      <h2>7. Alterações</h2>
      <p>Esta política pode ser atualizada. A data no topo indica a versão mais recente.</p>
    </LegalPage>
  );
}
