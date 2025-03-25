'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ServiceCard } from './service-card'

export const services = [
  {
    id: 1,
    title: 'Business Process Outsourcing (BPO)',
    description:
      'Data entry, processing & reporting, virtual assistance & administrative support, billing, invoicing & order management.',
    icon: 'briefcase',
    color: '#3b82f6'
  },
  {
    id: 2,
    title: 'Customer Support Services',
    description:
      'Multichannel support (phone, email, chat, social), 24/7 helpdesk & AI-driven chatbots, customer relationship management.',
    icon: 'headphones',
    color: '#8b5cf6'
  },
  {
    id: 3,
    title: 'Website Development',
    description:
      'Custom website design & development, UI/UX optimization for better engagement, e-commerce solutions & landing pages.',
    icon: 'code',
    color: '#ec4899'
  },
  {
    id: 4,
    title: 'Data Management & Analytics',
    description:
      'Secure data entry, validation & compliance, business intelligence & reporting, document digitization & storage.',
    icon: 'bar-chart',
    color: '#10b981'
  },
  {
    id: 5,
    title: 'Technology-Driven Solutions',
    description:
      'Robotic Process Automation (RPA), cybersecurity & compliance solutions, workflow optimization & integrations.',
    icon: 'cpu',
    color: '#f59e0b'
  },
  {
    id: 6,
    title: 'Digital Marketing',
    description:
      'Outbound & inbound marketing, SEO & Google Ads, website & LinkedIn optimization, email & LinkedIn outreach.',
    icon: 'trending-up',
    color: '#ef4444'
  }
]

export default function ServicesSection() {
  const [activeService, setActiveService] = useState<number | null>(null)

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-extralight mb-4">
            Our <span className="text-blue-600 font-normal">Servicess</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive business solutions to help you achieve your
            goals and stay ahead of the competition.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
                color={service.color}
                isActive={activeService === service.id}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
