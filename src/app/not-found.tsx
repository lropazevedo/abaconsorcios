import SiteLayout from "./(site)/layout";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Página não encontrada"
        title="Essa aba não abriu."
        lede="O endereço pode ter mudado. Mas o caminho continua aqui."
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="light">
            Voltar ao início
          </Button>
          <Button href="/contato/" variant="ghost">
            Fale com a ABA
          </Button>
        </div>
      </PageHero>
    </SiteLayout>
  );
}
