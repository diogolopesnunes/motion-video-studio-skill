# Melhorias deste fork

Este fork mantém a licença MIT e os avisos sobre direitos de mídia de terceiros do projeto original.

## Funcionalidades

- Projetos de vídeo independentes: `npm run new -- --dir ../meu-projeto`, seguido de render com `--project-root`.
- Perfis de render `preview`, `standard` e `master` via `--quality`; parâmetros explícitos têm precedência.
- `npm run produce`: executa lint, render, QA técnico e prepara material de revisão.
- Heurísticas de frames pretos e parados: `npm run qa -- --input out/final.mp4 --auto-visual`.
- Ducking de música sob locução com o filtro sidechain do FFmpeg (`npm run mix` com `--voice`, desativação opcional `--duck off`).
- Componentes 2D reutilizáveis em `scripts/components.mjs`.
- Validações adicionais de URLs, endereços DNS e downloads em `gather-assets.mjs`.
- Testes de regressão e smoke test vertical no CI.

## Teste rápido

```bash
npm ci --ignore-scripts
npx playwright install chromium
npm test
npm run new -- --dir ../meu-projeto
npm run produce -- --project-root ../meu-projeto --duration 2 --quality preview --format 9:16 --out out/test.mp4
```

## Limitações

Os alertas visuais são heurísticos, **não** uma avaliação estética por modelo de visão. Não há autopatch criativo de cenas nem TTS integrado. O pipeline prepara o material para revisão humana. A checagem de DNS/URLs reduz riscos, mas não substitui isolamento de rede; projetos e sites de terceiros requerem cautela.
