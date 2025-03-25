'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, MapPin } from 'lucide-react'
import type { ReactNode } from 'react'

interface JobProps {
  title: string
  icon: ReactNode
  description: string
  responsibilities: string[]
  qualifications: string[]
  benefits: string[]
  jobLocation: string
}

interface JobCardProps {
  job: JobProps
  isExpanded: boolean
  onToggle: () => void
  onApply: () => void
}

export function JobCard({ job, isExpanded, onToggle, onApply }: JobCardProps) {
  return (
    <motion.div
      className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 ${
        isExpanded ? 'shadow-md' : ''
      }`}
      layout
    >
      {/* Job Header - Always visible */}
      <div
        className="p-6 cursor-pointer flex items-start justify-between"
        onClick={onToggle}
      >
        <div className="flex items-start gap-4">
          <div className="mt-1">{job.icon}</div>
          <div>
            <h4 className="text-xl font-light">{job.title}</h4>
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <MapPin size={14} className="mr-1" />
              <span>{job.jobLocation}</span>
            </div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={20} className="text-gray-400" />
        </motion.div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 overflow-hidden"
          >
            <p className="text-gray-600 mb-6">{job.description}</p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h5 className="text-sm font-medium uppercase tracking-wider text-gray-900 mb-3">
                  Responsibilities
                </h5>
                <ul className="space-y-2">
                  {job.responsibilities.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start text-sm text-gray-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-sm font-medium uppercase tracking-wider text-gray-900 mb-3">
                  Qualifications
                </h5>
                <ul className="space-y-2">
                  {job.qualifications.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start text-sm text-gray-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <h5 className="text-sm font-medium uppercase tracking-wider text-gray-900 mb-3">
                Benefits
              </h5>
              <ul className="space-y-2">
                {job.benefits.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start text-sm text-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end pb-6">
              <motion.button
                className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={e => {
                  e.stopPropagation()
                  onApply()
                }}
              >
                Apply Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
