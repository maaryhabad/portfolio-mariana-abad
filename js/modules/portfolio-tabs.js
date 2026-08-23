/**
 * ==============================================================================
 * MÓDULO: ABAS DO PORTFÓLIO (PortfolioTabsModule)
 * Responsabilidade Única: Controle de alternância das abas de projetos
 * (GitHub, Medium, Itch.io) com suporte a WAI-ARIA
 * ==============================================================================
 */

export const PortfolioTabsModule = (() => {
    // Cache de elementos do DOM
    const tabButtons = document.querySelectorAll('.portfolio-tab-btn');
    const tabPanels = document.querySelectorAll('.portfolio-tab-panel');

    /**
     * Alterna para a aba selecionada pelo ID do painel
     * @param {string} targetPanelId - ID do elemento do painel a ser exibido
     */
    const switchTab = (targetPanelId) => {
        // Atualiza os botões
        tabButtons.forEach(button => {
            const isTarget = button.getAttribute('data-target') === targetPanelId;
            button.classList.toggle('is-active', isTarget);
            button.setAttribute('aria-selected', String(isTarget));
        });

        // Atualiza os painéis
        tabPanels.forEach(panel => {
            const isTarget = panel.id === targetPanelId;
            panel.classList.toggle('is-active', isTarget);
            panel.hidden = !isTarget;
        });
    };

    /**
     * Registra os eventos de clique nas abas
     */
    const setupEventListeners = () => {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetPanelId = button.getAttribute('data-target');
                if (targetPanelId) {
                    switchTab(targetPanelId);
                }
            });
        });
    };

    /**
     * Inicializa o módulo
     */
    const init = () => {
        if (tabButtons.length > 0) {
            setupEventListeners();
        }
    };

    return {
        init,
        switchTab
    };
})();
