# Especificação Técnica SDD - Passo 1: Inicialização do Repositório, README.md e Setup do SDD

## 1. Visão Geral
Este documento estabelece a especificação formal e arquitetural para o setup inicial do portfólio web responsivo da desenvolvedora **Mariana Abad**, desenvolvido segundo os preceitos de **Spec-Driven Development (SDD)**, **Clean Code** e tecnologias puramente nativas (**Vanilla HTML5, CSS3 e JavaScript ES6+**), sem qualquer framework ou biblioteca externa.

A identidade visual adota uma estética luxuosa, moderna e de alta fidelidade baseada na tríade cromática de **Marsala**, **Rosé Gold** e **Dourado**, combinando *glassmorphism*, iluminação radial (*card glow*) e contrastes apurados tanto no Dark Mode quanto no Light Mode.

---

## 2. Requisitos Técnicos

### 2.1. Estrutura de Diretórios
O projeto segue uma separação rigorosa de responsabilidades:
- `index.html`: Ponto de entrada da aplicação Single Page Website (SPA com âncoras semânticas).
- `css/`: Folhas de estilo modulares e semânticas em CSS3 puro.
  - `css/style.css`: Estilos globais, design tokens, variáveis CSS `:root`, glassmorphism, tipografia e responsividade.
- `js/`: Scripts modulares em Vanilla JS com padrões assíncronos e orientação a objetos/módulos funcionais.
  - `js/script.js`: Controlador principal de eventos, integrações REST API, validação e temas.
- `assets/`: Arquivos estáticos (imagens, ícones em SVG, currículo em PDF).
- `docs/sdd/`: Diretório de documentação de Especificação Baseada em Desenvolvimento (SDD - Spec-Driven Development), contendo os passos de 1 a 13.

### 2.2. Design System & Paleta Cromática (Marsala, Rosé Gold & Dourado)
As variáveis globais de CSS (`:root`) definem os tokens oficiais da aplicação:
- **Marsala Profundo (Background & Superfícies):**
  - `--bg-color: #0f0508;` (Fundo primário Dark)
  - `--surface-card: rgba(26, 10, 16, 0.85);` (Vidro Glassmorphism)
  - `--marsala-primary: #7a2337;` / `--marsala-dark: #420f1b;`
- **Rosé Gold (Acentos, Bordas e Gradientes Sutis):**
  - `--rose-gold: #c88691;` / `--rose-gold-light: #e8b4bc;`
  - `--border-glass: rgba(232, 180, 188, 0.18);`
  - `--card-glow: rgba(200, 134, 145, 0.22);`
- **Dourado Imperial (Destaques, Badges e Ações de Sucesso):**
  - `--gold-primary: #d4af37;` / `--gold-light: #f3df95;`
  - `--gradient-gold: linear-gradient(135deg, #f3df95 0%, #d4af37 50%, #9a7617 100%);`
- **Tipografia:**
  - Fonte primária: `'Inter', sans-serif`
  - Fonte monoespaçada (código, tags e badges): `'JetBrains Mono', monospace`

### 2.3. Restrições e Padrões Arquiteturais
- **Semântica HTML5 Estrita**: Uso exclusivo de elementos semânticos (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<figure>`, `<footer>`).
- **Zero Frameworks/Libs**: Proibição terminante de Bootstrap, Tailwind, React, Vue, jQuery ou similares (em total conformidade com as diretrizes acadêmicas da UNINTER).
- **Herança de Design de `modelo.html`**: Adaptação dos padrões visuais (HUD floating navigation, glassmorphism, bento cards, timeline e modais) para CSS3 nativo puro e modular sob a nova paleta Marsala/Rosé Gold/Dourado.
- **Padrão de Commits**: Conventional Commits (`chore:`, `feat:`, `docs:`, `fix:`, `refactor:`).

---

## 3. Critérios de Aceite

| ID | Critério | Descrição |
|---|---|---|
| **CA-01** | Estrutura de Pastas | As pastas `docs/sdd/`, `css/`, `js/` e `assets/` devem estar organizadas e estruturadas na raiz. |
| **CA-02** | Documentação do Passo 1 | O arquivo `docs/sdd/passo-1.md` deve estar preenchido com a nova paleta (Marsala/Rosé Gold/Dourado), requisitos e protocolo de teste. |
| **CA-03** | README.md Completo | O `README.md` da raiz deve conter visão geral, nova paleta de cores, tecnologias, estrutura de pastas, guia SDD e instruções de deploy. |
| **CA-04** | Rastreabilidade Git | Todas as alterações devem ser comitáveis atomicamente sob o Conventional Commit definido. |

---

## 4. Protocolo de Verificação Manual

1. **Validação da Estrutura**:
   - Confirmar a existência e integridade dos arquivos `README.md` e `docs/sdd/passo-1.md`.
2. **Revisão Documental da Paleta de Cores**:
   - Garantir que as diretrizes visuais em toda a documentação especificam a combinação Marsala, Rosé Gold e Dourado com as respectivas variáveis de `:root`.
3. **Auditoria de Conformidade**:
   - Assegurar a ausência total de dependências externas ou bibliotecas proibidas.

---

## 5. Status do Passo
- **Status:** ✅ Concluído / Pronto para Validação
- **Próximo Passo:** Passo 2 - Menu de Navegação Fixo (Sticky Header) baseado no Modelo
