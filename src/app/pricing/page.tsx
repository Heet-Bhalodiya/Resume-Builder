'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const plans = {
  monthly: [
    {
      name: 'Free',
      price: 0,
      features: [
        'Access to Basic Templates',
        'Export to PDF',
        'Real-time Preview',
        'Basic Customization',
        'Up to 1 Resume',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: 9.99,
      features: [
        'All Free Features',
        'Access to All Templates',
        'AI Content Suggestions',
        'Multiple Export Formats',
        'Up to 5 Resumes',
        'Version History',
        'Priority Support',
      ],
      cta: 'Start Pro Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 29.99,
      features: [
        'All Pro Features',
        'Custom Branding',
        'Team Management',
        'API Access',
        'Unlimited Resumes',
        'Advanced Analytics',
        '24/7 Support',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ],
  annual: [
    {
      name: 'Free',
      price: 0,
      features: [
        'Access to Basic Templates',
        'Export to PDF',
        'Real-time Preview',
        'Basic Customization',
        'Up to 1 Resume',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: 7.99,
      features: [
        'All Free Features',
        'Access to All Templates',
        'AI Content Suggestions',
        'Multiple Export Formats',
        'Up to 5 Resumes',
        'Version History',
        'Priority Support',
      ],
      cta: 'Start Pro Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 24.99,
      features: [
        'All Pro Features',
        'Custom Branding',
        'Team Management',
        'API Access',
        'Unlimited Resumes',
        'Advanced Analytics',
        '24/7 Support',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ],
}

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

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-base font-semibold text-primary-600 tracking-wide uppercase">
            Pricing Plans
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose the perfect plan for your needs
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Whether you're a job seeker or an enterprise, we have a plan that matches your requirements.
          </p>

          <div className="mt-8 flex justify-center">
            <motion.div
              className="relative bg-gray-100 p-0.5 rounded-lg flex"
              whileHover={{ scale: 1.02 }}
            >
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`relative py-2 px-6 text-sm font-medium rounded-md focus:outline-none ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`relative py-2 px-6 text-sm font-medium rounded-md focus:outline-none ${
                  billingCycle === 'annual'
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Annual <span className="text-primary-600">(Save 20%)</span>
              </button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {plans[billingCycle].map((plan) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className={`relative bg-white rounded-lg shadow-md overflow-hidden ${
                plan.highlighted ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-primary-500 text-white">
                    Popular
                  </span>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
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
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`mt-8 w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                    plan.highlighted
                      ? 'text-white bg-primary-600 hover:bg-primary-700'
                      : 'text-primary-600 bg-primary-50 hover:bg-primary-100'
                  } transition-colors`}
                >
                  {plan.cta}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
