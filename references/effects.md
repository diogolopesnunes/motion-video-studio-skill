# Receitas de efeitos reutilizáveis

## Tipografia e máscaras

Calcule o progresso com mola crítica, abra um clip retangular fixo e mova o baseline do texto de baixo para cima. Aplique offset por palavra, sem dividir caracteres arbitrariamente. Saída termina antes da entrada da mensagem seguinte. Faça hold suficiente para a frase ser lida a 360 px. Em canvas, redimensione o backing store para a saída; em HTML/SVG, evite ampliar texturas rasterizadas por câmera. O starter implementa `reveal`.

## Retarget e continuidade

Use `track(t, initial, [{time,value},...])` separadamente em x, y, escala, largura e raio. Preserve o mesmo ID visual do objeto. Encolher um elemento para virar âncora de contexto funciona melhor que apagá-lo e recriá-lo em outro canto. O `track` soma mudanças no alvo, preservando a resposta anterior em andamento.

## Whip e motion blur

Anime distância curta de tempo e grande deslocamento; direção precisa conduzir ao próximo foco. Use `--sub 4` para blur temporal real a partir de quatro instantes por frame. Um filtro CSS `blur()` isolado cria desfoque espacial, não reproduz esse movimento. Inspecione 12 frames consecutivos perto da ação: texto não pode deixar rastros durante o hold. Saídas rápidas do vídeo original podem ter duração menor que 0,25 s; refine no original a 30 fps.

## Contadores e gráficos

Valores são dados numéricos; interpole, depois formate com `Intl.NumberFormat`. Quantidade de pacotes é inteiro, dinheiro tem duas casas e unidade explícita. Congele o total exato ao fim. Barras recebem progressos com offsets, ancoradas na mesma linha de base. Não some recebimentos que pertencem a períodos diferentes.

## Morfismo

Um único container mantém x/y/largura/altura/raio/preenchimento. Gere novos conteúdos após o morph iniciar e retire o conteúdo anterior antes da troca. `swapAlpha` oferece essa janela. `indicator` usa molas diferentes nas duas extremidades para alongar uma aba sem escalonar o texto. `assets/morph/` demonstra o container único com estados parametrizados.

## Caos e explosão radial

Seed fixa determina ângulo, raio, palavra e fase de cada elemento. Calcule a posição a partir de t, nunca somando velocidade em cada frame. Densidade aumenta no centro; a transição remove elementos de contexto para o símbolo seguinte respirar. Evite aplicar partículas a qualquer cena: aqui os próprios valores carregam a mensagem.

## Mockup com UI real

Recorte screenshot no retângulo arredondado do aparelho. Separe moldura, notch, conteúdo, highlight e cursor. Scroll move apenas o conteúdo dentro do clip. Use hotspots medidos no screenshot para focar a receita ou despesa; não desenhe números inventados sobre uma tela real. A API de asset no starter espera o decode da imagem antes do render.

## Wipe de cor e telefone

Expanda uma forma com a cor de marca até cobrir o canvas. Faça-a contrair para as dimensões do telefone usando a mesma cor e a mesma âncora. Mantenha o clip para que o screenshot apareça por dentro. O starter mostra wipe circular e mockup; para o match shape contínuo exato da referência, una geometria da saída de `solution` à entrada de `product` com `track`, após aprovar o storyboard.

## Caminhão e lockup

Rodas giram proporcionalmente à distância percorrida, carroceria faz pequeno pitch, fumaça nasce em posições determinísticas e desaparece por idade. O veículo atravessa a região central e revela a marca atrás dele. O starter inclui geometria vetorial simples; a referência tem ilustração e fumaça mais detalhadas. Reserve hold final e escolha se há CTA ou só assinatura.

## Som

`click`: transiente curto; `pop`: seno com glide; `thump`: grave com decaimento; `whoosh`: ruído com envelope. Cues em segundos pertencem à mesma timeline das cenas. Música e SFX são camadas independentes. Uma locução real requer revisão de pronúncia, pausas e direitos de voz; a skill não clona ninguém automaticamente. A trilha sintética do exemplo é utilitária e deve ser dirigida/revisada para um anúncio final.
