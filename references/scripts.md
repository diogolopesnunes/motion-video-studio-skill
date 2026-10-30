# Scripts e parâmetros

Execute na raiz do pacote (pasta com `package.json`). Caminhos relativos de entrada/saída são resolvidos a partir do diretório atual, exceto `--page`, relativo à raiz da skill. Resultados existentes não são sobrescritos pelos comandos FFmpeg; escolha outra pasta/nome. Todos os comandos rodam localmente, sem provedor pago obrigatório.

## Dependências

```bash
npm ci --ignore-scripts
npx playwright install chromium
npm run doctor
npm test
```

Node 22+; Playwright 1.64.1 e Three.js 0.187.0 travados em package-lock; FFmpeg/FFprobe no PATH (ou variáveis `FFMPEG` e `FFPROBE`). Python 3.11+ apenas para análise de beats. Instale um ambiente virtual e as dependências com `requirements-audio.txt`.

## analyze.mjs — decupagem assistida

```bash
npm run analyze -- --input examples/reference/original.mp4 --fps 4 --out out/reference
```

`--input` obrigatório, `--fps` 0,1..12 (default 4), `--out`. Produz JPGs numerados, metadados sem caminho pessoal, `frames.json` com tempos nominais e galeria HTML. Abra a galeria ou os frames com a ferramenta visual do agente. Não identifica os takes automaticamente: a segmentação/editorial depende de inspeção. Uma amostra a 4 fps localiza ações em passos de 0,25 s; não é frame accuracy.

## render.mjs — vídeo ou stills

```bash
npm run stills -- --format 16:9 --times 1.5,3.8,6.8,11.6,14.8,18.8,23.8 --out out/stills
npm run render -- --format 16:9 --duration 24 --fps 60 --sub 4 --audio out/mix.wav --out out/master.mp4
npm run render -- --format 9:16 --scale 0.5 --fps 30 --sub 1 --out out/animatic.mp4
npm run render -- --start 8 --duration 2 --fps 30 --sub 4 --out out/fix-8-10.mp4
npm run render -- --page assets/morph/index.html --duration 16 --format 1:1 --out out/morph.mp4
```

| Flag | Padrão / efeito |
|---|---|
| `--page` | `assets/starter/index.html`; precisa estar dentro do pacote |
| `--config` | JSON de configuração, como `assets/starter/brief.example.json` |
| `--format` | `16:9`; também `9:16`, `1:1` |
| `--scale` | 1; dimensões arredondadas para múltiplos de 2 |
| `--fps` | 60; inteiro 1..60 |
| `--sub` | 4; inteiro 1..8, amostras temporais por frame |
| `--duration` | 24 s, intervalo 0,1..600 |
| `--start` | 0 s; desloca timeline e trecho correspondente do áudio |
| `--audio` | WAV/áudio opcional; ausência produz vídeo silencioso |
| `--out` | `out/demo-16x9.mp4` ou pasta de stills |
| `--stills` | Gera PNGs, sem FFmpeg/áudio |
| `--times` | CSV de timestamps absolutos para stills; precisam ser menores que `--duration` |

A composição deve expor `window.seek(t)` e pode expor `window.ready` (Promise) e `window.configure(config)` assíncrono. Fontes e imagens precisam estar prontas antes do render. Os argumentos width/height calculados pelo motor não podem ser sobrescritos pelo JSON. O starter aceita `brand`, `green`, `black`, `red`, `background` e `screen` (URL local como `/assets/starter/screen.png`). A imagem é aguardada com `decode()`.

## motion.mjs — biblioteca importável

`spring(t,{frequency,damping})` usa Hz e razão de amortecimento; `springKD(t,k,d)` converte massa unitária/rigidez/amortecimento do artigo. `track(t,initial,changes,options)` soma degraus em ordem temporal. `indicator`, `swapAlpha`, `loopTime`, `seeded`, `progress`, `clamp`, `lerp`, `money`, `beatTime` completam as operações comuns. `loopTime` só repete o relógio; continuidade precisa ser construída.

## beats.py — música fornecida

PowerShell:

```powershell
py -3.11 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements-audio.txt
.\.venv\Scripts\python.exe scripts/beats.py out/score.wav --out out/beats.json
```

Linux/macOS: `python3 -m venv .venv`, depois `.venv/bin/python -m pip install -r requirements-audio.txt` e `.venv/bin/python scripts/beats.py ...`. Se o Python Launcher não encontrar 3.11, use o caminho de um intérprete instalado compatível. Não é necessário ativar o ambiente.

