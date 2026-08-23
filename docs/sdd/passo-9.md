# Especificação Técnica SDD - Passo 9: Seção "Contato" - Formulário e Validação com Regex (Clean Code)

## 1. Visão Geral
Esta especificação descreve a implementação da seção semântica **"Contato" (`#contato`)**, composta pelos canais diretos de comunicação com **Mariana Beilune Abad** (e-mail, LinkedIn, GitHub, localização) e um formulário semântico com **validação nativa em Vanilla JavaScript ES6+ e Expressões Regulares (Regex)**, exibindo mensagens de erro contextuais e amigáveis em tempo real.

---

## 2. Requisitos Técnicos

### 2.1. Estrutura Semântica HTML5
- Elemento `<section id="contato" class="section-container">`.
- Layout em duas colunas Bento:
  - **Coluna 1 (`<article class="bento-card contact-info-card">`)**:
    - Detalhes de contato direto: E-mail (`maryh.abad@gmail.com`), LinkedIn (`linkedin.com/in/mariana-abad`), GitHub (`github.com/maaryhabad`), Localização (`Curitiba, PR`).
    - Badges de disponibilidade para consultorias, palestras e oportunidades.
  - **Coluna 2 (`<article class="bento-card contact-form-card">`)**:
    - Formulário `<form id="contactForm" novalidate>` (o atributo `novalidate` desativa os tooltips nativos do navegador para permitir validações customizadas ricas em JS).
    - Campo **Nome**: `<input type="text" id="contactName" required>` com `<span class="field-error-msg" id="nameError">`.
    - Campo **E-mail**: `<input type="email" id="contactEmail" required>` com `<span class="field-error-msg" id="emailError">`.
    - Campo **Assunto**: `<input type="text" id="contactSubject" required>` com `<span class="field-error-msg" id="subjectError">`.
    - Campo **Mensagem**: `<textarea id="contactMessage" rows="5" required>` com `<span class="field-error-msg" id="messageError">`.
    - Botão de envio com ícone e efeito luminoso (`<button type="submit" class="btn-gold-glow">`).

### 2.2. Regras de Validação com Regex & JavaScript Puro
- **Expressão Regular para E-mail:**
  ```javascript
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  ```
- **Critérios de Validação por Campo:**
  1. *Nome*: Obrigatório, mínimo de 3 caracteres não nulos.
  2. *E-mail*: Obrigatório, formato de e-mail estritamente válido segundo a regex.
  3. *Assunto*: Obrigatório, mínimo de 4 caracteres.
  4. *Mensagem*: Obrigatório, mínimo de 10 caracteres.
- **Interatividade Limpa:**
  - Evento de escuta no `submit` com `event.preventDefault()`.
  - Escuta no evento `input` de cada campo para limpar a mensagem de erro assim que o usuário digita uma informação válida.
  - Adição da classe CSS `.is-invalid` no campo com borda avermelhada e animação suave de vibração (`shake`).

### 2.3. Estilização CSS3 (`css/sections/contact.css`)
- Campos de formulário com fundo translúcido em Marsala, bordas sutis em Rosé Gold e foco luminoso em Dourado Imperial (`box-shadow: 0 0 15px var(--gold-glow)`).
- Mensagens de erro em tom *rose-danger* suave (`#ff7b89`) com tipografia monoespaçada legível.

---

## 3. Critérios de Aceite

| ID | Critério | Descrição |
|---|---|---|
| **CA-01** | Semântica do Formulário | O formulário deve utilizar `<form>`, `<label>`, `<input>`, `<textarea>` e `<button>` com associação correta via `for` e `id`. |
| **CA-02** | Validação por Regex | E-mails inválidos (como `teste@`, `teste.com`, `sem-arroba`) devem ser rejeitados com mensagem explicativa. |
| **CA-03** | Erros Contextuais | Cada campo inválido deve destacar sua respectiva borda e exibir mensagem de erro logo abaixo. |
| **CA-04** | Limpeza de Erro em Tempo Real | Ao corrigir o campo digitando uma entrada válida, o erro visual deve desaparecer imediatamente. |
| **CA-05** | Zero Dependências | Validação 100% autoral em Vanilla JS sem bibliotecas externas. |

---

## 4. Protocolo de Verificação Manual

1. **Teste de Submissão Vazia**:
   - Clicar em "Enviar Mensagem" com todos os campos em branco. Validar se todos os 4 campos apontam os respectivos erros.
2. **Teste de E-mail Inválido**:
   - Preencher o e-mail com `mariana@dominio` (sem extensão) e validar se o erro *"Por favor, insira um e-mail válido (ex: nome@dominio.com)"* é disparado.
3. **Teste de Validação Bem-Sucedida**:
   - Preencher todos os campos com dados válidos e verificar se a validação retorna `true`.

---

## 5. Status do Passo
- **Status:** ✅ Concluído / Pronto para Validação
- **Próximo Passo:** Passo 10 - Feedback Visual com Modal de Sucesso Customizado
