'use client'

import { useFrame } from '@react-three/fiber'
import { forwardRef, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

export function HeroModel() {
  const groupRef = useRef<THREE.Group>(null)
  const cityRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  // Business solution icons with their positions and types
  const businessSolutions = useMemo(
    () => [
      { type: 'cloud', position: [3, 5, -1], label: 'Cloud Solutions' },
      { type: 'support', position: [-2.5, 4.5, -1], label: 'Customer Support' },
      {
        type: 'marketing',
        position: [0, 5.5, -1.5],
        label: 'Digital Marketing'
      },
      { type: 'security', position: [2, 3.5, -0.5], label: 'IT Security' },
      { type: 'analytics', position: [-3, 3, -1], label: 'Data Analytics' },
      { type: 'development', position: [1, 4, -1.2], label: 'App Development' },
      { type: 'ecommerce', position: [-1.5, 5, -0.8], label: 'E-commerce' }
    ],
    []
  )

  // Connection lines between buildings and icons - reduced count
  const connections = useMemo(() => {
    return businessSolutions.slice(0, 5).map((solution, index) => {
      // More organized building positions
      const buildingX = (index - 2) * 0.7
      return {
        from: [buildingX, 0.5, 0],
        to: solution.position,
        speed: 0.5 + Math.random() * 0.3 // Reduced randomness
      }
    })
  }, [businessSolutions])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Reduced rotation intensity for better performance
      groupRef.current.rotation.y =
        Math.sin(clock.getElapsedTime() * 0.08) * 0.04
    }

    if (cityRef.current) {
      // Gentler floating effect for the city
      cityRef.current.position.y =
        Math.sin(clock.getElapsedTime() * 0.15) * 0.04
    }

    if (glowRef.current) {
      // Subtle pulse for the overall glow
      glowRef.current.material.opacity =
        0.15 + Math.sin(clock.getElapsedTime() * 0.2) * 0.05
    }
  })

  // Add outer glow around the entire scene
  const sceneGlow = useMemo(() => {
    return (
      <mesh ref={glowRef} position={[0, 2, -3]}>
        <sphereGeometry args={[7, 32, 32]} />
        <meshBasicMaterial
          color="#1a4c8f"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    )
  }, [])

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Overall scene glow */}
      {sceneGlow}

      {/* Stars with reduced count */}
      <OptimizedStars />

      {/* Enhanced platform with more efficient glow */}
      <EnhancedPlatform />

      {/* City skyline with optimized building generation */}
      <OptimizedCityScape ref={cityRef} />

      {/* Business solution icons - only render the most important ones */}
      {businessSolutions.slice(0, 5).map((solution, index) => (
        <SolutionIcon
          key={index}
          type={solution.type}
          position={solution.position as [number, number, number]}
          label={solution.label}
        />
      ))}

      {/* Connected lines with optimized particles */}
      {connections.map((connection, index) => (
        <OptimizedConnectionLine
          key={index}
          from={connection.from as [number, number, number]}
          to={connection.to as [number, number, number]}
          speed={connection.speed}
        />
      ))}

      {/* Optimized ambient particles - reduced count */}
      <OptimizedAmbientParticles />

      {/* Enhanced lighting with fewer light sources */}
      <ambientLight intensity={0.2} />
      <spotLight position={[0, 10, 5]} intensity={0.7} color="#1a4c8f" />
      <pointLight
        position={[0, 2, 0]}
        intensity={1.5}
        color="#0055ff"
        distance={10}
      />
    </group>
  )
}

