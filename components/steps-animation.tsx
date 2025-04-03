'use client'

import type React from 'react'

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue
} from 'framer-motion'
import { Check, Lightbulb, PenTool, Settings, Zap } from 'lucide-react'
import { useRef } from 'react'

interface Step {
  number: number
  title: string
  description: string
  icon: React.ReactNode
}

export default function StepsAnimmation() {
  const containerRef = useRef<HTMLDivElement>(null)

  const steps: Step[] = [
    {
      number: 1,
      title: 'Discover',
      description:
        'We start by understanding your business needs, challenges, and goals through in-depth consultation.',
      icon: <Lightbulb className="w-6 h-6" />
    },
    {
      number: 2,
      title: 'Plan',
      description:
        'Our team develops a customized strategy tailored to your specific requirements and objectives.',
      icon: <PenTool className="w-6 h-6" />
    },
    {
      number: 3,
      title: 'Implement',
      description:
        'We seamlessly integrate our solutions into your workflow with minimal disruption to your operations.',
      icon: <Zap className="w-6 h-6" />
    },
    {
      number: 4,
      title: 'Optimize',
      description:
        'We continuously monitor, refine, and improve our services to ensure optimal performance and results.',
      icon: <Settings className="w-6 h-6" />
    }
  ]

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%']
  })

  return (
    <div
      ref={containerRef}
      className="w-full bg-white py-20 md:py-32 px-4 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extralight mb-4"
          >
            Our <span className="text-blue-600 font-normal">Process</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            We follow a proven methodology to deliver exceptional results for
            our clients
          </motion.p>
        </div>

        {/* Mobile Timeline (visible on small screens) */}
        <div className="md:hidden">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

            {steps.map((step, index) => (
              <MobileTimelineItem
                key={index}
                step={step}
                index={index}
                scrollYProgress={scrollYProgress}
                total={steps.length}
              />
            ))}
          </div>
        </div>

        {/* Desktop Timeline (visible on medium and larger screens) */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

            {steps.map((step, index) => (
              <DesktopTimelineItem
                key={index}
                step={step}
                index={index}
                scrollYProgress={scrollYProgress}
                total={steps.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileTimelineItem({
  step,
  index,
  scrollYProgress,
  total
}: {
  step: Step
  index: number
  scrollYProgress: MotionValue<number>
  total: number
}) {
  const threshold = index / total
  const nextThreshold = (index + 1) / total

  // Transform values for animations
  const opacity = useTransform(
    scrollYProgress,
    [threshold - 0.1, threshold, nextThreshold - 0.1, nextThreshold],
    [0, 1, 1, 0.8]
  )

  const x = useTransform(
    scrollYProgress,
    [threshold - 0.1, threshold, nextThreshold],
    [-20, 0, 0]
  )

  const scale = useTransform(
    scrollYProgress,
    [threshold - 0.1, threshold, nextThreshold - 0.1, nextThreshold],
    [0.8, 1, 1, 0.95]
  )

  return (
    <motion.div
      style={{ opacity, x, scale }}
      className="flex mb-12 pl-12 relative"
    >
      {/* Step number circle */}
      <div className="absolute left-0 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-sm shadow-lg">
        {step.number}
      </div>

      {/* Content */}
      <div className="w-full">
        <div className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <div className="flex items-center mb-3">
            <div className="mr-3 p-2 rounded-lg bg-blue-100 text-blue-600">
              {step.icon}
            </div>
            <h3 className="text-lg font-bold text-black">{step.title}</h3>
          </div>
          <p className="text-neutral-600 text-sm">{step.description}</p>

          {/* Completion indicator */}
          <motion.div
            style={{
              opacity: useTransform(
                scrollYProgress,
                [threshold, threshold + 0.05],
                [0, 1]
              )
            }}
            className="mt-3 flex items-center text-xs text-green-600"
          >
            <Check className="w-4 h-4 mr-1" />
            {/* <span>Completed</span> */}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function DesktopTimelineItem({
  step,
  index,
  scrollYProgress,
  total
}: {
  step: Step
  index: number
  scrollYProgress: MotionValue<number>
  total: number
}) {
  const isEven = index % 2 === 0
  const threshold = index / total
  const nextThreshold = (index + 1) / total

  // Transform values for animations
  const opacity = useTransform(
    scrollYProgress,
    [threshold - 0.1, threshold, nextThreshold - 0.1, nextThreshold],
    [0, 1, 1, 0.8]
  )

  const x = useTransform(
    scrollYProgress,
    [threshold - 0.1, threshold, nextThreshold],
    isEven ? [-50, 0, 0] : [50, 0, 0]
  )

  const scale = useTransform(
    scrollYProgress,
    [threshold - 0.1, threshold, nextThreshold - 0.1, nextThreshold],
    [0.8, 1, 1, 0.95]
  )

  return (
    <div
      className={`flex items-center mb-24 ${isEven ? 'flex-row-reverse' : ''}`}
    >
      {/* Step number circle */}
      <motion.div
        style={{ opacity, scale }}
        className="z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-xl shadow-lg absolute left-1/2 -translate-x-1/2"
      >
        {step.number}
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity, x, scale }}
        className={`w-[calc(50%-3rem)] ${
          isEven ? 'pr-12 text-right' : 'pl-12'
        }`}
      >
        <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <div
            className={`flex items-center mb-4 ${isEven ? 'justify-end' : ''}`}
          >
            <div
              className={`p-2 rounded-lg bg-blue-100 text-blue-600 ${
                isEven ? 'order-2 ml-3' : 'order-1 mr-3'
              }`}
            >
              {step.icon}
            </div>
            <h3
              className={`text-xl font-bold text-black ${
                isEven ? 'order-1' : 'order-2'
              }`}
            >
              {step.title}
            </h3>
          </div>
          <p className="text-neutral-600">{step.description}</p>

          {/* Completion indicator */}
          <div
            className={`mt-4 flex ${isEven ? 'justify-start' : 'justify-end'}`}
          >
            <motion.div
              style={{
                opacity: useTransform(
                  scrollYProgress,
                  [threshold, threshold + 0.05],
                  [0, 1]
                )
              }}
              className="flex items-center text-sm text-green-600"
            >
              <Check className="w-4 h-4 mr-1" />
              {/* <span>Completed</span> */}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
