/**
 * ==============================================================================
 * MÓDULO: FORMULÁRIO DE CONTATO & VALIDAÇÃO COM REGEX (ContactModule)
 * Responsabilidade Única: Validação semântica de campos de entrada,
 * checagem de e-mail por expressão regular e disparo da animação cósmica.
 * ==============================================================================
 */

import { Planet3DModule } from './planet3d.js';

export const ContactModule = (() => {
    // Regex de Validação Estrita de E-mail
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Cache de Elementos do DOM
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    /**
     * Define o estado de erro de um campo
     */
    const setFieldError = (inputElement, errorElement, message) => {
        if (!inputElement || !errorElement) return;
        inputElement.classList.add('is-invalid');
        errorElement.textContent = message;
    };

    /**
     * Limpa o estado de erro de um campo
     */
    const clearFieldError = (inputElement, errorElement) => {
        if (!inputElement || !errorElement) return;
        inputElement.classList.remove('is-invalid');
        errorElement.textContent = '';
    };

    /**
     * Valida o campo de Nome
     */
    const validateName = () => {
        if (!nameInput) return true;
        const value = nameInput.value.trim();

        if (value === '') {
            setFieldError(nameInput, nameError, 'O nome é obrigatório.');
            return false;
        }

        if (value.length < 3) {
            setFieldError(nameInput, nameError, 'O nome deve conter pelo menos 3 caracteres.');
            return false;
        }

        clearFieldError(nameInput, nameError);
        return true;
    };

    /**
     * Valida o campo de E-mail utilizando Regex
     */
    const validateEmail = () => {
        if (!emailInput) return true;
        const value = emailInput.value.trim();

        if (value === '') {
            setFieldError(emailInput, emailError, 'O e-mail é obrigatório.');
            return false;
        }

        if (!EMAIL_REGEX.test(value)) {
            setFieldError(emailInput, emailError, 'Por favor, insira um e-mail válido (ex: seu.nome@dominio.com).');
            return false;
        }

        clearFieldError(emailInput, emailError);
        return true;
    };

    /**
     * Valida o campo de Assunto
     */
    const validateSubject = () => {
        if (!subjectInput) return true;
        const value = subjectInput.value.trim();

        if (value === '') {
            setFieldError(subjectInput, subjectError, 'O assunto é obrigatório.');
            return false;
        }

        if (value.length < 4) {
            setFieldError(subjectInput, subjectError, 'O assunto deve ter pelo menos 4 caracteres.');
            return false;
        }

        clearFieldError(subjectInput, subjectError);
        return true;
    };

    /**
     * Valida o campo de Mensagem
     */
    const validateMessage = () => {
        if (!messageInput) return true;
        const value = messageInput.value.trim();

        if (value === '') {
            setFieldError(messageInput, messageError, 'A mensagem é obrigatória.');
            return false;
        }

        if (value.length < 10) {
            setFieldError(messageInput, messageError, 'A mensagem deve ter pelo menos 10 caracteres.');
            return false;
        }

        clearFieldError(messageInput, messageError);
        return true;
    };

    /**
     * Valida todos os campos do formulário
     */
    const validateForm = () => {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();

        return isNameValid && isEmailValid && isSubjectValid && isMessageValid;
    };

    /**
     * Limpa todos os campos do formulário
     */
    const resetForm = () => {
        if (!form) return;
        form.reset();
        clearFieldError(nameInput, nameError);
        clearFieldError(emailInput, emailError);
        clearFieldError(subjectInput, subjectError);
        clearFieldError(messageInput, messageError);
    };

    /**
     * Configura ouvintes de eventos em tempo real e submissão
     */
    const setupRealtimeValidation = () => {
        if (nameInput) nameInput.addEventListener('input', validateName);
        if (emailInput) emailInput.addEventListener('input', validateEmail);
        if (subjectInput) subjectInput.addEventListener('input', validateSubject);
        if (messageInput) messageInput.addEventListener('input', validateMessage);

        if (form) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const isValid = validateForm();
                
                if (isValid) {
                    const userData = {
                        name: nameInput.value.trim(),
                        email: emailInput.value.trim(),
                        subject: subjectInput.value.trim(),
                        message: messageInput.value.trim()
                    };

                    // Dispara a animação cósmica de singularidade 1:1 ao modelo.html
                    Planet3DModule.triggerSingularityAnimation(userData);

                    // Dispara evento customizado para outros módulos
                    const formSubmittedEvent = new CustomEvent('contactFormSubmitted', {
                        detail: userData
                    });
                    document.dispatchEvent(formSubmittedEvent);
                }
            });
        }
    };

    /**
     * Inicializa o módulo
     */
    const init = () => {
        setupRealtimeValidation();
    };

    return {
        init,
        validateForm,
        resetForm
    };
})();