// Enhanced platform with more efficient glow
function EnhancedPlatform() {
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (glowRef.current) {
      // Simplified animation with less intensity
      const pulse = Math.sin(clock.getElapsedTime() * 0.3) * 0.15 + 0.7
      glowRef.current.material.opacity = 0.6 * pulse
    }
  })

  return (
    <group position={[0, -0.1, 0]}>
      {/* Main platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[5, 48]} /> {/* Reduced segments */}
        <meshPhysicalMaterial
          color="#0a2d56"
          metalness={0.8}
          roughness={0.2}
          clearcoat={0.8}
          reflectivity={0.7}
        />
      </mesh>

      {/* Optimized outer glow */}
      <mesh
        ref={glowRef}
        position={[0, 0.02, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[4.8, 5.2, 48]} /> {/* Reduced segments */}
        <meshBasicMaterial
          color="#1a4c8f"
          side={THREE.DoubleSide}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Inner glow ring */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.5, 4.8, 48]} /> {/* Reduced segments */}
        <meshBasicMaterial
          color="#0055ff"
          side={THREE.DoubleSide}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Center glow - simplified */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4.5, 48]} /> {/* Reduced segments */}
        <meshBasicMaterial
          color="#1a4c8f"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

// Optimized city skyline with instanced buildings for better performance
const OptimizedCityScape = forwardRef((props, ref) => {
  // Generate fewer building data points with blue color scheme
  const buildings = useMemo(() => {
    const cityData = []
    // Create a reduced number of buildings
    for (let i = -8; i <= 8; i += 1) {
      // Increased step to reduce buildings
      const x = i * 0.5
      const height = 0.5 + Math.random() * 3
      const width = 0.25 + Math.random() * 0.15
      const depth = 0.25 + Math.random() * 0.15

      // Assign building type/color based on position and height
      let type = 'standard'
      if (height > 2.5) {
        type = 'landmark'
      } else if (i % 3 === 0) {
        type = 'bright'
      } else if (i % 4 === 0) {
        type = 'accent'
      }

      cityData.push({ x, height, width, depth, type })
    }
    return cityData
  }, [])

  return (
    <group ref={ref}>
      {buildings.map((building, idx) => (
        <OptimizedBuilding key={idx} building={building} />
      ))}

      {/* Central tower/landmark */}
      <OptimizedCentralTower position={[0, 0, 0]} />
    </group>
  )
})

