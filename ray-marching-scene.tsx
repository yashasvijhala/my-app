import { shaderMaterial, Plane } from "@react-three/drei"
import { extend, useFrame } from "@react-three/fiber"
import { useRef, useEffect } from "react"
import * as THREE from "three"

const RayMarchingMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(),
    uBackgroundColor: new THREE.Color("#ff0000"),
    side: THREE.DoubleSide,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec3 uBackgroundColor;
    varying vec2 vUv;

    #define MAX_STEPS 100
    #define MAX_DIST 100.0
    #define SURF_DIST 0.01

    float sdSphere(vec3 p, float r) {
      return length(p) - r;
    }

    float sdBox(vec3 p, vec3 b) {
      vec3 q = abs(p) - b;
      return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
    }

    float sdPyramid(vec3 p, float h) {
      float m2 = h * h + 0.25;
      p.xz = abs(p.xz);
      p.xz = (p.z > p.x) ? p.zx : p.xz;
      p.xz -= 0.5;
      vec3 q = vec3(p.z, h * p.y - 0.5 * p.x, h * p.x + 0.5 * p.y);
      float s = max(-q.x, 0.0);
      float t = clamp((q.y - 0.5 * p.z) / (m2 + 0.25), 0.0, 1.0);
      float a = m2 * (q.x + s) * (q.x + s) + q.y * q.y;
      float b = m2 * (q.x + 0.5 * t) * (q.x + 0.5 * t) + (q.y - m2 * t) * (q.y - m2 * t);
      float d2 = min(q.y, -q.x * m2 - q.y * 0.5) > 0.0 ? 0.0 : min(a, b);
      return sqrt((d2 + q.z * q.z) / m2) * sign(max(q.z, -p.y));
    }

    // Smooth min function for smooth blending
    float smin(float a, float b, float k) {
      float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
      return mix(b, a, h) - k * h * (1.0 - h);
    }

    float scene(vec3 p) {
      float sphere = sdSphere(p - vec3(sin(uTime) * 1.5, cos(uTime * 0.5) * 1.5, 0.0), 0.7);
      float pyramid = sdPyramid(p - vec3(cos(uTime * 1.2) * 1.5, sin(uTime * 0.7) * 1.5, 0.0), 1.0);
      float box = sdBox(p - vec3(sin(uTime * 0.8) * 2.0, cos(uTime * 1.1) * 2.0, sin(uTime) * 2.0), vec3(0.4));
      
      // Smooth blend the shapes
      float blend1 = smin(sphere, pyramid, 1.0);
      return smin(blend1, box, 0.5);
    }

    vec3 getNormal(vec3 p) {
      vec2 e = vec2(0.01, 0);
      return normalize(vec3(
        scene(p + e.xyy) - scene(p - e.xyy),
        scene(p + e.yxy) - scene(p - e.yxy),
        scene(p + e.yyx) - scene(p - e.yyx)
      ));
    }

    float rayMarch(vec3 ro, vec3 rd) {
      float dO = 0.0;
      for(int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * dO;
        float dS = scene(p);
        dO += dS;
        if(dO > MAX_DIST || dS < SURF_DIST) break;
      }
      return dO;
    }

    // Looney Tunes inspired color palette
    vec3 palette(float t) {
      vec3 a = vec3(0.6, 0.2, 0.4);
      vec3 b = vec3(0.0, 0.1, 0.6);
      vec3 c = vec3(0.2, 0.3, 0.5);
      vec3 d = vec3(0.00, 1.25, 0.25);
      return a + b * cos(6.28318 * (c * t + d));
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
      vec3 ro = vec3(0, 0, -4);
      vec3 rd = normalize(vec3(uv, 1));

      float d = rayMarch(ro, rd);
      vec3 p = ro + rd * d;
      vec3 normal = getNormal(p);
      vec3 light = normalize(vec3(1, 1, -1));

      float diff = dot(normal, light) * 0.5 + 0.5;
      vec3 color = palette(diff + uTime * 0.1);

      // Add some edge highlighting
      float edge = 1.0 - max(dot(normal, -rd), 0.0);
      color += vec3(1.0, 0.5, 0.0) * pow(edge, 3.0);

      // Add some "toon shading" steps
      color *= floor(diff * 10.0) / 3.0;

      // Background color
      color = mix(uBackgroundColor, color, smoothstep(MAX_DIST - 5.0, 0.0, d));

      gl_FragColor = vec4(color, 1.0);
    }
  `,
)

extend({ RayMarchingMaterial })

export function RayMarchingScene({ backgroundColor }: { backgroundColor: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)

  useFrame(({ clock, size }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.getElapsedTime()
      materialRef.current.uResolution.set(size.width, size.height)
    }
  })

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uBackgroundColor = new THREE.Color(backgroundColor)
    }
  }, [backgroundColor])

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[4, 4, 4]} />
      {/* @ts-ignore */}
      <rayMarchingMaterial ref={materialRef} />
    </mesh>
  )
}

