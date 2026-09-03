/**
 * Shaders for FoldedPanels WebGL interaction.
 *
 * Core mechanics:
 * 1. Vertex Shader:
 *    Deforms individual vertices on a heavily subdivided plane geometry.
 *    The top region remains stable/upright, while the lower region bends
 *    smoothly backward in a continuous sinusoidal S-curve.
 *    Dynamic analytical normals are calculated on the deformed surface for
 *    physically-accurate lighting and specular reflection.
 *
 * 2. Fragment Shader:
 *    - Rounded corners via 2D signed distance field (SDF) in world-space coordinates.
 *    - UV cover calculation to preserve arbitrary image aspect ratios.
 *    - 3D directional, ambient, bounce lighting, and depth-based shading.
 *    - Subtle inner border and specular sheen.
 *
 * 3. Shadow Shader:
 *    - Soft ambient occlusion / drop shadow plane that responds to panel deformation.
 */

// =============================================================================
// DEFAULT SHADER PARAMETERS (Can be tuned here or overridden via uniforms/props)
// =============================================================================
export const SHADER_DEFAULTS = {
  FOLD_STRENGTH: 1.0,   // Multiplier for fold depth and angle
  FOLD_START: 0.38,     // Normalized Y where fold begins (0.38 = top 38% stable, bottom 62% bends)
  FOLD_CURVE: 1.45,     // Curvature power (higher = smoother initial roll into fold)
  CORNER_RADIUS: 0.06,  // Normalized corner radius for SDF
} as const;

export const panelVertexShader = /* glsl */ `
  uniform float uProgress;       // Scroll progress (0.0 flat -> 1.0 fully folded)
  uniform float uFoldStrength;   // Strength multiplier of the fold
  uniform float uFoldStart;      // Normalized threshold from top where fold begins (0.0 to 1.0)
  uniform float uFoldCurve;      // Curvature exponent
  uniform float uPerspective;    // Extra Z displacement multiplier
  uniform vec2 uPlaneSize;       // Width and height of the plane in world units

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vDepth;
  varying float vBendFactor;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // uv.y: 0.0 at bottom edge, 1.0 at top edge.
    // The top region (uv.y >= 1.0 - uFoldStart) remains upright and stable.
    // The lower region bends progressively backward into -Z and upward in Y.
    float foldThreshold = 1.0 - uFoldStart;
    
    float t = 0.0;
    if (uv.y < foldThreshold) {
      // Normalized distance down the folding portion (0 at threshold, 1 at bottom edge)
      t = (foldThreshold - uv.y) / foldThreshold;
    }

    // Smoothstep creates C1 continuity: derivative is 0 at foldThreshold,
    // so there is zero visible crease or seam between the flat and bent areas.
    float bend = smoothstep(0.0, 1.0, t);
    
    // Calculate angle of deflection:
    // Max angle reaches ~72 degrees (1.25 rad) at full progress
    float maxAngle = 1.25 * uFoldStrength * uProgress;
    float currentAngle = pow(bend, uFoldCurve) * maxAngle;

    // Displacement along the physical curved fold:
    float foldHeight = foldThreshold * uPlaneSize.y;
    float arcDistance = t * foldHeight;

    // Z displacement pushes backward (negative Z)
    float zDisplacement = -sin(currentAngle) * arcDistance * 0.95 * uPerspective;

    // Y displacement pulls upward following the arc of the bend
    float yDisplacement = (1.0 - cos(currentAngle)) * arcDistance * 0.42;

    pos.z += zDisplacement;
    pos.y += yDisplacement;

    // Analytical normal:
    // Before bend, flat normal is (0, 0, 1).
    // The surface tilts around the X axis by currentAngle.
    // Rotated normal vector:
    vec3 deformedNormal = vec3(0.0, sin(currentAngle), cos(currentAngle));
    vNormal = normalize(normalMatrix * deformedNormal);

    vBendFactor = bend * uProgress;
    vDepth = pos.z;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const panelFragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float uHasTexture;
  uniform vec3 uColor;
  uniform vec2 uPlaneSize;
  uniform vec2 uImageSize;
  uniform float uRadius;
  uniform float uProgress;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vDepth;
  varying float vBendFactor;

  // 2D Signed Distance Field for a rounded box
  float sdRoundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  // Cover mapping preserving image aspect ratio
  vec2 getCoverUv(vec2 uv, vec2 planeSize, vec2 imageSize) {
    if (imageSize.x <= 0.0 || imageSize.y <= 0.0) return uv;
    float planeAspect = planeSize.x / planeSize.y;
    float imageAspect = imageSize.x / imageSize.y;
    vec2 st = uv - 0.5;
    if (planeAspect > imageAspect) {
      st.y *= imageAspect / planeAspect;
    } else {
      st.x *= planeAspect / imageAspect;
    }
    return st + 0.5;
  }

  void main() {
    // 1. Rounded Corner Mask using SDF
    vec2 p = (vUv - 0.5) * uPlaneSize;
    vec2 halfSize = uPlaneSize * 0.5;
    float radiusPx = uRadius * min(uPlaneSize.x, uPlaneSize.y);
    float d = sdRoundedBox(p, halfSize, radiusPx);

    // Smooth antialiased border edge
    float edgeFeather = fwidth(d) * 1.5;
    if (edgeFeather <= 0.0) edgeFeather = 0.015;
    float alpha = 1.0 - smoothstep(-edgeFeather, edgeFeather, d);

    if (alpha <= 0.001) {
      discard;
    }

    // 2. Texture sampling
    vec2 coverCoords = getCoverUv(vUv, uPlaneSize, uImageSize);
    vec4 texColor = vec4(uColor, 1.0);
    if (uHasTexture > 0.5) {
      texColor = texture2D(uTexture, coverCoords);
    }

    // 3. 3D Lighting & Depth Shading
    // Key directional light from upper right
    vec3 lightDir = normalize(vec3(0.25, 0.7, 0.65));
    float diff = max(dot(vNormal, lightDir), 0.0);

    // Ambient light + subtle upward ground bounce
    float ambient = 0.80;
    float bounce = max(-vNormal.y, 0.0) * 0.14;

    // Specular sheen along the card surface
    vec3 viewDir = normalize(vViewPosition);
    vec3 halfVec = normalize(lightDir + viewDir);
    float spec = pow(max(dot(vNormal, halfVec), 0.0), 24.0) * 0.07;

    // Fold depth shading: areas bent backward into Z naturally darken subtly
    float foldShadow = mix(1.0, 0.82, smoothstep(0.0, -1.8, vDepth));

    // Inner rim stroke highlight (subtle card bevel)
    float innerRim = smoothstep(-radiusPx * 0.25, 0.0, d) * 0.12;

    vec3 litColor = texColor.rgb * (ambient + diff * 0.28 + bounce) * foldShadow + spec + innerRim;

    gl_FragColor = vec4(litColor, alpha * texColor.a);
  }
`;

