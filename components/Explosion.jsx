import React, { useEffect, useRef, useState } from 'react';

/* ═══════════════════════════════════════════════════════
   EXPLOSION — Three.js Shader Ring Effect
   Accepts `explosionProgress` (0→1) from external scroll
   controller instead of running its own scroll system.
   Shader code, animation math, smoothing, and parallax
   are UNTOUCHED from the original.
   ═══════════════════════════════════════════════════════ */

export function Explosion({ explosionProgress = 0 }) {
  const mountRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let scene, camera, renderer, animationId;
    let currentProgress = 0;
    let targetProgress = 0;
    
    // Mouse tracking for restricted parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const init = async () => {
      // Dynamically load Three.js
      if (!window.THREE) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }
      const THREE = window.THREE;
      setIsLoading(false);

      if (!mountRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      scene = new THREE.Scene();
      
      // Camera setup pulled back to see the massive ring
      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.z = 40; 

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);

      // --- 1. THE CORE GLOW SHADER ---
      // Plane increased significantly to prevent clipping as the ring expands out of view
      const coreGeo = new THREE.PlaneGeometry(800, 800);
      const coreMat = new THREE.ShaderMaterial({
        uniforms: {
          uCoreColor: { value: new THREE.Color(0xFFFFFF) }, // Blinding white center
          uHaloColor: { value: new THREE.Color(0xFFAA55) }, // Warm explosion halo (orange/yellowish)
          uRadius: { value: 0.0 },
          uHollow: { value: 0.0 },
          opacity: { value: 0.0 },
          time: { value: 0.0 }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uCoreColor;
          uniform vec3 uHaloColor;
          uniform float opacity;
          uniform float uRadius;
          uniform float uHollow;
          uniform float time;
          varying vec2 vUv;

          void main() {
            // Map UV (0 to 1) to world distance
            float distWorld = distance(vUv, vec2(0.5)) * 800.0;
            
            // MATH FIX: Clean atan to prevent the straight line screen tear
            vec2 centeredUv = vUv - 0.5;
            float angle = atan(centeredUv.y, centeredUv.x);
            
            // 5 frequency peaks, moving at speed 2.0
            float clump = sin(angle * 5.0 - time * 2.0) * 0.5 + 0.5;

            // 1. SOLID BALL GLOW
            // Prevent division by zero with +0.5
            float pointGlow = 2.0 / (distWorld + 0.5);
            float ballGlow = smoothstep(uRadius + 5.0, uRadius - 5.0, distWorld) * 1.5;
            float solidGlow = pointGlow + ballGlow;

            // 2. RING GLOW
            float ringThickness = mix(5.0, 1.5, uHollow); 
            float ringGlow = 2.0 / (abs(distWorld - uRadius) + ringThickness) - 0.05;
            ringGlow *= (1.0 + clump * 2.0 * uHollow);

            // Mix based on hollow progress
            float strength = mix(solidGlow, ringGlow, uHollow);

            if (uHollow > 0.0) {
                strength += 2.0 / (distWorld + 3.0) * (1.0 - uHollow * 0.7);
            }

            // Smoothly fade out extreme edges
            strength *= smoothstep(400.0, 200.0, distWorld);

            // COLOR MIXING: White hot center, warming up towards the edges
            vec3 finalColor = mix(uHaloColor, uCoreColor, smoothstep(25.0, 0.0, distWorld - uRadius * uHollow));

            gl_FragColor = vec4(finalColor, max(0.0, strength) * opacity);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.frustumCulled = false; // Prevent glitchy disappearance
      scene.add(coreMesh);

      // --- ANIMATION LOOP ---
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        const time = Date.now() * 0.001;
        
        currentProgress += (targetProgress - currentProgress) * 0.08;
        
        // Vastly restricted parallax easing
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        // Micro-movements only (limits rotation to a very narrow, sturdy field)
        scene.rotation.y = mouseX * 0.04;
        scene.rotation.x = mouseY * 0.04;

        coreMat.uniforms.time.value = time;

        // --- SCROLL LOGIC MAPPING ---
        let uRadius = 0.0;
        let uHollow = 0.0;
        let opacity = 0.0;

        if (currentProgress < 0.05) {
          // 1. Pre-ignition: Tiny glow gathering
          const p = currentProgress / 0.05;
          uRadius = p * 0.5;
          uHollow = 0.0;
          opacity = p;
        } else if (currentProgress < 0.4) {
          // 2. The Big Expand
          const p = (currentProgress - 0.05) / 0.35; 
          uRadius = 0.5 + Math.pow(p, 2.0) * 16.0; 
          uHollow = 0.0;
          opacity = 1.0;
        } else {
          // 3. The Hollow Ring expanding OUT of view
          const p = (currentProgress - 0.4) / 0.6; // 0 to 1
          
          // Exponential growth up to 150 radius (completely clears the screen safely)
          uRadius = 16.5 + Math.pow(p, 2.5) * 150.0; 
          
          uHollow = Math.min(1.0, p * 2.5); // Hollows out quickly
          opacity = 1.0 - Math.pow(p, 4.0); // Fades gently as it leaves screen
        }

        // Apply mapped values
        coreMat.uniforms.uRadius.value = uRadius;
        coreMat.uniforms.uHollow.value = uHollow;
        coreMat.uniforms.opacity.value = opacity;

        renderer.render(scene, camera);
      };
      
      animate();
    };

    init();

    /* ── Receive progress from external prop via a setter ── */
    const updateProgress = () => {
      /* This getter is closed over — we update targetProgress
         from the parent via the ref pattern below */
    };

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      if (!camera || !renderer || !mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    /* Expose the targetProgress setter via a DOM attribute callback */
    if (mountRef.current) {
      mountRef.current.__setExplosionProgress = (val) => {
        targetProgress = val;
      };
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationId) cancelAnimationFrame(animationId);
      if (mountRef.current && renderer) {
        try { mountRef.current.removeChild(renderer.domElement); } catch(e) {}
      }
    };
  }, []);

  /* ── Sync explosionProgress prop → internal targetProgress ── */
  useEffect(() => {
    if (mountRef.current && mountRef.current.__setExplosionProgress) {
      mountRef.current.__setExplosionProgress(explosionProgress);
    }
  }, [explosionProgress]);

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100vw',
        height: '100vh',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontFamily: 'monospace',
            fontSize: '12px',
            letterSpacing: '0.1em',
            zIndex: 10,
          }}
        >
          [ INITIALIZING_ENGINE_CORE ]
        </div>
      )}

      <div
        ref={mountRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      />
    </div>
  );
}

export default Explosion;