/**
 * ==============================================================================
 * MÓDULO: JOGOS E PROTÓTIPOS DO ITCH.IO (ItchIoModule)
 * Responsabilidade Única: Renderização dos jogos e protótipos reais da desenvolvedora
 * cadastrados em https://maaryhabad.itch.io/
 * ==============================================================================
 */

export const ItchIoModule = (() => {
    // Configurações do Módulo
    const ITCHIO_PROFILE_URL = 'https://maaryhabad.itch.io';
    const CONTAINER_ID = 'itchioGamesGrid';

    /**
     * Catálogo Real de Jogos e Protótipos extraídos da conta oficial da Mariana Abad no Itch.io
     */
    const REAL_GAMES_CATALOG = [
        {
            title: 'BOB',
            subtitle: 'Inteligência Artificial & Impacto Social',
            engine: 'Play in browser',
            genre: 'IA & Saúde',
            description: 'Jogo inovador que utiliza inteligência artificial para complementar a anamnese de laudos e apoiar pesquisas de proteção e combate ao abuso infantil.',
            link: `${ITCHIO_PROFILE_URL}/bob`,
            icon: '🤖',
            tag: 'Play in browser'
        },
        {
            title: 'Butantan - The Game',
            subtitle: 'Aventura & Conscientização',
            engine: 'Windows / Web',
            genre: 'Adventure',
            description: 'Acompanhe Zeca, o Jacaré, em uma jornada emocionante e educativa em busca da vacina e da cura para a sua doença.',
            link: `${ITCHIO_PROFILE_URL}/butantan-the-game`,
            icon: '🐊',
            tag: 'Adventure'
        },
        {
            title: 'Bubbles Out | Entre bolhas e segredos',
            subtitle: 'Game Jam Experience',
            engine: 'Play in browser',
            genre: 'Casual / Puzzle',
            description: 'Experiência lúdica interativa desenvolvida para explorar mecânicas de física de bolhas, segredos ocultos e reflexão sensorial.',
            link: `${ITCHIO_PROFILE_URL}/bubbles-out`,
            icon: '🫧',
            tag: 'Play in browser'
        },
        {
            title: 'FakeNet',
            subtitle: 'Narrativa & Conscientização Digital',
            engine: 'Play in browser',
            genre: 'Cyber & Narrative',
            description: 'Jogo interativo focado na identificação de desinformação, cibersegurança e leitura crítica de conteúdos na internet.',
            link: `${ITCHIO_PROFILE_URL}/fakenet`,
            icon: '🌐',
            tag: 'Play in browser'
        },
        {
            title: 'Reflexão ADA',
            subtitle: 'Apple Developer Academy Prototype',
            engine: 'Play in browser',
            genre: 'Storytelling & Art',
            description: 'Protótipo conceitual desenvolvido na Apple Developer Academy explorando narrativa imersiva, identidade e sensibilidade visual.',
            link: `${ITCHIO_PROFILE_URL}/reflexao-ada`,
            icon: '👧',
            tag: 'Play in browser'
        },
        {
            title: 'NumberWizardUI',
            subtitle: 'Lógica Computacional & Algoritmos',
            engine: 'Play in browser',
            genre: 'Logic & Puzzle',
            description: 'Jogo de adivinhação lógica baseado no algoritmo de busca binária, testando palpites matemáticos e interfaces interativas.',
            link: `${ITCHIO_PROFILE_URL}/numberwizardui`,
            icon: '🔢',
            tag: 'Play in browser'
        },
        {
            title: 'PRISON',
            subtitle: 'Escape Room & Fechadura de Botão',
            engine: 'Play in browser',
            genre: 'Mystery & Puzzle',
            description: 'Desafio imersivo onde você analisa fechaduras de botão e pistas sutis como impressões digitais sujas para tentar escapar de sua cela.',
            link: `${ITCHIO_PROFILE_URL}/prison`,
            icon: '🗝️',
            tag: 'Play in browser'
        }
    ];

    /**
     * Cria a estrutura HTML de um cartão de jogo real
     * @param {Object} game - Dados do jogo
     * @returns {string} String HTML do card
     */
    const createGameCardHTML = (game) => {
        return `
            <article class="bento-card project-card">
                <div>
                    <div class="project-card-header">
                        <div class="project-icon-box" style="background: rgba(212, 175, 55, 0.15); border-color: rgba(212, 175, 55, 0.35);" aria-hidden="true">${game.icon}</div>
                        <span class="project-tag">${game.tag}</span>
                    </div>
                    <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--gold-light); display: block; margin-top: 0.35rem;">
                        ${game.subtitle}
                    </span>
                    <h3 class="project-title" style="margin-top: 0.35rem;">${game.title}</h3>
                    <p class="project-description">${game.description}</p>
                </div>

                <div class="game-meta-row" style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
                    <span class="skill-pill" style="font-size: 0.68rem;">🎮 ${game.genre}</span>
                    <span class="skill-pill" style="font-size: 0.68rem; color: var(--gold-light); border-color: rgba(212, 175, 55, 0.3);">⚡ Itch.io</span>
                </div>
                
                <footer class="project-footer">
                    <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">
                        maaryhabad.itch.io
                    </span>
                    <a href="${game.link}" target="_blank" rel="noopener noreferrer" class="project-link-btn" aria-label="Jogar ${game.title} no Itch.io">
                        <span>Jogar no Itch.io</span>
                        <span aria-hidden="true">↗</span>
                    </a>
                </footer>
            </article>
        `;
    };

    /**
     * Renderiza os cartões de jogos no DOM
     */
    const renderGames = () => {
        const container = document.getElementById(CONTAINER_ID);
        if (!container) return;

        const html = REAL_GAMES_CATALOG.map(createGameCardHTML).join('');
        container.innerHTML = html;
    };

    /**
     * Inicializa o módulo
     */
    const init = () => {
        renderGames();
    };

    return {
        init,
        renderGames
    };
})();
