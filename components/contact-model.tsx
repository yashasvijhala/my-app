'use client'

import { motion } from 'framer-motion'
import { LinkedinIcon, Mail, Phone } from 'lucide-react'

export function ContactModel() {
  const contactMethods = [
    {
      icon: <Mail className="h-5 w-5 text-blue-600" />,
      title: 'Email',
      value: 'admin@sk5buisnesssolutions.com'
    },
    {
      icon: <Phone className="h-5 w-5 text-blue-600" />,
      title: 'Phone',
      value: '+91 9829252989'
    },
    {
      icon: <LinkedinIcon className="h-5 w-5 text-blue-600" />,
      title: 'LinkedIn',
      value: 'SK5 Business Solutions'
    }
  ]

  return (
    <div className="space-y-8">
      <motion.div
        className="flex space-x-6 justify-center items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {contactMethods.map((method, index) => (
          <motion.div
            key={index}
            className="group relative text-center"
            whileHover={{
              scale: 1.05,
              transition: { type: 'spring', stiffness: 300 }
            }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: {
                delay: index * 0.2,
                type: 'spring',
                stiffness: 300
              }
            }}
            viewport={{ once: true }}
          >
            <div className="bg-blue-50 rounded-full p-3 mb-2 mx-auto flex items-center justify-center group-hover:bg-blue-100 transition-colors w-14 h-14">
              {method.icon}
            </div>
            <div>
              <p className="text-xs text-gray-600 group-hover:text-blue-600 transition-colors mb-1">
                {method.title}
              </p>
              <p className="text-xs text-gray-800 font-medium">
                {method.value}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 300 }}
        className="mt-8 h-[300px] w-full overflow-hidden rounded-lg shadow-lg"
        whileHover={{ scale: 1.02 }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.3615255800987!2d73.1454377104426!3d22.302163079600508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc89b4170fc89%3A0xa0330d959c30f064!2sKarthik%20Nagar%20Society%2C%20C48%2C%20Vasna%20Saiyed%20Rd%2C%20Vrundavan%20Township%2C%20Vibhag%202%2C%20Saiyed%20Vasna%2C%20Vadodara%2C%20Gujarat%20390007!5e0!3m2!1sen!2sin!4v1736587214843!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </div>
  )
}
