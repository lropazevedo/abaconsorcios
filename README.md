# ABA Consórcios · Site institucional

Site institucional oficial da ABA Consórcios. Objetivo: responder em poucos segundos à pergunta
**"essa empresa é séria e posso confiar nela?"** para quem conheceu a ABA num stand de shopping.

- Next.js 15 (App Router) + TypeScript + Tailwind CSS 4
- Export estático: o build gera a pasta `out/`, que roda em qualquer hospedagem (HostGator, Vercel, Netlify...)
- Sem Framer Motion: as animações são CSS + IntersectionObserver (mais leve, melhor Core Web Vitals)
- Fonte Inter (auto-hospedada pelo `next/font`), paleta oficial do Brand Manual

---

## 1. Instalar, rodar e publicar

Pré-requisito: Node.js 20 ou superior.

```bash
npm install        # instala as dependências
npm run dev        # ambiente de desenvolvimento em http://localhost:3000
npm run build      # otimiza as imagens e gera o site final em out/
npm run preview    # serve a pasta out/ em http://localhost:4173 para conferir o build
```

**Publicar:** envie todo o conteúdo da pasta `out/` para a raiz do domínio (na HostGator, `public_html/`).
O site usa URLs com barra no final (`/quem-somos/`), então cada página vira uma pasta com `index.html`.

### Modo desenvolvimento x site publicado

Em `npm run dev`, aparecem caixas tracejadas **PENDENTE** apontando conteúdo que falta
(WhatsApp, CNPJ, horários, fotos, cargos) e exemplos de depoimentos marcados como placeholder.
**Nada disso aparece no build final.** Unidades marcadas com `pending: true` também ficam ocultas no site publicado.

---

## 2. Onde alterar cada coisa

| O que | Arquivo |
| --- | --- |
| Textos de todas as seções | `src/data/content.ts` |
| WhatsApp, e-mail, telefone, Instagram, razão social, CNPJ | `src/data/site.ts` |
| Diretoria, times dos stands e foto da equipe | `src/data/team.ts` (`team`, `standTeams`, `teamGroupPhoto`) |
| Unidades / stands | `src/data/units.ts` |
| Depoimentos e fotos de conquistas | `src/data/testimonials.ts` |
| Marcas parceiras e texto de co-branding | `src/data/brands.ts` |
| Menu | `src/data/navigation.ts` |
| Cores, fontes e animações | `src/styles/globals.css` |
| SEO (title, description, Open Graph) | `src/app/layout.tsx` e `metadata` de cada página |
| Dados estruturados (schema.org) | `src/components/JsonLd.tsx` |
| Sitemap e robots | `src/app/sitemap.ts`, `src/app/robots.ts` |

### WhatsApp
Em `src/data/site.ts`, preencha `whatsapp` só com dígitos, com DDI e DDD: `"5581999999999"`.
O botão de WhatsApp passa a aparecer no rodapé e na página de Contato automaticamente.

### Redes sociais
`site.social` em `src/data/site.ts`. O Instagram já está configurado como `@abaconsorcios`.

### Frase de presença
A frase "Estamos no coração de Pernambuco 🩵" fica em `scale.claim` (`src/data/content.ts`).
Não afirme "a maior operação de Pernambuco" sem documento que comprove.

---

## 3. Fotos

As fotos originais ficam em `assets-src/fotos/` (nunca em `public/`). O script
`scripts/optimize-images.mjs` gera versões WebP em 3 tamanhos em `public/images/` e
um índice em `src/data/images.generated.json`. Ele roda sozinho antes de cada build;
para rodar manualmente: `npm run images`.

**Trocar uma foto:** substitua o arquivo em `assets-src/fotos/` mantendo o mesmo nome,
apague as versões antigas em `public/images/<nome>-*.webp` e rode `npm run images`.

**Adicionar uma foto:** coloque em `assets-src/fotos/novo-nome.jpg`, rode `npm run images`
e use `novo-nome` no arquivo de dados correspondente (campo `photo`).

Enquadramento: o campo `focus` (ex.: `"50% 30%"`) define qual parte da foto fica visível nos cortes.

### Mapa de fotos atual

