"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

export function AboutModel() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Abstract geometric shapes representing business growth */}
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} wireframe />
      </mesh>

      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial color="#60a5fa" metalness={0.6} roughness={0.4} wireframe opacity={0.5} transparent />
      </mesh>

      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <octahedronGeometry args={[1.4, 0]} />
        <meshStandardMaterial color="#93c5fd" metalness={0.4} roughness={0.6} wireframe opacity={0.3} transparent />
      </mesh>

      {/* Floating cubes representing data points */}
      {Array.from({ length: 10 }).map((_, i) => {
        const position = [(Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5]
        const size = Math.random() * 0.3 + 0.1
        const speed = Math.random() * 0.5 + 0.5
        const rotationSpeed = Math.random() * 0.02 + 0.01

        return (
          <FloatingCube
            key={i}
            position={position}
            size={size}
            speed={speed}
            rotationSpeed={rotationSpeed}
            color={`hsl(${210 + i * 5}, ${70 + i * 2}%, ${60 + i * 3}%)`}
          />
        )
      })}
    </group>
  )
}

function FloatingCube({
  position,
  size,
  speed,
  rotationSpeed,
  color,
}: {
  position: [number, number, number]
  size: number
  speed: number
  rotationSpeed: number
  color: string
}) {
  const ref = useRef<THREE.Mesh>(null)
  const initialY = position[1]

  useFrame(({ clock }) => {
    if (ref.current) {
      // Floating motion
      ref.current.position.y = initialY + Math.sin(clock.getElapsedTime() * speed) * 0.5

      // Rotation
      ref.current.rotation.x += rotationSpeed
      ref.current.rotation.y += rotationSpeed * 0.8
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.5} />
    </mesh>
  )
}

