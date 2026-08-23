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

// Inicializa os módulos após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    HeaderModule.init();
    PortfolioTabsModule.init();
    GitHubModule.init();
    MediumModule.init();
    ItchIoModule.init();
});
