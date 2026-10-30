# Biblioteca de pedidos e níveis de esforço

Padrões do artigo reescritos como instruções para o agente. Servem para escolher o **nível de ambição** do trabalho e para saber o que perguntar. O prompt é ~10% do vídeo; os outros 90% são motor, referência, som e revisão visual (`SKILL.md`).

## Níveis (escolha antes de começar)

| Nível | Quando | O que entrega | Fluxo mínimo |
|---|---|---|---|
| L1 Showreel/teste do motor | Validar instalação ou fazer um clipe curto sem marca | 10–15 s, sem ideia própria | starter → `lint` → `stills` → render → `qa` |
| L2 Marca/produto | Há URL, logo, telas, CTA | 15–40 s, 9:16 primeiro, depois 1:1 e 16:9 | `gather` → style guide → shotlist no grid → animatic → ≥3 revisões |
| L3 Referência | Há vídeo/frame/galeria a imitar na gramática | Estilo nomeado e medido | `analyze` → style guide/shotlist → aprovação → build |
| L4 Spec de UI morph | Um objeto muda de estado, cursor real, loop | 15–30 s com loop testado | `assets/templates/morph-spec.md` → estados no grid → `assets/morph/` |
| L5 Filme longo (brief de diretor) | Música, narrativa ou personagem, várias sessões | 1–3 min em capítulos | `assets/brief-template.md`, ANIMATION_GUIDE, gates, subagentes só se autorizados |

Esforço do agente: baixo/médio para correções e re-renders de trechos; alto para filmes novos; máximo quando os primeiros 3 s precisam carregar um lançamento. Um one-liner testa o motor, nunca a ideia.

## Contágio de brief

Prompts virais idênticos produzem vídeos que rimam entre si. Use o one-liner só como smoke test. Para algo próprio, acrescente: tese, referência nomeada, restrições de marca, o que é proibido e um fato verificável. "Mostre suas limitações criativas reais" não é direção.

## 1. Smoke test (L1)

> Faça um motion de 15 s, vertical, que funcione como showreel de motion designer. Sem rótulos ou texto nos cantos, sem molduras, sem título centralizado em gradiente, sem tudo entrando por fade. Se precisar de música, sintetize em código e sincronize os cortes.

Variações úteis: duração maior com trilha original e cortes no beat; "evite os sinais típicos de vídeo feito por IA" como guarda-corpo. Rode `npm run lint` e revise stills antes do render.

## 2. Marca/produto (L2)

Pergunte só o que falta: URL do produto, duração, formatos, cores/fontes, métrica real a mostrar, CTA, música (arquivo ou sintetizar), referência. Depois:

1. `npm run gather -- --url URL --out assets/brand` e liste o inventário com o usuário.
2. Use telas, logo e dados reais; marque como fictício o que for conceito.
3. Estrutura típica de 20 s: gancho de 5 palavras em tipografia enorme → produto monta a UI peça por peça → três funcionalidades com ações reais do cursor → um número que prova → lockup + CTA.
4. Música original ~120 BPM; cliques e whooshes nas batidas medidas.
5. Primeiro 9:16, depois 1:1 e 16:9 da mesma timeline, com layout recomposto.
6. Antes do render completo, mostre a contact sheet de um frame por beat.

Mantenha uma sessão/pasta por marca (`npm run new -- --dir ../marca`): renderer, síntese e exportação já existem na segunda peça.

## 3. Referência (L3)

Anexe um frame ou vídeo e diga **o que levar** (paleta, tipo, ritmo, grão, transições) e **o que não levar** (assunto, logos, personagens). Para vídeo: extraia frames, descreva takes com início/fim, duração, transição, câmera, textura e entrada/saída de texto; escreva `docs/style_guide.md` e `docs/shotlist.md`; mostre ambos e aguarde aprovação antes de código. Deixe a técnica a cargo do agente; especifique o visual e as restrições, não a biblioteca, salvo necessidade de reuso. Uma galeria sua é uma referência que ninguém mais tem.

## 4. Spec de UI morph (L4)

Use `assets/templates/morph-spec.md`: inputs, direção, estrutura de estados, regras de build e armadilhas. Regra central: um container nunca corta; texto troca depois do início do morph e sai antes do próximo; último frame igual ao primeiro, cursor incluído.

## 5. Brief de diretor (L5)

Contrato mental: você contrata uma equipe. O brief tem filme em uma linha (logline), referências (o que manter e o que ampliar), ferramentas/chaves (somente nomes de variáveis) e orçamento, look com proibições, beat sheet com payoff a cada 3–5 s e último frame que prepara o primeiro, fluxo com gates, laço de crítica por shot e entregáveis. Escreva primeiro style_guide, shotlist e ANIMATION_GUIDE; depois stills → animatic 960×540 → animação → som → render. O padrão "gerar e traçar" (vídeo gerado como base e redesenho em código) só com autorização, orçamento e direitos; a skill não o faz por conta própria. Chaves ficam em `.env` local e nunca no prompt, log ou commit.

## 6. Crítica obrigatória (todos os níveis)

Renderize, **olhe** as folhas (`npm run review`), pontue gancho 2 s, leitura a 360 px, movimento, variedade (algo novo a cada 2–4 s), composição, marca e sincronismo. Liste os três piores problemas com timestamps; caçe: texto sobreposto em trocas, deslizes sem easing, rótulos/molduras, centralizado em gradiente, texto borrado por escala, beat morto, soluço na emenda. Corrija, re-renderize só os segundos afetados (`--start/--duration`) e repita. Registre em `docs/review_log.md`. Iteração é o método: filmes de qualidade tiveram dezenas de rodadas, não um disparo.

## 7. Empacotar e vender

Esta skill é o pacote: `npm run install:skills` instala em Claude Code e Codex. Para entregar a clientes, combine L2 + três formatos + número fixo de rodadas de edição, esclarecendo direitos dos assets. Preços e prazos citados no artigo são relatos dele, não promessa desta skill.
