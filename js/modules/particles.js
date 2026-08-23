/**
 * ==============================================================================
 * MÓDULO: MOTOR DE PARTÍCULAS AMBIENTAIS (ParticlesModule)
 * Responsabilidade Única: Renderização em Canvas 2D nativo de poeira estelar e
 * constelações luminosas em tons de Marsala, Rosé Gold e Dourado Imperial.
 * ==============================================================================
 */

export const ParticlesModule = (() => {
    let canvas = null;
    let ctx = null;
    let particles = [];
    let animationFrameId = null;
    let width = 0;
    let height = 0;

    // Configurações de Partículas
    const PARTICLE_COUNT = 45;
    const MAX_DISTANCE = 120;
    const COLORS = [
        'rgba(212, 175, 55, 0.45)',  // Dourado
        'rgba(200, 134, 145, 0.45)', // Rosé Gold
        'rgba(157, 49, 73, 0.35)',   // Marsala
        'rgba(243, 223, 149, 0.5)'   // Dourado Claro
    ];

    /**
     * Classe que representa uma partícula individual
     */
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 2 + 0.8;
            this.vx = (Math.random() - 0.5) * 0.45;
            this.vy = (Math.random() - 0.5) * 0.45;
            this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
            this.pulse = Math.random() * Math.PI;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.pulse += 0.02;

            // Reposiciona caso saia da tela
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }

        draw() {
            const currentRadius = this.radius + Math.sin(this.pulse) * 0.4;
            ctx.beginPath();
            ctx.arc(this.x, this.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    /**
     * Desenha linhas sutis entre partículas próximas
     */
    const drawConnections = () => {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.hypot(dx, dy);

                if (dist < MAX_DISTANCE) {
                    const alpha = (1 - dist / MAX_DISTANCE) * 0.12;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(200, 134, 145, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
    };

    /**
     * Redimensiona o canvas para preencher a janela
     */
    const resizeCanvas = () => {
        if (!canvas) return;
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    };

    /**
     * Loop principal de animação
     */
    const loop = () => {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        drawConnections();

        animationFrameId = requestAnimationFrame(loop);
    };

    /**
     * Cria e inicializa o canvas e as partículas
     */
    const init = () => {
        // Verifica se o usuário prefere movimento reduzido
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        canvas = document.getElementById('ambientCanvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'ambientCanvas';
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100vw';
            canvas.style.height = '100vh';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '0';
            document.body.prepend(canvas);
        }

        ctx = canvas.getContext('2d');
        resizeCanvas();

        window.addEventListener('resize', resizeCanvas, { passive: true });

        // Cria a coleção de partículas
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }

        loop();
    };

    return {
        init
    };
})();
