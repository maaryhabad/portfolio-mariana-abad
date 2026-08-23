/**
 * ==============================================================================
 * MÓDULO: INTEGRAÇÃO COM A API DO GITHUB (GitHubModule)
 * Responsabilidade Única: Consumo assíncrono de repositórios públicos via Fetch API
 * e renderização dinâmica no DOM com resiliência e fallback.
 * ==============================================================================
 */

export const GitHubModule = (() => {
    // Configurações do Módulo
    const GITHUB_USERNAME = 'maaryhabad';
    const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`;
    const CONTAINER_ID = 'githubProjectsGrid';

    /**
     * Catálogo de Projetos Autoriais de Fallback (para limites de requisição da API ou offline)
     */
    const FALLBACK_PROJECTS = [
        {
            name: 'portfolio-mariana-abad',
            description: 'Portfólio Pessoal e Currículo Online responsivo construído em Vanilla HTML5 semântico, CSS3 puro e JavaScript ES6+.',
            language: 'JavaScript',
            stars: 3,
            forks: 1,
            html_url: 'https://github.com/maaryhabad/portfolio-mariana-abad'
        },
        {
            name: 'tic-em-trilhas-platform',
            description: 'Iniciativas e módulos do ecossistema de capacitação e trilhas tecnológicas desenvolvido junto ao MCTI.',
            language: 'TypeScript',
            stars: 5,
            forks: 2,
            html_url: 'https://github.com/maaryhabad'
        },
        {
            name: 'apple-developer-showcase',
            description: 'Projetos e protótipos em Swift & SwiftUI desenvolvidos na formação Apple Developer Academy (PUC-PR).',
            language: 'Swift',
            stars: 4,
            forks: 0,
            html_url: 'https://github.com/maaryhabad'
        },
        {
            name: 'global-game-jam-entries',
            description: 'Coletânea de jogos autorais e protótipos desenvolvidos ao longo de 12 edições da Global Game Jam.',
            language: 'C# / GDScript',
            stars: 7,
            forks: 3,
            html_url: 'https://github.com/maaryhabad'
        },
        {
            name: 'ai-agents-automation',
            description: 'Automações inteligentes, agentes autônomos com LLMs e fluxos RAG para integração de conhecimento.',
            language: 'Python',
            stars: 6,
            forks: 1,
            html_url: 'https://github.com/maaryhabad'
        },
        {
            name: 'education-lms-tools',
            description: 'Extensões, formulários interativos e temas personalizados para ambientes virtuais de aprendizagem.',
            language: 'JavaScript',
            stars: 2,
            forks: 0,
            html_url: 'https://github.com/maaryhabad'
        }
    ];

    /**
     * Sanitiza strings para inserção segura no DOM
     * @param {string} text - Texto de entrada
     * @returns {string} Texto seguro
     */
    const sanitizeHTML = (text) => {
        if (!text) return '';
        const tempDiv = document.createElement('div');
        tempDiv.textContent = text;
        return tempDiv.innerHTML;
    };

    /**
     * Cria a estrutura HTML de um cartão de repositório
     * @param {Object} repo - Dados do repositório
     * @returns {string} String HTML do card
     */
    const createRepoCardHTML = (repo) => {
        const repoName = sanitizeHTML(repo.name || 'Projeto Sem Título');
        const repoDesc = sanitizeHTML(repo.description || 'Projeto autoral desenvolvido com foco em qualidade técnica e usabilidade.');
        const repoLang = sanitizeHTML(repo.language || 'Code');
        const repoStars = repo.stargazers_count !== undefined ? repo.stargazers_count : (repo.stars || 0);
        const repoForks = repo.forks_count !== undefined ? repo.forks_count : (repo.forks || 0);
        const repoUrl = repo.html_url || `https://github.com/${GITHUB_USERNAME}`;

        return `
            <article class="bento-card project-card">
                <div>
                    <div class="project-card-header">
                        <div class="project-icon-box" aria-hidden="true">🐙</div>
                        <span class="project-tag">${repoLang}</span>
                    </div>
                    <h3 class="project-title">${repoName}</h3>
                    <p class="project-description">${repoDesc}</p>
                </div>
                
                <footer class="project-footer">
                    <div style="display: flex; align-items: center; gap: 1rem; font-family: var(--font-mono); font-size: 0.78rem;">
                        <span>⭐ ${repoStars}</span>
                        <span>🍴 ${repoForks}</span>
                    </div>
                    <a href="${repoUrl}" target="_blank" rel="noopener noreferrer" class="project-link-btn" aria-label="Ver repositório ${repoName} no GitHub">
                        <span>Ver no GitHub</span>
                        <span aria-hidden="true">↗</span>
                    </a>
                </footer>
            </article>
        `;
    };

    /**
     * Renderiza a lista de repositórios no contêiner do DOM
     * @param {Array} repos - Lista de repositórios
     * @param {HTMLElement} container - Elemento pai
     */
    const renderRepos = (repos, container) => {
        if (!container) return;

        if (!repos || repos.length === 0) {
            container.innerHTML = `
                <p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); font-family: var(--font-mono); padding: 2rem;">
                    Nenhum repositório público encontrado no momento.
                </p>
            `;
            return;
        }

        const cardsHTML = repos.map(createRepoCardHTML).join('');
        container.innerHTML = cardsHTML;
    };

    /**
     * Realiza a requisição assíncrona para a API do GitHub com fallback
     */
    const loadGitHubProjects = async () => {
        const container = document.getElementById(CONTAINER_ID);
        if (!container) return;

        try {
            const response = await fetch(GITHUB_API_URL, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (!response.ok) {
                throw new Error(`GitHub API HTTP Status: ${response.status}`);
            }

            const reposData = await response.json();
            
            // Filtra e limita aos 6 mais relevantes
            const validRepos = Array.isArray(reposData) ? reposData.slice(0, 6) : [];
            
            if (validRepos.length > 0) {
                renderRepos(validRepos, container);
            } else {
                renderRepos(FALLBACK_PROJECTS, container);
            }

        } catch (error) {
            console.warn('[GitHubModule] Erro ao carregar API do GitHub. Ativando catálogo de fallback:', error.message);
            renderRepos(FALLBACK_PROJECTS, container);
        }
    };

    /**
     * Inicializa a busca de dados
     */
    const init = () => {
        loadGitHubProjects();
    };

    return {
        init,
        loadGitHubProjects
    };
})();
