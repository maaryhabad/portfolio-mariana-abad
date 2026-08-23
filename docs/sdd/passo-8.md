# Especificação Técnica SDD - Passo 8: Embeds e Integração de Jogos Itch.io

## 1. Visão Geral
Esta especificação estabelece a implementação dos cartões e contêineres responsivos para os **Jogos, Protótipos e Experiências Interativas do Itch.io (`https://maaryhabad.itch.io/`)**, criados ao longo de 12 edições da *Global Game Jam* e da *Apple Developer Academy*. A seção conta com suporte a **Embeds responsivos (iframes)** com proporção preservada (*aspect-ratio*), badges temáticas (Engine, Gênero, Jam) e links diretos para jogar.

---

## 2. Requisitos Técnicos

### 2.1. Perfil e Integração do Itch.io
- **Perfil Oficial:** `https://maaryhabad.itch.io/`
- **Catálogo de Projetos de Destaque:**
  1. 🎮 **Rhythm & Resonance (Global Game Jam Edition)**: Jogo de puzzle e harmonia baseado em frequências sonoras e mecânicas acústicas.
  2. 🕹️ **Astral Odyssey**: Aventura e exploração espacial com mecânicas de física gravitacional desenvolvida em game jam.
  3. 🧩 **Shadow Crypt**: Jogo de lógica e plataforma 2D com iluminação dinâmica e manipulação de sombras.
  4. 👾 **Jam Vault & Game Collection**: Vitrine e arquivo com as participações em game jams, experimentos interativos e builds jogáveis no navegador.

### 2.2. Contêineres de Embeds Responsivos em CSS3 Puro
- **Suporte a iframes sem quebra de layout**:
  - Uso de `.embed-responsive-wrapper` com `position: relative`, `width: 100%`, `aspect-ratio: 16 / 9` ou `min-height: 180px`.
  - Configuração do iframe com `border: none`, `border-radius: 12px`, `allowfullscreen` e `loading="lazy"`.
- **Efeito Visual Glassmorphism**:
  - Cartões estilizados com a paleta Marsala, Rosé Gold e Dourado.
  - Badges de Engine (ex: `Unity`, `Godot`, `Swift / SpriteKit`, `WebGL`) e Game Jam.

### 2.3. Módulo JavaScript (`js/modules/itchio.js`)
- Módulo isolado para renderização declarativa e gerenciamento dos jogos autorais e do contêiner `#itchioGamesGrid`.
- Integração e orquestração no `script.js`.

---

## 3. Critérios de Aceite

| ID | Critério | Descrição |
|---|---|---|
| **CA-01** | Responsividade de Embeds | Os cards e iframes do Itch.io não devem vazar nem quebrar a largura da tela em dispositivos móveis. |
| **CA-02** | Metadados dos Jogos | Cada card deve apresentar título, descrição da premissa, engine utilizada, badges de jam e botões de ação ("Jogar no Itch.io"). |
| **CA-03** | Links Oficiais | Todos os botões devem apontar para a conta oficial `https://maaryhabad.itch.io/` ou para os jogos correspondentes. |
| **CA-04** | Acessibilidade e Lazy Loading | iframes devem conter atributos `title`, `loading="lazy"` e links externos com `rel="noopener noreferrer"`. |
| **CA-05** | Fidelidade ao Design System | Padronização com Bento Cards, iluminação radial e botões dourados luminosos. |

---

## 4. Protocolo de Verificação Manual

1. **Teste de Visualização na Aba Itch.io**:
   - Clicar na aba "Jogos no Itch.io" e certificar que todos os 4 cards de jogos são carregados com seus respectivos emblemas.
2. **Teste de Links**:
   - Clicar nos botões "Jogar no Itch.io" e validar o redirecionamento para o perfil `https://maaryhabad.itch.io/`.
3. **Teste de Responsividade**:
   - Reduzir a viewport para largura mobile (`375px`) e verificar se os cards e botões se ajustam fluidamente.

---

## 5. Status do Passo
- **Status:** ✅ Concluído / Pronto para Validação
- **Próximo Passo:** Passo 9 - Seção "Contato" - Formulário e Validação com Regex (Clean Code)
