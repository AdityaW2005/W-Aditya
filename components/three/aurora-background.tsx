"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Simplex-style noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
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
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.15;

    // Mouse influence
    vec2 mouse = uMouse * 0.3;

    // Multi-layered aurora waves
    float n1 = snoise(vec3(uv.x * 2.0 + t * 0.5 + mouse.x, uv.y * 1.5 + t * 0.3, t * 0.2));
    float n2 = snoise(vec3(uv.x * 3.0 - t * 0.3, uv.y * 2.0 + t * 0.4 + mouse.y, t * 0.15 + 10.0));
    float n3 = snoise(vec3(uv.x * 1.5 + t * 0.2, uv.y * 3.0 - t * 0.25, t * 0.3 + 20.0));

    // Aurora ribbon shapes
    float ribbon1 = smoothstep(0.0, 0.8, pow(abs(sin(uv.y * 3.14159 + n1 * 2.0)), 3.0));
    float ribbon2 = smoothstep(0.0, 0.6, pow(abs(sin(uv.y * 2.5 + n2 * 1.5 + 1.0)), 4.0));
    float ribbon3 = smoothstep(0.0, 0.7, pow(abs(cos(uv.y * 4.0 + n3 * 1.8)), 5.0));

    // Colors - cyan, violet, teal
    vec3 cyan = vec3(0.0, 0.96, 1.0);
    vec3 violet = vec3(0.616, 0.0, 1.0);
    vec3 teal = vec3(0.0, 0.8, 0.7);
    vec3 magenta = vec3(0.9, 0.0, 0.7);

    vec3 col = vec3(0.0);
    col += cyan * ribbon1 * 0.15 * (0.5 + 0.5 * sin(t + uv.x * 2.0));
    col += violet * ribbon2 * 0.12 * (0.5 + 0.5 * cos(t * 0.7 + uv.x * 1.5));
    col += teal * ribbon3 * 0.08 * (0.5 + 0.5 * sin(t * 0.5 + uv.y * 2.0));
    col += magenta * (ribbon1 * ribbon2) * 0.06;

    // Subtle noise texture
    float grain = snoise(vec3(uv * 50.0, t * 5.0)) * 0.015;
    col += grain;

    // Subtle stars / sparkles
    float star = pow(snoise(vec3(uv * 80.0, t * 0.1)), 16.0) * 0.4;
    col += vec3(star);

    // Vignette
    float vig = 1.0 - smoothstep(0.3, 1.2, length(uv - 0.5) * 1.4);
    col *= vig;

    // Fade to background at edges
    col *= smoothstep(0.0, 0.15, uv.y) * smoothstep(1.0, 0.85, uv.y);

    gl_FragColor = vec4(col, 1.0);
  }
`

export default function AuroraBackground() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouseRef = useRef(new THREE.Vector2(0, 0))
  const { viewport } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  )

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = state.clock.elapsedTime

      const mouse = state.pointer
      mouseRef.current.lerp(new THREE.Vector2(mouse.x, mouse.y), 0.03)
      material.uniforms.uMouse.value.copy(mouseRef.current)
      material.uniforms.uResolution.value.set(viewport.width, viewport.height)
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={false}
        depthWrite={false}
      />
    </mesh>
  )
}
