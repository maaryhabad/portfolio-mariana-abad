/**
 * ==============================================================================
 * PORTFÓLIO PESSOAL & CURRÍCULO ONLINE — MARIANA ABAD
 * Script Principal em JavaScript Puro (Vanilla ES6+)
 * Arquitetura: Clean Code, Orientação a Módulos e Funções de Responsabilidade Única
 * ==============================================================================
 */

'use strict';

/**
 * Módulo de Inicialização do Cabeçalho e Barra de Progresso de Rolagem
 */
const HeaderModule = (() => {
    // Cache de elementos do DOM
    const progressBar = document.getElementById('scrollProgressBar');
    const headerElement = document.getElementById('siteHeader');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    /**
     * Atualiza a largura da barra de progresso no topo de acordo com o scroll da janela
     */
    const updateScrollProgress = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        if (scrollHeight > 0 && progressBar) {
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = `${scrollPercentage}%`;
        }
    };

    /**
     * Alterna a visibilidade do menu móvel (Mobile Navigation Drawer)
     */
    const toggleMobileMenu = () => {
        if (!navMenu || !mobileMenuBtn) return;
        
        const isOpen = navMenu.classList.toggle('is-open');
        mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
        mobileMenuBtn.innerHTML = isOpen ? '✕' : '☰';
    };

    /**
     * Fecha o menu móvel ao clicar em qualquer link de âncora
     */
    const setupNavLinkAutoClose = () => {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu && navMenu.classList.contains('is-open')) {
                    toggleMobileMenu();
                }
            });
        });
    };

    /**
     * Registra os ouvintes de eventos do módulo
     */
    const init = () => {
        window.addEventListener('scroll', updateScrollProgress, { passive: true });
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        }

        setupNavLinkAutoClose();
    };

    return {
        init
    };
})();

// Inicializa os módulos após o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    HeaderModule.init();
});
