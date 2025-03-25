'use client'

import {
  Environment,
  OrbitControls,
  PerspectiveCamera
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { PhoneCallIcon } from 'lucide-react'
import { Suspense, useEffect, useRef, useState } from 'react'
import { HeroModel } from './hero-model'

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Parallax effect for hero content
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="z-10"
        >
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-extralight leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            SK5 <span className="text-blue-600 font-normal">Business</span>{' '}
            Solutions
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600 mb-8 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            We help businesses transform and grow with cutting-edge technology
            and strategic insights.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Services
            </motion.button>

            <motion.button
              className="px-8 py-3 border border-gray-300 rounded-full hover:border-blue-600 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Contact Us</span>
              <PhoneCallIcon />
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-[400px] md:h-[600px] w-full"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${
              mousePosition.y * 20
            }px)`
          }}
        >
          <Canvas
            ref={canvasRef}
            shadows
            gl={{ antialias: true }}
            dpr={[1, 2]}
            camera={{ position: [0, 0, 12], fov: 45 }}
          >
            <Suspense fallback={null}>
              <color attach="background" args={['#ffffff']} />
              <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />
              <ambientLight intensity={0.5} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={1}
                castShadow
                shadow-mapSize={[2048, 2048]}
              />
              <directionalLight
                position={[-10, 10, 5]}
                intensity={0.5}
                castShadow
                shadow-mapSize={[1024, 1024]}
              />
              <HeroModel />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2}
              />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse'
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
        <span className="text-xs text-gray-500 mt-2">Scroll to explore</span>
      </div>

      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-blue-500/5 pointer-events-none" />
    </section>
  )
}
