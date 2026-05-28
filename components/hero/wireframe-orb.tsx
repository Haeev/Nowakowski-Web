"use client"

import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import * as THREE from "three"

export type WireframeOrbConfig = {
  color?: string
  speed?: number
  gridSize?: number
  noiseDensity?: number
  noiseScale?: number
  minAlpha?: number
  maxAlpha?: number
  bloomIntensity?: number
  bloomThreshold?: number
  bloomRadius?: number
  animate?: boolean
}

const defaults: Required<WireframeOrbConfig> = {
  color: "#AB19F5",
  speed: 16,
  gridSize: 110,
  noiseDensity: 0.7,
  noiseScale: 3.0,
  minAlpha: 0.02,
  maxAlpha: 0.38,
  bloomIntensity: 1.2,
  bloomThreshold: 0.0,
  bloomRadius: 0.75,
  animate: true,
}

const vertexShader = /* glsl */ `
  attribute vec2 aUv;

  uniform float time;
  uniform float uSpeed;
  uniform float uDensity;
  uniform float uScale;

  varying vec2 vUv;
  varying float vPositionZ;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  vec3 snoiseVec3(vec3 x) {
    return vec3(
      snoise(vec3(x)),
      snoise(vec3(x.y - 19.1, x.z + 33.4, x.x + 47.2)),
      snoise(vec3(x.z + 74.2, x.x - 124.5, x.y + 99.4))
    );
  }

  vec3 curlNoise(vec3 p) {
    const float e = 0.1;
    vec3 dx = vec3(e, 0.0, 0.0);
    vec3 dy = vec3(0.0, e, 0.0);
    vec3 dz = vec3(0.0, 0.0, e);

    vec3 p_x0 = snoiseVec3(p - dx);
    vec3 p_x1 = snoiseVec3(p + dx);
    vec3 p_y0 = snoiseVec3(p - dy);
    vec3 p_y1 = snoiseVec3(p + dy);
    vec3 p_z0 = snoiseVec3(p - dz);
    vec3 p_z1 = snoiseVec3(p + dz);

    float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;
    float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;
    float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;

    const float divisor = 1.0 / (2.0 * e);
    return normalize(vec3(x, y, z) * divisor);
  }

  void main() {
    vUv = aUv;
    vec3 pos = vec3(aUv * 2.0 - 1.0, 0.0) + time * uSpeed;
    vec3 noise = curlNoise(pos * uDensity);
    pos = noise * uScale;
    vPositionZ = noise.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform float time;
  uniform vec3 uColor;
  uniform float uMinAlpha;
  uniform float uMaxAlpha;
  uniform float uAlphaSpeed;

  varying vec2 vUv;
  varying float vPositionZ;

  const float PI2 = 6.2831853;

  void main() {
    float cAlpha = mix(uMinAlpha, uMaxAlpha, (sin(vUv.x * PI2 + time * uAlphaSpeed) + 1.0) * 0.5);
    cAlpha *= mix(0.8, 1.0, vPositionZ);
    gl_FragColor = vec4(uColor, cAlpha);
  }
`

const getAdaptiveGridSize = (requested: number): number => {
  if (typeof navigator === "undefined") return requested
  const cores = navigator.hardwareConcurrency ?? 4
  if (cores <= 4 || window.devicePixelRatio >= 3) {
    return Math.min(requested, 90)
  }
  return requested
}

type MouseRef = { current: { x: number; y: number } }

const CameraRig = ({
  mouse,
  parallaxStrength,
}: {
  mouse: MouseRef
  parallaxStrength: number
}) => {
  const lookAt = useRef(new THREE.Vector3())
  const smoothed = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    smoothed.current.x = THREE.MathUtils.lerp(
      smoothed.current.x,
      mouse.current.x * parallaxStrength,
      0.07
    )
    smoothed.current.y = THREE.MathUtils.lerp(
      smoothed.current.y,
      mouse.current.y * parallaxStrength * 0.75,
      0.07
    )
    state.camera.position.set(
      smoothed.current.x,
      smoothed.current.y,
      12
    )
    lookAt.current.set(0, 0, 0)
    state.camera.lookAt(lookAt.current)
  })

  return null
}

const WireframeScene = ({
  config,
  mouse,
  parallaxStrength,
}: {
  config: Required<WireframeOrbConfig>
  mouse: MouseRef
  parallaxStrength: number
}) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const geometry = useMemo(() => {
    const n = getAdaptiveGridSize(config.gridSize)
    const maxI = n - 1
    const uvs: number[] = []
    const positions: number[] = []

    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n; i++) {
        uvs.push(i / maxI, 1 - j / maxI)
        positions.push(0, 0, 0)
      }
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
    geo.setAttribute("aUv", new THREE.Float32BufferAttribute(uvs, 2))
    return geo
  }, [config.gridSize])

  useEffect(() => () => geometry.dispose(), [geometry])

  const uniforms = useMemo(() => {
    const col = new THREE.Color(config.color)
    return {
      time: { value: 0 },
      uSpeed: { value: config.speed * 0.005 },
      uDensity: { value: config.noiseDensity },
      uScale: { value: config.noiseScale },
      uColor: { value: col },
      uMinAlpha: { value: config.minAlpha },
      uMaxAlpha: { value: config.maxAlpha },
      uAlphaSpeed: { value: config.speed * 0.025 },
    }
  }, [config])

  useFrame((state) => {
    if (!materialRef.current || !config.animate) return
    const timeUniform = materialRef.current.uniforms.time
    if (!timeUniform) return
    timeUniform.value = state.clock.elapsedTime
  })

  return (
    <>
      <CameraRig mouse={mouse} parallaxStrength={parallaxStrength} />
      {/* @ts-expect-error R3F line vs SVG line */}
      <line geometry={geometry}>
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </line>
    </>
  )
}

export const WireframeOrbCanvas = ({
  config: configOverrides,
  mouse,
  parallaxStrength = 1.4,
  className = "",
}: {
  config?: WireframeOrbConfig
  mouse: MouseRef
  parallaxStrength?: number
  className?: string
}) => {
  const configKey = JSON.stringify(configOverrides)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const config = useMemo(() => ({ ...defaults, ...configOverrides }), [configKey])

  return (
    <div className={`h-full w-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.75]}
      >
        <WireframeScene
          config={config}
          mouse={mouse}
          parallaxStrength={parallaxStrength}
        />
        {config.bloomIntensity > 0 && (
          <EffectComposer>
            <Bloom
              intensity={config.bloomIntensity}
              luminanceThreshold={config.bloomThreshold}
              radius={config.bloomRadius}
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}
