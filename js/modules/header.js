/**
 * ==============================================================================
 * MÓDULO: CABEÇALHO & PROGRESSO DE ROLAGEM (HeaderModule)
 * Responsabilidade Única: Controle da barra de rolagem, menu mobile e acessibilidade
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
     * Fecha o menu móvel
     */
    const closeMobileMenu = () => {
        if (navMenu && navMenu.classList.contains('is-open')) {
            navMenu.classList.remove('is-open');
            if (mobileMenuBtn) {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.innerHTML = '☰';
            }
        }
    };

    /**
     * Fecha o menu móvel ao clicar em qualquer link de âncora
     */
    const setupNavLinkAutoClose = () => {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    };

    /**
     * Fecha o menu móvel ao clicar fora dele ou ao pressionar Escape
     */
    const setupOutsideAndKeyboardClose = () => {
        document.addEventListener('click', (e) => {
            if (navMenu && navMenu.classList.contains('is-open')) {
                if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    closeMobileMenu();
                }
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 868) {
                closeMobileMenu();
            }
        }, { passive: true });
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
        setupOutsideAndKeyboardClose();
    };

    return {
        init,
        closeMobileMenu
    };
})();
