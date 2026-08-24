/**
 * ==============================================================================
 * MÓDULO: NÚCLEO CELESTIAL 3D & DISCO DE ACREÇÃO (GARGANTUA)
 * Transcrição fiel 1:1 do motor de modelo.html com EffectComposer, UnrealBloomPass,
 * 25.000 partículas keplerianas, anel de fótons, aceleração orbital, transição
 * dinâmica de cores e ANIMAÇÃO DE SINGULARIDADE / SUPERNOVA no clique de Envio!
 * ==============================================================================
 */

export const Planet3DModule = (() => {
    let container, scene, camera, renderer, composer, bloomPass;
    let coreGroup, accretionDisk, lensUpperArc, photonRing, blackHole, corona;
    let bgStars, particleSystem, particleGeo, particlesMaterial;
    let diskMat, haloMat, coronaMat;
    
    const particleCount = 25000;
    let particleAngles, particleDistances, particleSpeeds, particleYOff;
    let particleVelocities, galaxyTargetPositions;
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;
    
    // Posições e escalas alvo
    let targetPosX = 29, targetPosY = 0, targetPosZ = 8;
    let targetScale = 1.0;
    let targetSpeed = 0.0025;
    let currentSpeed = 0.0025;

    // Cores alvo para interpolação suave (Lerp)
    let targetColorR = 0.95, targetColorG = 0.85, targetColorB = 0.55;

    // Estados da Singularidade
    let isSingularityTriggered = false;
    let isImploding = false;
    let isExploding = false;
    let explosionPhase = 0;

    /**
     * Textura de ponto de estrela suave com halo
     */
    const createStarDotTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.25, 'rgba(243, 223, 149, 0.9)');
        grad.addColorStop(0.65, 'rgba(200, 134, 145, 0.45)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
        return new THREE.CanvasTexture(canvas);
    };

    /**
     * Textura do disco de acreção horizontal
     */
    const createSoftAccretionTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        const cx = 512, cy = 512;

        const grad = ctx.createRadialGradient(cx, cy, 120, cx, cy, 510);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(0.05, 'rgba(0,0,0,0)');
        grad.addColorStop(0.12, 'rgba(255,255,255,0.98)');
        grad.addColorStop(0.25, 'rgba(243,223,149,0.85)');
        grad.addColorStop(0.48, 'rgba(212,175,55,0.65)');
        grad.addColorStop(0.72, 'rgba(200,134,145,0.35)');
        grad.addColorStop(0.90, 'rgba(122,35,55,0.12)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1024, 1024);

        for (let i = 0; i < 95; i++) {
            ctx.beginPath();
            const r = 150 + Math.random() * 330;
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.16})`;
            ctx.lineWidth = Math.random() * 8 + 2.0;
            ctx.stroke();
        }
        return new THREE.CanvasTexture(canvas);
    };

    /**
     * Textura do arco de lente gravitacional
     */
    const createSoftLensingHaloTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        const cx = 512, cy = 512;

        const grad = ctx.createRadialGradient(cx, cy, 140, cx, cy, 490);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(0.12, 'rgba(255,255,255,0.95)');
        grad.addColorStop(0.35, 'rgba(243,223,149,0.7)');
        grad.addColorStop(0.68, 'rgba(200,134,145,0.3)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1024, 1024);
        return new THREE.CanvasTexture(canvas);
    };

    /**
     * Atualiza o Bloom com base no tema ativo (Dark / Light)
     */
    const updateThemeBloom = () => {
        if (isSingularityTriggered) return;
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        if (bloomPass) {
            bloomPass.strength = isLight ? 0.35 : 0.95;
            bloomPass.threshold = isLight ? 0.65 : 0.35;
        }
    };

    /**
     * Inicialização da cena e pipeline de pós-processamento
     */
    const initScene = () => {
        container = document.getElementById('webgl-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'webgl-container';
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '100vw';
            container.style.height = '100vh';
            container.style.zIndex = '0';
            container.style.pointerEvents = 'none';
            document.body.prepend(container);
        }

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1500);
        camera.position.set(0, 0, 38);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        // Unreal Bloom Pass
        if (typeof THREE.EffectComposer !== 'undefined' && typeof THREE.UnrealBloomPass !== 'undefined') {
            const renderScene = new THREE.RenderPass(scene, camera);
            bloomPass = new THREE.UnrealBloomPass(
                new THREE.Vector2(window.innerWidth, window.innerHeight),
                0.95,
                0.4,
                0.35
            );

            composer = new THREE.EffectComposer(renderer);
            composer.addPass(renderScene);
            composer.addPass(bloomPass);
            updateThemeBloom();
        }

        // Estrelas ao Fundo com Parallax
        const starDotTexture = createStarDotTexture();
        const bgStarsCount = 4500;
        const bgStarsGeo = new THREE.BufferGeometry();
        const bgStarsPos = new Float32Array(bgStarsCount * 3);
        const bgStarsColors = new Float32Array(bgStarsCount * 3);

        for (let i = 0; i < bgStarsCount * 3; i += 3) {
            const r = 80 + Math.random() * 320;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);

            bgStarsPos[i] = r * Math.sin(phi) * Math.cos(theta);
            bgStarsPos[i + 1] = r * Math.sin(phi) * Math.sin(theta);
            bgStarsPos[i + 2] = r * Math.cos(phi) - 60;

            const starCol = new THREE.Color();
            const rand = Math.random();
            if (rand > 0.6) {
                starCol.setRGB(0.95, 0.85, 0.55);
            } else if (rand > 0.82) {
                starCol.setRGB(0.88, 0.60, 0.65);
            } else {
                starCol.setRGB(0.98, 0.98, 1.0);
            }

            bgStarsColors[i] = starCol.r;
            bgStarsColors[i + 1] = starCol.g;
            bgStarsColors[i + 2] = starCol.b;
        }

        bgStarsGeo.setAttribute('position', new THREE.BufferAttribute(bgStarsPos, 3));
        bgStarsGeo.setAttribute('color', new THREE.BufferAttribute(bgStarsColors, 3));

        const bgStarsMat = new THREE.PointsMaterial({
            size: 1.1,
            vertexColors: true,
            map: starDotTexture,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        bgStars = new THREE.Points(bgStarsGeo, bgStarsMat);
        scene.add(bgStars);

        // Grupo do Núcleo Celestial
        coreGroup = new THREE.Group();
        coreGroup.position.set(29, 0, 8);
        scene.add(coreGroup);

        const bhRadius = 7.0;

        // 1. Horizonte de Eventos
        const bhGeo = new THREE.SphereGeometry(bhRadius, 64, 64);
        const bhMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        blackHole = new THREE.Mesh(bhGeo, bhMat);
        coreGroup.add(blackHole);

        // 2. Corona da Esfera de Fótons
        const coronaGeo = new THREE.SphereGeometry(bhRadius + 0.35, 48, 48);
        coronaMat = new THREE.MeshBasicMaterial({
            color: 0xd4af37,
            transparent: true,
            opacity: 0.45,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide
        });
        corona = new THREE.Mesh(coronaGeo, coronaMat);
        coreGroup.add(corona);

        // 3. Disco Inclinado
        const diskGroup = new THREE.Group();
        diskGroup.rotation.x = 1.38;
        diskGroup.rotation.y = 0.22;
        coreGroup.add(diskGroup);

        // 4. Disco de Acreção Horizontal Primário
        const diskTexture = createSoftAccretionTexture();
        diskMat = new THREE.MeshBasicMaterial({
            map: diskTexture,
            color: 0xf3df95,
            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            depthWrite: false,
            opacity: 0.92
        });
        const diskGeo = new THREE.RingGeometry(bhRadius + 0.1, 24, 128);
        accretionDisk = new THREE.Mesh(diskGeo, diskMat);
        accretionDisk.rotation.x = -Math.PI / 2;
        diskGroup.add(accretionDisk);

        // 5. Halo de Lente Gravitacional
        const haloTexture = createSoftLensingHaloTexture();
        haloMat = new THREE.MeshBasicMaterial({
            map: haloTexture,
            color: 0xc88691,
            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            depthWrite: false,
            opacity: 0.72
        });
        const lensGeo = new THREE.RingGeometry(bhRadius + 0.15, 20, 128);
        lensUpperArc = new THREE.Mesh(lensGeo, haloMat);
        lensUpperArc.rotation.y = 0.15;
        coreGroup.add(lensUpperArc);

        // 6. Anel de Fótons
        const photonRingGeo = new THREE.TorusGeometry(bhRadius + 0.2, 0.16, 16, 100);
        const photonRingMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.92,
            blending: THREE.AdditiveBlending
        });
        photonRing = new THREE.Mesh(photonRingGeo, photonRingMat);
        coreGroup.add(photonRing);

        // 7. Poeira Estelar Kepleriana Orbital (25.000 Partículas)
        particleGeo = new THREE.BufferGeometry();
        const particlePos = new Float32Array(particleCount * 3);
        const particleColors = new Float32Array(particleCount * 3);
        particleAngles = new Float32Array(particleCount);
        particleDistances = new Float32Array(particleCount);
        particleSpeeds = new Float32Array(particleCount);
        particleYOff = new Float32Array(particleCount);
        particleVelocities = new Float32Array(particleCount * 3);
        galaxyTargetPositions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const r = (bhRadius + 0.6) + Math.pow(Math.random(), 2.4) * 28;
            const theta = Math.random() * Math.PI * 2;
            const thickness = (Math.random() - 0.5) * (r * 0.18);

            particleDistances[i] = r;
            particleAngles[i] = theta;
            particleSpeeds[i] = (2.2 / Math.sqrt(r)) * (0.85 + Math.random() * 0.3);
            particleYOff[i] = thickness;

            particlePos[i3] = r * Math.cos(theta);
            particlePos[i3 + 1] = thickness;
            particlePos[i3 + 2] = r * Math.sin(theta);

            const pCol = new THREE.Color();
            if (r < bhRadius + 3) {
                pCol.setRGB(1.0, 0.95, 0.85);
            } else if (Math.random() > 0.4) {
                pCol.setRGB(0.85, 0.68, 0.22);
            } else {
                pCol.setRGB(0.78, 0.45, 0.52);
            }

            particleColors[i3] = pCol.r;
            particleColors[i3 + 1] = pCol.g;
            particleColors[i3 + 2] = pCol.b;
        }

        particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
        particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

        particlesMaterial = new THREE.PointsMaterial({
            size: 0.65,
            vertexColors: true,
            map: starDotTexture,
            transparent: true,
            opacity: 0.92,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        particleSystem = new THREE.Points(particleGeo, particlesMaterial);
        diskGroup.add(particleSystem);

        // Listeners
        window.addEventListener('resize', handleResize, { passive: true });
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('scroll', updateScrollytellingTargets, { passive: true });
        
        const observer = new MutationObserver(updateThemeBloom);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        updateScrollytellingTargets();
    };

    const handleResize = () => {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (composer) composer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (e) => {
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    /**
     * Atualiza as posições, cores e velocidade conforme as seções
     */
    const updateScrollytellingTargets = () => {
        if (isSingularityTriggered) return;

        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? scrollTop / totalHeight : 0;

        // 1. Hero
        if (progress < 0.12) {
            targetPosX = 29;
            targetPosY = 0;
            targetPosZ = 8;
            targetScale = 1.0;
            targetSpeed = 0.0025;
            targetColorR = 0.95; targetColorG = 0.85; targetColorB = 0.55;
        }
        // 2. Step 1 (Vermelho Marsala)
        else if (progress < 0.25) {
            targetPosX = 29;
            targetPosY = 0;
            targetPosZ = 8;
            targetScale = 1.0;
            targetSpeed = 0.006;
            targetColorR = 1.0; targetColorG = 0.22; targetColorB = 0.32;
        }
        // 3. Step 2 (Dourado Quântico & Aceleração)
        else if (progress < 0.38) {
            targetPosX = 29;
            targetPosY = 0;
            targetPosZ = 8;
            targetScale = 1.0;
            targetSpeed = 0.022;
            targetColorR = 1.0; targetColorG = 0.75; targetColorB = 0.12;
        }
        // 4. Step 3 (Cyber Rosé / Violeta)
        else if (progress < 0.50) {
            targetPosX = 28;
            targetPosY = 0;
            targetPosZ = 8;
            targetScale = 0.98;
            targetSpeed = 0.003;
            targetColorR = 0.88; targetColorG = 0.45; targetColorB = 0.85;
        }
        // 5. Pilares Além do Código
        else if (progress < 0.65) {
            targetPosX = -25;
            targetPosY = 8;
            targetPosZ = -50;
            targetScale = 0.65;
            targetSpeed = 0.002;
            targetColorR = 0.75; targetColorG = 0.55; targetColorB = 0.95;
        }
        // 6. Formação
        else if (progress < 0.78) {
            targetPosX = 24;
            targetPosY = 14;
            targetPosZ = -48;
            targetScale = 0.65;
            targetSpeed = 0.002;
            targetColorR = 0.85; targetColorG = 0.65; targetColorB = 0.35;
        }
        // 7. Portfólio & Contato
        else {
            targetPosX = -25;
            targetPosY = 10;
            targetPosZ = -52;
            targetScale = 0.62;
            targetSpeed = 0.002;
            targetColorR = 0.95; targetColorG = 0.85; targetColorB = 0.55;
        }
    };

    /**
     * DISPARA A ANIMAÇÃO DA SINGULARIDADE (IDÊNTICA AO BOTÃO APROVAR FASE 1 DO MODELO.HTML)
     * @param {Object} userData - { name, email }
     */
    const triggerSingularityAnimation = (userData = {}) => {
        if (isSingularityTriggered || isImploding || isExploding) return;
        isSingularityTriggered = true;

        // 1. Congela o scroll
        document.body.style.overflow = 'hidden';

        const btn = document.getElementById('submitContactBtn');
        if (btn) {
            btn.innerHTML = `<span class="btn-icon">🌀</span> <span>Singularidade Ativada...</span>`;
        }

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // 2. Gravitational Suction dos Elementos de Contato e Header
        const targetElements = document.querySelectorAll('#contactFormCard, #contactInfoCard, .section-header-block, .site-header, #siteFooter');
        
        targetElements.forEach(el => {
            if (typeof gsap !== 'undefined') {
                const rect = el.getBoundingClientRect();
                const dx = centerX - (rect.left + rect.width / 2);
                const dy = centerY - (rect.top + rect.height / 2);
                
                gsap.to(el, {
                    x: dx,
                    y: dy,
                    scale: 0.001,
                    rotation: (Math.random() - 0.5) * 720,
                    opacity: 0,
                    filter: "blur(18px)",
                    duration: 1.35,
                    ease: "power3.in"
                });
            } else {
                el.style.transition = 'all 1.2s ease-in';
                el.style.transform = 'scale(0) rotate(360deg)';
                el.style.opacity = '0';
            }
        });

        // 3. O Buraco Negro trava suavemente no centro (0, 0, 0)
        if (typeof gsap !== 'undefined') {
            gsap.to(coreGroup.position, { x: 0, y: 0, z: 0, duration: 1.3, ease: "power3.inOut" });
            gsap.to(coreGroup.rotation, { x: 0, y: 0, z: 0, duration: 1.3, ease: "power3.inOut" });
            gsap.to(coreGroup.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 1.3, ease: "power3.inOut" });
        } else {
            coreGroup.position.set(0, 0, 0);
            coreGroup.scale.set(1, 1, 1);
        }

        // 4. Colapso da Singularidade (Implosão a 600ms)
        setTimeout(() => {
            isImploding = true;
            targetSpeed = 0.5;

            if (typeof gsap !== 'undefined') {
                gsap.to(accretionDisk.scale, { x: 0, y: 0, z: 0, duration: 1.3, ease: "power4.in" });
                gsap.to(lensUpperArc.scale, { x: 0, y: 0, z: 0, duration: 1.3, ease: "power4.in" });
                gsap.to(corona.scale, { x: 0, y: 0, z: 0, duration: 1.3, ease: "power4.in" });
                gsap.to(photonRing.scale, { x: 0, y: 0, z: 0, duration: 1.3, ease: "power4.in" });
                gsap.to(blackHole.scale, { x: 0, y: 0, z: 0, duration: 1.5, ease: "power4.in" });
            }

            const colors = particleGeo.attributes.color.array;
            for (let i = 0; i < particleCount * 3; i += 3) {
                colors[i] = 1.0; colors[i + 1] = 1.0; colors[i + 2] = 1.0;
            }
            particleGeo.attributes.color.needsUpdate = true;
        }, 600);

        // 5. Expansão Big Bang / Galáxia Espiral Frontal (Supernova a 2100ms)
        setTimeout(() => {
            isImploding = false;
            isExploding = true;
            explosionPhase = 1;

            // Flash de Luz Ofuscante
            const flash = document.createElement('div');
            flash.style.position = 'fixed';
            flash.style.inset = '0';
            flash.style.backgroundColor = '#ffffff';
            flash.style.zIndex = '9999';
            flash.style.pointerEvents = 'none';
            document.body.appendChild(flash);

            if (typeof gsap !== 'undefined') {
                gsap.to(flash, { opacity: 0, duration: 3.2, ease: "power2.out", onComplete: () => flash.remove() });
                if (bloomPass) {
                    bloomPass.strength = 3.6;
                    gsap.to(bloomPass, { strength: 1.8, duration: 6, ease: "power2.out" });
                }
                if (particlesMaterial) {
                    gsap.to(particlesMaterial, { size: 2.2, opacity: 1.0, duration: 4, ease: "power2.out" });
                }
            } else {
                flash.style.transition = 'opacity 3s ease-out';
                setTimeout(() => { flash.style.opacity = '0'; }, 50);
            }

            const positions = particleGeo.attributes.position.array;
            const colors = particleGeo.attributes.color.array;

            // 6-Arm Logarithmic Spiral Galaxy (Paleta Marsala, Rosé & Dourado)
            const arms = 6;
            const maxRadius = 155;

            for (let i = 0; i < particleCount * 3; i += 3) {
                positions[i] = 0;
                positions[i + 1] = 0;
                positions[i + 2] = 0;

                const blastSpeed = Math.random() * 3.5 + 1.0;
                const blastTheta = Math.random() * Math.PI * 2;
                const blastPhi = (Math.random() - 0.5) * Math.PI * 0.25;
                particleVelocities[i] = Math.cos(blastTheta) * blastSpeed;
                particleVelocities[i + 1] = Math.sin(blastTheta) * blastSpeed;
                particleVelocities[i + 2] = Math.sin(blastPhi) * blastSpeed * 0.4;

                const armIndex = (i / 3) % arms;
                const radius = Math.pow(Math.random(), 1.25) * maxRadius;
                const spin = radius * 0.16;
                const angle = (armIndex * (Math.PI * 2 / arms)) + spin;

                const scatter = (maxRadius - radius) * 0.10 + 1.2;
                const randX = (Math.random() - 0.5) * scatter;
                const randY = (Math.random() - 0.5) * scatter;
                const randZ = (Math.random() - 0.5) * (scatter * 0.35);

                galaxyTargetPositions[i] = Math.cos(angle) * radius + randX;
                galaxyTargetPositions[i + 1] = Math.sin(angle) * radius + randY;
                galaxyTargetPositions[i + 2] = randZ;

                const color = new THREE.Color();
                if (radius < 24) {
                    color.setRGB(1.0, 0.95, 0.75); // Núcleo dourado brilhante
                } else if (Math.random() > 0.45) {
                    color.setRGB(0.85, 0.25, 0.42); // Marsala Cósmico
                } else {
                    color.setRGB(0.95, 0.75, 0.35); // Dourado Imperial
                }

                colors[i] = color.r;
                colors[i + 1] = color.g;
                colors[i + 2] = color.b;
            }

            particleGeo.attributes.color.needsUpdate = true;
            particleGeo.attributes.position.needsUpdate = true;

            setTimeout(() => {
                explosionPhase = 2;
            }, 800);

            // Câmera recua suavemente para contemplar toda a galáxia
            if (typeof gsap !== 'undefined') {
                gsap.to(camera.position, { x: 0, y: 0, z: 135, duration: 8, ease: "power2.out" });
                gsap.to(coreGroup.rotation, { x: 0, y: 0, z: 0, duration: 8, ease: "power2.out" });
            }

            // AO FIM DA ANIMAÇÃO (após a formação da galáxia): Dispara o evento para abrir o modal customizado
            setTimeout(() => {
                document.dispatchEvent(new CustomEvent('singularityCompleted', {
                    detail: userData
                }));
            }, 2100);

        }, 2100);
    };

    /**
     * Loop de animação contínua (60fps) com física de singularidade e galáxia
     */
    const animate = () => {
        requestAnimationFrame(animate);

        const elapsedTime = performance.now() * 0.001;

        if (!isSingularityTriggered) {
            // Amortecimento do mouse
            mouseX += (targetMouseX - mouseX) * 0.05;
            mouseY += (targetMouseY - mouseY) * 0.05;

            // Interpolação suave de velocidade
            currentSpeed += (targetSpeed - currentSpeed) * 0.05;

            // Interpolação de cores
            if (diskMat && haloMat && coronaMat) {
                diskMat.color.r += (targetColorR - diskMat.color.r) * 0.05;
                diskMat.color.g += (targetColorG - diskMat.color.g) * 0.05;
                diskMat.color.b += (targetColorB - diskMat.color.b) * 0.05;

                haloMat.color.r += (targetColorR - haloMat.color.r) * 0.05;
                haloMat.color.g += (targetColorG - haloMat.color.g) * 0.05;
                haloMat.color.b += (targetColorB - haloMat.color.b) * 0.05;

                coronaMat.color.r += (targetColorR - coronaMat.color.r) * 0.05;
                coronaMat.color.g += (targetColorG - coronaMat.color.g) * 0.05;
                coronaMat.color.b += (targetColorB - coronaMat.color.b) * 0.05;
            }

            // Rotação dos anéis
            if (accretionDisk) accretionDisk.rotation.z -= currentSpeed * 3.5;
            if (lensUpperArc) lensUpperArc.rotation.z += currentSpeed * 1.5;
            if (photonRing) photonRing.rotation.z -= currentSpeed * 2.0;

            // Parallax das estrelas ao fundo
            if (bgStars && coreGroup) {
                const targetStarPosX = -camera.position.x * 0.15 - coreGroup.position.x * 0.05;
                const targetStarPosY = -camera.position.y * 0.15 - coreGroup.position.y * 0.05;
                const targetStarPosZ = -camera.position.z * 0.08;

                bgStars.position.x += (targetStarPosX - bgStars.position.x) * 0.05;
                bgStars.position.y += (targetStarPosY - bgStars.position.y) * 0.05;
                bgStars.position.z += (targetStarPosZ - bgStars.position.z) * 0.05;

                bgStars.rotation.y = elapsedTime * 0.0003;
                bgStars.rotation.x = Math.sin(elapsedTime * 0.15) * 0.01;
            }

            // Física das 25.000 partículas keplerianas
            if (particleGeo && particleAngles) {
                const pos = particleGeo.attributes.position.array;
                for (let i = 0; i < particleCount; i++) {
                    const i3 = i * 3;
                    particleAngles[i] -= particleSpeeds[i] * currentSpeed * 20;
                    const r = particleDistances[i];
                    const angle = particleAngles[i];

                pos[i3] = r * Math.cos(angle);
                pos[i3 + 1] = particleYOff[i] + Math.sin(elapsedTime * 2 + r) * 0.2;
                pos[i3 + 2] = r * Math.sin(angle);
            }
            particleGeo.attributes.position.needsUpdate = true;
        }

        // Movimentação suave do Core 3D
        if (coreGroup) {
            const effectiveTargetX = targetPosX + mouseX * 2;
            const effectiveTargetY = targetPosY - mouseY * 2;

            coreGroup.position.x += (effectiveTargetX - coreGroup.position.x) * 0.04;
            coreGroup.position.y += (effectiveTargetY - coreGroup.position.y) * 0.04;
            coreGroup.position.z += (targetPosZ - coreGroup.position.z) * 0.04;

            const curScale = coreGroup.scale.x;
            const nextScale = curScale + (targetScale - curScale) * 0.04;
            coreGroup.scale.set(nextScale, nextScale, nextScale);

            coreGroup.rotation.x = Math.sin(elapsedTime * 0.25) * 0.035 + (mouseY * 0.05);
            coreGroup.rotation.y = Math.cos(elapsedTime * 0.2) * 0.035 + (mouseX * 0.05);
            coreGroup.rotation.z = Math.sin(elapsedTime * 0.15) * 0.02;
        }
    } 
    // ----------------------------------------------------
    // FÍSICA DA SINGULARIDADE / SUPERNOVA (MODELO.HTML)
    // ----------------------------------------------------
    else {
        if (isImploding && particleGeo) {
            const pos = particleGeo.attributes.position.array;
            for (let i = 0; i < particleCount * 3; i += 3) {
                pos[i] *= 0.88;
                pos[i + 1] *= 0.88;
                pos[i + 2] *= 0.88;
            }
            particleGeo.attributes.position.needsUpdate = true;
        } else if (isExploding && particleGeo) {
            const pos = particleGeo.attributes.position.array;
            if (explosionPhase === 1) {
                for (let i = 0; i < particleCount * 3; i += 3) {
                    pos[i] += particleVelocities[i];
                    pos[i + 1] += particleVelocities[i + 1];
                    pos[i + 2] += particleVelocities[i + 2];
                    particleVelocities[i] *= 0.94;
                    particleVelocities[i + 1] *= 0.94;
                    particleVelocities[i + 2] *= 0.94;
                }
            } else if (explosionPhase === 2) {
                for (let i = 0; i < particleCount * 3; i += 3) {
                    pos[i] += (galaxyTargetPositions[i] - pos[i]) * 0.035;
                    pos[i + 1] += (galaxyTargetPositions[i + 1] - pos[i + 1]) * 0.035;
                    pos[i + 2] += (galaxyTargetPositions[i + 2] - pos[i + 2]) * 0.035;
                }
                if (particleSystem) {
                    particleSystem.rotation.z += 0.0008; // Rotação contínua da galáxia espiral
                }
            }
            particleGeo.attributes.position.needsUpdate = true;
        }
    }

    if (composer) {
        composer.render();
    } else {
        renderer.render(scene, camera);
    }
};

    /**
     * Inicializa o módulo 3D
     */
    const init = () => {
        if (typeof THREE === 'undefined') {
            console.warn('[Planet3DModule] Three.js não detectado.');
            return;
        }

        initScene();
        animate();
    };

    return {
        init,
        updateScrollytellingTargets,
        updateThemeBloom,
        triggerSingularityAnimation
    };
})();
