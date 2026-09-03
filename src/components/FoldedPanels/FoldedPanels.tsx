import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import {
  panelVertexShader,
  panelFragmentShader,
  shadowVertexShader,
  shadowFragmentShader,
  SHADER_DEFAULTS,
} from './shaders';
import './FoldedPanels.css';

// =============================================================================
// MAIN TUNABLE VISUAL PARAMETERS
// Adjust these values to make the fold more or less dramatic:
// =============================================================================
export const FOLD_STRENGTH = 1.0;     // Overall intensity/angle of the fold (0.5 = subtle, 1.0 = standard, 1.8 = dramatic)
export const FOLD_START = 0.38;        // Threshold from top where bending starts (0.2 = mostly bends, 0.6 = only bottom bends)
export const FOLD_CURVE = 1.45;        // Curvature exponent (1.0 = linear arc, 1.5 = natural flexible sheet bend)
export const PANEL_GAP = 0.035;        // Relative horizontal gap between center and side panels
export const SIDE_ROTATION = 0.085;    // Y-axis inward rotation angle (in radians) for the side panels
export const CAMERA_DISTANCE = 4.8;    // Z-distance of perspective camera (controls field-of-view perspective strength)

// Default sample images from portfolio/public assets
const DEFAULT_IMAGES = [
  '/images/project-1.webp',
  '/images/project-2.webp',
  '/images/project-3.webp',
];

export interface FoldedPanelsProps {
  /** Array of image URLs for the 3 panels [Left, Center, Right] */
  images?: string[];
  /** Override fold strength multiplier (default: 1.0) */
  foldStrength?: number;
  /** Override normalized Y where fold begins (0.0 to 1.0, default: 0.38) */
  foldStart?: number;
  /** Override curvature exponent (default: 1.45) */
  foldCurve?: number;
  /** Override relative panel gap (default: 0.035) */
  panelGap?: number;
  /** Override side panel inward angle in radians (default: 0.085) */
  sideRotation?: number;
  /** Override camera distance (default: 4.8) */
  cameraDistance?: number;
  /** Additional container CSS class */
  className?: string;
  /** Optional section badge label */
  badge?: string;
  /** Optional section heading */
  heading?: string;
  /** Optional section subheading */
  subheading?: string;
  /** Whether to render the header content (default: true) */
  showContent?: boolean;
  /** Callback when a panel is clicked with panel index (0 = Left, 1 = Center, 2 = Right) */
  onPanelClick?: (index: number) => void;
}

