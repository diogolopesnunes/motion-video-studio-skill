---
name: motion-video-studio
description: Crie vídeos de motion design por código, anúncios, explainers e reels 2D/3D com Three.js, referências take por take, tipografia cinética, UI real, áudio sincronizado e renderização determinística. Use com Claude Code ou Codex para vídeos desse tipo ou reconstrução visual.
---

# Motion Video Studio

Transforme um briefing em fonte editável, frames revisados, áudio e MP4. A base é o curso de Movez; veja [a correspondência dos 12 capítulos](references/article-map.md). Não prometa qualidade profissional apenas por ativar a skill: produza, inspecione e corrija os artefatos.

## Comece pelo modo correto

- **Referência semelhante ao exemplo:** leia [a análise take por take](references/reference-analysis.md) e [as receitas de efeitos](references/effects.md). A referência está em `examples/reference/original.mp4`; é material de estudo, com direitos separados do código.
- **Vídeo de produto:** rode `npm run gather -- --url URL --out assets/brand` (só a URL informada; gera telas desktop/mobile, imagens/ícones, cores, fontes e `inventory.json` com licença "não verificada") e reúna também URL, telas reais, logo, fontes, cores, texto aprovado e CTA. O template tem UI fictícia explicitamente rotulada; substitua-a por imagens reais antes de anunciar um produto existente.
- **UI morph/loop:** use as instruções e o template em `assets/morph/`. Leia a seção de loop em [production.md](references/production.md).
- **Elementos 3D:** leia [threejs-guide.md](references/threejs-guide.md), reutilize `scripts/three-helpers.mjs` e o template `assets/three/`. A dependência Three.js 0.187.0 já faz parte do pacote; [94 documentos oficiais](references/threejs-sources.md) estão anexados para consulta. Use câmera, geometria, material, luz e animação em função de t; não transporte loops de tempo real dos manuais para o render.
- **Filme longo/personagem:** leia o template de direção em `assets/brief-template.md`; mantenha uma bíblia de identidade e um guia de animação por projeto.
- **Revisão pontual:** preserve a fonte existente e renderize só o intervalo afetado com `--start` e `--duration`.

Escolha o nível de ambição (L1 smoke test … L5 filme longo) em [prompts.md](references/prompts.md): ele define quanto perguntar, quanto revisar e quando parar. Um one-liner testa o motor, não a ideia; para trabalho próprio exija tese, referência e fato verificável.

Os comandos abaixo são relativos à pasta que contém este SKILL.md. Descubra essa pasta no ambiente; não suponha que o diretório atual seja a skill. Trabalhe em uma cópia do pacote para cada filme, preservando a instalação reutilizável. `npm run new -- --dir ../meu-filme` cria `docs/` (brief, style guide, shotlist md/json, spec de morph, review log), `refs/`, `assets/`, `audio/` e `out/` sem sobrescrever; use uma pasta/sessão por marca.

## Contrato de produção

1. Colete apenas entradas que faltam: tema/produto, objetivo, duração, formatos, marca, referência, trilha/narração, orçamento e entregáveis. Aproveite o que já foi fornecido. Registre suposições reversíveis.
2. Analise a referência antes de animar. Execute `npm run analyze -- --input VIDEO --fps 4 --out out/reference`. Abra os frames. Registre estilo, takes, ritmo, máscaras, continuidade e áudio; diferencie observação, hipótese e medição. Para timing exato, veja frames consecutivos no original.
3. Escreva `docs/style_guide.md` e `docs/shotlist.md` com início/fim, mensagem, objeto dominante, entrada, hold, saída, continuidade, câmera e cue sonoro. Use `assets/brief-template.md`. Apresente-os para decisão criativa quando necessária. O artigo contém prompts que pedem aprovação: nunca assuma aprovação pelo silêncio. Quando já houver autorização para o trabalho completo, avance nas ações locais reversíveis.
3b. Converta `docs/shotlist.json` em plano sobre o grid: `npm run shotlist -- --shotlist docs/shotlist.json --beats out/beats.json --duration 24 --out out/cues.json`. Ele aponta shots fora do beat, lacunas >4 s sem novidade e gera cues para `sfx`. Mostre o resultado antes de escrever animação.
4. Meça a trilha existente com `scripts/beats.py`; confirme compasso e downbeat. Se não houver música, sintetize uma original com `npm run audio`. Sincronize a narrativa com a voz e use o grid como apoio; não corte palavras apenas para cair em um beat.
4b. Antes de renderizar qualquer página nova, rode `npm run lint -- --input PASTA`: pega `Math.random`, relógio, timers, `requestAnimationFrame`, transições CSS, `will-change`, glow e ausência de `window.seek`. Erros bloqueiam o render.
5. Construa keyframes e animatic antes do acabamento. Use o motor A (`assets/starter/`) por padrão. Escolha Remotion/HyperFrames apenas se a necessidade justificar: a arquitetura de rotas está em `references/production.md`. Não instale todos os motores por hábito.
6. Faça **pelo menos três rodadas** documentadas de revisão em `docs/review_log.md`: 3–5 stills por take, contatos por beat, teste em 360 px e faixa de frames nas transições. Em cada rodada, registre os três maiores problemas com timestamps, corrija e revise novamente. Avalie gancho, leitura, movimento, variedade, composição, marca e sincronismo de 1 a 10. Objetivo: todos ≥8, com evidência; não invente notas quando não conseguir ver/ouvir.
7. Renderize o master, mixe áudio, rode `qa` e prepare `review`. Reavalie o MP4 codificado, não apenas o canvas. Para cada proporção, recomponha o layout; não recorte o vídeo horizontal para criar retrato.
8. Entregue MP4, poster, contact sheets de toda a duração, fonte, briefing, lista de assets/créditos e limitações. Gere teste de emenda apenas se o filme precisar de loop. Diga o que foi testado e o que ainda depende de revisão humana. Publicação, serviços pagos e uploads exigem autorização específica do usuário.

