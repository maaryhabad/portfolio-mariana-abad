# Especificação Técnica SDD - Passo 2: Menu de Navegação Fixo (Sticky Header) baseado no Modelo

## 1. Visão Geral
Esta especificação detalha a criação do **Header Flutuante Fixo (Sticky / HUD Header)** e do sistema de navegação semântica (`<header>` e `<nav>`), herdando o refinamento visual do `modelo.html` adaptado para a paleta **Marsala, Rosé Gold e Dourado**, em **CSS3 puro** (sem frameworks) e **HTML5 semântico**.

---

## 2. Requisitos Técnicos

### 2.1. Estrutura Semântica HTML5
- Elemento `<header>` com classe de posicionamento fixo/sticky no topo (`z-index: 100`).
- Elemento `<nav>` contendo a lista não ordenada `<ul>` com links de âncoras para as 4 seções obrigatórias:
  - `<a href="#sobre-mim">Sobre Mim</a>`
  - `<a href="#formacao">Formação</a>`
  - `<a href="#portfolio">Portfólio</a>`
  - `<a href="#contato">Contato</a>`
- Elemento de Identidade de Marca (Logo/Brand) com ícone estilizado e tipografia expressiva: **Mariana Abad** `<span class="badge-role">Software Eng.</span>`.
- Indicador de Status Dinâmico (*HUD Status Pill*): **"Disponível para Projetos"** com ponto pulsante dourado (`.status-dot-gold`).
- Barra de Progresso de Leitura (*Scroll Progress Bar*) no topo superior da viewport (`height: 2px` com gradiente Rosé Gold e Dourado).

### 2.2. Design System e Estilização CSS3 Pura
- **Efeito Glassmorphism**:
  - `background: rgba(15, 5, 8, 0.75);` (Marsala translúcido)
  - `backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);`
  - `border-bottom: 1px solid rgba(232, 180, 188, 0.15);` (Borda sutil em Rosé Gold)
- **Efeitos de Hover e Transição**:
  - Links de navegação com cor suave (`var(--text-muted)`), transição para `var(--rose-gold-light)` e sublinhado luminoso com pseudo-elemento `::after`.
  - Botão ou link ativo com destaque dourado (`var(--gold-primary)`).
- **Layout Responsivo**:
  - Flexbox (`display: flex; justify-content: space-between; align-items: center;`) com espaçamento fluido e limitação máxima de largura (`max-width: 1300px; margin: 0 auto;`).

---

## 3. Critérios de Aceite

| ID | Critério | Descrição |
|---|---|---|
| **CA-01** | Fixação no Topo | O `<header>` deve permanecer fixo no topo da tela durante a rolagem do usuário (`position: sticky` ou `position: fixed`). |
| **CA-02** | Navegação por Âncoras | Os 4 links do menu devem apontar corretamente para `#sobre-mim`, `#formacao`, `#portfolio` e `#contato`. |
| **CA-03** | Efeito Visual Glassmorphism | O fundo do cabeçalho deve apresentar transparência com desfoque (*backdrop blur*) e borda sutil na cor Rosé Gold. |
| **CA-04** | Indicador de Status e Brand | O logotipo com nome e o indicador com ponto pulsante devem estar visíveis e alinhados. |
| **CA-05** | Zero Frameworks | Implementado exclusivamente com HTML5 semântico e CSS3 nativo. |

---

## 4. Protocolo de Verificação Manual

1. **Teste de Rolagem**:
   - Abrir o `index.html` no navegador e rolar a página para verificar se o header acompanha a tela sem tremulações.
2. **Teste de Links de Âncoras**:
   - Clicar nos links de navegação para certificar que o hash da URL é atualizado para a respectiva âncora.
3. **Inspeção de Estilos no DevTools**:
   - Verificar as propriedades CSS aplicadas: `backdrop-filter`, variáveis `:root` e ausência de classes de bibliotecas externas.

---

## 5. Status do Passo
- **Status:** ✅ Concluído / Pronto para Validação
- **Próximo Passo:** Passo 3 - Seção "Sobre Mim" e Download de Currículo PDF