// Optimized building with better performance
function OptimizedBuilding({ building }: { building: any }) {
  const { x, height, width, depth, type } = building

  // Blue color scheme based on building type - adjusted to match image theme
  const colors = {
    standard: '#0a3b7c', // Darker blue
    bright: '#1a67b3', // Medium blue
    accent: '#0d4f94', // Blue shade
    landmark: '#2a5ca8' // Brighter blue
  }

  const emissiveColors = {
    standard: '#072654',
    bright: '#0a3b7c',
    accent: '#0d4f94',
    landmark: '#14416b'
  }

  const color = colors[type as keyof typeof colors]
  const emissiveColor = emissiveColors[type as keyof typeof emissiveColors]

  // Reduced window generation for better performance
  const windowGrid = useMemo(() => {
    const windows = []
    // Use fewer windows with fixed positions rather than random generation
    const floors = Math.min(4, Math.floor(height * 8))
    const windowsPerFloor = Math.min(3, Math.floor(width * 8))

    for (let floor = 0; floor < floors; floor++) {
      for (let window = 0; window < windowsPerFloor; window++) {
        // Only generate window if not on every position (performance optimization)
        if ((floor + window) % 2 === 0) {
          const windowX = -width / 2 + window * (width / windowsPerFloor) + 0.01
          const windowY = floor * (height / floors) + 0.05
          const windowSize = 0.02

          windows.push(
            <mesh
              key={`${floor}-${window}`}
              position={[windowX, windowY, depth / 2 + 0.001]}
            >
              <planeGeometry args={[windowSize, windowSize]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
            </mesh>
          )
        }
      }
    }
    return windows
  }, [height, width, depth])

  return (
    <group position={[x, height / 2, 0]}>
      {/* Building structure */}
      <mesh>
        <boxGeometry args={[width, height, depth]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          clearcoat={0.7}
          reflectivity={0.8}
          emissive={emissiveColor}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Add windows to building - optimized */}
      {windowGrid}

      {/* Simplified glow at the base of each building */}
      {height > 2 && (
        <mesh
          position={[0, -height / 2 + 0.01, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <circleGeometry args={[width, 8]} /> {/* Reduced segments */}
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  )
}

// Optimized central tower with better performance
function OptimizedCentralTower({
  position
}: {
  position: [number, number, number]
}) {
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (glowRef.current) {
      // Simplified pulse glow effect
      const pulse = 0.3 + Math.sin(clock.getElapsedTime() * 0.4) * 0.15
      glowRef.current.material.opacity = pulse
    }
  })

  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 1, 12]} /> {/* Reduced segments */}
        <meshPhysicalMaterial
          color="#0a3b7c"
          metalness={0.8}
          roughness={0.2}
          clearcoat={0.8}
          emissive="#072654"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Middle section */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 1.5, 12]} />{' '}
        {/* Reduced segments */}
        <meshPhysicalMaterial
          color="#1a67b3"
          metalness={0.8}
          roughness={0.2}
          clearcoat={0.8}
          emissive="#0d4f94"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Top spire */}
      <mesh position={[0, 2.75, 0]}>
        <cylinderGeometry args={[0, 0.15, 1, 12]} /> {/* Reduced segments */}
        <meshPhysicalMaterial
          color="#2a5ca8"
          metalness={0.8}
          roughness={0.2}
          clearcoat={0.8}
          emissive="#2a5ca8"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Glow effect */}
      <mesh ref={glowRef} position={[0, 2.75, 0]}>
        <sphereGeometry args={[0.3, 12, 12]} /> {/* Reduced segments */}
        <meshBasicMaterial
          color="#1a67b3"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Observation deck ring - simplified */}
      <mesh position={[0, 2.25, 0]}>
        <torusGeometry args={[0.25, 0.03, 12, 24]} /> {/* Reduced segments */}
        <meshStandardMaterial
          color="#f8fafc"
          emissive="#f8fafc"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  )
}

// Icons for different business solutions - optimized
function SolutionIcon({
  type,
  position,
  label
}: {
  type: string
  position: [number, number, number]
  label: string
}) {
  const groupRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Reduced animation intensity
      groupRef.current.position.y =
        position[1] + Math.sin(clock.getElapsedTime() * 0.4 + position[0]) * 0.1

      // Slower rotation
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.15
    }

    if (glowRef.current) {
      // Simpler pulse effect
      glowRef.current.material.opacity =
        0.2 + Math.sin(clock.getElapsedTime() * 0.5) * 0.15
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Circle background */}
      <mesh rotation-y={Math.PI * 0.5}>
        <circleGeometry args={[0.4, 24]} /> {/* Reduced segments */}
        <meshPhysicalMaterial
          color="#0a2d56"
          metalness={0.7}
          roughness={0.2}
          clearcoat={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Simplified icon content - different for each type */}
      <SimpleIconContent type={type} />

      {/* Glowing ring */}
      <mesh rotation-y={Math.PI * 0.5}>
        <ringGeometry args={[0.35, 0.4, 24]} /> {/* Reduced segments */}
        <meshBasicMaterial
          color="#1a67b3"
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Glow effect */}
      <mesh ref={glowRef} rotation-y={Math.PI * 0.5}>
        <ringGeometry args={[0.35, 0.45, 16]} />{' '}
        {/* Further reduced segments */}
        <meshBasicMaterial
          color="#1a67b3"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

