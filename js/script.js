/**
 * ==============================================================================
 * PORTFÓLIO PESSOAL & CURRÍCULO ONLINE — MARIANA ABAD
 * Orquestrador Principal em JavaScript ES6+ (Vanilla Architecture)
 * ==============================================================================
 */

import { HeaderModule } from './modules/header.js';

// Inicializa os módulos após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    HeaderModule.init();
});
