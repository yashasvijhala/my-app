'use client'

import { motion } from 'framer-motion'
import { Briefcase, TrendingUp, Users } from 'lucide-react'
import { useState } from 'react'
import { CareersModel } from './careers-model'

// Job roles data
const jobRoles = [
  {
    title: 'Customer Support Specialist',
    icon: <Users className="h-8 w-8 text-blue-500 dark:text-blue-400" />,
    description:
      'Handle escalations and provide exceptional support to our international clientele.',
    responsibilities: [
      'Manage escalations proactively',
      'Communicate clearly with customers',
      'Resolve complex issues effectively',
      'Contribute to process improvements',
      'Maintain accurate documentation'
    ],
    qualifications: [
      'Experience in handling escalations',
      'Strong communication skills',
      'Excellent problem-solving abilities',
      'Ability to work independently and in teams',
      'Proficiency in CRM and ticketing systems'
    ],
    benefits: [
      'Competitive salary and benefits',
      'Career growth opportunities',
      'Onsite work,  (Varodara, Gujarat, India)'
    ],
    jobLocation: 'Varodara, Gujarat, India'
  },
  {
    title: 'Customer Service Representative',
    icon: <Briefcase className="h-8 w-8 text-green-500 dark:text-green-400" />,
    description:
      'Support US & Canadian customers in international sales and support.',
    responsibilities: [
      'Handle customer correspondence via multiple channels',
      'Manage full order and sales cycle',
      'Meet daily targets for orders and queries',
      'Coordinate with Distribution for shipments',
      'Resolve complex order fulfillment issues'
    ],
    qualifications: [
      "Bachelor's degree",
      '1-3 years of customer service experience',
      'Fluent English with US/Canadian accent',
      'Proficiency in Microsoft Office',
      'Flexible working hours'
    ],
    benefits: [
      'Salary: ₹20,000 - ₹38,000 per month',
      'Performance-based incentives',
      'Onsite work (Varodara, Gujarat, India)'
    ],
    jobLocation: 'Varodara, Gujarat, India'
  },
  {
    title: 'Inside Sales Representative',
    icon: (
      <TrendingUp className="h-8 w-8 text-purple-500 dark:text-purple-400" />
    ),
    description:
      'Drive sales through remote customer interactions in an international BPO setting.',
    responsibilities: [
      'Conduct outbound sales calls',
      'Manage customer relationships',
      'Achieve sales targets',
      'Use CRM to track customer interactions',
      'Collaborate with the sales team'
    ],
    qualifications: [
      '1+ year experience in international BPO',
      'Strong English communication skills',
      'Basic MS Office proficiency',
      'Knowledge of CRM & Salesforce (bonus)'
    ],
    benefits: [
      'Salary: ₹25,000 - ₹35,000 per month',
      'Onsite work (Varodara, Gujarat, India)',
      '5-day work week (night shift)'
    ],
    jobLocation: 'Varodara, Gujarat, India'
  }
]

export default function CareersSection() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null)

  const toggleJob = (title: string) => {
    if (expandedJob === title) {
      setExpandedJob(null)
    } else {
      setExpandedJob(title)
    }
  }

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
            We're looking for talented individuals to help us grow. Explore our
            current openings and find your next career opportunity.
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