// Simplified icon content with less geometry
function SimpleIconContent({ type }: { type: string }) {
  switch (type) {
    case 'cloud':
      return (
        <mesh position={[0, 0, 0.05]}>
          <sphereGeometry args={[0.25, 12, 12]} /> {/* Reduced segments */}
          <meshBasicMaterial color="#f8fafc" />
        </mesh>
      )
    case 'support':
      return (
        <mesh position={[0, 0, 0.05]}>
          <torusGeometry args={[0.2, 0.05, 12, 16]} /> {/* Reduced segments */}
          <meshBasicMaterial color="#f8fafc" />
        </mesh>
      )
    case 'analytics':
      return (
        <group position={[0, 0, 0.05]} scale={[0.25, 0.25, 0.25]}>
          <mesh position={[-0.3, -0.3, 0]}>
            <boxGeometry args={[0.2, 0.6, 0.1]} />
            <meshBasicMaterial color="#f8fafc" />
          </mesh>
          <mesh position={[0.3, 0, 0]}>
            <boxGeometry args={[0.2, 1.2, 0.1]} />
            <meshBasicMaterial color="#f8fafc" />
          </mesh>
        </group>
      )
    case 'security':
      return (
        <mesh position={[0, 0, 0.05]}>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 6]} />{' '}
          {/* Reduced segments */}
          <meshBasicMaterial color="#f8fafc" />
        </mesh>
      )
    case 'marketing':
    case 'development':
    case 'ecommerce':
    default:
      return (
        <mesh position={[0, 0, 0.05]}>
          <sphereGeometry args={[0.2, 12, 12]} />{' '}
          {/* Default simplified shape */}
          <meshBasicMaterial color="#f8fafc" />
        </mesh>
      )
  }
}

