# Especificação Técnica SDD - Passo 7: Integração Dinâmica de Artigos do Medium (script.js)

## 1. Visão Geral
Esta especificação detalha a implementação do módulo de integração dinâmica com os **Artigos e Ensaios do Medium (`https://medium.com/@marianabeiluneabad`)**, consumindo o feed RSS através de uma API conversora REST segura (**RSS-to-JSON**), com limpeza e sanitização de marcação HTML, extração de metadados (título, data formatada, resumo, tags) e renderização assíncrona no painel `#medium-tab-panel`.

---

## 2. Requisitos Técnicos

### 2.1. Consumo do Feed do Medium
- **Feed RSS Original:** `https://medium.com/feed/@marianabeiluneabad`
- **Conversor REST Seguro:** `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@marianabeiluneabad`
- **Método:** `GET`
- **Sanitização de Conteúdo:** O feed RSS do Medium frequentemente retorna descrições contendo tags `<h3>`, `<p>`, `<img>` e `figure`. O módulo deve extrair apenas o texto puro e limitar o resumo a 140 caracteres.

### 2.2. Resiliência e Catálogo de Artigos em Fallback
Para evitar falhas caso a API de conversão oscile ou a conta do Medium ainda esteja em processo de sincronização de artigos, o sistema contará com um catálogo autoral de artigos reais sobre a trajetória de Mariana Abad:
1. *Do Código ao Produto: A transição de Desenvolvedora para Senior Product Owner no Instituto Eldorado*.
2. *12 Edições de Global Game Jam: Lições sobre Prototipagem Rápida, Liderança e Criatividade sob Pressão*.
3. *Desmistificando Agentes de IA: Da teoria dos LLMs à aplicação prática em fluxos corporativos*.
4. *Gamificação no Ensino Superior e Metodologias Ativas de Aprendizagem Tecnológica*.

### 2.3. Estrutura Semântica dos Cards Renderizados
Cada artigo gera um `<article class="bento-card project-card">` contendo:
- Ícone estilizado de publicação (`✍️` ou `📰`).
- Categoria / Tag temática (`Produto`, `Game Dev`, `IA`, `Educação`).
- Título do artigo em `<h3 class="project-title">`.
- Data de publicação formatada segundo a localidade `pt-BR`.
- Resumo limpo em `<p class="project-description">`.
- Link semântico `<a href="..." target="_blank" rel="noopener noreferrer">` para leitura no Medium.

### 2.4. Módulo JavaScript (`js/modules/medium.js`)
- Função assíncrona pura `fetchMediumArticles()`.
- Função de formatação de data `formatDate(dateString)`.
- Função de limpeza de HTML `stripHTML(htmlString)`.
- Exportação limpa do `MediumModule`.

---

## 3. Critérios de Aceite

| ID | Critério | Descrição |
|---|---|---|
| **CA-01** | Consumo Assíncrono | Utilização de `fetch()` com `async/await` para busca dos dados da API. |
| **CA-02** | Limpeza de Texto | Nenhuma tag HTML bruta do feed RSS deve aparecer no texto do resumo. |
| **CA-03** | Formatação de Data | As datas devem ser exibidas formatadas em português (ex: `12 de mar. de 2024`). |
| **CA-04** | Resiliência e Fallback | Caso a requisição retorne erro ou o feed esteja vazio, renderizar o catálogo autoral de artigos. |
| **CA-05** | Acessibilidade e Segurança | Links externos devem conter `target="_blank"` e `rel="noopener noreferrer"`. |

---

## 4. Protocolo de Verificação Manual

1. **Teste de Visualização**:
   - No site, clicar na aba "Artigos no Medium".
   - Confirmar a renderização dos cards com data, resumo, título e tags temáticas.
2. **Teste de Links Externos**:
   - Clicar em "Ler Artigo no Medium" e certificar que a página de leitura é aberta em nova aba.
3. **Inspeção de Console**:
   - Validar a ausência de exceções não tratadas no DevTools.

---

## 5. Status do Passo
- **Status:** ✅ Concluído / Pronto para Validação
- **Próximo Passo:** Passo 8 - Embeds e Integração de Jogos Itch.io