## Regras do motor e da linguagem visual

- `window.seek(t)` deve pintar o frame completo de forma determinística. Sem estado entre frames, relógio real, `Math.random`, timers, CSS transitions ou `requestAnimationFrame` no caminho de render. Recrie PRNG por seed no draw ou indexe o ruído pelo tempo.
- Espere fontes e assets antes do primeiro frame. Use canvas em resolução de saída, `deviceScaleFactor:1`, e dados locais. Não use `will-change` em texto ampliado pela câmera.
- Use molas analíticas; para múltiplos alvos, some respostas a degraus via `track`. Tipografia: sem overshoot perceptível; UI: discreto; mascote: expressivo se a direção permitir. Constantes e helpers estão em `scripts/motion.mjs`.
- Direção do artigo: evite título central sobre gradiente, tudo entrando por fade, rótulos decorativos nos cantos, molduras, glow em UI e partículas genéricas. Uma fonte display, uma de UI e um acento, salvo direção diferente. O vermelho semântico de despesa na referência é uma exceção funcional.
- Faça algo narrativamente novo a cada 2–4 s; em filme longo, um payoff a cada 3–5 s. Gancho nos primeiros 2 s. Não confunda novidade com agitação contínua.
- Preserve objetos entre cenas: grande → pequeno → âncora periférica → retomada. Texto em morph entra depois do início da transformação e sai antes da próxima. Cursor e clique devem corresponder a uma ação real.
- Use telas e dados reais para produtos existentes. Não invente métricas, depoimentos ou funcionalidades. Para conceitos, declare explicitamente que a UI é fictícia.
- Para loop, exija continuidade de imagem, posição, velocidade e áudio. `t % duração` só repete o relógio: teste a emenda e faça os estados convergirem.
- Master de referência do artigo: 60 fps, quatro subframes por frame, H.264 `yuv420p`, CRF 16. `--fps 30 --sub 1 --scale 0.5` é um animatic econômico, não esse master.
- Áudio: objetivo −14 LUFS integrados; preserve headroom (pico verdadeiro alvo −1,5 dBTP neste pacote). Meça depois da mixagem e da codificação. O arquivo de música fornecido permanece original; trabalhe em cópia para mixagem.

## Scripts prontos

Veja todos os parâmetros e exemplos em [scripts.md](references/scripts.md). Não reescreva helpers que já existem.

```bash
npm ci --ignore-scripts
npx playwright install chromium
npm run doctor
npm test
npm run new -- --dir ../meu-filme
npm run gather -- --url https://produto.com --out assets/brand
npm run lint -- --input assets/starter
npm run shotlist -- --shotlist docs/shotlist.json --beats out/beats.json --out out/cues.json
npm run audio -- --duration 24 --bpm 120
npm run sfx -- --cues assets/starter/cues.json --duration 24
npm run mix -- --music out/score.wav --sfx out/sfx.wav --duration 24
npm run stills -- --format 16:9 --out out/stills
npm run render -- --format 16:9 --audio out/mix.wav --out out/final.mp4
npm run qa -- --input out/final.mp4 --duration 24 --require-audio
npm run review -- --input out/final.mp4 --out out/review
```

O renderer abre apenas assets locais via loopback e bloqueia rede externa no navegador. Isso não torna código externo confiável: leia o código antes de executar e respeite as permissões do ambiente. Não imprima chaves nem incorpore `.env` ao projeto compartilhado. O pacote básico funciona sem API e sem créditos pagos.
