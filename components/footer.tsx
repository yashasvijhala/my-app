"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Our Team", href: "#" },
        { name: "Careers", href: "#" },
        { name: "News", href: "#" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Digital Transformation", href: "#services" },
        { name: "Content Management", href: "#services" },
        { name: "Data Analytics", href: "#services" },
        { name: "Cloud Solutions", href: "#services" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#" },
        { name: "Case Studies", href: "#" },
        { name: "Webinars", href: "#" },
        { name: "Documentation", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { icon: <Facebook size={18} />, href: "#", label: "Facebook" },
    { icon: <Twitter size={18} />, href: "#", label: "Twitter" },
    { icon: <Instagram size={18} />, href: "#", label: "Instagram" },
    { icon: <Linkedin size={18} />, href: "#", label: "LinkedIn" },
  ]

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              className="text-2xl font-extralight tracking-wider mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="font-medium text-blue-600">NOVA</span>SOLUTIONS
            </motion.div>

            <p className="text-gray-600 mb-6 max-w-md">
              Innovative business solutions to help your company thrive in the digital age. We combine cutting-edge
              technology with strategic insights to drive growth.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-900 mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div className="flex items-center">
              <Mail size={18} className="text-blue-600 mr-3" />
              <span className="text-gray-600 text-sm">contact@novasolutions.com</span>
            </div>

            <div className="flex items-center">
              <Phone size={18} className="text-blue-600 mr-3" />
              <span className="text-gray-600 text-sm">+1 (555) 123-4567</span>
            </div>

            <div className="flex items-center">
              <MapPin size={18} className="text-blue-600 mr-3" />
              <span className="text-gray-600 text-sm">123 Business Ave, Suite 100, San Francisco, CA</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">&copy; {currentYear} Nova Solutions. All rights reserved.</p>

            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-500 hover:text-blue-600 text-sm">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-500 hover:text-blue-600 text-sm">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-500 hover:text-blue-600 text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

