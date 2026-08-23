# Especificação Técnica SDD - Passo 5: Seção "Portfólio" - Estrutura de Abas e Grade Responsiva (CSS Grid)

## 1. Visão Geral
Esta especificação descreve a implementação da seção semântica **"Portfólio" (`#portfolio`)**, projetada com um sistema de **Abas Interativas (Tabs Navigation)** para alternar suavemente entre 3 categorias autorais:
1. 🐙 **Projetos & Repositórios GitHub**
2. ✍️ **Artigos & Ensaios no Medium**
3. 🎮 **Jogos & Protótipos no Itch.io**

O layout dos projetos é estruturado em **CSS Grid nativo e responsivo** (`repeat(auto-fit, minmax(320px, 1fr))`), utilizando *Bento Cards* com a identidade visual **Marsala, Rosé Gold e Dourado**.

---

## 2. Guia de Configuração das Plataformas Externas (GitHub, Medium & Itch.io)

Para garantir que o carregamento dinâmico e os embeds funcionem perfeitamente nas próximas etapas, consulte as instruções abaixo para cada plataforma:

### 2.1. GitHub
- **Usuário Padrão:** `maaryhabad` (ou o usuário configurado em seu perfil).
- **Requisitos na Plataforma:**
  - Os repositórios que você deseja exibir devem estar configurados como **Públicos** no GitHub (**Settings > Danger Zone > Change repository visibility > Make public**).
  - Para melhor apresentação, preencha a **Description** (descrição) e adicione **Topics/Tags** (ex: `javascript`, `swift`, `games`, `education`) em cada repositório.

### 2.2. Medium
- **Nome de Usuário / Handle:** `@maryh.abad` (ou seu @ no Medium).
- **Como Funciona a Integração:**
  - O Medium disponibiliza nativamente um feed público RSS no formato: `https://medium.com/feed/@seu-usuario`.
  - No Passo 7, utilizaremos um conversor seguro e gratuito (RSS-to-JSON API) para transformar seus artigos públicos em dados estruturados que serão renderizados dinamicamente na aba do Medium.
  - **Requisito:** Ter pelo menos 1 artigo publicado publicamente em sua conta do Medium.

### 2.3. Itch.io
- **Perfil na Plataforma:** Seu usuário no Itch.io onde seus jogos e protótipos da *Global Game Jam* estão hospedados.
- **Como obter o Embed / ID do Jogo:**
  - No painel do seu jogo no Itch.io, vá em **Distribute > Embed game**.
  - O Itch.io fornece um código `<iframe>` com o ID numérico do jogo (ex: `https://itch.io/embed/1234567`).
  - No Passo 8, utilizaremos esses IDs em containers responsivos que preservam o aspect-ratio em qualquer dispositivo.

---

## 3. Requisitos Técnicos

### 3.1. Estrutura Semântica HTML5
- Elemento `<section id="portfolio" class="section-container">`.
- Cabeçalho de seção com badge (`<span class="glass-pill-badge">`), título e descrição.
- Barra de Abas Interativas (`<nav class="portfolio-tabs-nav" aria-label="Filtro de Projetos">`):
  - Botões semânticos (`<button class="portfolio-tab-btn" data-target="panel-id">`).
  - Atributos de acessibilidade (`role="tab"`, `aria-selected="true/false"`, `aria-controls="panel-id"`).
- Painéis de Conteúdo (`<div class="portfolio-tab-panel" role="tabpanel">`):
  - `#github-tab-panel`: Contêiner com grade para repositórios.
  - `#medium-tab-panel`: Contêiner com grade para artigos.
  - `#itchio-tab-panel`: Contêiner com grade para jogos e embeds.

### 3.2. Estilização com CSS Grid Puro (`css/sections/portfolio.css`)
- **Grade Responsiva**:
  ```css
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.75rem;
  ```
- **Abas com Efeito Glow**:
  - Botão ativo com gradiente dourado/rosé gold, iluminação radial e indicador visual suave.
- **Transição de Painéis**:
  - Animação de *fade-in* e elevação suave (`@keyframes tabFadeIn`) ao alternar entre as abas.

### 3.3. Comportamento JavaScript Modular (`js/modules/portfolio-tabs.js`)
- Módulo isolado `PortfolioTabsModule` com escuta de eventos de clique nos botões de abas.
- Alternância dinâmica de classes `.is-active` e atualização dos atributos `aria-selected`.

---

## 4. Critérios de Aceite

| ID | Critério | Descrição |
|---|---|---|
| **CA-01** | Sistema de Abas Funcional | O clique nas abas (GitHub, Medium, Itch.io) deve alternar imediatamente o painel visível sem recarregar a página. |
| **CA-02** | CSS Grid Responsivo | As grades de projetos devem reorganizar os cards automaticamente conforme o redimensionamento da janela. |
| **CA-03** | Acessibilidade (WAI-ARIA) | As abas devem possuir atributos `role="tab"`, `role="tabpanel"` e `aria-selected` atualizados via JS. |
| **CA-04** | Fidelidade ao Design System | Utilização estrita dos tokens Marsala, Rosé Gold e Dourado com glassmorphism. |
| **CA-05** | Documentação das Plataformas | Inclusão de guia claro para GitHub, Medium e Itch.io. |

---

## 5. Protocolo de Verificação Manual

1. **Teste de Alternância de Abas**:
   - Abrir o site no navegador e clicar sucessivamente em "GitHub", "Medium" e "Itch.io".
   - Confirmar que o painel selecionado é exibido com animação suave e os demais são ocultados.
2. **Teste de Responsividade**:
   - Reduzir a largura da tela e validar a reorganização dos cards na grade CSS Grid.
3. **Auditoria de Console**:
   - Garantir que nenhum erro de execução JavaScript ocorra no DevTools.

---

## 6. Status do Passo
- **Status:** ✅ Concluído / Pronto para Validação
- **Próximo Passo:** Passo 6 - Integração Dinâmica e Assíncrona com API do GitHub (script.js)
