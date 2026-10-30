# Base e rastreabilidade do artigo

Fonte principal: [Movez — How to build motion design studio with Opus 5.5](https://x.com/0xMovez/status/2104216919033192746), publicação indicada como 27/09/2026. Conferência em 30/10/2026 no Chrome autenticado, na captura PNG e no PDF fornecidos pelo usuário. O PDF é rasterizado (uma página sem texto extraível). A captura foi dividida em 20 segmentos para leitura visual. Os **17 blocos `<pre>` completos** foram lidos no DOM do artigo para recuperar também as linhas cortadas pelas barras horizontais da captura. A contagem foi confirmada diretamente com `document.querySelectorAll('pre').length`.

Este pacote é uma implementação própria do método, com adaptação para Windows, Claude Code e Codex. Não inclui cópia integral do artigo, dos prompts nem dos repositórios de terceiros. Não afirma afiliação com Movez, Anthropic ou OpenAI. Nomes de modelos, estimativas de custo, alcance e relatos de “one shot” pertencem ao artigo; não são garantia nem requisito desta skill.

| Capítulo | Decisão aplicada | Recurso concreto |
|---|---|---|
| 01 Pixels | Separar autoria do programa e render dos frames; tempo explícito | `window.seek(t)`, `render.mjs` e testes de pixels |
| 02 Setup | Node 22+, FFmpeg, Chromium; regras persistentes; Python para áudio | `package-lock.json`, `doctor.mjs`, `requirements-audio.txt`, instalação em ambos os agentes |
| 03 One-liner | Prompt curto serve de smoke test; filme precisa de ideia e direção | starter demonstrativo e brief com mensagem/gancho/payoff |
| 04 Brand | Usar assets reais, uma sessão/projeto por marca, música e CTA | inventário de assets, carregamento de screenshot local, regra contra UI inventada |
| 05 Reference | Analisar frames antes de criar; extrair a gramática visual | `analyze.mjs`, análise de 45 s e receitas de efeitos |
| 06 Spec | Estados e transições explícitos; morph preserva o container | template UI morph, `track`, `swapAlpha`, `indicator`, beat sheet |
| 07 Engine | Browser → PNG por tempo → pipe → FFmpeg; fontes carregadas | `render.mjs`, 60 fps, `--sub 4`, `tmix` + seleção de frames |
| 08 Springs | Mola analítica e soma de mudanças de alvo | `motion.mjs`, três regimes de amortecimento e testes de continuidade |
| 09 Sound | Medir música fornecida ou sintetizar; SFX por cues | `beats.py`, `audio.mjs`, `sfx.mjs`, `mix.mjs` em duas passagens |
| 10 Overnight | Brief de direção, identidade, animatic e gates | `assets/brief-template.md`, plano de produção; APIs só quando solicitadas |
| 11 Critique | Ver os frames, corrigir três problemas, repetir ≥3 rodadas | `review.mjs`, template de review log, teste 360 px, strips, QA técnico separado |
| 12 Ship | Uma timeline com layouts por formato; empacotar workflow | três proporções, `install.mjs`, README, exemplos, fonte e entregáveis |

## Conferência dos códigos e adaptações

Os 17 blocos contemplam: setup; regras de estúdio; prompt mínimo; variantes de showreel; briefing de marca; estudo de referência; spec XML de morph; HTML/canvas; renderer; rotas Remotion/HyperFrames; biblioteca de movimento; extração de beats; SFX; direção de filme; comandos de revisão; prompt de crítica; empacotamento de skill.

- **Mola:** o snippet do artigo trata todo ζ≥1 como crítico. A implementação distingue subamortecido, crítico e superamortecido. `springKD` oferece a parametrização rigidez/amortecimento usada no artigo, convertida para frequência/razão de amortecimento.
- **Estado:** o gerador com seed é reinicializado no draw; chamar um PRNG global conforme a ordem de frames quebraria seek aleatório.
- **Blur:** os subframes são renderizados a `fps × sub`, misturados em grupos e reduzidos ao fps final. `sub=1` desliga essa etapa. O blur temporal do frame cruza mudanças abruptas: reveja a faixa de frames nas fronteiras.
- **Falhas:** a implementação valida argumentos, espera o encoder, reporta exit code, fecha recursos e não sobrescreve resultados existentes automaticamente.
- **Grid:** `beats[::4]` não descobre downbeat nem compasso; a implementação usa candidatos em 4/4 e requer confirmação do primeiro tempo.
- **Contact sheet:** `tile=6x5` com `-frames:v 1` a 2 fps cobre só 15 s. `review.mjs` produz páginas para toda a duração, incluindo o fim.
- **Determinismo:** hash do MP4 inteiro pode mudar com metadata/encoder. Os testes comparam PNGs dos mesmos timestamps após seeks fora de ordem.
- **Loop:** módulo no tempo não torna estados finais iguais aos iniciais. O template retorna ao primeiro estado com hold e teste de seam; o anúncio demonstrativo não é declarado como loop.
- **Aprovação:** prompts do artigo alternam “aguarde OK” e “continue após dez minutos”. Não convertemos silêncio em aprovação; seguimos a autorização real do usuário.
- **Delegação:** subagentes são uma opção para filmes por capítulos quando autorizados e disponíveis. A skill funciona com um agente, sem exigir serviços ou times adicionais.
- **Rotas opcionais:** Remotion, HyperFrames, Node canvas/p5 e geração externa são alternativas de produção. Não são dependências cumulativas. Instalar plugins de terceiros sem necessidade ampliaria custo e manutenção sem melhorar o motor A.

## Fontes técnicas consultadas

- [Playwright: Page e screenshots](https://playwright.dev/docs/api/class-page)
- [Claude Code: skills](https://code.claude.com/docs/en/skills)
- [OpenAI: skills](https://developers.openai.com/codex/skills)
- [FFmpeg: tmix, loudnorm e amix](https://ffmpeg.org/ffmpeg-filters.html)
- [librosa: beat_track](https://librosa.org/doc/latest/generated/librosa.beat.beat_track.html)

Repositórios apontados pelo artigo, para consulta conforme a rota: [PDoomVideo](https://github.com/JohnHeibel/PDoomVideo), [ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase), [claude-animation-skill](https://github.com/buildwithhanif/claude-animation-skill), [HyperFrames](https://github.com/heygen-com/hyperframes), [Remotion skills](https://www.remotion.dev/docs/ai/skills), [Battle of Austerlitz](https://github.com/WinterArc21/Battle-of-Austerlitz-Film), [awesome-ai-motion](https://github.com/guanmo-ai/awesome-ai-motion), [awesome-opus videos](https://github.com/athemeroy/awesome-opus-5-5-videos). Consulte licença e documentação atual antes de incorporar código ou assets. Nenhum desses projetos foi copiado como dependência do pacote.
