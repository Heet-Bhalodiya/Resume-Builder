'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const templates = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and professional layout suitable for most industries',
    thumbnail: '/templates/professional.png',
    features: ['ATS-Friendly', 'Clean Layout', 'Professional Fonts'],
    category: 'Professional',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with a creative touch',
    thumbnail: '/templates/modern.png',
    features: ['Creative Design', 'Custom Sections', 'Modern Typography'],
    category: 'Creative',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant design focusing on content',
    thumbnail: '/templates/minimal.png',
    features: ['Minimalist Design', 'Content Focused', 'Easy to Read'],
    category: 'Simple',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Sophisticated design for senior positions',
    thumbnail: '/templates/executive.png',
    features: ['Executive Style', 'Achievement Focused', 'Premium Look'],
    category: 'Professional',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold design for creative professionals',
    thumbnail: '/templates/creative.png',
    features: ['Unique Layout', 'Portfolio Section', 'Eye-catching Design'],
    category: 'Creative',
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Optimized for technical roles and skills',
    thumbnail: '/templates/technical.png',
    features: ['Skills Matrix', 'Technical Focus', 'Project Showcase'],
    category: 'Technical',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Templates() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-base font-semibold text-primary-600 tracking-wide uppercase">
            Professional Templates
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose from our curated collection
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Each template is designed to highlight your strengths and pass ATS systems
            while maintaining a beautiful, professional appearance.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {templates.map((template) => (
            <motion.div
              key={template.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="aspect-w-4 aspect-h-3 relative">
                <Image
                  src={template.thumbnail}
                  alt={template.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                  <span className="px-2 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-full">
                    {template.category}
                  </span>
                </div>
                <p className="text-gray-500 mb-4">{template.description}</p>
                <div className="space-y-2">
                  {template.features.map((feature) => (
                    <div key={feature} className="flex items-center text-sm text-gray-500">
                      <svg
                        className="w-4 h-4 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                  onClick={() => window.location.href = '/builder'}
                >
                  Use This Template
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
