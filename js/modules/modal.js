/**
 * ==============================================================================
 * MÓDULO: MODAL DE SUCESSO CUSTOMIZADO (ModalModule)
 * Responsabilidade Única: Controle de exibição, animação e acessibilidade do
 * modal de confirmação de envio de formulário com gerenciamento de foco e WAI-ARIA.
 * ==============================================================================
 */

export const ModalModule = (() => {
    // Cache de Elementos do DOM
    const modal = document.getElementById('successModal');
    const backdrop = document.getElementById('modalBackdrop');
    const closeBtn = document.getElementById('modalCloseBtn');
    const confirmBtn = document.getElementById('modalConfirmBtn');
    const messageContainer = document.getElementById('modalCustomMessage');

    /**
     * Abre o modal com os dados personalizados do remetente
     * @param {Object} data - Dados do usuário (name, email)
     */
    const openModal = (data = {}) => {
        if (!modal) return;

        const senderName = data.name || 'Visitante';
        const senderEmail = data.email || '';

        if (messageContainer) {
            messageContainer.innerHTML = `
                Olá, <strong>${senderName}</strong>! Sua mensagem foi enviada e registrada com sucesso.<br><br>
                Em breve retornarei o seu contato${senderEmail ? ` através do e-mail <strong>${senderEmail}</strong>` : ''}. Obrigada pelo interesse!
            `;
        }

        modal.hidden = false;
        // Timeout suave para acionar a transição CSS de opacidade
        setTimeout(() => {
            modal.classList.add('is-visible');
        }, 10);

        document.body.style.overflow = 'hidden';

        if (confirmBtn) {
            confirmBtn.focus();
        }
    };

    /**
     * Fecha o modal e restaura o scroll da página
     */
    const closeModal = () => {
        if (!modal) return;

        modal.classList.remove('is-visible');

        setTimeout(() => {
            modal.hidden = true;
            document.body.style.overflow = '';
        }, 350);
    };

    /**
     * Configura os ouvintes de eventos para fechamento e escuta do formulário
     */
    const setupEventListeners = () => {
        // Escuta o evento customizado disparado pelo ContactModule
        document.addEventListener('contactFormSubmitted', (event) => {
            openModal(event.detail);
        });

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (confirmBtn) confirmBtn.addEventListener('click', closeModal);
        if (backdrop) backdrop.addEventListener('click', closeModal);

        // Fechamento pela tecla ESC
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal && modal.classList.contains('is-visible')) {
                closeModal();
            }
        });
    };

    /**
     * Inicializa o módulo
     */
    const init = () => {
        setupEventListeners();
    };

    return {
        init,
        openModal,
        closeModal
    };
})();