| Área | Foto |
| --- | --- |
| Hero | `stand-jeep-lideranca` |
| Credibilidade (faixa) | `stand-jeep-selfie`, `atendimento-fiat`, `equipe-treinamento` |
| Equipe (Home) | `equipe-jeep-guararapes` + retratos |
| Pós-venda | `entrega-citroen-casal` |
| Marcas | `entrega-fiat-usaflex` (Fiat), `stand-jeep-equipe` (Jeep), `entrega-citroen-cliente` (Citroën) |
| Unidade Tacaruna | `stand-jeep-equipe` |
| Unidade Guararapes | `equipe-jeep-guararapes-4` |
| Conquistas | `entrega-fiat-cliente`, `entrega-citroen-selfie`, `entrega-fiat-selfie` |
| Diretoria | `equipe-atila`, `equipe-matheus`, `equipe-raquel` |
| Times dos stands | `time-jeep-tacaruna`, `time-fiat-tacaruna`, `equipe-jeep-guararapes`, `time-citroen-guararapes` |
| Open Graph | `public/og.jpg` (gerada a partir de `stand-jeep-lideranca`; apague o arquivo para regerar) |

### Fotos que ainda faltam

1. **Retratos individuais** de gestores, consultores e pós-venda para a página Nossa Equipe.
2. **Fotos dos stands Fiat (Tacaruna) e Citroën (Guararapes)**, para dar a cada unidade uma foto própria.
3. **Foto horizontal do stand com a marca ABA visível** (o Brand Manual recomenda incluir a assinatura ABA no ponto de venda). Ela pode substituir o hero no futuro.

> **Autorização de imagem:** pelo Brand Manual (cap. X), publique fotos de clientes somente com
> autorização de uso de imagem assinada, obrigatória quando houver menores. A foto da família com
> duas crianças foi retirada do site por não ter autorização. As demais fotos de entrega têm autorização.

---

## 4. Cadastrar unidade

Em `src/data/units.ts`, copie um bloco e preencha `name`, `mall`, `city`, `state`, `address`,
`brands`, `photo`, `hours` e `mapsUrl` (link do Google Maps). Remova `pending: true` quando os dados
estiverem confirmados. A unidade aparece na Home, em `/onde-estamos/`, no Contato e no rodapé.

## 5. Cadastrar pessoa da equipe

Em `src/data/team.ts`, copie um bloco. `group` define a seção em `/nossa-equipe/`
(`lideranca`, `gestao`, `comercial`, `pos-venda`). A Home mostra os dois primeiros da liderança.

## 6. Depoimentos

Em `src/data/testimonials.ts`, adicione itens reais em `testimonials`. Enquanto a lista estiver
vazia, o bloco de depoimentos não aparece no site publicado. Nunca publique depoimentos fictícios.

## 7. Logos

- ABA: arquivos oficiais do Kit de Marca em `public/brand/` (nunca recriar).
- Fiat, Jeep, Citroën, Stellantis: originais em `assets-src/logos/`. O script só recorta a margem vazia
  e redimensiona para `public/logos/`, sem alterar cor ou desenho. Para trocar, substitua o arquivo
  em `assets-src/logos/` com o mesmo nome e rode `npm run images`.
- Texto jurídico de co-branding: `coBrandingNote` em `src/data/brands.ts`. Usa a expressão validada no
  Brand Manual ("atuação comercial autorizada com produtos do ecossistema Stellantis") e deixa claro
  que a ABA não pertence à Stellantis.

---

## 8. Antes de publicar (checklist)

- [x] E-mail, razão social e CNPJ em `src/data/site.ts` (WhatsApp e telefone ficam de fora por decisão da ABA)
- [x] Diretoria cadastrada em `src/data/team.ts` (sem card ou menção individual ao fundador, por decisão da ABA)
- [x] Unidades Tacaruna e Guararapes com endereço e horário
- [x] Autorizações de uso de imagem confirmadas (foto sem autorização removida)
- [ ] Revisão jurídica da Política de Privacidade e dos Termos de Uso
- [ ] Domínio final conferido em `site.url` (usado em sitemap, Open Graph e schema)

## 9. Estrutura

```
src/
  app/            páginas (App Router), sitemap, robots, manifest
  components/     componentes reutilizáveis (Header, Footer, Photo, cards, AbaTabs...)
  sections/       seções da Home, reutilizadas nas páginas internas
  data/           todo o conteúdo editável
  styles/         globals.css com os tokens da marca
assets-src/       fotos e logos originais (fora do site publicado)
scripts/          otimização de imagens
public/           arquivos servidos como estão (marca, logos, ícones, imagens otimizadas)
```
