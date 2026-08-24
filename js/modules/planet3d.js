/**
 * ==============================================================================
 * MÓDULO: NÚCLEO CELESTIAL 3D & DISCO DE ACREÇÃO (GARGANTUA)
 * Transcrição fiel 1:1 do motor de modelo.html com EffectComposer, UnrealBloomPass,
 * 25.000 partículas keplerianas, anel de fótons, aceleração orbital e transição
 * dinâmica de cores (Marsala Vermelho no Step 1, Dourado Quântico no Step 2, Rosé no Step 3).
 * ==============================================================================
 */

export const Planet3DModule = (() => {
    let container, scene, camera, renderer, composer, bloomPass;
    let coreGroup, accretionDisk, lensUpperArc, photonRing;
    let bgStars, particleSystem, particleGeo;
    let diskMat, haloMat, coronaMat;
    
    const particleCount = 25000;
    let particleAngles, particleDistances, particleSpeeds, particleYOff;
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;
    
    // Posições e escalas alvo (Scrollytelling 60fps)
    let targetPosX = 29, targetPosY = 0, targetPosZ = 8;
    let targetScale = 1.0;
    let targetSpeed = 0.0025;
    let currentSpeed = 0.0025;

    // Cores alvo para interpolação suave (Lerp)
    let targetColorR = 0.95, targetColorG = 0.85, targetColorB = 0.55;

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
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        if (bloomPass) {
            bloomPass.strength = isLight ? 0.35 : 0.95;
            bloomPass.threshold = isLight ? 0.65 : 0.35;
        }
    };

    /**
     * Inicialização da cena e pipeline de pós-processamento (UnrealBloomPass)
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
        const blackHole = new THREE.Mesh(bhGeo, bhMat);
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
        const corona = new THREE.Mesh(coronaGeo, coronaMat);
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

        const particlesMaterial = new THREE.PointsMaterial({
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
     * Atualiza as posições, cores e velocidade do buraco negro conforme as seções (Idêntico ao modelo.html)
     */
    const updateScrollytellingTargets = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? scrollTop / totalHeight : 0;

        // 1. Hero (#inicio): Dourado Imperial / Rosé suave
        if (progress < 0.12) {
            targetPosX = 29;
            targetPosY = 0;
            targetPosZ = 8;
            targetScale = 1.0;
            targetSpeed = 0.0025;
            targetColorR = 0.95; targetColorG = 0.85; targetColorB = 0.55;
        }
        // 2. Step 1 (#step-1): Vermelho Marsala Intenso (Idêntico a Imagem 3 do modelo.html)
        else if (progress < 0.25) {
            targetPosX = 29;
            targetPosY = 0;
            targetPosZ = 8;
            targetScale = 1.0;
            targetSpeed = 0.006;
            targetColorR = 1.0; targetColorG = 0.22; targetColorB = 0.32; // Marsala Red
        }
        // 3. Step 2 (#step-2): Dourado Quântico & Aceleração Orbital (Idêntico a Imagem 4 do modelo.html)
        else if (progress < 0.38) {
            targetPosX = 29;
            targetPosY = 0;
            targetPosZ = 8;
            targetScale = 1.0;
            targetSpeed = 0.022; // Core Acceleration!
            targetColorR = 1.0; targetColorG = 0.75; targetColorB = 0.12; // Quantum Gold
        }
        // 4. Step 3 (#step-3): Cyber Rosé / Violeta
        else if (progress < 0.50) {
            targetPosX = 28;
            targetPosY = 0;
            targetPosZ = 8;
            targetScale = 0.98;
            targetSpeed = 0.003;
            targetColorR = 0.88; targetColorG = 0.45; targetColorB = 0.85; // Rosé Violet
        }
        // 5. Pilares / Hobbies (Além do Código - Estilo Vero DNA do modelo.html): Recuo no canto superior esquerdo
        else if (progress < 0.65) {
            targetPosX = -25;
            targetPosY = 8;
            targetPosZ = -50;
            targetScale = 0.65;
            targetSpeed = 0.002;
            targetColorR = 0.75; targetColorG = 0.55; targetColorB = 0.95;
        }
        // 6. Formação Acadêmica & Timeline (Recua profundamente ao fundo z=-48)
        else if (progress < 0.78) {
            targetPosX = 24;
            targetPosY = 14;
            targetPosZ = -48;
            targetScale = 0.65;
            targetSpeed = 0.002;
            targetColorR = 0.85; targetColorG = 0.65; targetColorB = 0.35;
        }
        // 7. Portfólio & Contato (Fundo distante)
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
     * Loop de animação contínua (60fps) com interpolação de cor e física kepleriana
     */
    const animate = () => {
        requestAnimationFrame(animate);

        const elapsedTime = performance.now() * 0.001;

        // Amortecimento do mouse
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        // Interpolação suave de velocidade
        currentSpeed += (targetSpeed - currentSpeed) * 0.05;

        // Interpolação suave de cor dos materiais (Lerp)
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

        // Rotação dos anéis com a velocidade variável
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

        // Física das 25.000 partículas
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

            // Oscilação harmônica suave
            coreGroup.rotation.x = Math.sin(elapsedTime * 0.25) * 0.035 + (mouseY * 0.05);
            coreGroup.rotation.y = Math.cos(elapsedTime * 0.2) * 0.035 + (mouseX * 0.05);
            coreGroup.rotation.z = Math.sin(elapsedTime * 0.15) * 0.02;
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
        updateThemeBloom
    };
})();
