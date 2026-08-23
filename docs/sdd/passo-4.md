# Especificação Técnica SDD - Passo 4: Seção "Formação" com Linha do Tempo (Timeline)

## 1. Visão Geral
Esta especificação estabelece a implementação da seção semântica **"Formação" (`#formacao`)**, estruturada como uma **Linha do Tempo Vertical (Timeline)** com alto padrão visual em **CSS3 puro** (utilizando pseudo-elementos `::before` e `::after`), além de cartões de **Idiomas** e **Certificações & Honrarias**, baseados nos dados acadêmicos reais de **Mariana Beilune Abad**.

---

## 2. Requisitos Técnicos

### 2.1. Estrutura Semântica HTML5
- Elemento `<section id="formacao" class="section-container">`.
- Cabeçalho de seção com badge temático (`<span class="glass-pill-badge">`), título `<h2>` com gradiente de texto e subtítulo explicativo.
- Contêiner de Linha do Tempo (`<div class="timeline-container">`):
  - Elementos de itens da timeline (`<article class="timeline-item">`):
    - Nó indicador luminoso com data/período (`<div class="timeline-dot">`).
    - Cartão de conteúdo (`<div class="bento-card timeline-card">`):
      - Tag de período e instituição (`<span class="timeline-period">`).
      - Título da formação/curso (`<h3 class="timeline-title">`).
      - Instituição de ensino (`<h4 class="timeline-institution">`).
      - Descrição e competências desenvolvidas.
- Grade secundária com duas colunas para:
  - **Idiomas (`<div class="bento-card lang-card">`)**: Português (Nativo), Inglês (Fluente / Full Professional), Árabe (Básico) com barras de proficiência estilizadas.
  - **Certificações & Reconhecimentos (`<div class="bento-card cert-card">`)**: Badges de Agentes de IA, Apple Teacher, IBM Watson, Google Student Ambassador 2026, Global Legal Hackathon.

### 2.2. Estilização da Linha do Tempo em CSS3 Puro
- **Eixo Central/Lateral da Linha do Tempo**:
  - Pseudo-elemento `::before` contínuo com gradiente vertical (`linear-gradient(to bottom, var(--gold-primary), var(--rose-gold), var(--marsala-primary))`).
- **Nós da Linha do Tempo (`.timeline-dot`)**:
  - Marcador circular com brilho dourado e anel exterior translúcido com efeito de pulso estático e hover dinâmico.
- **Glassmorphism nos Cartões**:
  - `background: rgba(26, 10, 16, 0.85);`
  - `border: 1px solid rgba(232, 180, 188, 0.18);`
  - `backdrop-filter: blur(24px);`
- **Responsividade Mobile-First**:
  - Em telas menores de `768px`, o eixo da timeline se alinha à esquerda e todos os cartões fluem em coluna única sem quebrar o layout.

---

## 3. Critérios de Aceite

| ID | Critério | Descrição |
|---|---|---|
| **CA-01** | Linha do Tempo CSS Pura | A timeline deve ser construída inteiramente com seletores e pseudo-elementos (`::before`/`::after`), sem bibliotecas de animação ou frameworks. |
| **CA-02** | Dados Acadêmicos Reais | A lista de formações deve contemplar: Bacharelado em SI (UNINTER), Apple Developer Academy (PUC-PR), Mestrado em Educação, Especializações e Licenciatura em Música. |
| **CA-03** | Idiomas & Certificações | Devem estar presentes os blocos de idiomas e certificações/honrarias com formatação rica. |
| **CA-04** | Fidelidade ao Design System | Manter a paleta Marsala, Rosé Gold e Dourado com transições suaves de hover. |
| **CA-05** | Responsividade | A linha e os nós da timeline devem se adaptar a qualquer largura de viewport sem overflow horizontal. |

---

## 4. Protocolo de Verificação Manual

1. **Teste Visual da Timeline**:
   - Abrir `index.html` e verificar se o eixo vertical liga perfeitamente todos os nós e cartões.
2. **Teste de Interatividade**:
   - Passar o mouse sobre os cartões e nós da timeline e verificar a elevação (`transform: translateY(-4px)`) e ampliação do glow dourado.
3. **Teste de Responsividade no DevTools**:
   - Reduzir a largura da janela para `375px` (mobile) e certificar que os nós alinham à esquerda e os cartões ocupam a largura total disponível.

---

## 5. Status do Passo
- **Status:** ✅ Concluído / Pronto para Validação
- **Próximo Passo:** Passo 5 - Seção "Portfólio" - Estrutura de Abas e Grade Responsiva (CSS Grid)
