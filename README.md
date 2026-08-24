# Portfólio Pessoal & Currículo Online — Mariana Abad

> **Atividade Prática – Fundamentos da Programação Web (UNINTER)**  
> **Desenvolvedora:** Mariana Beilune Abad  
> **Perfil Profissional:** Senior Product Owner no Instituto Eldorado & Engenheira de Software (Apple Developer Academy)  
> **Deploy GitHub Pages:** [https://maaryhabad.github.io/portfolio-mariana-abad/](https://maaryhabad.github.io/portfolio-mariana-abad/)  
> **Repositório GitHub:** [https://github.com/maaryhabad/portfolio-mariana-abad](https://github.com/maaryhabad/portfolio-mariana-abad)  

---

## 🌟 Visão Geral do Projeto

Este projeto consiste no **Portfólio Pessoal e Currículo Online** de alta fidelidade visual de **Mariana Beilune Abad**, construído como uma aplicação *Single Page Web* com navegação fluida por âncoras (`#id`).

Desenvolvido sob o rigor da metodologia **Spec-Driven Development (SDD)** e princípios de **Clean Code**, o projeto utiliza exclusivamente **tecnologias web nativas (HTML5 Semântico, CSS3 Moderno e JavaScript Vanilla ES6+)**, combinado com um **fundo 3D em Three.js** com renderização WebGL, efeitos de *Unreal Bloom*, poeira estelar orbital kepleriana (25.000 partículas) e scrollytelling na paleta nobre **Marsala, Rosé Gold e Dourado Imperial**.

---

## 🎨 Identidade Visual & Paleta Cromática

A identidade visual foi construída com base em harmonia estética, elegância executiva e técnicas avançadas de *glassmorphism* (`backdrop-filter`), com suporte bidirecional a **Dark Mode** e **Light Mode**:

| Token / Elemento | Hexadecimal Dark | Hexadecimal Light | Aplicação Principal |
|---|---|---|---|
| **Fundo Primário** | `#0a0305` | `#fbf5f6` | Pano de fundo geral da página |
| **Marsala Nobre** | `#8b263e` / `#4a101e` | `#7a1d32` / `#4a0f1e` | Superfícies ativas, cabeçalhos e ênfases |
| **Rosé Gold** | `#c88691` / `#e8b4bc` | `#8c3f4e` / `#ab5b6a` | Bordas translúcidas, badges e gradientes |
| **Dourado Imperial** | `#d4af37` / `#f3df95` | `#a67c00` / `#806000` | Botões primários, ícones luminosos e badges |
| **Superfície Vidro** | `rgba(22, 7, 12, 0.88)` | `rgba(255, 255, 255, 0.95)` | Bento cards, header HUD e modal |

---

## 🚀 Tecnologias e Diretrizes de Engenharia

- **HTML5 Semântico Puro:** Estrutura acessível com `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<figure>`, `<figcaption>` e `<footer>`.
- **CSS3 Moderno & Modular:** Design tokens em `:root` e `[data-theme="light"]`, CSS Grid dinâmico, Flexbox, Glassmorphism e responsividade fluida via Media Queries.
- **JavaScript Vanilla (ES6+ Modules):** Arquitetura desacoplada em módulos (`/js/modules/`), programação assíncrona (`async/await`, `fetch API`), validação de formulários com Expressões Regulares (Regex) e persistência em `localStorage`.
- **Motor Gráfico 3D (Three.js WebGL):** Universo cósmico com horizonte de eventos, corona de fótons, disco de acreção procedural, lente gravitacional e animação cinemática de singularidade no envio de mensagens.

---

## 📂 Arquitetura de Pastas e Arquivos

```text
portfolio-mariana-abad/
├── index.html                   # Estrutura semântica principal
├── README.md                    # Documentação consolidada do projeto
├── assets/
│   └── curriculo.pdf            # Currículo oficial em PDF para download
├── css/
│   ├── style.css                # Ponto de entrada modular (@import)
│   ├── base/
│   │   ├── variables.css        # Design tokens e variáveis de tema
│   │   └── globals.css          # Tipografia, resets e layout global
│   ├── components/
│   │   ├── header.css           # HUD Header, scroll progress e mobile drawer
│   │   ├── buttons.css          # Botões Apple shimmer e pills de vidro
│   │   └── modal.css            # Modal glassmorphism de confirmação
│   └── sections/
│       ├── about.css            # Hero, Story Steps e 4 Pilares Além do Código
│       ├── education.css        # Timeline vertical, idiomas e certificações
│       ├── portfolio.css        # Sistema de abas e grid de projetos
│       └── contact.css          # Formulário de contato com validação
├── js/
│   ├── script.js                # Orquestrador de carregamento ES6
│   └── modules/
│       ├── theme.js             # Gerenciador de Dark/Light mode com localStorage
│       ├── header.js            # Controle do scroll progress e menu mobile
│       ├── scrollspy.js         # Scroll spy dinâmico de alta performance
│       ├── planet3d.js          # Motor 3D Three.js com Singularidade/Supernova
│       ├── spotlight.js         # Efeito radial cursor spotlight nos cards
│       ├── reveal.js            # Animações de entrada com IntersectionObserver
│       ├── portfolio-tabs.js    # Controle de alternância de abas do portfólio
│       ├── github.js            # Integração assíncrona com GitHub API
│       ├── medium.js            # Integração assíncrona com Medium RSS
│       ├── itchio.js            # Vitrine do catálogo de jogos autorais
│       ├── contact.js           # Validador de formulário com Regex
│       └── modal.js             # Gerenciador do modal de confirmação
└── docs/
    └── sdd/                     # Especificações Técnicas Incrementais (SDD)
        ├── passo-01.md          # Setup e Arquitetura Inicial
        ├── passo-02.md          # Header Fixo HUD e Glassmorphism
        ├── passo-03.md          # Seção Sobre Mim e Biografia
        ├── passo-04.md          # Seção Formação com Timeline CSS
        ├── passo-05.md          # Seção Portfólio e Sistema de Abas
        ├── passo-06.md          # Integração GitHub REST API
        ├── passo-07.md          # Integração Medium RSS API
        ├── passo-08.md          # Vitrine de Jogos Itch.io
        ├── passo-09.md          # Formulário de Contato e Validação Regex
        ├── passo-10.md          # Modal Customizado de Feedback
        ├── passo-11.md          # Alternador de Tema Claro/Escuro
        ├── passo-12.md          # Scroll Spy e Menu Mobile Hambúrguer
        └── passo-13.md          # Consolidação Final e Revisão
```

---

## 🧭 Roteiro de Desenvolvimento (Spec-Driven Development)

| Passo | Especificação Técnica | Status |
|---|---|---|
| **01** | [Setup do Repositório, README e Estrutura](docs/sdd/passo-01.md) | ✅ Concluído |
| **02** | [Menu de Navegação Fixo (Sticky HUD Header)](docs/sdd/passo-02.md) | ✅ Concluído |
| **03** | [Seção Sobre Mim, Biografia e Download PDF](docs/sdd/passo-03.md) | ✅ Concluído |
| **04** | [Seção Formação com Timeline CSS Pura](docs/sdd/passo-04.md) | ✅ Concluído |
| **05** | [Seção Portfólio com CSS Grid e Abas WAI-ARIA](docs/sdd/passo-05.md) | ✅ Concluído |
| **06** | [Integração Dinâmica com GitHub REST API](docs/sdd/passo-06.md) | ✅ Concluído |
| **07** | [Integração de Posts do Medium via JS Assíncrono](docs/sdd/passo-07.md) | ✅ Concluído |
| **08** | [Vitrine Autoral do Catálogo Itch.io](docs/sdd/passo-08.md) | ✅ Concluído |
| **09** | [Formulário de Contato com Validação por Regex](docs/sdd/passo-09.md) | ✅ Concluído |
| **10** | [Modal Customizado de Feedback Visual](docs/sdd/passo-10.md) | ✅ Concluído |
| **11** | [Alternador de Tema Dinâmico (Dark / Light Mode)](docs/sdd/passo-11.md) | ✅ Concluído |
| **12** | [Scroll Spy e Menu Mobile Hambúrguer](docs/sdd/passo-12.md) | ✅ Concluído |
| **13** | [Consolidação Final e Auditoria Acadêmica](docs/sdd/passo-13.md) | ✅ Concluído |

---

## ⚡ Como Executar o Projeto Localmente

Por se tratar de uma aplicação construída com módulos ES6 nativos (`type="module"`), execute através de um servidor HTTP local:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/maaryhabad/portfolio-mariana-abad.git
   cd portfolio-mariana-abad
   ```

2. **Inicie um servidor local:**
   - **Com Python 3:**
     ```bash
     python -m http.server 3000
     ```
   - **Com Node.js (`npx serve` ou `http-server`):**
     ```bash
     npx serve .
     ```
   - **Com VS Code:**
     Clique com botão direito em `index.html` e selecione *Open with Live Server*.

3. **Acesse no navegador:**
   Abra `http://localhost:3000` ou a porta indicada.

---

## 📜 Licença e Direitos Autorais

Desenvolvido por **Mariana Beilune Abad** como Atividade Prática do Centro Universitário Internacional (UNINTER).  
Distribuído sob a Licença MIT.