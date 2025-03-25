import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MeshDistortMaterial, Sphere } from "@react-three/drei"
import type * as THREE from "three"

export function DistortSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.5
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.5
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3
    }
  })

  return (
    <Sphere ref={meshRef} args={[0.5, 64, 64]} position={[1.5, 0, 0]}>
      <MeshDistortMaterial color="#ff00ff" attach="material" distort={0.5} speed={5} roughness={0} metalness={1} />
    </Sphere>
  )
}

