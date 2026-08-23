/**
 * ==============================================================================
 * PORTFÓLIO PESSOAL & CURRÍCULO ONLINE — MARIANA ABAD
 * Orquestrador Principal em JavaScript ES6+ (Vanilla Architecture)
 * ==============================================================================
 */

import { HeaderModule } from './modules/header.js';
import { PortfolioTabsModule } from './modules/portfolio-tabs.js';
import { GitHubModule } from './modules/github.js';
import { MediumModule } from './modules/medium.js';
import { ItchIoModule } from './modules/itchio.js';
import { ContactModule } from './modules/contact.js';
import { SpotlightModule } from './modules/spotlight.js';
import { ParticlesModule } from './modules/particles.js';
import { RevealModule } from './modules/reveal.js';

// Inicializa os módulos após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    // 1. Efeitos Visuais & Animações Interativas
    ParticlesModule.init();
    SpotlightModule.init();
    RevealModule.init();

    // 2. Componentes de Interface & Navegação
    HeaderModule.init();
    PortfolioTabsModule.init();

    // 3. Integrações de Dados & Formulários
    GitHubModule.init();
    MediumModule.init();
    ItchIoModule.init();
    ContactModule.init();
});