export const shadowVertexShader = /* glsl */ `
  uniform float uProgress;
  uniform float uFoldStrength;
  uniform float uFoldStart;
  uniform float uFoldCurve;
  uniform float uPerspective;
  uniform vec2 uPlaneSize;

  varying vec2 vUv;
  varying float vBendFactor;

  void main() {
    vUv = uv;
    vec3 pos = position;

    float foldThreshold = 1.0 - uFoldStart;
    float t = 0.0;
    if (uv.y < foldThreshold) {
      t = (foldThreshold - uv.y) / foldThreshold;
    }

    float bend = smoothstep(0.0, 1.0, t);
    float maxAngle = 1.1 * uFoldStrength * uProgress;
    float currentAngle = pow(bend, uFoldCurve) * maxAngle;

    float foldHeight = foldThreshold * uPlaneSize.y;
    float arcDistance = t * foldHeight;

    pos.z += -sin(currentAngle) * arcDistance * 0.85 * uPerspective;
    pos.y += (1.0 - cos(currentAngle)) * arcDistance * 0.38;

    vBendFactor = bend * uProgress;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const shadowFragmentShader = /* glsl */ `
  uniform vec2 uPlaneSize;
  uniform float uRadius;
  uniform float uProgress;

  varying vec2 vUv;
  varying float vBendFactor;

  float sdRoundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  void main() {
    vec2 p = (vUv - 0.5) * (uPlaneSize * 1.15);
    vec2 halfSize = uPlaneSize * 0.5;
    float radiusPx = uRadius * min(uPlaneSize.x, uPlaneSize.y) * 1.4;
    float d = sdRoundedBox(p, halfSize, radiusPx);

    // Soft blur falloff
    float blurRadius = 0.28 + vBendFactor * 0.15;
    float shadow = 1.0 - smoothstep(-blurRadius, blurRadius, d);

    // As card bends backward, the shadow diffuses and softens
    float opacity = shadow * mix(0.24, 0.12, vBendFactor);

    if (opacity <= 0.001) discard;
    gl_FragColor = vec4(vec3(0.0, 0.0, 0.0), opacity);
  }
`;
