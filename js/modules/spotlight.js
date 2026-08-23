/**
 * ==============================================================================
 * MÓDULO: SPOTLIGHT INTERATIVO DE CARDS (SpotlightModule)
 * Responsabilidade Única: Rastreamento do cursor do mouse sobre os Bento Cards
 * e atualização das variáveis CSS (--mouse-x e --mouse-y) em tempo real.
 * ==============================================================================
 */

export const SpotlightModule = (() => {
    /**
     * Atualiza as coordenadas relativas do mouse no card
     * @param {MouseEvent} event 
     * @param {HTMLElement} card 
     */
    const handleMouseMove = (event, card) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    /**
     * Registra os ouvintes em todos os cards existentes e dinâmicos
     */
    const attachCardListeners = () => {
        const cards = document.querySelectorAll('.bento-card');
        cards.forEach(card => {
            if (!card.dataset.spotlightBound) {
                card.dataset.spotlightBound = 'true';
                card.addEventListener('mousemove', (e) => handleMouseMove(e, card), { passive: true });
            }
        });
    };

    /**
     * Inicializa o módulo e observa novos elementos inseridos dinamicamente (APIs)
     */
    const init = () => {
        attachCardListeners();

        // MutationObserver para aplicar spotlight automaticamente em cards injetados por APIs
        const observer = new MutationObserver(() => {
            attachCardListeners();
        });

        observer.observe(document.body, { childList: true, subtree: true });
    };

    return {
        init,
        attachCardListeners
    };
})();
