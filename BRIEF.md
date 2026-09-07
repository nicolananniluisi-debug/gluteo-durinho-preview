# BRIEF — Projeto Glúteo Durinho (scroll-craft rebuild)

## Interview (Passo 0), respostas literais do Nicola

1. **O que é isso, pra quem é (vibe):** "Página de vendas."
2. **A jornada do scroll:** "Mantenha a jornada já presente." → a ordem das
   seções atuais do site (`index.html` na raiz do repo) é a espinha dorsal e
   não muda: Hero (promessa + preço) → 3 Conversas Mentais (dor) → A Solução
   (virada) → Quem Ensina / Marcel (autoridade) → O Que Você Recebe (entrega)
   → CTA Final (preço + garantia).
3. **Curva de energia:** "Começa intenso e termina calmo, deve seguir
   filosofias de páginas de vendas focadas em conversão."
4. **Como deve se sentir em cada etapa / o momento marcante:** "Deixo à
   disposição." → decidido abaixo (ver Curva de Sentimento e O Pico).
5. **A coisa que só esse site faz:** "Entreter, seguindo a jornada que mais
   faça sentido para o cliente." → virou o signature move: a seção "3
   Conversas Mentais" digita, ao vivo, o monólogo interno da leitora sobre o
   próprio corpo (ver §Signature move).
6. **Distância do premium-minimalista:** "Pode ser o premium-minimalista
   mesmo." → família estética travada em premium-minimal (canvas escuro, um
   acento, ar).
7. **Mundo contínuo ou cenas distintas:** "Deixo à disposição." → **cenas
   distintas**. A jornada já são 6 blocos de conteúdo de natureza diferente
   (citações, checklist, bio+números, lista de entregáveis, preço) — não um
   lugar físico único. A regra 3 do SKILL.md só exige mundo contínuo quando o
   brief for literalmente sobre viajar por um lugar; não é o caso.
8. **Assets:** "Se tiver que gerar imagem, me avise qual e discutimos o
   prompt." → **nada foi gerado.** O projeto já tem fotos reais suficientes
   (ver §Assets) para cobrir toda a jornada sem gastar a KIE_AI_API_KEY. Se
   isso mudar depois, cada pedido de imagem nova passa por aprovação de prompt
   antes de gerar, como pedido.

## Bootstrap / ambiente

- `doctor.mjs`: ffmpeg completo **ausente** neste ambiente (só o stripped do
  sistema) e `KIE_AI_API_KEY` não configurada. Nenhum dos dois bloqueia esta
  build: **zero vídeo, zero geração** (ver §Assets e §Grammar).
- `playwright-core` instalado localmente na pasta da build para o Passo 5.

## A jornada (mantida do site atual)

```
1  Recognição/Promessa   headline "GLÚTEO DURINHO" + preço R$67 + foto real do Marcel
2  Dor nomeada            as 3 falas que ela já pensou sobre o próprio glúteo
3  A virada                a solução: treino com foco e programa organizado
4  Autoridade              quem é Marcel: 25 anos, 3.000 alunas, 26 países
5  Entrega                 o que vem dentro do programa
6  Compromisso             preço final + garantia de 7 dias, sem risco
```

## Curva de sentimento (decidida por mim, já que o Nicola deixou à disposição)

```
1  Confronto        a promessa cravada em letra grande + o preço baixo, chocante, já visível
2  Exposição/Tensão  o "signature move": a página digita, sozinha, o que ela já pensou
3  Alívio  ← PICO    o wipe de virada: sai da tensão do monólogo e entra na solução, foto real, checklist claro
4  Confiança         números reais subindo (25 anos / 3.000 alunas / 26 países), tom calmo
5  Clareza           lista prática do que vem no programa, sem hype, sem pressa
6  Resolução tranquila  preço + garantia de 7 dias, fechamento confiante, sem urgência fabricada
```

Isso cumpre "começa intenso, termina calmo": 1-2 tensos, 3 é a virada
(pico), 4-6 uma descida deliberada de intensidade até o fechamento calmo —
que é também a filosofia de conversão pedida: abrir com gancho forte, agitar a
dor, aliviar com a solução, construir confiança racional, e fechar sem
fricção nem urgência falsa (a garantia de 7 dias já faz esse trabalho
honestamente, não precisa de contador regressivo).

## O pico

> "a página vai digitando, na tua frente, exatamente o que você já pensou
> sobre o próprio corpo — e no momento certo, para de te expor e te entrega a
> solução."

Vive na transição entre o Ato 2 (3 Conversas Mentais) e o Ato 3 (A Solução).
Ato 3 recebe: a melhor foto real (solution-woman.png), o único `reveal="iris"`
da página (é o mais alto de todos os cinco tipos de reveal, por isso só uma
vez por página), o silêncio autorado logo antes dele (a última fala do
monólogo — "o problema não é falta de esforço, é falta de estratégia" —
segura e some antes do wipe, um batimento vazio de propósito) e o maior
respiro/padding da página.

