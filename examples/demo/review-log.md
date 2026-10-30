# Revisão realizada na criação do pacote

## Rodada 1 — keyframes de composição

Inspeção de 12 timestamps em landscape e portrait: 0,8; 2; 3,8; 6,5; 8,8; 10,8; 12,8; 14,8; 16,8; 18,5; 20,5 e 23 s.

Três problemas identificados: mockup pequeno demais no retrato; abertura longa em uma linha não aproveitava o retrato; frames escolhidos em meio a reveals pareciam texto cortado quando usados como stills de apresentação. Correções: mockup vertical maior, título em linhas próprias e stills adicionais em holds (11,6 e 23,8 s). O reveal deliberadamente corta texto durante a transição; não deve permanecer assim no hold.

## Rodada 2 — retrato e quadrado

Frames inspecionados: 13,2 s em retrato e quadrado, 11,6 s em quadrado; também a grade de keyframes inicial.

Três problemas identificados: escala não uniforme distorcia a fonte/telefone em 1:1; a UI precisava de espaço próprio abaixo do cabeçalho nos formatos compactos; faltava demonstrar o master em resolução real. Correções: espaço quadrado com escala uniforme e offsets próprios; layout empilhado com telefone ampliado; render de prova 1920×1080/60 fps/sub=4, correspondente a 12–14 s.

## Rodada 3 — MP4 codificado e áudio medido

Inspeção das duas contact sheets do landscape, cobrindo todos os 24 s; frames finais em square/portrait e materiais de teste a 360 px/strips. A referência original foi estudada em 180 frames e seis folhas com timestamps.

Problemas identificados: mix inicial saía do alvo após AAC; a contact sheet precisava cobrir também o fim do vídeo; o teste de loop precisava comparar imagem de hold e seam, além de repetir o relógio. Correções: compressão, normalização e estágio de segurança no áudio; paginação por toda a duração; testes de PNG em t=0,15,5 e 16 s no template morph.

Resultado técnico da mixagem final dos anúncios: −14,02 LUFS / −2,66 dBTP. Decodificação, resolução, duração e presença de áudio foram verificadas pelos scripts; os relatórios estão nesta pasta. O renderer foi testado quanto a seek fora de ordem nos três formatos.

## Complemento — integração Three.js

Inspeção do frame de 4 s em 960×540: pacote, tela, rótulo e barras legíveis; iluminação e sombra presentes. A cena usa o mesmo `seek(t)` e quatro subframes do render 2D. Testes adicionais verificam câmera em três proporções, pose de AnimationMixer em seek reverso, igualdade de PNG após saltos e GLTFLoader com fixture local. A rota testada é WebGL2; WebGPU, decoders comprimidos e efeitos de histórico são documentados, sem alegação de validação ampla.

## Limitações finais

Não foi feita escuta humana subjetiva integral, nem teste real de anúncio com público. Não se atribui nota 8 a áudio não ouvido nem se declara a demonstração pronta para campanha. A UI é fictícia; não há locução. Este log comprova iterações reais de desenvolvimento da ferramenta, não aprovação comercial. Para cada filme final, seguir o processo de três rodadas novamente com marca, ativos, voz e critérios daquele projeto.
