/**
 * ==============================================================================
 * PORTFÓLIO PESSOAL & CURRÍCULO ONLINE — MARIANA ABAD
 * Orquestrador Principal em JavaScript ES6+ (Vanilla Architecture)
 * ==============================================================================
 */

import { ThemeModule } from './modules/theme.js';
import { HeaderModule } from './modules/header.js';
import { ScrollSpyModule } from './modules/scrollspy.js';
import { PortfolioTabsModule } from './modules/portfolio-tabs.js';
import { GitHubModule } from './modules/github.js';
import { MediumModule } from './modules/medium.js';
import { ItchIoModule } from './modules/itchio.js';
import { ContactModule } from './modules/contact.js';
import { ModalModule } from './modules/modal.js';
import { SpotlightModule } from './modules/spotlight.js';
import { RevealModule } from './modules/reveal.js';
import { Planet3DModule } from './modules/planet3d.js';

// Inicializa os módulos após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    // 1. Gerenciamento de Tema (Dark / Light)
    ThemeModule.init();

    // 2. Núcleo Celestial 3D (Planeta em Three.js idêntico ao modelo.html)
    Planet3DModule.init();

    // 3. Efeitos Visuais & Animações Interativas
    SpotlightModule.init();
    RevealModule.init();

    // 4. Componentes de Interface, Navegação, Scroll Spy & Modais
    HeaderModule.init();
    ScrollSpyModule.init();
    PortfolioTabsModule.init();
    ModalModule.init();

    // 5. Integrações de Dados & Formulários
    GitHubModule.init();
    MediumModule.init();
    ItchIoModule.init();
    ContactModule.init();
});