## Frase "conta pra um amigo"

> "É o site que fica digitando os pensamentos que você já teve sobre o seu
> corpo — e para bem na hora que ia te expor mais, pra te dar a resposta."

O signature move e o pico são a mesma coisa, de propósito (ver feel.md §3).

## Silêncio autorado

Um batimento vazio (sem cue novo, sem movimento) entre a última fala do
monólogo do Ato 2 e o início do wipe do Ato 3 — é ANTES do pico, não depois:
dá o "nada" que o alívio precisa pra ter contraste. Ver verify.md: isso é
autorado, não deve ser lido como scroll morto.

## Grammar: Filmic one-shot

Escolhido porque a página deve ser sentida como um argumento único, contínuo,
que carrega a leitora sem ela "navegar" — exatamente o que uma sales page de
alta conversão quer (sem saídas, sem se perder). `drift` unifica o fundo,
os cues se sobrepõem entre atos, sem números de seção, sem índice visível.

**Adaptação necessária e por quê:** a receita padrão do grammar usa um herói
em vídeo (`scrub`). Não uso vídeo nesta build: o cliente não tem filmagem
própria, o ambiente não tem um build completo do ffmpeg (bloqueio real do
`doctor.mjs`), e gerar um "camera move" fake sobre uma foto real seria menos
honesto que usar a própria foto parada com tipografia cinética + parallax em
camadas. Nada no forbids list do grammar exige vídeo — só o "leans on" (uma
preferência, não uma trava) — e o fechamento (pin + spotlight + CTA
magnético) é seguido à risca.

**Por que os outros sete perderam:**
- *Chaptered editorial*: bane CTA magnético e pede fechamento como texto
  corrido — errado pra uma página que precisa de UM botão de compra claro.
- *Live surface*: não há software/produto pra demonstrar rodando.
- *Continuous world*: a regra 3 do SKILL.md proíbe cadeia contínua a menos que
  o brief seja literalmente sobre viajar por um lugar físico; o nosso é sobre
  conteúdo (dor → solução → prova → entrega → preço), não geografia.
- *Typographic poster*: bane fundo fotográfico — jogaria fora a confiança que
  vem de ver o Marcel de verdade e as alunas reais.
- *Gallery/catalog*: é pra um leque de variantes/produtos; aqui é uma oferta
  única.
- *Split stage*: a tensão de duas colunas não se estende naturalmente pra bio
  do Marcel nem pra lista de entregáveis.
- *Rhythmic cutlist*: bane `pin` (preciso dele pro monólogo e pro fechamento
  calmo) e termina "abrupto" por definição — contradiz "termina calmo", que
  foi pedido explicitamente.

## Signature move: "Pensamento ao vivo"

No Ato 2, as 3 falas não são 3 cards de citação separados: são um único
monólogo interno que a PRÓPRIA PÁGINA digita, caractere por caractere, preso
ao scroll (`--sc-p` do ato, não CSS de `kinetic` do kit — JS bespoke na
página). Um cursor pisca no fim da linha sendo digitada. Ao lado, 3
retratos-miniatura (as fotos reais das alunas) acendem e apagam em sincronia
exata com qual fala está sendo "pensada" no momento — a foto de quem "pensou
aquilo" ganha vida só enquanto o texto dela está sendo digitado, e apaga
quando a próxima começa. Isso não é `kinetic` do kit (que só faz
fade/stagger de linha inteira) nem um parâmetro de outro device — é JS
próprio lendo `--sc-p` e recortando o `textContent` a cada frame.

Teste da skill (uniqueness.md §3): descrito pra alguém que já viu os builds
anteriores desta skill, ninguém confundiria isso com um `kinetic` recolorido
ou um card de depoimento — é o mecanismo inteiro que é outro.

## Assets (tudo real, nada gerado)

| Ato | Asset | Origem |
|---|---|---|
| Hero | `marcel-photo.png` | já existente no projeto, foto real do Marcel |
| 3 Conversas Mentais | `testimonial-1/2/3.png` | já existentes, fotos reais de alunas |
| A Solução | `solution-woman.png` | já existente, foto real de exercício |
| Quem Ensina | `marcel-photo.png` (reaproveitada) | mesma foto do Marcel, autoridade |
| O Que Você Recebe | nenhuma imagem — vira um rail de chips ícone+texto | as duas SVGs de mockup de app falso (`mockup-phone.svg`, `mockup-tablet.svg`) foram abandonadas: eram uma tela de app fake, e o taste floor desta skill proíbe "fake dashboards" — trocado por algo honesto |
| CTA Final | nenhuma imagem | preço + selo de garantia + botão |

