# Especificação Técnica SDD - Passo 11: Alternador de Tema Dinâmico (Light/Dark Mode)

## 1. Visão Geral
Esta especificação descreve a implementação do **Alternador de Tema Dinâmico (Dark Mode & Light Mode)** com transições de cor suaves via variáveis CSS (`:root` e `[data-theme="light"]`), botão interativo no cabeçalho (*HUD Header*) e **persistência local automática no `localStorage`**.

A paleta **Marsala, Rosé Gold e Dourado** foi calibrada para manter alta fidelidade, elegância e contraste visual em ambos os modos.

---

## 2. Requisitos Técnicos

### 2.1. Tokens de Tema Claro (`[data-theme="light"]`)
No modo claro, os valores das variáveis CSS são redefinidos para uma atmosfera sofisticada em tom *Alabaster Rosé & Marsala Nobre*:
- **Fundo Base:** `--bg-primary: #fbf5f6;` / `--bg-secondary: #f4eaec;`
- **Superfícies de Vidro:** `--surface-glass-card: rgba(255, 248, 250, 0.90);`
- **Textos:**
  - Principal: `--text-primary: #250912;` (Marsala escuro de alto contraste)
  - Secundário: `--text-secondary: #5e3240;`
  - Muted: `--text-muted: #8b5a69;`
- **Acentos Metálicos:**
  - `--gold-primary: #b8860b;` / `--gold-light: #d4af37;`
  - `--rose-gold: #a65863;` / `--rose-gold-light: #c88691;`
  - `--border-glass: rgba(166, 88, 99, 0.20);`
  - `--border-glass-hover: rgba(184, 134, 11, 0.45);`

### 2.2. Botão Alternador no Cabeçalho (`#themeToggleBtn`)
- Botão semântico `<button id="themeToggleBtn" class="theme-toggle-btn" aria-label="Alternar tema claro e escuro">`:
  - Ícone dinâmico: `🌙` (quando em modo escuro) / `☀️` (quando em modo claro).
  - Animação de rotação e escala no clique (`transform: rotate(360deg)`).

### 2.3. Módulo JavaScript (`js/modules/theme.js`)
- **Ordem de Prioridade de Carregamento:**
  1. Valor salvo no `localStorage.getItem('portfolio_theme')`.
  2. Preferência nativa do sistema operacional (`window.matchMedia('(prefers-color-scheme: light)')`).
  3. Padrão inicial: `dark`.
- **Persistência Imediata:** Atualização instantânea do `localStorage.setItem('portfolio_theme', theme)`.
- **Transição Global Suave:** `transition: background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease;`.

---

## 3. Critérios de Aceite

| ID | Critério | Descrição |
|---|---|---|
| **CA-01** | Alternância em 1 Clique | O clique no botão `#themeToggleBtn` deve alternar o tema entre `dark` e `light` instantaneamente. |
| **CA-02** | Persistência no LocalStorage | Ao recarregar a página ou reabrir o navegador, o último tema selecionado pelo usuário deve ser mantido. |
| **CA-03** | Contraste e Legibilidade | Todos os textos, botões e cartões devem manter legibilidade e harmonia com a paleta Marsala/Dourado em ambos os modos. |
| **CA-04** | Acessibilidade (ARIA) | O botão deve conter `aria-label` e refletir o estado atual. |
| **CA-05** | Zero Frameworks | Implementado puramente com CSS Custom Properties e Vanilla JS. |

---

## 4. Protocolo de Verificação Manual

1. **Teste de Alternância Visual**:
   - Clicar no botão do tema no cabeçalho e verificar se o fundo, cards e textos mudam para a paleta clara.
2. **Teste de Persistência**:
   - Com o modo claro ativo, pressionar `F5` (recarregar) e certificar que a página continua em modo claro.
3. **Teste de Ícone**:
   - Validar que o ícone do botão alterna entre lua (`🌙`) e sol (`☀️`).

---

## 5. Status do Passo
- **Status:** ✅ Concluído / Pronto para Validação
- **Próximo Passo:** Passo 12 - Scroll Spy e Menu Hambúrguer Responsivo
