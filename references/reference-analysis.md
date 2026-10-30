# Referência: Meu Salário — análise por take

Arquivo: `examples/reference/original.mp4`, fornecido pelo usuário. Vídeo H.264 High, 1920×1080, 30 fps constantes, 1.350 frames, 45,000 s. Container: 45,013 s, áudio AAC estéreo 48 kHz. Tamanho original: 10.405.019 bytes. Metadados de cor: BT.709. Os dados foram lidos com FFprobe; nenhuma hipótese sobre o software original é necessária.

## Método e limites

Inspeção visual de 90 frames a 2 fps e depois 180 frames a 4 fps (passo 0,25 s) em seis contact sheets com timestamps. Os intervalos abaixo são **marcadores editoriais aproximados**, não detecção automática de corte nem EDL exata; bordas têm resolução de aproximadamente ±0,25 s. Muitas cenas são transformações contínuas, por isso “take” significa uma unidade de mensagem/ação. Para reconstrução idêntica, avance no original a cada 1/30 s nas fronteiras. A origem da fonte, rig, curva de easing e engine não é recuperável apenas do MP4.

O áudio foi medido com FFmpeg (`loudnorm`, valores de entrada): −14,07 LUFS integrados, −1,74 dBTP e LRA 2,70 LU. A transcrição local com faster-whisper base ajuda a localizar a narração; contém erros e não substitui escuta humana. Não identificamos por inferência uma música, BPM exato ou biblioteca de SFX. Não alegamos uma auditoria auditiva subjetiva completa.

## Identidade visual observada

- Fundo branco, preto quase puro em títulos, verde dominante e vermelho semântico para pagamentos/saídas. Verdes variam entre texto, logo e telas; tokens do starter são aproximações de estudo, não identidade oficial.
- Display sans-serif pesado, geralmente caixa alta; corpo/UI menor. A família original não foi confirmada. Formas das letras são compactas; a referência não autoriza afirmar que seja uma fonte específica.
- Muito espaço negativo. Um elemento domina a atenção; itens anteriores diminuem e viram contexto nas bordas. A composição cresce por acumulação e depois se limpa.
- Vetores simples e pictogramas convivem com pacotes ilustrados e um mockup de smartphone com screenshots. Não há razão para gerar filmagem realista para reproduzir essa linguagem.
- A narração conduz a progressão: pergunta, componentes do ganho, sobrecarga, solução, funcionalidades, eliminação de trabalho manual e clareza final.

## Decupagem completa

