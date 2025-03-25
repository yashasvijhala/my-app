'use client'

import { motion } from 'framer-motion'
import { CareersModel } from './careers-model'

export default function CareersSection() {
  return (
    <section id="careers" className="py-20 overflow-hidden bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-extralight mb-4">
            Join Our <span className="text-blue-600 font-normal">Team</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We&apos;re looking for talented individuals to help us grow. Explore
            our current openings and find your next career opportunity.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-full"
          >
            <CareersModel />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-extralight mb-4">
              Why Work{' '}
              <span className="text-blue-600 font-normal">With Us</span>
            </h3>

            <p className="text-gray-600 mb-6">
              At Nova Solutions, we believe in creating an environment where
              talent thrives. We offer competitive compensation, opportunities
              for growth, and a collaborative culture that values innovation and
              excellence.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: 'Growth Opportunities',
                  description:
                    'Continuous learning and career advancement paths'
                },
                {
                  title: 'Collaborative Culture',
                  description:
                    'Work with talented professionals in a supportive environment'
                },
                {
                  title: 'Competitive Benefits',
                  description:
                    'Comprehensive packages designed for your wellbeing'
                },
                {
                  title: 'Innovative Projects',
                  description:
                    'Tackle challenging problems and make a real impact'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-600 mr-3"></div>
                  <div>
                    <h4 className="font-medium text-gray-800">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
