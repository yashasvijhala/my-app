'use client'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// Extend THREE.Mesh with a custom class that includes a velocity property
class Metaball extends THREE.Mesh {
  velocity: THREE.Vector3

  constructor(geometry: THREE.BufferGeometry, material: THREE.Material) {
    super(geometry, material)
    this.velocity = new THREE.Vector3(0, 0, 0)
  }
}

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [text, setText] = useState('')
  const fullText = 'SK5 Business Solutions'

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setText(fullText.slice(0, index))
      index++
      if (index > fullText.length) clearInterval(interval)
    }, 150)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 10

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current!,
      alpha: true,
      antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)

    const metaballs: Metaball[] = []
    const metaballGeometry = new THREE.SphereGeometry(1.2, 32, 32) // Use SphereGeometry instead of SphereBufferGeometry
    const colors = [0x00a8e8, 0x00b4b4, 0x00c896, 0x00d078]

    const createMetaball = (x: number, y: number, z: number, color: number) => {
      const material = new THREE.MeshStandardMaterial({
        color: color,
        transparent: true,
        opacity: 0.6,
        roughness: 0.1,
        metalness: 0.5
      })
      const ball = new Metaball(metaballGeometry, material)
      ball.position.set(x, y, z)
      ball.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
        0
      )
      scene.add(ball)
      return ball
    }

    for (let i = 0; i < 6; i++) {
      const x = (Math.random() - 0.5) * 20
      const y = (Math.random() - 0.5) * 10
      metaballs.push(createMetaball(x, y, -10, colors[i % colors.length]))
    }

    const light = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(light)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(3, 3, 5)
    scene.add(directionalLight)

    const animate = () => {
      requestAnimationFrame(animate)

      metaballs.forEach(ball => {
        ball.position.x += ball.velocity.x
        ball.position.y += ball.velocity.y

        if (Math.abs(ball.position.x) > 10) ball.velocity.x *= -1
        if (Math.abs(ball.position.y) > 5) ball.velocity.y *= -1
      })

      renderer.render(scene, camera)
    }

    animate()

    // Mouse interaction logic
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event
      const mouseX = (clientX / window.innerWidth) * 2 - 1
      const mouseY = -(clientY / window.innerHeight) * 2 + 1

      metaballs.forEach(ball => {
        const dx = ball.position.x - mouseX * 10
        const dy = ball.position.y - mouseY * 5
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 2) {
          ball.velocity.x += dx * 0.002
          ball.velocity.y += dy * 0.002
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 z-0 w-full h-full"
      />

      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-10 pointer-events-none text-center">
        <motion.h1
          className="text-5xl md:text-6xl lg:text-8xl font-extralight leading-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {text}
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600 mb-8 max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          We help businesses transform and grow with cutting-edge technology and
          strategic insights.
        </motion.p>
      </div>
    </div>
  )
}

export default HeroSection
