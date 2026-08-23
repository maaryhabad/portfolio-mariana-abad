# Especificação Técnica SDD - Passo 8: Embeds e Integração de Jogos Itch.io

## 1. Visão Geral
Esta especificação estabelece a integração com os **Jogos e Protótipos Reais da desenvolvedora Mariana Abad no Itch.io (`https://maaryhabad.itch.io/`)**, criados ao longo de sua trajetória na *Apple Developer Academy*, *Global Game Jams* e pesquisas em Inteligência Artificial e Saúde.

---

## 2. Requisitos Técnicos

### 2.1. Catálogo Real de Jogos Mapeados (Fonte: https://maaryhabad.itch.io/)
1. 🤖 **BOB**: Jogo que utiliza inteligência artificial para complementar a anamnese de laudos e pesquisas de proteção contra abuso infantil.
2. 🐊 **Butantan - The Game**: Jogo de aventura acompanhando o Jacaré Zeca em busca da vacina e da conscientização em saúde.
3. 🫧 **Bubbles Out | Entre bolhas e segredos**: Experiência casual e sensorial desenvolvida para exploração de física e quebra-cabeças.
4. 🌐 **FakeNet**: Jogo interativo sobre identificação de desinformação e fake news na web.
5. 👧 **Reflexão ADA**: Protótipo de narrativa e arte conceitual desenvolvido na *Apple Developer Academy*.
6. 🔢 **NumberWizardUI**: Jogo de lógica matemática e busca binária com interface gráfica interativa.
7. 🗝️ **PRISON**: Desafio de escape room com fechadura de botões e observação de pistas e impressões digitais.

### 2.2. Apresentação e Responsividade em CSS Grid
- Renderização através de **Bento Cards** com badges de tecnologia (`Play in browser`, `Adventure`, `IA & Saúde`), descrição real do jogo e botão direcionando para a página do jogo específico no Itch.io.
- Layout fluido em **CSS Grid** (`repeat(auto-fit, minmax(320px, 1fr))`) compatível com dispositivos móveis, tablets e desktops.

### 2.3. Módulo JavaScript (`js/modules/itchio.js`)
- Módulo isolado `ItchIoModule` que renderiza declarativamente os 7 jogos com links diretos individuais.

---

## 3. Critérios de Aceite

| ID | Critério | Descrição |
|---|---|---|
| **CA-01** | Fidelidade dos Jogos | Todos os 7 jogos reais da conta `maaryhabad.itch.io` devem estar presentes com seus respectivos títulos, premissas e badges. |
| **CA-02** | Links Funcionais | Cada card deve possuir botão que abre a página correspondente no Itch.io em nova aba (`target="_blank"` com `rel="noopener noreferrer"`). |
| **CA-03** | Efeito Spotlight & Hover | Os cartões de jogos devem herdar o efeito de iluminação do cursor (*spotlight*) e transição suave ao passar o mouse. |

---

## 4. Status do Passo
- **Status:** ✅ Concluído / Pronto para Validação
- **Próximo Passo:** Passo 10 - Feedback Visual com Modal de Sucesso Customizado
