# Especificação Técnica SDD - Passo 6: Integração Dinâmica e Assíncrona com API do GitHub (script.js)

## 1. Visão Geral
Esta especificação descreve a implementação do módulo de integração dinâmica com a **API Pública REST do GitHub (`https://api.github.com/users/maaryhabad/repos`)**, utilizando **JavaScript ES6+ puramente nativo (`async/await` e `fetch API`)**, com renderização declarativa de cards no DOM, tratamento robusto de erros (*Try/Catch*), estratégia de fallback para contornar limites de requisição da API (*Rate Limiting*) e estilização no padrão de *Bento Cards*.

---

## 2. Requisitos Técnicos

### 2.1. Consumo da API Pública do GitHub
- **Endpoint:** `https://api.github.com/users/maaryhabad/repos?sort=updated&per_page=6`
- **Método HTTP:** `GET`
- **Cabeçalhos:** `Accept: application/vnd.github.v3+json`
- **Filtros e Tratamento:**
  - Filtrar repositórios que não sejam *forks* diretos vazios (ou priorizar os autorais mais recentes).
  - Sanitização de strings para inserção segura no DOM (prevenção de XSS).

### 2.2. Estratégia de Fallback e Resiliência (Zero Broken State)
- A API pública sem token do GitHub possui um limite de 60 requisições/hora por IP.
- Caso a API retorne status `403 (Rate Limit)` ou ocorra falha de rede/offline, o sistema deve capturar a exceção e carregar instantaneamente um catálogo autoral de projetos em *fallback* (ex: `TIC em Trilhas`, `Apple Academy Showcase`, `Game Jam Collection`, `Portfolio Vanilla`), garantindo que o avaliador da disciplina sempre visualize os projetos de forma impecável.

### 2.3. Estrutura dos Cards Renderizados no DOM
Cada repositório gera um `<article class="bento-card project-card">` contendo:
- Ícone do GitHub estilizado em Dourado/Rosé Gold.
- Nome do repositório em `<h3 class="project-title">`.
- Descrição do projeto com limite de caracteres e fallback para projetos sem descrição.
- Tags de tecnologia (ex: `JavaScript`, `Swift`, `TypeScript`, `HTML/CSS`).
- Métricas: Contagem de estrelas (⭐) e bifurcações/forks (🍴).
- Link com `<a href="..." target="_blank" rel="noopener noreferrer">` e acessibilidade aprimorada.

### 2.4. Módulo JavaScript (`js/modules/github.js`)
- Criação de uma função assíncrona pura `fetchGitHubRepos()`.
- Criação de uma função de renderização `renderRepoCards(repos, containerElement)`.
- Exportação limpa do módulo `GitHubModule` para orquestração no `script.js`.

---

## 3. Critérios de Aceite

| ID | Critério | Descrição |
|---|---|---|
| **CA-01** | Consumo Assíncrono | Utilização exclusiva de `async/await` e `fetch()` nativo para a requisição ao GitHub. |
| **CA-02** | Renderização no DOM | Os cartões devem substituir os skeletons loaders de forma fluida. |
| **CA-03** | Tratamento de Erros & Fallback | Na ocorrência de erro de rede ou rate limit, os cards de projetos de fallback devem ser renderizados sem quebrar o layout. |
| **CA-04** | Acessibilidade e Segurança | Links externos com `target="_blank"` devem conter obrigatoriamente `rel="noopener noreferrer"`. |
| **CA-05** | Clean Code | Código modular, funções curtas, tratamento de casos nulos e variáveis expressivas. |

---

## 4. Protocolo de Verificação Manual

1. **Teste de Carregamento Normal**:
   - Abrir o site com conexão de internet ativa e inspecionar a aba "Repositórios GitHub".
   - Validar que os projetos da usuária `maaryhabad` são renderizados com dados reais e links funcionais.
2. **Teste de Fallback / Simulação de Falha**:
   - Desconectar a internet ou simular resposta de erro na URL e validar se os projetos de fallback aparecem normalmente com mensagem discreta.
3. **Auditoria de Links**:
   - Clicar em "Acessar Repositório" e certificar que uma nova aba abre na URL correspondente do GitHub.

---

## 5. Status do Passo
- **Status:** ✅ Concluído / Pronto para Validação
- **Próximo Passo:** Passo 7 - Integração Dinâmica de Artigos do Medium (script.js)
