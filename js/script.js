/**
 * ==============================================================================
 * PORTFÓLIO PESSOAL & CURRÍCULO ONLINE — MARIANA ABAD
 * Orquestrador Principal em JavaScript ES6+ (Vanilla Architecture)
 * ==============================================================================
 */

import { ThemeModule } from './modules/theme.js';
import { HeaderModule } from './modules/header.js';
import { PortfolioTabsModule } from './modules/portfolio-tabs.js';
import { GitHubModule } from './modules/github.js';
import { MediumModule } from './modules/medium.js';
import { ItchIoModule } from './modules/itchio.js';
import { ContactModule } from './modules/contact.js';
import { ModalModule } from './modules/modal.js';
import { SpotlightModule } from './modules/spotlight.js';
import { ParticlesModule } from './modules/particles.js';
import { RevealModule } from './modules/reveal.js';

// Inicializa os módulos após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    // 1. Gerenciamento de Tema (Dark / Light)
    ThemeModule.init();

    // 2. Efeitos Visuais & Animações Interativas
    ParticlesModule.init();
    SpotlightModule.init();
    RevealModule.init();

    // 3. Componentes de Interface, Navegação & Modais
    HeaderModule.init();
    PortfolioTabsModule.init();
    ModalModule.init();

    // 4. Integrações de Dados & Formulários
    GitHubModule.init();
    MediumModule.init();
    ItchIoModule.init();
    ContactModule.init();
});