| Take | Intervalo aprox. | O que se vê | Mecânica observada e receita de reconstrução |
|---|---|---|---|
| 01 | 0,00–0,75 | Ponto/traço verde em fundo branco | Scale X ou stroke reveal; traço prepara uma linha de base para o texto |
| 02 | 0,75–1,75 | Entrada de “VOCÊ SABE” e “REALMENTE” | Máscara horizontal com deslocamento vertical; hierarquia de escala, sem fade dominante |
| 03 | 1,75–3,50 | Pergunta completa e “HOJE?” verde; sublinhado vira seta | Stagger das palavras, hold legível, trim de path no sublinhado |
| 04 | 3,50–4,25 | Texto sai; barra verde vira cabeçalho do calendário | Continuidade por forma/cor; squash vertical e troca de conteúdo sob máscara |
| 05 | 4,25–5,75 | Calendário outubro/2026; data 28 marcada | Grid entra, cursor/traço desenha marca e extensão verde; preparar coordenadas das células |
| 06 | 5,75–7,25 | Calendário desloca; “DIÁRIA” e valor crescem até R$150 | Whip lateral com blur visível; counter numérico; pequeno símbolo solar |
| 07 | 7,25–8,25 | Diária reduz para o topo esquerdo; caixas e ×42 | Retarget de posição/escala mantendo objeto; contador de quantidade acompanha stack de pacotes |
| 08 | 8,25–9,75 | Etiqueta +R$1,50 por pacote; valor migra para as caixas | Tag levemente inclinada, entrada veloz e hold; pequenas unidades verdes seguem um caminho |
| 09 | 9,75–11,75 | Total dos pacotes +R$63 e ticket “SERVIÇO EXTRA” +R$60 | Somar quantidade × unitário; bilhete entra com rotação; selo/estrela cresce e assenta |
| 10 | 11,75–13,00 | Ticket reduz; ícone de entrada e “A RECEBER +R$8,00” | Layout por âncoras; reveal de rótulo/valor; verde indica entrada |
| 11 | 13,00–14,75 | Ícone de saída e “A PAGAR −R$35,00” | Troca de mensagem central, vermelho semântico; recebimento passa para canto inferior |
| 12 | 14,75–17,25 | Valores se multiplicam/rodopiam entre os componentes | Campos numéricos em trajetórias orbitais e rotações; aumentar densidade sem mover todo o fundo |
| 13 | 17,25–18,50 | Elementos convergem; ponto preto vira explosão radial de números | Colapso de escala, pausa curta e expansão radial com linhas e anéis |
| 14 | 18,50–19,50 | Interrogação grande | Limpeza quase completa do quadro; símbolo central faz ponte de problema para ideia |
| 15 | 19,50–21,50 | Interrogação dá lugar à lâmpada; raios; símbolo reduz para cima | Morph sugerido por continuidade do contorno; lâmpada redesenhada em paths; escala e deslocamento |
| 16 | 21,50–23,75 | Massa verde preenche fundo; título “MEU SALÁRIO” e subtítulo | Wipe por expansão de forma, texto branco sob máscara, leve sublinhado final |
| 17 | 23,75–24,75 | Verde contrai e se torna tela/forma do telefone | Match shape: fundo → retângulo arredondado → mockup; screenshot aparece dentro de clipping |
| 18 | 24,75–26,00 | Telefone à direita; “RECEITAS” e contador à esquerda | Composição duas colunas; destaque circunda card dentro do app; receita converge a R$3.450 |
| 19 | 26,00–27,25 | “DESPESAS” e contador vermelho até R$1.980 | Máscara substitui rótulo, valor anima, contorno de foco muda de card |
| 20 | 27,25–30,25 | “SALDO” até R$1.470; scroll e gráficos crescem | Área de tela recortada no telefone; scroll virtual e barras por stagger; preservar legibilidade |
| 21 | 30,25–31,50 | Tela de relatórios; “HISTÓRICO dia a dia” | Navegação lateral de tela sob máscara do aparelho; mudar rótulo em sincronismo com navegação |
| 22 | 31,50–33,25 | “PREVISÕES próximos meses”; tela com gráfico | Nova tela, gráfico sobe, dispositivo permanece estável como âncora |
| 23 | 33,25–35,75 | Papel, planilha e balão de cálculo ao redor do telefone | Objetos entram de fora com inclinação e blur; contraste do trabalho manual com o app |
| 24 | 35,75–37,00 | Telefone e acessórios saem; espaço branco; pacote aparece | Whip/zoom de saída; pausa respirada; pacote reconecta ao início do expediente |
| 25 | 37,00–39,00 | Linha do 1º pacote ao fechamento; +150,+63,+60,−35; R$238 | Trim de linha, nós e números por sequência; check final; verificar aritmética |
| 26 | 39,00–40,50 | “TUDO FICA MAIS CLARO.” com verde no desfecho | Grande tipografia sob máscara e faixa clara de apoio; payoff verbal e visual |
| 27 | 40,50–42,25 | Caminhão passa e acelera para a direita | Rodas giram, carroceria inclina, linhas de velocidade e nuvens de fumaça; veículo faz wipe |
| 28 | 42,25–45,00 | Logo Meu Salário permanece; fumaça se dissipa | Lockup final com hold de marca; movimento secundário termina gradualmente. Sem loop explícito |

## Estrutura de ritmo

O começo usa cerca de 3,5 s para a pergunta. A primeira metade explica valores concretos e depois comprime a confusão em aproximadamente 4 s. A virada problema→solução ocorre com interrogação/lâmpada/verde entre 18,5 e 24,5 s. O telefone sustenta uma sequência de funções por aproximadamente 11 s. Os últimos 8 s retomam a jornada e fixam a marca. O mesmo layout não deve congelar por toda a fala: use mudanças de foco, estados, números e gráficos.

## Continuidade a preservar

1. Barra/sublinhado verde → calendário.
2. Diária central → âncora superior esquerda.
3. Pacotes centrais → âncora superior direita.
4. Etiqueta de preço → valor dos pacotes.
5. Acúmulo de valores → caos → interrogação → ideia.
6. Plano verde → telefone verde → interface real.
7. Pacote do início → linha de fechamento → caminhão/logotipo.

## Dados e ambiguidades

O fechamento visível faz **150 + 42×1,50 + 60 − 35 = 238**. A entrada de R$8 mostrada anteriormente não aparece nessa soma; incluí-la resultaria em R$246. Não inventar explicação financeira: num filme novo, confirmar quais componentes pertencem ao saldo. A receita/despesa do dashboard mostra outro agregado (3.450−1.980=1.470), não a mesma conta diária. A análise preserva essa distinção.

## Aplicação na skill

O starter de 24 s usa mensagem, marca e UI fictícias, explicitamente identificadas. Demonstra máscaras de texto, calendário, acumulação, caos, lâmpada/wipe, mockup, gráfico, fechamento e veículo. É uma base de produção, não uma reprodução pixel a pixel dos 45 s. Para um anúncio real, trocar UI por screenshots reais, definir locução e refinar os timings com a faixa final. O vídeo original permanece o alvo visual de estudo.
