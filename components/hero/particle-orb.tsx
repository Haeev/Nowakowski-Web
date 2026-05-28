"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface PointsMaterialWithShader extends THREE.PointsMaterial {
  userData: { shader?: THREE.WebGLProgramParametersWithUniforms }
}

export type ParticleOrbConfig = {
  color?: number | string
  radius?: number
  detail?: number
  particleSizeMin?: number
  particleSizeMax?: number
  rotationSpeed?: number
  noiseTimeScale?: number
}

const defaults: Required<ParticleOrbConfig> = {
  color: 0xab19f5,
  radius: 1.85,
  detail: 36,
  particleSizeMin: 0.008,
  particleSizeMax: 0.055,
  rotationSpeed: 0.08,
  noiseTimeScale: 0.12,
}

type MouseRef = { current: { x: number; y: number } }

export const ParticleOrbCanvas = ({
  mouse,
  config: configOverrides,
  parallaxStrength = 0.35,
  cameraZ = 2.65,
  className = "",
}: {
  mouse: MouseRef
  config?: ParticleOrbConfig
  parallaxStrength?: number
  cameraZ?: number
  className?: string
}) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const configRef = useRef({ ...defaults, ...configOverrides })

  useEffect(() => {
    configRef.current = { ...defaults, ...configOverrides }
  }, [configOverrides])

  useEffect(() => {
    const container = rootRef.current
    if (!container) return

    const config = { ...defaults, ...configOverrides }
    const scene = new THREE.Scene()

    const getSize = () => ({
      width: Math.max(container.clientWidth, 1),
      height: Math.max(container.clientHeight, 1),
    })

    const { width: initialWidth, height: initialHeight } = getSize()

    const camera = new THREE.PerspectiveCamera(
      68,
      initialWidth / initialHeight,
      0.1,
      1000
    )
    camera.position.z = cameraZ

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    const dpr = Math.min(window.devicePixelRatio, 1.75)
    renderer.setPixelRatio(dpr)
    renderer.setSize(initialWidth, initialHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const geometry = new THREE.IcosahedronGeometry(1, config.detail)
    const texture = createDotTexture(32, "#FFFFFF")
    const material = new THREE.PointsMaterial({
      map: texture,
      blending: THREE.AdditiveBlending,
      color: config.color,
      depthTest: false,
      transparent: true,
      opacity: 0.85,
    })

    setupPointsShader(material, {
      radius: config.radius,
      particleSizeMin: config.particleSizeMin,
      particleSizeMax: config.particleSizeMax,
      noiseTimeScale: config.noiseTimeScale,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const smoothedMouse = { x: 0, y: 0 }
    let animationFrameId = 0

    const animate = (timeMs: number) => {
      const time = timeMs * 0.001
      const cfg = configRef.current

      smoothedMouse.x = THREE.MathUtils.lerp(smoothedMouse.x, mouse.current.x, 0.085)
      smoothedMouse.y = THREE.MathUtils.lerp(smoothedMouse.y, mouse.current.y, 0.085)

      points.rotation.set(
        smoothedMouse.y * 0.12,
        time * cfg.rotationSpeed + smoothedMouse.x * 0.18,
        0
      )

      camera.position.x = smoothedMouse.x * parallaxStrength
      camera.position.y = smoothedMouse.y * parallaxStrength * 0.85
      camera.lookAt(0, 0, 0)

      const shader = (material as PointsMaterialWithShader).userData.shader
      if (shader?.uniforms.time) shader.uniforms.time.value = time

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }
    animationFrameId = requestAnimationFrame(animate)

    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = getSize()
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    })
    resizeObserver.observe(container)

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      scene.remove(points)
      geometry.dispose()
      material.dispose()
      texture.dispose()
      renderer.dispose()
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [cameraZ, configOverrides, mouse, parallaxStrength])

  return <div ref={rootRef} className={`h-full w-full ${className}`} />
}

const createDotTexture = (size = 32, color = "#FFFFFF"): THREE.CanvasTexture => {
  const radius = size * 0.5
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = size
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("2D canvas context not available")

  const circle = new Path2D()
  circle.arc(radius, radius, radius, 0, 2 * Math.PI)
  ctx.fillStyle = color
  ctx.fill(circle)

  return new THREE.CanvasTexture(canvas)
}

const setupPointsShader = (
  material: THREE.PointsMaterial,
  opts: {
    radius: number
    particleSizeMin: number
    particleSizeMax: number
    noiseTimeScale: number
  }
) => {
  const { radius, particleSizeMin, particleSizeMax, noiseTimeScale } = opts
  material.onBeforeCompile = (shader: THREE.WebGLProgramParametersWithUniforms) => {
    shader.uniforms.time = { value: 0 }
    shader.uniforms.radius = { value: radius }
    shader.uniforms.particleSizeMin = { value: particleSizeMin }
    shader.uniforms.particleSizeMax = { value: particleSizeMax }
    shader.uniforms.noiseTimeScale = { value: noiseTimeScale }
    shader.vertexShader = "uniform float noiseTimeScale;\n" + shader.vertexShader
    shader.vertexShader = "uniform float particleSizeMax;\n" + shader.vertexShader
    shader.vertexShader = "uniform float particleSizeMin;\n" + shader.vertexShader
    shader.vertexShader = "uniform float radius;\n" + shader.vertexShader
    shader.vertexShader = "uniform float time;\n" + shader.vertexShader
    shader.vertexShader = webGlNoise + "\n" + shader.vertexShader
    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `
          vec3 p = position;
          float n = snoise( vec3( p.x*.6 + time*noiseTimeScale, p.y*0.4 + time*noiseTimeScale*1.2, p.z*.2 + time*noiseTimeScale) );
          p += n *0.35;

          float l = radius / length(p);
          p *= l;
          float s = mix(particleSizeMin, particleSizeMax, n);
          vec3 transformed = vec3( p.x, p.y, p.z );
        `
    )
    shader.vertexShader = shader.vertexShader.replace(
      "gl_PointSize = size;",
      "gl_PointSize = s;"
    )

    ;(material as PointsMaterialWithShader).userData.shader = shader
  }
}

const webGlNoise = `
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x*34.0)+10.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

  float snoise(vec3 v)
  {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 105.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}
`
