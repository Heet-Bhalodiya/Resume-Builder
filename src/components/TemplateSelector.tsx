'use client'

import { useResume } from '@/context/ResumeContext'
import Image from 'next/image'
import { motion } from 'framer-motion'

const templates = [
  {
    id: 'professional',
    name: 'Professional',
    thumbnail: '/templates/professional.png',
    description: 'Clean and professional layout suitable for most industries'
  },
  {
    id: 'modern',
    name: 'Modern',
    thumbnail: '/templates/modern.png',
    description: 'Contemporary design with a creative touch'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    thumbnail: '/templates/minimal.png',
    description: 'Simple and elegant design focusing on content'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function TemplateSelector() {
  const { state, dispatch } = useResume()

  return (
    <div className="p-4">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-xl font-semibold mb-4"
      >
        Choose Template
      </motion.h2>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {templates.map((template) => (
          <motion.div
            key={template.id}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${
              state.style.theme === template.id
                ? 'border-primary-500 ring-2 ring-primary-200'
                : 'border-gray-200 hover:border-primary-300'
            }`}
            onClick={() => dispatch({ type: 'UPDATE_TEMPLATE', payload: template.id })}
          >
            <div className="aspect-w-8 aspect-h-11 relative mb-3 overflow-hidden rounded">
              <Image
                src={template.thumbnail}
                alt={template.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <motion.h3 
              className="font-medium text-lg"
              whileHover={{ color: '#6366f1' }}
            >
              {template.name}
            </motion.h3>
            <p className="text-gray-600 text-sm">{template.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