Saída: bpm estimado, beats, hits, candidatos a downbeats e aviso de confirmação. `--downbeat-offset 0..3` registra uma confirmação humana do primeiro tempo. Nunca faça essa confirmação automaticamente só para remover o aviso.

## Música e SFX

```bash
npm run audio -- --duration 24 --bpm 120 --out out/score.wav
npm run sfx -- --cues assets/starter/cues.json --duration 24 --out out/sfx.wav
```

Música: PCM mono 16-bit/48 kHz, seed fixa, kick/bass/hat/accent; guia original de produção. SFX: array de objetos `{"t":0.5,"type":"click"}`; tipos `click`, `pop`, `thump`, `whoosh`; tempos em segundos da mesma timeline. Sem voz, clonagem ou chamadas externas.

## Mixagem em duas passagens

```bash
npm run mix -- --music out/score.wav --sfx out/sfx.wav --duration 24 --out out/mix.wav
npm run mix -- --music out/score.wav --sfx out/sfx.wav --voice audio/locucao.wav --duration 24 --out out/mix-voz.wav
```

SFX e voz são opcionais, música obrigatória. Com voz, a cama recebe atenuação fixa; não há sidechain automático. O mixer comprime transientes, mede loudness antes de normalizar em duas passagens e usa estágio final de segurança. Almeja −14 LUFS e pico de entrega ≤−1,5 dBTP, com −3,5 dBTP de headroom interno para resample/AAC; salva `*.measurement.json`. Meça o resultado com `qa --check-loudness`. Uma mixagem não substitui revisão de pronúncia, dinâmica e mascaramento da voz.

## QA técnico e materiais para revisão

Para trocar o áudio sem renderizar novamente os frames:

```bash
npm run mux -- --video out/master.mp4 --audio out/mix.wav --out out/final-audio.mp4
```

`--start` desloca apenas a entrada de áudio (útil em trechos de prova), `--duration` usa a duração do vídeo por padrão. O vídeo é copiado sem recompressão, o áudio é AAC 192 kb/s. Rode QA novamente no arquivo resultante.

```bash
npm run qa -- --input out/master.mp4 --duration 24 --width 1920 --height 1080 --require-audio --out out/qa.json
npm run review -- --input out/master.mp4 --at 8.1 --out out/review
npm run review -- --input out/morph.mp4 --loop --out out/review-loop
```

QA: FFprobe, H.264/yuv420p, dimensões solicitadas, duração ±0,1 s, presença de áudio quando exigida, duração de áudio/vídeo e decodificação integral com FFmpeg. Mede loudness quando há áudio; `--check-loudness` também exige −14±0,8 LUFS e pico verdadeiro ≤−1 dBTP no arquivo codificado. Retorna exit code não zero em erro. Não avalia estética.

Review: contact sheets a 2 fps em páginas de 30 imagens, folhas a 360 px de largura (1 fps), 12 frames consecutivos em `--at`, poster e duplicação do vídeo se `--loop`. Inspecione todas as páginas, inclusive as finais. Em blur rápido, gere faixas em vários timestamps. Não altera a fonte.

## Three.js — render e helpers 3D

```bash
npm run render:3d -- --format 16:9 --fps 60 --sub 4 --out out/3d.mp4
npm run stills -- --page assets/three/index.html --duration 8 --times 1.5,4,7.5 --out out/stills-3d
npm run docs:three
```

`render:3d` usa `render.mjs` com página 3D e duração padrão de 8 s; os demais parâmetros são os mesmos do renderer. `three-helpers.mjs` exporta `createVideoRenderer`, `fitCameraToObject`, `addStudioLights`, `loadModel`, `animationAt`, `imageTexture`, `labelTexture` e `disposeTree`. Referência de uso: [threejs-guide.md](threejs-guide.md). `sync-three-docs.mjs` baixa 94 arquivos oficiais de documentação na tag fixa r187, gera catálogo e hashes; não executa código externo.

## Instalar a skill nos agentes

```bash
npm run install:skills -- --agent both
```

`--agent codex|claude|both`, default ambos. Codex: `~/.agents/skills/motion-video-studio`; Claude Code: `~/.claude/skills/motion-video-studio`. `--home DIRETORIO` permite instalação de teste em home isolada. `--skip-deps` copia sem `npm ci`; depois instale dependências nas pastas de destino. `--update` faz backup da pasta existente antes de atualizar. Não copia node_modules, .venv, .git, .env, logs ou histórico de navegação. Os arquivos copiados têm lista explícita em `install.mjs`.