Zero chamada à API do kie.ai, zero custo. Se depois quiser vídeo real no
hero (o `scrub` que o grammar prefere), isso vira um passo futuro: instalar o
ffmpeg completo e filmar/gerar um clipe — não feito agora por não ter sido
pedido e por já haver uma solução honesta sem ele.

## Fingerprint gate

Registro em `scrollcraft/FINGERPRINTS.md` está **vazio** (primeira build deste
usuário) — nada para comparar, gate passa trivialmente. Linha desta build
será apensada após o Passo 5.

## Score table (dispositivo por ato)

| Ato | Wrapper (`data-sc-act`) | Device de destaque | Sentimento |
|---|---|---|---|
| 1 Hero | `flow` (entrada no load) | `parallax` (3 camadas: card escuro atrás, foto do Marcel, card de preço na frente) + entrada em cascata (`data-sc-in`) | Confronto |
| 2 3 Conversas Mentais | `pin`, span ~3.2 | bespoke: "pensamento ao vivo" (datilografia presa a `--sc-p`) | Exposição/Tensão |
| 3 A Solução (PICO) | `flow`, padding maior que os outros `flow` da página | `reveal="iris"` (único da página) | Alívio |
| 4 Quem Ensina | `pin`, span ~1.8 | `count` (25 anos / 3.000 alunas / 26 países subindo) + `parallax` leve na foto | Confiança |
| 5 O Que Você Recebe | `pan`, span ~4 | rail lateral dos 6 itens de entrega | Clareza |
| 6 CTA Final | `pin`, span ~1.15 (último ato, cue sustenta) | `pointer` (`spotlight` no stage + `magnet` no CTA) | Resolução tranquila |

Sequência de wrapper: flow → pin → flow → pin → pan → pin — nunca repete o
vizinho. Sequência de device-destaque: parallax → bespoke → reveal → count →
pan → pointer — 6 famílias distintas, nenhuma repetida (a regra pede 4+ e
nunca duas iguais em sequência; aqui nenhuma se repete em toda a página).
`scrub`: zero (ver §Grammar, adaptação). Orçamento de scroll pinado/pan:
3.2+1.8+4+1.15 ≈ 10.15vh, dentro da faixa 8–14vh — sobra espaço de conteúdo

**Achado real na verificação (Passo 5):** a primeira versão usava
`data-sc-kinetic="lines"` no H1 do hero, preso a `data-sc-cue="0 0.5 0"`
(greet). O harness reportou "CUES THAT NEVER PEAK". Causa raiz: `flow`
calcula `p = (y+vh-top)/(height+vh)` — pra a PRIMEIRA seção da página (visível
já no load, `top=0`), esse `p` no load já nasce em torno de 0,4+ (nunca perto
de 0), porque a fórmula assume que a seção "entra" vindo de baixo, o que não
existe pro primeiro elemento da página. A janela de platô que eu tinha
escrito (`p` entre 0 e 0.35) fica matematicamente inatingível, e o headline
nasce já no meio da rampa de saída. `kinetic`+`data-sc-cue` só é seguro em
atos `pin`/`scrub` (cujo `p` começa exatamente em 0 quando estão no topo da
página) ou num `flow` que não seja o primeiro da página. Trocado por
`data-sc-in`/`data-sc-stagger` (o mecanismo certo pra conteúdo de `flow`),
que já cobria o resto do hero. Ver [[Patterns/Frontend-Patterns]] se quiser
extrair isso como padrão reutilizável entre builds desta skill.
natural nos dois atos `flow`.

## Paleta e tipografia (herdadas do site atual, não reinventadas)

- `--sc-canvas: #0e0e0e` (era `--color-bg-dark`)
- `--sc-surface: #1a1a1a` (era `--color-bg-card-dark`)
- `--sc-ink: #f5f5f5` / `--sc-ink-soft: #b3b3b3`
- `--sc-accent: #ec1560` (o rosa de marca já usado no badge e no destaque do
  título)
- `--sc-accent-ink: #ffffff`
- `--sc-font-display: 'Anton'` / `--sc-font-text: 'Poppins'`

**Mudança visível que decidi e que o Nicola pode reverter fácil:** o botão de
compra do site atual é verde (`#2f7f39`), separado do rosa de marca. O taste
floor desta skill é categórico — "um acento por página, trava pra página
inteira" — e ter dois acentos (rosa de marca + verde do botão) é exatamente o
que ele proíbe fora da exceção de fundo claro/escuro (não é o nosso caso,
ficamos escuro o tempo todo). Unifiquei o CTA pro rosa da marca. Se preferir
manter o verde, é a reversão mais simples de todas (uma variável).

## Silêncio, reduced-motion, mobile

- Ver verify.md: rodar `serve.mjs`+`shoot.mjs` normal, mobile (390×844) e
  `--reduced-motion`.
- Sob reduced motion: o monólogo do Ato 2 aparece com as 3 falas já completas
  e empilhadas (sem datilografia), retratos nas opacidades finais, sem perda
  de conteúdo.
