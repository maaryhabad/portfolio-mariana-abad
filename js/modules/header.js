/**
 * ==============================================================================
 * MÓDULO: CABEÇALHO & PROGRESSO DE ROLAGEM (HeaderModule)
 * Responsabilidade Única: Controle da barra de rolagem e do menu mobile
 * ==============================================================================
 */

export const HeaderModule = (() => {
    // Cache de elementos do DOM
    const progressBar = document.getElementById('scrollProgressBar');
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
     * Alterna a visibilidade do menu móvel
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
     * Inicializa os ouvintes de eventos
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
