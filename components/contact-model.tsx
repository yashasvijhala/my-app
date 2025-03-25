"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

export function ContactModel() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Envelope base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 1.2, 0.1]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Envelope flap */}
      <mesh position={[0, 0.6, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <boxGeometry args={[2, 0.8, 0.05]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Decorative elements */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[1.8, 1]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.3} roughness={0.7} opacity={0.2} transparent />
      </mesh>

      {/* Floating message icons */}
      <FloatingIcon position={[-1.5, 1, 0]} size={0.2} speed={1.2} />
      <FloatingIcon position={[1.5, 1.2, 0]} size={0.15} speed={0.8} />
      <FloatingIcon position={[-1.2, 1.5, 0]} size={0.25} speed={1.5} />
      <FloatingIcon position={[1.2, 1.7, 0]} size={0.18} speed={1.0} />
    </group>
  )
}

function FloatingIcon({
  position,
  size,
  speed,
}: {
  position: [number, number, number]
  size: number
  speed: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const initialY = position[1]

  useFrame(({ clock }) => {
    if (ref.current) {
      // Floating motion
      ref.current.position.y = initialY + Math.sin(clock.getElapsedTime() * speed) * 0.2

      // Rotation
      ref.current.rotation.z = Math.sin(clock.getElapsedTime() * speed * 0.5) * 0.2
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <circleGeometry args={[size, 32]} />
      <meshStandardMaterial
        color="#3b82f6"
        metalness={0.5}
        roughness={0.5}
        emissive="#3b82f6"
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}