// Optimized connection lines with fewer particles
function OptimizedConnectionLine({
  from,
  to,
  speed
}: {
  from: [number, number, number]
  to: [number, number, number]
  speed: number
}) {
  const curveRef = useRef<THREE.Line>(null)
  const particlesRef = useRef<THREE.Group>(null)

  // Create a simpler curve for the connection
  const curve = useMemo(() => {
    const startPoint = new THREE.Vector3(from[0], from[1], from[2])
    const endPoint = new THREE.Vector3(to[0], to[1], to[2])

    // Control point for curve
    const controlPoint = new THREE.Vector3(
      (startPoint.x + endPoint.x) / 2,
      (startPoint.y + endPoint.y) / 2 + 0.8,
      (startPoint.z + endPoint.z) / 2
    )

    return new THREE.QuadraticBezierCurve3(startPoint, controlPoint, endPoint)
  }, [from, to])

  // Generate fewer points along the curve
  const points = useMemo(() => {
    return curve.getPoints(30) // Reduced point count
  }, [curve])

  // Create fewer particle points along the curve
  const particles = useMemo(() => {
    return Array.from({ length: 3 }).map(() => ({
      // Reduced from 5 to 3
      position: Math.random(),
      speed: speed * (0.5 + Math.random() * 0.3),
      size: 0.03 + Math.random() * 0.02
    }))
  }, [speed])

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      // Animate particles along the curve
      particlesRef.current.children.forEach((particle, i) => {
        const particleData = particles[i]

        // Update position along the curve
        particleData.position =
          (particleData.position + 0.003 * particleData.speed) % 1

        // Get position from the curve
        const point = curve.getPointAt(particleData.position)
        particle.position.copy(point)
      })
    }

    if (curveRef.current) {
      // Simpler pulse with less intensity
      curveRef.current.material.opacity =
        0.35 + Math.sin(clock.getElapsedTime() * 0.5) * 0.15
    }
  })

  return (
    <group>
      {/* Line connecting the building to the icon */}
      <line
        ref={curveRef}
        geometry={new THREE.BufferGeometry().setFromPoints(points)}
      >
        <lineBasicMaterial color="#1a67b3" transparent opacity={0.4} />
      </line>

      {/* Animated particles along the line - reduced count */}
      <group ref={particlesRef}>
        {particles.map((particle, i) => (
          <mesh key={i} position={[0, 0, 0]}>
            <sphereGeometry args={[particles[i].size, 6, 6]} />{' '}
            {/* Reduced segments */}
            <meshBasicMaterial
              color="#1a67b3"
              transparent
              opacity={0.7}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

// Optimized stars with instanced mesh for better performance
function OptimizedStars() {
  // Generate fewer stars
  const starCount = 150 // Reduced from 300
  const starPositions = useMemo(() => {
    const positions = []
    const colors = []

    for (let i = 0; i < starCount; i++) {
      positions.push(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25 + 10,
        (Math.random() - 0.5) * 12 - 5
      )

      // Color options
      const colorOptions = ['#ffffff', '#1a67b3', '#0a3b7c', '#2a5ca8']
      const colorIdx = Math.floor(Math.random() * colorOptions.length)
      const color = new THREE.Color(colorOptions[colorIdx])

      colors.push(color.r, color.g, color.b)
    }

    return { positions, colors }
  }, [])

  // Use instanced mesh for stars
  const starsRef = useRef<THREE.InstancedMesh>(null)

  useEffect(() => {
    if (starsRef.current) {
      const tempObject = new THREE.Object3D()
      const tempColor = new THREE.Color()

      for (let i = 0; i < starCount; i++) {
        const x = starPositions.positions[i * 3]
        const y = starPositions.positions[i * 3 + 1]
        const z = starPositions.positions[i * 3 + 2]

        tempObject.position.set(x, y, z)
        tempObject.updateMatrix()
        starsRef.current.setMatrixAt(i, tempObject.matrix)

        const r = starPositions.colors[i * 3]
        const g = starPositions.colors[i * 3 + 1]
        const b = starPositions.colors[i * 3 + 2]
        tempColor.setRGB(r, g, b)
        starsRef.current.setColorAt(i, tempColor)
      }

      starsRef.current.instanceMatrix.needsUpdate = true
      if (starsRef.current.instanceColor)
        starsRef.current.instanceColor.needsUpdate = true
    }
  }, [starPositions])

  return (
    <instancedMesh ref={starsRef} args={[undefined, undefined, starCount]}>
      <sphereGeometry args={[0.03, 6, 6]} /> {/* Reduced size and segments */}
      <meshBasicMaterial
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  )
}

// Optimized ambient particles with fewer instances
function OptimizedAmbientParticles() {
  const particlesRef = useRef<THREE.Group>(null)

  // Generate fewer ambient particles
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map(() => ({
      // Reduced from 50 to 25
      position: [
        (Math.random() - 0.5) * 10,
        Math.random() * 7,
        (Math.random() - 0.5) * 5
      ] as [number, number, number],
      speed: {
        x: (Math.random() - 0.5) * 0.007, // Reduced speed
        y: (Math.random() - 0.5) * 0.007,
        z: (Math.random() - 0.5) * 0.007
      },
      size: 0.02 + Math.random() * 0.03,
      color: ['#1a67b3', '#0a3b7c', '#2a5ca8', '#f8fafc'][
        Math.floor(Math.random() * 4)
      ]
    }))
  }, [])

  useFrame(() => {
    if (particlesRef.current) {
      // Update only every other frame for better performance
      if (Math.random() > 0.5) return

      // Animate particles in space
      particlesRef.current.children.forEach((particle, i) => {
        const data = particles[i]

        // Move in random direction with reduced speeds
        particle.position.x += data.speed.x
        particle.position.y += data.speed.y
        particle.position.z += data.speed.z

        // Reset if out of bounds
        if (
          Math.abs(particle.position.x) > 10 ||
          particle.position.y < 0 ||
          particle.position.y > 7 ||
          Math.abs(particle.position.z) > 5
        ) {
          // Reset to a random position
          particle.position.set(
            (Math.random() - 0.5) * 10,
            Math.random() * 7,
            (Math.random() - 0.5) * 5
          )
        }
      })
    }
  })

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.size, 6, 6]} />{' '}
          {/* Reduced segments */}
          <meshBasicMaterial
            color={particle.color}
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}
