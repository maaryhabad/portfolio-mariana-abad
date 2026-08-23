/**
 * ==============================================================================
 * MÓDULO: ANIMAÇÃO DE REVELAÇÃO POR SCROLL (RevealModule)
 * Responsabilidade Única: Revelar suavemente elementos conforme entram na viewport
 * utilizando a API nativa IntersectionObserver (sem dependências de GSAP).
 * ==============================================================================
 */

export const RevealModule = (() => {
    /**
     * Aplica o observador nos elementos com classe .reveal-on-scroll
     */
    const init = () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-revealed'));
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.12
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Elementos a serem observados
        const targetElements = document.querySelectorAll('.bento-card, .section-header-block, .timeline-item, .contact-grid > *');
        targetElements.forEach(el => {
            el.classList.add('reveal-on-scroll');
            observer.observe(el);
        });
    };

    return {
        init
    };
})();
