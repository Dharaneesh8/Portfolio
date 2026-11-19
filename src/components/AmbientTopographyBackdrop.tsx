import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AmbientTopographyBackdrop() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const isSoftwareGl = (() => {
      try {
        const probe = document.createElement('canvas').getContext('webgl2');
        if (!probe) return true;
        const ext = probe.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : probe.RENDERER;
        const gpu = String(probe.getParameter(param));
        probe.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2),
    );
    renderer.setSize(width, height);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 160);
    camera.position.set(0, 11.5, 22.5);
    camera.lookAt(0, -0.8, 0);

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uPulseTime: { value: -10.0 },
      uPulseOrigin: { value: new THREE.Vector2(0, 0) },
    };

    const vertexShader = /* glsl */ `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uScroll;
      uniform float uPulseTime;
      uniform vec2 uPulseOrigin;

      varying float vElev;
      varying vec2 vUv;
      varying vec3 vNormalApprox;

      float waveFn(vec2 p, float t) {
        float w = 0.0;
        w += sin(p.x * 0.18 + t * 0.45) * cos(p.y * 0.16 - t * 0.36) * 1.4;
        w += sin(p.x * 0.32 - p.y * 0.24 + t * 0.58) * 0.54;
        w += cos(length(p * 0.11) - t * 0.34) * 0.44;

        // Cursor-follow dimensional swell
        vec2 mWorld = vec2(uMouse.x * 19.0, -uMouse.y * 12.0);
        float md = length(p - mWorld);
        w += exp(-md * md * 0.016) * 1.5;

        // Click web-pulse ripple propagating across the multiverse mesh
        float age = t - uPulseTime;
        if (age > 0.0 && age < 4.2) {
          float pd = length(p - uPulseOrigin);
          float front = age * 12.0;
          float env = exp(-pow((pd - front) * 0.32, 2.0));
          w += env * sin((pd - front) * 1.38) * 1.35 * (1.0 - age / 4.2);
        }
        return w;
      }

      void main() {
        vUv = uv;
        vec3 pos = position;
        float t = uTime + uScroll * 3.0;

        float h = waveFn(pos.xy, t);
        float hx = waveFn(pos.xy + vec2(0.26, 0.0), t);
        float hy = waveFn(pos.xy + vec2(0.0, 0.26), t);

        vNormalApprox = normalize(vec3(h - hx, h - hy, 0.26));
        pos.z += h;
        vElev = h;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = /* glsl */ `
      uniform vec2 uMouse;

      varying float vElev;
      varying vec2 vUv;
      varying vec3 vNormalApprox;

      void main() {
        // Into the Spider-Verse Palette: Brooklyn Indigo, Cyan & Spider-Rose Contours + Comic Halftone
        vec3 deepIndigo = vec3(0.068, 0.048, 0.185);
        vec3 twilightViolet = vec3(0.165, 0.095, 0.365);
        vec3 cyanLine = vec3(0.133, 0.827, 0.933);
        vec3 roseLine = vec3(0.957, 0.247, 0.369);
        vec3 goldSpark = vec3(0.980, 0.800, 0.082);

        vec3 lightDir = normalize(vec3(uMouse.x * 0.78 + 0.35, -uMouse.y * 0.58 + 0.45, 0.85));
        float diff = max(dot(vNormalApprox, lightDir), 0.0);
        float spec = pow(diff, 5.5);

        float heightMix = smoothstep(-1.7, 2.2, vElev);
        vec3 col = mix(deepIndigo, twilightViolet, heightMix * 0.85 + spec * 0.32);

        // Screen-space comic Ben-Day halftone dots softly etched onto wave crests
        vec2 dotGrid = fract(gl_FragCoord.xy * 0.075) - 0.5;
        float dotMask = 1.0 - smoothstep(0.16, 0.26, length(dotGrid));
        col += roseLine * dotMask * smoothstep(0.2, 1.6, vElev) * 0.075;

        // Crisp fwidth dimensional Spider-Verse CMYK contour lines
        float contourPhase = vElev * 2.5;
        float contour = abs(fract(contourPhase - 0.5) - 0.5) / max(fwidth(contourPhase), 0.001);
        float lineMask = 1.0 - smoothstep(0.0, 1.35, contour);

        float crestMask = smoothstep(-0.3, 1.4, vElev);
        vec3 isoColor = mix(cyanLine, roseLine, crestMask);

        col = mix(col, isoColor, lineMask * (0.20 + 0.30 * spec));
        col += goldSpark * pow(heightMix, 3.2) * 0.08 * spec;

        // Soft 4-edge vignette fade so cards & text remain crystal clear
        float edgeX = smoothstep(0.0, 0.16, vUv.x) * smoothstep(1.0, 0.84, vUv.x);
        float edgeY = smoothstep(0.0, 0.20, vUv.y) * smoothstep(1.0, 0.72, vUv.y);
        float alpha = edgeX * edgeY * 0.86;

        gl_FragColor = vec4(col, alpha);
      }
    `;

    const segX = isSoftwareGl ? 64 : 132;
    const segY = isSoftwareGl ? 48 : 96;
    const planeGeo = new THREE.PlaneGeometry(58, 42, segX, segY);
    const shaderMat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const silkMesh = new THREE.Mesh(planeGeo, shaderMat);
    silkMesh.rotation.x = -Math.PI * 0.34;
    silkMesh.position.set(0, -1.2, 0);
    scene.add(silkMesh);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    let targetMouseX = 0;
    let targetMouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;
    let scrollProgress = 0;
    let smoothScroll = 0;
    let currentShaderTime = 0;

    const onPointerMove = (e: PointerEvent) => {
      targetMouseX = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      targetMouseY = (e.clientY / Math.max(1, window.innerHeight)) * 2 - 1;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (prefersReducedMotion) return;
      const nx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      const ny = (e.clientY / Math.max(1, window.innerHeight)) * 2 - 1;
      uniforms.uPulseOrigin.value.set(nx * 19.0, -ny * 12.0);
      uniforms.uPulseTime.value = currentShaderTime + smoothScroll * 3.0;
    };

    const onScroll = () => {
      const maxS = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      scrollProgress = window.scrollY / maxS;
    };

    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let frameId = 0;
    let disposed = false;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const tick = () => {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();
      currentShaderTime = elapsed;

      if (!prefersReducedMotion) {
        smoothMouseX = THREE.MathUtils.damp(smoothMouseX, targetMouseX, 3.8, delta);
        smoothMouseY = THREE.MathUtils.damp(smoothMouseY, targetMouseY, 3.8, delta);
        smoothScroll = THREE.MathUtils.damp(smoothScroll, scrollProgress, 4.0, delta);

        uniforms.uTime.value = elapsed;
        uniforms.uMouse.value.set(smoothMouseX, smoothMouseY);
        uniforms.uScroll.value = smoothScroll;

        camera.position.x = smoothMouseX * 1.1;
        camera.position.y = 11.5 - smoothMouseY * 0.65;
        camera.lookAt(0, -0.8, 0);
      }

      renderer.render(scene, camera);

      if (prefersReducedMotion) return;
      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    onScroll();
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);

      planeGeo.dispose();
      shaderMat.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
