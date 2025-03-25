'use client'

import { ApplicationForm } from '@/components/application-form'
import { JobCard } from '@/components/job-card'
import { motion } from 'framer-motion'
import { Briefcase, TrendingUp, Users } from 'lucide-react'
import { useState } from 'react'

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

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [jobToApply, setJobToApply] = useState<string | null>(null)

  const handleApplyClick = (jobTitle: string) => {
    setJobToApply(jobTitle)
    setShowApplicationForm(true)
    // Scroll to application form
    setTimeout(() => {
      document
        .getElementById('application-form')
        ?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <section id="careers" className="py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-extralight mb-6">
              Join Our <span className="text-blue-600 font-normal">Team</span>
            </h2>

            <p className="text-gray-600 mb-6">
              We're looking for talented individuals who are passionate about
              innovation and excellence. Join us in our mission to transform
              businesses through cutting-edge solutions.
            </p>

            <p className="text-gray-600 mb-8">
              At Nova Solutions, we foster a culture of creativity,
              collaboration, and continuous growth. We offer competitive
              compensation, professional development opportunities, and a
              supportive work environment.
            </p>

            <motion.button
              className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .getElementById('job-listings')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              <span>View Open Positions</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="h-[400px]"
          ></motion.div>
        </div>

        {/* Company Culture */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl md:text-3xl font-extralight mb-4">
            Our <span className="text-blue-600 font-normal">Culture</span>
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            We believe in creating an environment where innovation thrives,
            diversity is celebrated, and every team member has the opportunity
            to make a meaningful impact.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-light mb-2">Innovation</h4>
              <p className="text-gray-600 text-sm">
                We encourage creative thinking and embrace new ideas to drive
                continuous improvement.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-light mb-2">Collaboration</h4>
              <p className="text-gray-600 text-sm">
                We work together across teams to achieve common goals and
                deliver exceptional results.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-light mb-2">Excellence</h4>
              <p className="text-gray-600 text-sm">
                We strive for excellence in everything we do, setting high
                standards and delivering quality.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Job Listings */}
        <div id="job-listings" className="mb-16">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl md:text-3xl font-extralight mb-4">
              Open <span className="text-blue-600 font-normal">Positions</span>
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our current job openings and find the perfect role to
              match your skills and career aspirations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-1 gap-6 max-w-4xl mx-auto">
            {jobRoles.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <JobCard
                  job={job}
                  isExpanded={selectedJob === index}
                  onToggle={() =>
                    setSelectedJob(selectedJob === index ? null : index)
                  }
                  onApply={() => handleApplyClick(job.title)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        {showApplicationForm && (
          <motion.div
            id="application-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <ApplicationForm
              jobTitle={jobToApply}
              onClose={() => setShowApplicationForm(false)}
            />
          </motion.div>
        )}
      </div>
    </section>
  )
}
