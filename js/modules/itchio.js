/**
 * ==============================================================================
 * MÓDULO: JOGOS E EMBEDS DO ITCH.IO (ItchIoModule)
 * Responsabilidade Única: Renderização dos jogos autorais, protótipos de Game Jams
 * e embeds responsivos da plataforma Itch.io.
 * ==============================================================================
 */

export const ItchIoModule = (() => {
    // Configurações do Módulo
    const ITCHIO_PROFILE_URL = 'https://maaryhabad.itch.io/';
    const CONTAINER_ID = 'itchioGamesGrid';

    /**
     * Catálogo de Jogos Autorais e Participações em Game Jams
     */
    const GAMES_CATALOG = [
        {
            title: 'Rhythm & Resonance',
            subtitle: 'Global Game Jam • Prêmio Destaque em Áudio',
            engine: 'Godot / WebGL',
            genre: 'Puzzle & Audio Mechanics',
            description: 'Uma experiência imersiva baseada em frequência acústica e síntese sonora digital, onde o jogador manipula ondas harmônicas para restaurar ecossistemas sonoros.',
            link: ITCHIO_PROFILE_URL,
            icon: '🎵',
            embedPlaceholder: true
        },
        {
            title: 'Astral Odyssey',
            subtitle: 'Game Jam Prototype',
            engine: 'Unity 3D / C#',
            genre: 'Sci-Fi Gravity Adventure',
            description: 'Exploração gravitacional orbital onde você deve guiar sondas e satélites por campos de asteroides utilizando mecânicas de física newtoniana e propulsão de emergência.',
            link: ITCHIO_PROFILE_URL,
            icon: '🚀',
            embedPlaceholder: false
        },
        {
            title: 'Shadow Crypt',
            subtitle: 'Protótipo Apple Developer Academy',
            engine: 'Swift / SpriteKit',
            genre: '2D Stealth & Platformer',
            description: 'Jogo de plataforma com iluminação volumétrica dinâmica e mecânica de camuflagem de sombras, projetado para dispositivos com comandos por toque de alta precisão.',
            link: ITCHIO_PROFILE_URL,
            icon: '🗝️',
            embedPlaceholder: false
        },
        {
            title: 'Jam Vault & Coleção Completa',
            subtitle: '12 Edições de Global Game Jam',
            engine: 'Multi-Engine',
            genre: 'Experimental & Indie Games',
            description: 'Explore a biblioteca completa de jogos, experimentos de mecânicas de gameplay e protótipos desenvolvidos ao longo de uma década de participações e organização de Game Jams.',
            link: ITCHIO_PROFILE_URL,
            icon: '👾',
            embedPlaceholder: false
        }
    ];

    /**
     * Cria a estrutura HTML de um cartão de jogo
     * @param {Object} game - Dados do jogo
     * @returns {string} String HTML do card
     */
    const createGameCardHTML = (game) => {
        return `
            <article class="bento-card project-card">
                <div>
                    <div class="project-card-header">
                        <div class="project-icon-box" style="background: rgba(212, 175, 55, 0.15); border-color: rgba(212, 175, 55, 0.35);" aria-hidden="true">${game.icon}</div>
                        <span class="project-tag">${game.engine}</span>
                    </div>
                    <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--gold-light); display: block; margin-top: 0.2rem;">
                        ${game.subtitle}
                    </span>
                    <h3 class="project-title" style="margin-top: 0.4rem;">${game.title}</h3>
                    <p class="project-description">${game.description}</p>
                </div>

                <div class="game-meta-row" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    <span class="skill-pill" style="font-size: 0.68rem;">🎮 ${game.genre}</span>
                </div>
                
                <footer class="project-footer">
                    <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">
                        itch.io/maaryhabad
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

        const html = GAMES_CATALOG.map(createGameCardHTML).join('');
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
