# ABA Consórcios · Site institucional

Site institucional oficial da ABA Consórcios. Objetivo: responder em poucos segundos à pergunta
**"essa empresa é séria e posso confiar nela?"** para quem conheceu a ABA num stand de shopping.

- Next.js 15 (App Router) + TypeScript + Tailwind CSS 4
- Publicado na Vercel como app Next.js (necessário para o login da área /trimestredossonhos)
- Sem Framer Motion: as animações são CSS + IntersectionObserver (mais leve, melhor Core Web Vitals)
- Fonte Inter (auto-hospedada pelo `next/font`), paleta oficial do Brand Manual

---

## 1. Instalar, rodar e publicar

Pré-requisito: Node.js 20 ou superior.

```bash
npm install        # instala as dependências
npm run dev        # ambiente de desenvolvimento em http://localhost:3000
npm run build      # otimiza as imagens e gera a versão de produção
npm run preview    # roda a versão de produção em http://localhost:4173
```

**Publicar:** cada `git push` no branch `main` publica o site na Vercel automaticamente.
No Windows/PowerShell, use `npm.cmd` no lugar de `npm` se aparecer erro de "execução de scripts".

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

## 9. Trimestre dos Sonhos (área interna)

Página gamificada em `/trimestredossonhos`, só para colaboradores.

- **Colaborador** (13 logins): vê só o próprio resultado (barra com foguinho, os 103 quadrados e a média do iPhone),
  o total do seu stand e os 3 primeiros colocados.
- **Gestor** (login `gestor`): cadastra cada venda em `/trimestredossonhos/gestor`, exclui lançamentos e vê todos.

### Logins e senhas
Ficam fora do código, em três variáveis de ambiente (Vercel → **Settings → Environment Variables**):

| Variável | Formato |
| --- | --- |
| `TRIMESTRE_USUARIOS` | `login:senha;login:senha;...` (todos os 14) |
| `TRIMESTRE_ADMINS` | `gestor` (logins que cadastram vendas, separados por vírgula) |
| `TRIMESTRE_SEGREDO` | texto longo e aleatório (assina as sessões) |

A lista com as senhas está no arquivo `logins-trimestre-dos-sonhos.txt`, na pasta acima de `site/` (fora do GitHub).
Para trocar a senha de alguém, edite `TRIMESTRE_USUARIOS` na Vercel e faça um novo deploy: só aquela pessoa precisa entrar de novo.
Para incluir alguém, adicione `login:senha` em `TRIMESTRE_USUARIOS` e a pessoa em `src/data/trimestre.ts` com o mesmo `login`.

### Banco de vendas (obrigatório na Vercel)
As vendas cadastradas pelo gestor ficam num banco Upstash Redis (plano gratuito basta):

1. Na Vercel, abra o projeto → **Storage** → **Create Database** (ou **Marketplace**) → **Upstash for Redis**.
2. Escolha o plano gratuito e conecte ao projeto. A Vercel cria sozinha `KV_REST_API_URL` e `KV_REST_API_TOKEN`.
3. Faça um novo deploy.

Sem o banco, a página do gestor mostra um aviso e não salva vendas. No computador (`npm.cmd run dev` ou `preview`),
as vendas ficam em `.data/vendas.json`, que não vai para o GitHub.

### Como as contas funcionam
- Produção de cada pessoa = `inicial` (registrado até 26/10/2026, em `src/data/trimestre.ts`) + vendas cadastradas.
- **Venda cancelada:** exclua o lançamento ou cadastre um ajuste marcando "tirar valor".
- **Média do iPhone hoje** = R$ 3,8 mi × dias decorridos ÷ 103.
- **Quadrados:** cada um vale R$ 3,8 mi ÷ 103 (cerca de R$ 36,9 mil). Os com contorno são os dias que já passaram.
- Metas, período e regras: `src/data/trimestre.ts` (`campanha`, `metas`, `stands`, `regras`).

### Fotos dos colaboradores
Ficam em `public/trimestredossonhos/avatares/` (um arquivo por pessoa com o nome do login, ex.: `paula.webp`, quadrado e centrado no rosto).
Para ligar a foto à pessoa, preencha `foto: "paula"` em `src/data/trimestre.ts`. Sem foto, aparecem as iniciais.
Os originais estão em `assets-src/trimestre/`. Fotos, logo e imagens dos prêmios só abrem com login.

## 10. Estrutura

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
