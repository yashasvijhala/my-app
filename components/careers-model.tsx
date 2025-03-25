'use client'

import { motion } from 'framer-motion'
import { Award, ChevronUp, Target, TrendingUp, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

export function CareersModel() {
  const [activeStep, setActiveStep] = useState(0)

  // Auto-cycle through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 4)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const careerSteps = [
    {
      title: 'START',
      description: 'Begin your journey with us',
      icon: <ChevronUp className="h-6 w-6" />,
      color: '#dbeafe'
    },
    {
      title: 'GROW',
      description: 'Develop your skills and expertise',
      icon: <TrendingUp className="h-6 w-6" />,
      color: '#bfdbfe'
    },
    {
      title: 'LEAD',
      description: 'Guide teams to success',
      icon: <Users className="h-6 w-6" />,
      color: '#93c5fd'
    },
    {
      title: 'EXCEL',
      description: 'Reach the pinnacle of your career',
      icon: <Award className="h-6 w-6" />,
      color: '#3b82f6'
    }
  ]

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Your Career Path
      </h2>

      {/* Career Steps */}
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-100 -translate-x-1/2 z-0" />

        {careerSteps.map((step, index) => (
          <motion.div
            key={index}
            className={`relative z-10 mb-16 last:mb-0 ${
              index % 2 === 0
                ? 'text-right pr-8 md:pr-0 md:mr-[50%] md:pr-12'
                : 'pl-8 md:pl-0 md:ml-[50%] md:pl-12'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: activeStep === index ? 1 : 0.6,
              y: 0,
              scale: activeStep === index ? 1.05 : 1
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-2 gap-3 justify-end md:justify-start">
              {index % 2 === 0 && (
                <h3 className="text-xl font-bold text-gray-800">
                  {step.title}
                </h3>
              )}

              <motion.div
                className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center rounded-full p-2"
                style={{ backgroundColor: step.color }}
                animate={{
                  scale: activeStep === index ? [1, 1.2, 1] : 1,
                  backgroundColor: step.color
                }}
                transition={{
                  scale: {
                    repeat: activeStep === index ? Number.POSITIVE_INFINITY : 0,
                    repeatType: 'reverse',
                    duration: 1.5
                  }
                }}
              >
                {step.icon}
              </motion.div>

              {index % 2 !== 0 && (
                <h3 className="text-xl font-bold text-gray-800">
                  {step.title}
                </h3>
              )}
            </div>

            <p
              className={`text-gray-600 max-w-xs ${
                index % 2 === 0 ? 'ml-auto md:ml-0' : 'mr-auto md:mr-0'
              }`}
            >
              {step.description}
            </p>

            {/* Floating particles for active step */}
            {activeStep === index && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      backgroundColor: step.color,
                      width: 6 + Math.random() * 8 + 'px',
                      height: 6 + Math.random() * 8 + 'px',
                      left: `${30 + Math.random() * 40}%`,
                      top: `${Math.random() * 100}%`,
                      opacity: 0.6
                    }}
                    animate={{
                      y: [0, -40 - Math.random() * 60],
                      opacity: [0.7, 0],
                      scale: [1, 0.5]
                    }}
                    transition={{
                      duration: 1.5 + Math.random(),
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Interactive Step Selector */}
      <div className="flex justify-center mt-12 gap-3">
        {careerSteps.map((_, index) => (
          <motion.button
            key={index}
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: activeStep === index ? '#3b82f6' : '#e2e8f0'
            }}
            whileHover={{ scale: 1.2 }}
            onClick={() => setActiveStep(index)}
          />
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="inline-flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
            onClick={() => {
              window.location.href = '/careers'
            }}
          >
            <Target className="h-5 w-5" />
            Join Our Team
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
