# Portfólio Pessoal & Currículo Online — Mariana Abad

> **Atividade Prática – Fundamentos da Programação Web (UNINTER)**  
> **Desenvolvedora:** Mariana Abad  
> **Hospedagem (GitHub Pages):** [https://maaryhabad.github.io/portfolio-mariana-abad/](https://maaryhabad.github.io/portfolio-mariana-abad/)  
> **Repositório GitHub:** [https://github.com/maaryhabad/portfolio-mariana-abad](https://github.com/maaryhabad/portfolio-mariana-abad)

---

## 🌟 Visão Geral do Projeto

Este projeto consiste em um **Portfólio Pessoal (Currículo Online)** moderno, responsivo e de alta fidelidade visual, construído no modelo **Single Page Website com navegação por âncoras (`#id`)**.

O desenvolvimento é orientado pela metodologia de **Desenvolvimento Baseado em Especificações (Spec-Driven Development — SDD)** de forma incremental, aplicando princípios de **Clean Code**, **Design System nativo** e conformidade absoluta com as diretrizes acadêmicas: **100% Vanilla (HTML5 semântico, CSS3 puro e JavaScript ES6+ assíncrono)**, sem o uso de qualquer framework ou biblioteca externa (como Bootstrap, Tailwind, React, Vue, jQuery, etc.).

---

## 🎨 Identidade Visual & Paleta Cromática

A identidade visual do portfólio une a elegância do **Marsala**, a sofisticação calorosa do **Rosé Gold** e o requinte do **Dourado**, combinando técnicas avançadas de *glassmorphism* (`backdrop-filter`), iluminação radial, contrastes apurados e alternância fluida entre **Dark Mode** e **Light Mode**:

| Elemento / Camada | Tom / Hexadecimal | Aplicação Principal |
|---|---|---|
| **Marsala Dark Base** | `#0f0508` / `#1a0a10` | Fundo principal da aplicação e contraste de profundidade |
| **Marsala Acento** | `#7a2337` / `#581827` | Superfícies secundárias, cabeçalhos e tons de destaque |
| **Rosé Gold Primário** | `#c88691` / `#e8b4bc` | Bordas translúcidas de vidro, gradientes de texto e títulos |
| **Dourado Imperial** | `#d4af37` / `#f3df95` | Ações principais, badges de status, botões interativos e ícones |
| **Vidro Glassmorphism** | `rgba(26, 10, 16, 0.85)` | Bento cards, menus flutuantes (HUD) e modais |

---

## 🚀 Tecnologias e Diretrizes de Engenharia

- **HTML5 Semântico:** Estruturação rica e acessível utilizando tags como `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<figure>`, `<figcaption>` e `<footer>`.
- **CSS3 Puro & Moderno:** Design System autoral com variáveis CSS (`:root`), Flexbox, CSS Grid (`repeat(auto-fit, minmax(...))`), Glassmorphism, Neumorphism sutil, transições fluidas e responsividade via Mobile-First / Media Queries.
- **JavaScript (ES6+) Vanilla:** Programação assíncrona com `async/await` e `fetch API` para integrações dinâmicas (GitHub API, Medium Feed), validações com Expressões Regulares (Regex), manipulação declarativa do DOM, Scroll Spy e persistência no `localStorage`.
- **Versionamento & Git:** Fluxo de commits atômicos estruturados sob o padrão *Conventional Commits*.
- **Hospedagem & Deploy:** GitHub Pages com integração contínua a partir da branch principal (`main`).

---

## 📂 Estrutura de Pastas e Arquivos

```text
portfolio-mariana-abad/
│
├── index.html              # Ponto de entrada Single Page com todas as seções semânticas
├── README.md               # Documentação técnica e visão geral do projeto
├── modelo.html             # Arquivo base/inspiração de layout e design tokens
│
├── css/
│   └── style.css           # Folha de estilo em CSS3 puro (Design Tokens, Grid, Glassmorphism, Paleta Marsala/Rosé/Gold)
│
├── js/
│   └── script.js           # Lógica JavaScript pura (APIs, Validação Regex, Modais, Dark Mode, ScrollSpy)
│
├── assets/
│   ├── curriculo.pdf       # Currículo em PDF disponível para download
│   └── img/                # Imagens otimizadas, avatares e ícones vetoriais
│
└── docs/
    └── sdd/                # Especificações Técnicas Incrementais (Spec-Driven Development)
        ├── passo-1.md      # Setup do Repositório, README.md e SDD (Paleta Marsala/Rosé Gold/Gold)
        ├── passo-2.md      # Menu de Navegação Fixo (Sticky Glass Header)
        ├── passo-3.md      # Seção "Sobre Mim", Hobbies e Download PDF
        ├── passo-4.md      # Seção "Formação" com Timeline CSS pura
        ├── passo-5.md      # Seção "Portfólio" com CSS Grid e Abas
        ├── passo-6.md      # Integração Dinâmica com GitHub API
        ├── passo-7.md      # Integração Dinâmica de Artigos do Medium
        ├── passo-8.md      # Embeds Responsivos do Itch.io
        ├── passo-9.md      # Seção "Contato" e Validação com Regex
        ├── passo-10.md     # Modal Customizado de Feedback de Envio
        ├── passo-11.md     # Tema Dinâmico Claro/Escuro com LocalStorage
        ├── passo-12.md     # Scroll Spy e Menu Mobile Hambúrguer
        └── passo-13.md     # Relatório Final de Entrega e Auditoria
```

---

## 🧭 Roteiro de Especificações (Spec-Driven Development - SDD)

A evolução deste projeto é conduzida passo a passo através de especificações técnicas detalhadas:

| Passo | Especificação Técnica | Status |
|---|---|---|
| **01** | [Setup do Repositório, README e SDD](docs/sdd/passo-1.md) | ✅ Concluído |
| **02** | [Menu de Navegação Fixo (Sticky Header)](docs/sdd/passo-2.md) | ⏳ A Iniciar |
| **03** | [Seção Sobre Mim, Hobbies e Download PDF](docs/sdd/passo-3.md) | ⏳ A Iniciar |
| **04** | [Seção Formação com Timeline CSS Pura](docs/sdd/passo-4.md) | ⏳ A Iniciar |
| **05** | [Seção Portfólio com CSS Grid e Abas](docs/sdd/passo-5.md) | ⏳ A Iniciar |
| **06** | [Integração com API REST Pública do GitHub](docs/sdd/passo-6.md) | ⏳ A Iniciar |
| **07** | [Integração de Posts do Medium via JS Assíncrono](docs/sdd/passo-7.md) | ⏳ A Iniciar |
| **08** | [Embeds e Projetos do Itch.io](docs/sdd/passo-8.md) | ⏳ A Iniciar |
| **09** | [Formulário de Contato com Validação Regex](docs/sdd/passo-9.md) | ⏳ A Iniciar |
| **10** | [Modal de Confirmação e Feedback Visual](docs/sdd/passo-10.md) | ⏳ A Iniciar |
| **11** | [Alternador de Tema Claro/Escuro (Dark Mode)](docs/sdd/passo-11.md) | ⏳ A Iniciar |
| **12** | [Scroll Spy e Menu Mobile Responsivo](docs/sdd/passo-12.md) | ⏳ A Iniciar |
| **13** | [Consolidação, Revisão Final e Auditoria](docs/sdd/passo-13.md) | ⏳ A Iniciar |

---

## 💻 Instruções de Execução Local

Como o projeto é construído em tecnologia puramente nativa (**Vanilla**), não há dependências de build (`npm install`, `webpack`, `vite`, etc.).

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/maaryhabad/portfolio-mariana-abad.git
   cd portfolio-mariana-abad
   ```

2. **Abra no navegador:**
   - Basta abrir o arquivo `index.html` diretamente em qualquer navegador moderno, ou
   - Utilizar a extensão **Live Server** no Visual Studio Code para recarregamento automático em desenvolvimento local.

---

## 🌐 Publicação (Deploy no GitHub Pages)

1. No repositório no GitHub, acesse **Settings > Pages**.
2. Na seção **Build and deployment**, selecione a branch `main` e o diretório `/ (root)`.
3. Clique em **Save**. Em instantes, o site estará publicado e acessível publicamente.

---

## 📄 Licença e Autoria
Desenvolvido por **Mariana Abad** como projeto prático acadêmico da disciplina de Fundamentos da Programação Web — UNINTER.