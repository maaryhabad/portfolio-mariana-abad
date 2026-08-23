# Especificação Técnica SDD - Passo 3: Seção "Sobre Mim" e Download de Currículo PDF

## 1. Visão Geral
Esta especificação descreve a implementação da seção semântica **"Sobre Mim" (`#sobre-mim`)**, apresentando o perfil profissional e pessoal da desenvolvedora **Mariana Beilune Abad**, área de hobbies e interesses em `<aside>`, foto com `<figure>` e `<figcaption>`, badges de destaque e o botão funcional para download do currículo em PDF (`assets/curriculo.pdf`).

---

## 2. Requisitos Técnicos

### 2.1. Estrutura Semântica HTML5
- Elemento `<section id="sobre-mim" class="section-container">` servindo como âncora principal.
- Divisão em grade de apresentação (Bento Layout):
  - **Cartão Principal de Apresentação (`<article class="about-card-main">`)**:
    - Título hierárquico `<h1>` / `<h2>` com gradiente de texto (*Rosé Gold* e *Dourado*).
    - Parágrafos biográficos reais e autênticos (maternidade, graduação em SI na UNINTER, atuação como Sênior PO no Instituto de Pesquisas Eldorado / projeto TIC em trilhas com MCTI, formação na Apple Developer Academy e bolsas internacionais).
    - Botão semântico de ação principal (`<a href="assets/curriculo.pdf" download="Curriculo-Mariana-Abad.pdf" class="btn-gold-glow">`) com atributos de download e ícone vetorial.
  - **Elemento de Mídia (`<figure class="profile-figure">`)**:
    - Imagem / Avatar vetorial ilustrativo com borda luminosa radial.
    - `<figcaption>` com nome completo e título de atuação profissional.
  - **Painel Lateral de Hobbies & Interesses (`<aside class="hobbies-aside">`)**:
    - Estruturado com cartões de interesse: *Global Game Jam & Game Dev* (12x participante, 10x organizadora, bolsa GDC 2019), *Música & Produção Sonora* (Licenciatura, Especialização na PUC-PR e Trombone), *Mentoria de Startups* (9weeklabs) e *Agentes de IA*.

### 2.2. Estilização em CSS3 Puro (Marsala, Rosé Gold & Dourado)
- **Bento Card Glassmorphism**: Fundo em `rgba(26, 10, 16, 0.85)`, borda em `rgba(232, 180, 188, 0.18)` e desfoque `backdrop-filter: blur(28px)`.
- **Botão Dourado de Alta Fidelidade (`.btn-gold-glow`)**:
  - Gradiente dourado imperial com reflexo dinâmico de luz (`::after` com animação de shimmer ao passar o mouse).
  - Sombra projetada em glow dourado (`box-shadow: 0 0 25px rgba(212, 175, 55, 0.35)`).
- **Layout Responsivo**:
  - Grid bidimensional com transição para coluna única em dispositivos móveis (`max-width: 968px`).

---

## 3. Critérios de Aceite

| ID | Critério | Descrição |
|---|---|---|
| **CA-01** | Semântica Rígida | A seção deve utilizar `<section>`, `<article>`, `<figure>`, `<figcaption>` e `<aside>` corretamente. |
| **CA-02** | Dados Reais e Autênticos | O conteúdo biográfico deve refletir a trajetória real descrita no currículo oficial da Mariana Abad. |
| **CA-03** | Download do Currículo | O botão "Baixar Currículo (PDF)" deve disparar o download direto do arquivo `assets/curriculo.pdf`. |
| **CA-04** | Painel de Hobbies (`<aside>`) | O aside deve exibir os 4 pilares de hobbies com ícones visuais e descrições concisas. |
| **CA-05** | Responsividade e Acessibilidade | O layout deve se adaptar fluidamente a smartphones, tablets e desktops com contraste adequado. |

---

## 4. Protocolo de Verificação Manual

1. **Teste de Download**:
   - Clicar no botão "Baixar Currículo (PDF)" e certificar que o arquivo `Curriculo-Mariana-Abad.pdf` é baixado localmente.
2. **Teste de Âncora**:
   - Clicar no item "Sobre Mim" no cabeçalho e verificar se a rolagem posiciona a seção suavemente no topo com o devido offset.
3. **Auditoria de Semântica e Acessibilidade**:
   - Inspecionar a árvore de elementos no DevTools para validar a presença de `<figure>`, `<figcaption>` e `<aside>`.

---

## 5. Status do Passo
- **Status:** ✅ Concluído / Pronto para Validação
- **Próximo Passo:** Passo 4 - Seção "Formação" com Linha do Tempo (Timeline)
