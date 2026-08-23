/**
 * ==============================================================================
 * MÓDULO: ALTERNADOR DE TEMA CLARO/ESCURO (ThemeModule)
 * Responsabilidade Única: Gerenciamento do tema visual (Dark/Light Mode),
 * persistência no LocalStorage e alternância de ícones.
 * ==============================================================================
 */

export const ThemeModule = (() => {
    const STORAGE_KEY = 'mariana_portfolio_theme';
    const toggleBtn = document.getElementById('themeToggleBtn');

    /**
     * Obtém o tema inicial preferido (LocalStorage -> Sistema -> Padrão Dark)
     * @returns {'dark'|'light'}
     */
    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem(STORAGE_KEY);
        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme;
        }

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }

        return 'dark';
    };

    /**
     * Aplica o tema no documento e atualiza o ícone do botão
     * @param {'dark'|'light'} theme 
     */
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);

        if (toggleBtn) {
            toggleBtn.innerHTML = theme === 'light' ? '☀️' : '🌙';
            toggleBtn.setAttribute('title', theme === 'light' ? 'Mudar para Tema Escuro' : 'Mudar para Tema Claro');
            toggleBtn.setAttribute('aria-label', theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro');
        }
    };

    /**
     * Alterna entre Dark e Light
     */
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    };

    /**
     * Inicializa o módulo
     */
    const init = () => {
        const initialTheme = getInitialTheme();
        applyTheme(initialTheme);

        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleTheme);
        }
    };

    return {
        init,
        toggleTheme,
        applyTheme
    };
})();
