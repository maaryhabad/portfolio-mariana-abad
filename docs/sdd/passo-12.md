# Especificação Técnica SDD - Passo 12: Scroll Spy e Menu Hambúrguer Responsivo

## 1. Visão Geral
Esta especificação descreve a implementação do **Scroll Spy Dinâmico** e do **Menu Mobile Hambúrguer Responsivo** para o cabeçalho (*HUD Header*) do portfólio.

O objetivo é proporcionar navegação contextual e fluida:
1. **Scroll Spy:** Destacar automaticamente o link de navegação correspondente à seção atualmente visível na viewport (`.is-active`), atualizando tanto o menu desktop quanto o drawer mobile em tempo real.
2. **Menu Mobile Hambúrguer:** Oferecer abertura/fechamento em gaveta (*drawer*) com efeito glassmorphism, animação suave, acessibilidade total via teclado (`Escape`), fechamento ao clicar fora ou em qualquer item, e controle do atributo `aria-expanded`.

---

## 2. Requisitos Técnicos

### 2.1. Módulo Scroll Spy (`js/modules/scrollspy.js`)
- Utiliza `IntersectionObserver` de alta performance ou cálculo preciso de coordenadas da janela com `scroll` e `debounce/requestAnimationFrame`.
- Monitora todas as seções mapeadas no menu de navegação:
  - `#sobre-mim`
  - `#alem-do-codigo`
  - `#formacao`
  - `#portfolio`
  - `#contato`
- Aplica a classe CSS `.is-active` ao link `a[href="#..."]` correspondente e remove dos demais.

### 2.2. Menu Mobile Hambúrguer (`js/modules/menu.js`)
- **Botão Disparador:** `#mobileMenuBtn` com transição de ícone (`☰` / `✕`) e controle de `aria-expanded="true/false"`.
- **Drawer de Navegação:** `#navMenu` com abertura lateral suave (`transform: translateX(0)`), fundo em *Glassmorphism Deep Marsala* e desfoque *backdrop-filter*.
- **Comportamentos de Fechamento Automático:**
  1. Clique em qualquer link do menu (`.nav-link`).
  2. Clique fora da área do menu (no backdrop).
  3. Pressionamento da tecla `Escape` no teclado.
  4. Redimensionamento da tela para larguras de desktop (`> 868px`).

### 2.3. Estilização CSS (`css/components/header.css`)
- Estilo ativo dos links com sublinhado dourado brilhante e brilho (*glow*):
  ```css
  .nav-link.is-active {
      color: var(--gold-light);
      text-shadow: 0 0 12px var(--gold-glow);
  }
  .nav-link.is-active::after {
      width: 100%;
      background: var(--gold-primary);
  }
  ```
- Drawer mobile com transição cubic-bezier rápida e responsividade total em smartphones e tablets.

---

## 3. Critérios de Aceite

| ID | Critério | Descrição |
|---|---|---|
| **CA-01** | Ativação Precisa no Scroll | À medida que o usuário rola a página, o link correspondente à seção visível no topo recebe a classe `.is-active`. |
| **CA-02** | Abertura/Fechamento Mobile | O menu hambúrguer deve abrir e fechar com animação fluida ao clicar no botão `#mobileMenuBtn`. |
| **CA-03** | Fechamento por Ação do Usuário | O menu mobile deve fechar automaticamente ao clicar em um link, ao clicar fora ou ao pressionar `Escape`. |
| **CA-04** | Acessibilidade (ARIA) | O botão `#mobileMenuBtn` deve manter o atributo `aria-expanded` sincronizado com o estado visual do menu. |
| **CA-05** | Responsividade e Clean Code | Desenvolvido sem bibliotecas externas em Vanilla JS e CSS3 puro. |

---

## 4. Protocolo de Verificação Manual

1. **Teste de Scroll Spy:**
   - Rolar a página lentamente da Hero até a seção Contato.
   - Verificar se os links "Sobre Mim", "Além do Código", "Formação", "Portfólio" e "Contato" se iluminam sequencialmente no cabeçalho.
2. **Teste do Menu Hambúrguer (Mobile View < 868px):**
   - Abrir as ferramentas de desenvolvedor do navegador e simular tela de celular (ex: 375px).
   - Clicar no botão `☰` e verificar se a gaveta do menu surge suavemente.
   - Clicar no link "Formação" e verificar se a tela rola suavemente até a seção e a gaveta fecha automaticamente.
3. **Teste com Teclado:**
   - Abrir o menu mobile e pressionar a tecla `Escape` para testar o fechamento imediato.

---

## 5. Status do Passo
- **Status:** 🚀 Em Execução / Implementado
- **Próximo Passo:** Passo 13 - Consolidação do README.md e Revisão Final
