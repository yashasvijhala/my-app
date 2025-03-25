'use client'

import { Environment, Float, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { AboutModel } from './about-model'

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const stats = [
    { value: '10+', label: 'Years Experience' },
    { value: '200+', label: 'Clients Worldwide' },
    { value: '95%', label: 'Client Satisfaction' },
    { value: '24/7', label: 'Support' }
  ]

  return (
    <section id="about" ref={sectionRef} className="py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div style={{ opacity, y }} className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-extralight mb-6">
              About <span className="text-blue-600 font-normal">Us</span>
            </h2>

            <p className="text-gray-600 mb-6">
              We are a team of passionate professionals dedicated to providing
              innovative business solutions that help our clients achieve their
              goals and stay ahead of the competition.
            </p>

            <p className="text-gray-600 mb-8">
              With over a decade of experience in the industry, we have helped
              hundreds of businesses transform their operations and achieve
              sustainable growth through our cutting-edge technology solutions
              and strategic insights.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-light text-blue-600 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="px-8 py-3 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More About Us
            </motion.button>
          </motion.div>

          <motion.div
            className="h-[400px] order-1 md:order-2"
            style={{ opacity, y: useTransform(y, value => value * -1) }}
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
                <AboutModel />
              </Float>
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
              />
              <Environment preset="city" />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
