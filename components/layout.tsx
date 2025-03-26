'use client'

import type React from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Footer from './footer'
import Navbar from './navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-800 font-light overflow-x-hidden">
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 flex items-center justify-center bg-white z-50"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: 1,
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut'
              }}
              className="w-16 h-16 border-t-2 border-blue-500 rounded-full"
            />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <main className="w-full">{children}</main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
