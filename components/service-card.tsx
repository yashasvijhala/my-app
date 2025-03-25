'use client'

import { motion } from 'framer-motion'
import {
  BarChart2,
  Briefcase,
  Code,
  Cpu,
  Headphones,
  Layers,
  TrendingUp
} from 'lucide-react'

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  color: string
  isActive: boolean
}

export function ServiceCard({
  title,
  description,
  icon,
  color,
  isActive
}: ServiceCardProps) {
  const getIcon = () => {
    switch (icon) {
      case 'briefcase':
        return <Briefcase size={24} />
      case 'headphones':
        return <Headphones size={24} />
      case 'code':
        return <Code size={24} />

      case 'bar-chart':
        return <BarChart2 size={24} />
      case 'cpu':
        return <Cpu size={24} />
      case 'trending-up':
        return <TrendingUp size={24} />

      default:
        return <Layers size={24} />
    }
  }

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl p-6 h-full transition-all duration-300 ${
        isActive ? 'bg-white shadow-lg' : 'bg-white/50'
      }`}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <motion.div
        className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-10"
        style={{ backgroundColor: color }}
        animate={{
          scale: isActive ? 1.2 : 1
        }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative z-10">
        <motion.div
          className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
          style={{
            backgroundColor: `${color}10`,
            color: color
          }}
          animate={{
            rotate: isActive ? 360 : 0,
            scale: isActive ? 1.1 : 1
          }}
          transition={{ duration: 0.5 }}
        >
          {getIcon()}
        </motion.div>

        <h3 className="text-xl font-light mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>

        <motion.div
          className="mt-6 flex items-center text-sm font-light"
          style={{ color }}
          animate={{
            x: isActive ? 5 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="mr-2">Learn more</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}
