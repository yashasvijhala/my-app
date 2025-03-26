'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 50)

      // Update active section based on scroll position
      const sections = ['home', 'services', 'about', 'contact', 'careers']

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    // Close mobile menu when scrolling
    const handleMenuClose = () => {
      setIsMobileMenuOpen(false)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('scroll', handleMenuClose)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleMenuClose)
    }
  }, [])

  const navItems = [
    { name: 'Home', href: '/#home' },
    { name: 'Services', href: '/#services' },
    { name: 'About Us', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
    { name: 'Careers', href: '/careers' }
  ]

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      x: '0%',
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          className="text-2xl font-extralight tracking-wider"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <span className="font-medium text-blue-600">SK5</span> Business
          Solutions
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className={`relative text-sm tracking-wide hover:text-blue-600 transition-colors ${
                activeSection === item.href.substring(1) ? 'text-blue-600' : ''
              }`}
            >
              {item.name}
              {activeSection === item.href.substring(1) && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"
                  layoutId="navIndicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <motion.button
          className="hidden md:block px-6 py-2 text-sm font-light border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed md:hidden top-0 left-0 right-0 bottom-0 bg-white/95 z-40 pt-20"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="flex flex-col items-center space-y-6">
              {navItems.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-xl tracking-wide hover:text-blue-600 transition-colors ${
                    activeSection === item.href.substring(1)
                      ? 'text-blue-600'
                      : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <motion.button
                className="px-8 py-3 text-base border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
