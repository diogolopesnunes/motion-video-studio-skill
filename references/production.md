# Operação de produção

## Rotas do artigo

| Rota | Quando usar | Dependências e limites |
|---|---|---|
| A: código desenhado | Tipografia, UI, ícones, infográficos, loops e este exemplo | Canvas/SVG, Playwright e FFmpeg; incluída e testada neste pacote |
| B: framework | Séries, componentes React, edição de timeline/preview avançada | Remotion ou HyperFrames; alternativas opcionais, seguir docs e versão do projeto |
| C: híbrida | Física/atuação difíceis, personagem ou material gerado | Geração externa pode servir de referência/traçado; exige orçamento, direitos e sincronismo. Não incluída automaticamente |
| D: edição de footage | Depoimento, captura de tela gravada, B-roll, captions | Material fornecido, edição/mix e composição; não fingir que vídeo de pessoas é recriável com vetores simples |

O motor A cobre a linguagem do vídeo de referência sem exigir um gerador de vídeo nem assinatura extra. Remotion já pode existir na máquina do usuário: prefira reutilizar uma instalação compatível quando escolher B. Não misture versões de pacotes Remotion. Revalide licenciamento comercial e requisitos do framework antes de adotá-lo; o pacote não concede licença de terceiros.

## Projeto por vídeo

Copie o pacote para uma pasta de produção ou use um checkout próprio. Preserve a skill instalada como ferramenta. Separe `refs/`, assets autorizados, `docs/`, fonte, `audio/` e `out/`. Registre proveniência e autorizações. Não inclua sessões do browser, cookies, `.env`, modelos, caches ou dados de clientes em commits.

## Render e custo

Para 24 s a 60 fps/sub=4 são **5.760 subframes** capturados; a saída tem 1.440 frames. O custo é CPU/tempo/disco, sem API obrigatória. Animatic: `--scale 0.5 --fps 30 --sub 1`. Master: `--scale 1 --fps 60 --sub 4`. A janela temporal do blur é aproximadamente um frame; inspecione transições e glifos. Renderize proporções em processos separados apenas se houver memória suficiente.

Mudar formato exige layout: telefone abaixo do título no retrato e ao lado no horizontal; rótulos ficam dentro das margens. Para 1:1, verifique proporções e densidade. Não trate “não saiu da tela” como evidência de leitura boa. Screenshot de app exige resolução suficiente para sobreviver ao enquadramento.

## Áudio e grid

`beats.py` estima tempo, beats e onsets. Candidatos a downbeats assumem 4/4; confirme o compasso/primeiro tempo antes de usar `--downbeat-offset`. Material com voz e muitos SFX pode produzir detecções erradas. Não atribua o BPM sintético de 120 ao vídeo original sem medição/escuta.

`audio.mjs` produz um guia musical determinístico, `sfx.mjs` produz eventos e `mix.mjs` combina camadas. `--voice` reduz a cama musical de forma fixa; **não implementa ducking automático/sidechain**. Para locução complexa, ajuste ganho, respiros e SFX em editor ou evolua o mixer. A mixagem faz compressão leve, medição e normalização em duas passagens, com estágio final de segurança após resample. O alvo de entrega é −14 LUFS e pico ≤−1,5 dBTP; internamente usa −3,5 dBTP para acomodar picos entre amostras e AAC. Confira os valores no arquivo final, pois codificação e conteúdo podem alterar o resultado.

Não existe TTS ou clonagem de voz obrigatória. Use locução autorizada ou ferramenta explicitamente escolhida pelo usuário. Não envie mídia privada para provedores só porque um exemplo do artigo menciona uma API.

## Loop

Repetir o relógio não resolve emenda. Planeje a volta ao estado inicial, inclusive cursor, velocidade e trilha. Compare um frame inicial com o fim, estime a velocidade em ambos os lados e assista dois ciclos. Um hold idêntico nos dois lados é uma solução simples. Para loop sem parada, use trajetórias periódicas (sin/cos) e verifique derivadas. `assets/morph/` usa hold inicial/final; o anúncio de 24 s é linear e não pretende fechar em loop.

## Revisão observável

O teste automatizado verifica determinismo, matemática e arquivos. O `qa` não dá nota estética: seu relatório sempre lembra da inspeção visual. Assista/ouça o MP4 real; abra contact sheets e strips; veja também em 360 px. A contact sheet cobre todas as cenas em páginas numeradas, não só os primeiros 15 s. Qualquer nota subjetiva deve ter contexto e timestamps. Um review pode honestamente declarar áudio “não revisado por escuta”.

## Segurança e portabilidade

O servidor usa 127.0.0.1, valida Host/Origin, aceita somente leitura e restringe realpaths à pasta da skill. O browser de render bloqueia rede fora dessa origem. Isso reduz exposição acidental, mas não é sandbox para executar Node/Python externo arbitrário. Não rode projetos desconhecidos sem inspeção e isolamento próprios. Não edite permissões globais nem desative proteção do agente para usar a skill.

Mesma versão de browser/fontes/configuração produz frames repetíveis. Fontes de sistema e rasterização podem variar por SO. Para fidelidade entre máquinas, obtenha uma fonte redistribuível, inclua licença e aguarde `document.fonts.ready`; não copie Arial do Windows para o repositório. A demonstração usa Arial/sans-serif do sistema e não promete pixels idênticos entre SOs.