export const FoldedPanels: React.FC<FoldedPanelsProps> = ({
  images = DEFAULT_IMAGES,
  foldStrength = FOLD_STRENGTH,
  foldStart = FOLD_START,
  foldCurve = FOLD_CURVE,
  panelGap = PANEL_GAP,
  sideRotation = SIDE_ROTATION,
  cameraDistance = CAMERA_DISTANCE,
  className = '',
  badge = 'Interactive Showcase',
  heading = 'Physical Sheet Deformation',
  subheading = 'Panels smoothly bend and fold in 3D perspective as you scroll through the section.',
  showContent = true,
  onPanelClick,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Normalize image array to 3 items
  const panelImages = useMemo(() => {
    const list = [...images];
    while (list.length < 3) {
      list.push(list[list.length - 1] || DEFAULT_IMAGES[0]);
    }
    return list.slice(0, 3);
  }, [images]);

  useEffect(() => {
    // Check prefers-reduced-motion media query
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mql.addEventListener('change', handleMotionChange);

    return () => {
      mql.removeEventListener('change', handleMotionChange);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Detect WebGL support gracefully
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();

    // Perspective Camera setup
    const fov = 42;
    const camera = new THREE.PerspectiveCamera(
      fov,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, cameraDistance);

    // Texture loader with CORS handling
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');

    // Store panels and materials
    interface PanelItem {
      mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
      shadowMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
      material: THREE.ShaderMaterial;
      shadowMaterial: THREE.ShaderMaterial;
      geometry: THREE.PlaneGeometry;
      shadowGeometry: THREE.PlaneGeometry;
      texture: THREE.Texture | null;
      index: number;
    }

    const panels: PanelItem[] = [];
    const panelColors = [
      new THREE.Color('#2563eb'), // Left fallback color
      new THREE.Color('#3b82f6'), // Center fallback color
      new THREE.Color('#1d4ed8'), // Right fallback color
    ];

    // Create the 3 heavily subdivided planes (PlaneGeometry 100x60)
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.PlaneGeometry(1, 1, 100, 60);
      const shadowGeometry = new THREE.PlaneGeometry(1, 1, 50, 30);

      const uniforms = {
        uProgress: { value: 0.0 },
        uFoldStrength: { value: foldStrength },
        uFoldStart: { value: foldStart },
        uFoldCurve: { value: foldCurve },
        uPerspective: { value: 1.0 },
        uPlaneSize: { value: new THREE.Vector2(1, 1) },
        uImageSize: { value: new THREE.Vector2(1, 1) },
        uRadius: { value: SHADER_DEFAULTS.CORNER_RADIUS },
        uTexture: { value: null as THREE.Texture | null },
        uHasTexture: { value: 0.0 },
        uColor: { value: panelColors[i] },
      };

      const material = new THREE.ShaderMaterial({
        vertexShader: panelVertexShader,
        fragmentShader: panelFragmentShader,
        uniforms,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: true,
      });

      const shadowUniforms = {
        uProgress: { value: 0.0 },
        uFoldStrength: { value: foldStrength },
        uFoldStart: { value: foldStart },
        uFoldCurve: { value: foldCurve },
        uPerspective: { value: 1.0 },
        uPlaneSize: { value: new THREE.Vector2(1, 1) },
        uRadius: { value: SHADER_DEFAULTS.CORNER_RADIUS },
      };

      const shadowMaterial = new THREE.ShaderMaterial({
        vertexShader: shadowVertexShader,
        fragmentShader: shadowFragmentShader,
        uniforms: shadowUniforms,
        transparent: true,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(geometry, material);
      const shadowMesh = new THREE.Mesh(shadowGeometry, shadowMaterial);
      shadowMesh.position.z = -0.22;

      // Group or add directly
      scene.add(shadowMesh);
      scene.add(mesh);

      // Load texture
      const imageUrl = panelImages[i];
      let loadedTexture: THREE.Texture | null = null;
      if (imageUrl) {
        loadedTexture = textureLoader.load(
          imageUrl,
          (tex) => {
            tex.generateMipmaps = true;
            tex.minFilter = THREE.LinearMipmapLinearFilter;
            tex.magFilter = THREE.LinearFilter;
            if (tex.image) {
              material.uniforms.uImageSize.value.set(tex.image.width, tex.image.height);
            }
            material.uniforms.uTexture.value = tex;
            material.uniforms.uHasTexture.value = 1.0;
            material.needsUpdate = true;
          },
          undefined,
          () => {
            // Fallback gracefully to solid color if texture fails
            material.uniforms.uHasTexture.value = 0.0;
          }
        );
      }

      panels.push({
        mesh,
        shadowMesh,
        material,
        shadowMaterial,
        geometry,
        shadowGeometry,
        texture: loadedTexture,
        index: i,
      });
    }

    // Dimension & Layout calculation function
    const updateLayout = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // Compute visible world dimensions at z = 0
      const vFOV = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(vFOV / 2) * cameraDistance;
      const visibleWidth = visibleHeight * camera.aspect;

      // Responsive panel sizing
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;

      // Center panel size
      let centerWidthRatio = 0.54;
      if (isMobile) centerWidthRatio = 0.84;
      else if (isTablet) centerWidthRatio = 0.65;

      const centerWidth = visibleWidth * centerWidthRatio;
      const panelAspect = isMobile ? 1.25 : 1.45; // aspect ratio width/height
      const centerHeight = Math.min(centerWidth / panelAspect, visibleHeight * 0.78);

      // Side panel size
      const sideWidth = isMobile ? centerWidth * 0.82 : centerWidth * 0.94;
      const sideHeight = centerHeight;

      const gap = visibleWidth * (isMobile ? 0.025 : panelGap);

      // Center panel (index 1)
      const centerMesh = panels[1].mesh;
      const centerShadow = panels[1].shadowMesh;
      centerMesh.scale.set(centerWidth, centerHeight, 1);
      centerShadow.scale.set(centerWidth, centerHeight, 1);
      centerMesh.position.set(0, visibleHeight * 0.02, 0);
      centerShadow.position.set(0, visibleHeight * 0.02, -0.22);
      centerMesh.rotation.set(0, 0, 0);
      centerShadow.rotation.set(0, 0, 0);
      panels[1].material.uniforms.uPlaneSize.value.set(centerWidth, centerHeight);
      panels[1].shadowMaterial.uniforms.uPlaneSize.value.set(centerWidth, centerHeight);

      // Left panel (index 0) - extends partially off-screen to the left
      const leftX = -(centerWidth * 0.5 + sideWidth * 0.5 + gap);
      const leftMesh = panels[0].mesh;
      const leftShadow = panels[0].shadowMesh;
      leftMesh.scale.set(sideWidth, sideHeight, 1);
      leftShadow.scale.set(sideWidth, sideHeight, 1);
      leftMesh.position.set(leftX, visibleHeight * 0.02, -0.16);
      leftShadow.position.set(leftX, visibleHeight * 0.02, -0.38);
      leftMesh.rotation.set(0, sideRotation, 0);
      leftShadow.rotation.set(0, sideRotation, 0);
      panels[0].material.uniforms.uPlaneSize.value.set(sideWidth, sideHeight);
      panels[0].shadowMaterial.uniforms.uPlaneSize.value.set(sideWidth, sideHeight);

      // Right panel (index 2) - extends partially off-screen to the right
      const rightX = centerWidth * 0.5 + sideWidth * 0.5 + gap;
      const rightMesh = panels[2].mesh;
      const rightShadow = panels[2].shadowMesh;
      rightMesh.scale.set(sideWidth, sideHeight, 1);
      rightShadow.scale.set(sideWidth, sideHeight, 1);
      rightMesh.position.set(rightX, visibleHeight * 0.02, -0.16);
      rightShadow.position.set(rightX, visibleHeight * 0.02, -0.38);
      rightMesh.rotation.set(0, -sideRotation, 0);
      rightShadow.rotation.set(0, -sideRotation, 0);
      panels[2].material.uniforms.uPlaneSize.value.set(sideWidth, sideHeight);
      panels[2].shadowMaterial.uniforms.uPlaneSize.value.set(sideWidth, sideHeight);
    };

    updateLayout();

    // ResizeObserver for responsive canvas updates without layout flicker
    const resizeObserver = new ResizeObserver(() => {
      updateLayout();
    });
    resizeObserver.observe(container);

    // Scroll progress calculation & smooth interpolation
    let targetProgress = 0.0;
    let currentProgress = 0.0;
    const LERP_FACTOR = 0.085; // Inertial smoothing speed

    const calculateScrollProgress = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 0.0 when container enters from bottom of viewport
      // 0.5 when container is in the middle of viewport
      // 1.0 when container is scrolled out through the top
      const totalDistance = windowHeight + rect.height;
      const currentDistance = windowHeight - rect.top;
      const raw = currentDistance / totalDistance;

      // Map progress to fold transition:
      // Start folding when section enters lower viewport (~0.12)
      // Reach full fold near middle-to-exit (~0.78)
      const clamped = Math.max(0, Math.min(1, (raw - 0.12) / 0.66));
      targetProgress = clamped;
    };

    calculateScrollProgress();
    window.addEventListener('scroll', calculateScrollProgress, { passive: true });

    // IntersectionObserver to pause rendering when component is off-screen
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          calculateScrollProgress();
        }
      },
      { threshold: 0.01 }
    );
    intersectionObserver.observe(container);

    // Raycaster for click interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleCanvasClick = (event: MouseEvent) => {
      if (!onPanelClick) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshes = panels.map((p) => p.mesh);
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;
        const hitIndex = panels.findIndex((p) => p.mesh === hitMesh);
        if (hitIndex !== -1) {
          onPanelClick(hitIndex);
        }
      }
    };
    canvas.addEventListener('click', handleCanvasClick);

    // Animation Render Loop
    let animationFrameId: number;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);

      if (!isVisible) return;

      // If reduced motion is preferred, hold progress at 0 (flat/stable)
      if (prefersReducedMotion) {
        currentProgress = 0.0;
      } else {
        // Physical inertia smoothing
        currentProgress += (targetProgress - currentProgress) * LERP_FACTOR;
      }

      // Update shader uniforms across all 3 panels
      for (let i = 0; i < panels.length; i++) {
        panels[i].material.uniforms.uProgress.value = currentProgress;
        panels[i].shadowMaterial.uniforms.uProgress.value = currentProgress;
      }

      renderer.render(scene, camera);
    };

    render();

    // Clean up on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', calculateScrollProgress);
      canvas.removeEventListener('click', handleCanvasClick);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      // Dispose Three.js objects
      panels.forEach((p) => {
        p.geometry.dispose();
        p.shadowGeometry.dispose();
        p.material.dispose();
        p.shadowMaterial.dispose();
        if (p.texture) p.texture.dispose();
      });

      renderer.dispose();
    };
  }, [
    panelImages,
    foldStrength,
    foldStart,
    foldCurve,
    panelGap,
    sideRotation,
    cameraDistance,
    prefersReducedMotion,
    onPanelClick,
  ]);

  return (
    <section className={`folded-panels-section ${className}`} ref={containerRef}>
      {/* Optional HTML/React content above or alongside */}
      {showContent && (
        <div className="folded-panels-content">
          {badge && <span className="folded-panels-badge">{badge}</span>}
          {heading && <h2 className="folded-panels-heading">{heading}</h2>}
          {subheading && <p className="folded-panels-subheading">{subheading}</p>}
        </div>
      )}

      {/* WebGL Canvas Viewport */}
      {webglSupported ? (
        <div className="folded-panels-canvas-wrapper">
          <canvas ref={canvasRef} className="folded-panels-canvas" />
        </div>
      ) : (
        /* Graceful static fallback if WebGL is unavailable */
        <div className="folded-panels-fallback">
          {panelImages.map((src, idx) => (
            <div key={idx} className="folded-panels-fallback-card">
              <img src={src} alt={`Showcase Panel ${idx + 1}`} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FoldedPanels;
