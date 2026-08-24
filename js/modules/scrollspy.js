/**
 * ==============================================================================
 * MÓDULO: SCROLL SPY DINÂMICO (ScrollSpyModule)
 * Responsabilidade Única: Monitorar o progresso de rolagem e destacar o link ativo
 * no menu de navegação (.is-active) em tempo real conforme as seções entram na viewport.
 * ==============================================================================
 */

export const ScrollSpyModule = (() => {
    let navLinks = [];
    let trackedSections = [];
    let isClickScrolling = false;

    /**
     * Cache e mapeamento das seções vinculadas aos links de navegação
     */
    const setupSectionsMap = () => {
        navLinks = Array.from(document.querySelectorAll('.nav-menu .nav-link'));
        trackedSections = navLinks.map(link => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const section = document.querySelector(targetId);
                return section ? { link, section, id: targetId } : null;
            }
            return null;
        }).filter(Boolean);
    };

    /**
     * Determina a seção ativa atual baseada na posição do scroll
     */
    const updateActiveLink = () => {
        if (isClickScrolling || trackedSections.length === 0) return;

        const scrollPosition = window.scrollY + 120; // Offset do cabeçalho
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Se estiver no final da página, ativa o último link (Contato)
        if (window.scrollY + windowHeight >= documentHeight - 50) {
            const lastSection = trackedSections[trackedSections.length - 1];
            setActiveLink(lastSection ? lastSection.link : null);
            return;
        }

        let currentActive = null;

        for (let i = 0; i < trackedSections.length; i++) {
            const { section, link } = trackedSections[i];
            const top = section.offsetTop;
            const height = section.offsetHeight;

            if (scrollPosition >= top && scrollPosition < top + height) {
                currentActive = link;
                break;
            }
        }

        // Se nenhuma seção foi capturada (ex: no topo da Hero), remove o highlight
        if (!currentActive && window.scrollY < 200) {
            setActiveLink(null);
        } else if (currentActive) {
            setActiveLink(currentActive);
        }
    };

    /**
     * Aplica a classe .is-active ao link correto e remove dos demais
     */
    const setActiveLink = (activeLink) => {
        navLinks.forEach(link => {
            if (link === activeLink) {
                link.classList.add('is-active', 'active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('is-active', 'active');
                link.removeAttribute('aria-current');
            }
        });
    };

    /**
     * Suporte a clique em links para animação suave e fixação do estado ativo
     */
    const setupClickHandlers = () => {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                setActiveLink(link);
                isClickScrolling = true;
                setTimeout(() => {
                    isClickScrolling = false;
                }, 800);
            });
        });
    };

    /**
     * Inicializa os observadores e ouvintes de scroll com throttling via rAF
     */
    const init = () => {
        setupSectionsMap();
        setupClickHandlers();

        let isTicking = false;
        window.addEventListener('scroll', () => {
            if (!isTicking) {
                window.requestAnimationFrame(() => {
                    updateActiveLink();
                    isTicking = false;
                });
                isTicking = true;
            }
        }, { passive: true });

        // Atualização inicial
        updateActiveLink();
    };

    return {
        init,
        updateActiveLink
    };
})();
