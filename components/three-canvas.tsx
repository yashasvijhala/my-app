'use client'

import { useCallback, useEffect, useRef } from 'react'
import * as THREE from 'three'

interface Velocity {
  x: number
  y: number
  z: number
}

export default function ThreeCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)

  const cleanupScene = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    if (sceneRef.current) {
      sceneRef.current.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose()
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose())
          } else if (object.material) {
            object.material.dispose()
          }
        }
      })
    }

    if (rendererRef.current) {
      rendererRef.current.dispose()
      rendererRef.current = null
    }

    sceneRef.current = null
    cameraRef.current = null

    if (canvasRef.current) {
      canvasRef.current.innerHTML = ''
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    cleanupScene()

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color(0xffffff) // Pure white background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    cameraRef.current = camera
    camera.position.z = 30

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    rendererRef.current = renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    canvasRef.current.appendChild(renderer.domElement)

    // Particles setup
    const particlesCount = 100
    const positions = new Float32Array(particlesCount * 3)
    const velocities: Velocity[] = []

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 60
      positions[i3 + 1] = (Math.random() - 0.5) * 60
      positions[i3 + 2] = (Math.random() - 0.5) * 60

      velocities.push({
        x: (Math.random() - 0.5) * 0.04,
        y: (Math.random() - 0.5) * 0.04,
        z: (Math.random() - 0.5) * 0.04
      })
    }

    const particlesGeometry = new THREE.BufferGeometry()
    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    )

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x1e90ff, // Blue particles
      size: 0.25,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    const lines = new THREE.Group()
    scene.add(lines)

    const clock = new THREE.Clock()

    const animate = () => {
      if (!sceneRef.current || !rendererRef.current || !cameraRef.current)
        return

      const elapsedTime = clock.getElapsedTime()
      const positionsArray = particles.geometry.attributes.position
        .array as Float32Array

      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3

        positionsArray[i3] += velocities[i].x
        positionsArray[i3 + 1] += velocities[i].y
        positionsArray[i3 + 2] += velocities[i].z

        if (Math.abs(positionsArray[i3]) > 30) velocities[i].x *= -1.05
        if (Math.abs(positionsArray[i3 + 1]) > 30) velocities[i].y *= -1.05
        if (Math.abs(positionsArray[i3 + 2]) > 30) velocities[i].z *= -1.05
      }

      particles.geometry.attributes.position.needsUpdate = true

      lines.clear()

      const maxDistance = 12
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3
        const p1 = new THREE.Vector3(
          positionsArray[i3],
          positionsArray[i3 + 1],
          positionsArray[i3 + 2]
        )

        for (let j = i + 1; j < particlesCount; j++) {
          const j3 = j * 3
          const p2 = new THREE.Vector3(
            positionsArray[j3],
            positionsArray[j3 + 1],
            positionsArray[j3 + 2]
          )

          const distance = p1.distanceTo(p2)

          if (distance < maxDistance) {
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
              p1,
              p2
            ])
            const opacity = 1 - distance / maxDistance
            const lineMaterial = new THREE.LineBasicMaterial({
              color: 0xaaaaaa,
              transparent: true,
              opacity: opacity * 0.3
            })

            const line = new THREE.Line(lineGeometry, lineMaterial)
            lines.add(line)
          }
        }
      }

      scene.rotation.y = elapsedTime * 0.04
      scene.rotation.x = Math.sin(elapsedTime * 0.08) * 0.08

      rendererRef.current.render(scene, camera)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight
        cameraRef.current.updateProjectionMatrix()
        rendererRef.current.setSize(window.innerWidth, window.innerHeight)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cleanupScene()
    }
  }, [cleanupScene])

  return <div ref={canvasRef} className="w-full h-screen" />
}
