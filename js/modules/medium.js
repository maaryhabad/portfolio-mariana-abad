/**
 * ==============================================================================
 * MÓDULO: INTEGRAÇÃO COM ARTIGOS DO MEDIUM (MediumModule)
 * Responsabilidade Única: Consumo do feed RSS convertido em JSON,
 * tratamento de strings, formatação de datas e renderização de cards no DOM.
 * ==============================================================================
 */

export const MediumModule = (() => {
    // Configurações do Módulo
    const MEDIUM_USERNAME = 'marianabeiluneabad';
    const MEDIUM_RSS_FEED = `https://medium.com/feed/@${MEDIUM_USERNAME}`;
    const RSS2JSON_API = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS_FEED)}`;
    const CONTAINER_ID = 'mediumArticlesGrid';

    /**
     * Catálogo Autoral de Artigos de Fallback (garante resiliência e integridade da apresentação)
     */
    const FALLBACK_ARTICLES = [
        {
            title: 'Do Código ao Produto: A transição de Desenvolvedora para Senior Product Owner',
            pubDate: '2024-05-18 14:00:00',
            link: `https://medium.com/@${MEDIUM_USERNAME}`,
            categories: ['Gestão de Produto', 'Engenharia'],
            description: 'Como a vivência técnica e a compreensão profunda de código transformam a priorização estratégica e a comunicação com times de alta performance.'
        },
        {
            title: '12 Edições de Global Game Jam: O que 48 horas de desenvolvimento ensinam sobre liderança',
            pubDate: '2024-02-10 10:30:00',
            link: `https://medium.com/@${MEDIUM_USERNAME}`,
            categories: ['Game Dev', 'Liderança'],
            description: 'Reflexões sobre prototipagem acelerada, escopo enxuto e dinâmicas multidisciplinares adquiridas em mais de uma década de hackathons de jogos.'
        },
        {
            title: 'Desmistificando Agentes de IA: Da Teoria dos LLMs à Aplicação Prática',
            pubDate: '2023-11-25 16:45:00',
            link: `https://medium.com/@${MEDIUM_USERNAME}`,
            categories: ['Inteligência Artificial', 'Agentes'],
            description: 'Explorando arquiteturas RAG, memória contextual e automação de rotinas para multiplicar a produtividade e a tomada de decisão em projetos corporativos.'
        },
        {
            title: 'Gamificação e Metodologias Ativas no Ensino Tecnológico Superior',
            pubDate: '2023-08-14 09:15:00',
            link: `https://medium.com/@${MEDIUM_USERNAME}`,
            categories: ['Educação', 'Metodologias Ativas'],
            description: 'Práticas pedagógicas baseadas em desafios reais e engajamento ativo para formação de novos desenvolvedores no mercado atual.'
        }
    ];

    /**
     * Remove tags HTML e limita o comprimento do texto
     * @param {string} html - String HTML com tags
     * @param {number} maxLength - Limite de caracteres
     * @returns {string} Texto puro formatado
     */
    const stripHTMLAndTruncate = (html, maxLength = 140) => {
        if (!html) return '';
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const rawText = tempDiv.textContent || tempDiv.innerText || '';
        const cleanText = rawText.trim().replace(/\s+/g, ' ');
        
        return cleanText.length > maxLength 
            ? `${cleanText.slice(0, maxLength)}...` 
            : cleanText;
    };

    /**
     * Formata datas ISO/SQL para o padrão amigável em pt-BR
     * @param {string} dateString - Data a ser formatada
     * @returns {string} Data em português (ex: "18 de maio de 2024")
     */
    const formatPortugueseDate = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Artigo Recente';
            
            return new Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }).format(date);
        } catch {
            return 'Artigo Recente';
        }
    };

    /**
     * Cria a estrutura HTML de um cartão de artigo
     * @param {Object} article - Dados do artigo
     * @returns {string} HTML do card
     */
    const createArticleCardHTML = (article) => {
        const title = article.title || 'Artigo sem título';
        const formattedDate = formatPortugueseDate(article.pubDate);
        const excerpt = stripHTMLAndTruncate(article.description);
        const category = Array.isArray(article.categories) && article.categories.length > 0
            ? article.categories[0]
            : 'Artigo Técnico';
        const link = article.link || `https://medium.com/@${MEDIUM_USERNAME}`;

        return `
            <article class="bento-card project-card">
                <div>
                    <div class="project-card-header">
                        <div class="project-icon-box" style="background: rgba(200, 134, 145, 0.15); border-color: rgba(200, 134, 145, 0.3);" aria-hidden="true">✍️</div>
                        <span class="project-tag">${category}</span>
                    </div>
                    <h3 class="project-title">${title}</h3>
                    <p class="project-description">${excerpt}</p>
                </div>
                
                <footer class="project-footer">
                    <span style="font-family: var(--font-mono); font-size: 0.76rem; color: var(--text-muted);">
                        📅 ${formattedDate}
                    </span>
                    <a href="${link}" target="_blank" rel="noopener noreferrer" class="project-link-btn" aria-label="Ler artigo ${title} no Medium">
                        <span>Ler no Medium</span>
                        <span aria-hidden="true">↗</span>
                    </a>
                </footer>
            </article>
        `;
    };

    /**
     * Renderiza os artigos no contêiner do DOM
     * @param {Array} articles - Lista de artigos
     * @param {HTMLElement} container - Elemento pai
     */
    const renderArticles = (articles, container) => {
        if (!container) return;

        if (!articles || articles.length === 0) {
            container.innerHTML = `
                <p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); font-family: var(--font-mono); padding: 2rem;">
                    Nenhum artigo encontrado no momento.
                </p>
            `;
            return;
        }

        const cardsHTML = articles.map(createArticleCardHTML).join('');
        container.innerHTML = cardsHTML;
    };

    /**
     * Realiza a requisição assíncrona ao feed RSS do Medium
     */
    const loadMediumArticles = async () => {
        const container = document.getElementById(CONTAINER_ID);
        if (!container) return;

        try {
            const response = await fetch(RSS2JSON_API);
            if (!response.ok) {
                throw new Error(`Medium RSS2JSON Status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
                renderArticles(data.items.slice(0, 6), container);
            } else {
                renderArticles(FALLBACK_ARTICLES, container);
            }

        } catch (error) {
            console.warn('[MediumModule] Erro ao carregar feed do Medium. Utilizando catálogo autoral:', error.message);
            renderArticles(FALLBACK_ARTICLES, container);
        }
    };

    /**
     * Inicializa a busca de dados
     */
    const init = () => {
        loadMediumArticles();
    };

    return {
        init,
        loadMediumArticles
    };
})();
