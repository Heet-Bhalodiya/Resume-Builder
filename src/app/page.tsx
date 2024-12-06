'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Logo from '@/components/Logo'
import Header from '@/components/Header'

export default function Home() {
  return (
    <main>
      <div className="bg-white">
        {/* Hero section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-300" />
          </div>
          <div className="relative pt-6 pb-16 sm:pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <nav className="relative flex items-center justify-between sm:h-10 md:justify-center">
                <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                  <motion.div 
                    className="flex items-center justify-between w-full md:w-auto"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link href="/" className="flex items-center space-x-2">
                      <Logo className="w-8 h-8 text-white" />
                      <span className="text-2xl font-bold text-white">ResumeRise</span>
                    </Link>
                  </motion.div>
                </div>
                <motion.div 
                  className="hidden md:flex md:space-x-10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Link href="features" className="font-medium text-white hover:text-gray-100 transition-colors duration-200">
                    Features
                  </Link>
                  <Link href="templates" className="font-medium text-white hover:text-gray-100 transition-colors duration-200">
                    Templates
                  </Link>
                  <Link href="pricing" className="font-medium text-white hover:text-gray-100 transition-colors duration-200">
                    Pricing
                  </Link>
                </motion.div>
                <motion.div 
                  className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="inline-flex items-center space-x-4">
                    <Link
                      href="/auth/signin"
                      className="text-white hover:text-blue-100 transition-colors duration-200"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/auth/register"
                      className="bg-white text-blue-500 hover:bg-blue-50 px-4 py-2 rounded-full font-medium transition-colors duration-200"
                    >
                      Get started
                    </Link>
                  </div>
                </motion.div>
              </nav>
            </div>

            <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Craft Your Perfect Resume</span>
                  <span className="block text-gray-200">Land Your Dream Job</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Create professional resumes in minutes with our AI-powered builder.
                  Stand out from the crowd with ATS-friendly templates and expert
                  design tools.
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                  <div className="rounded-md shadow">
                    <Link
                      href="/auth/register"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      Get started for free
                    </Link>
                  </div>
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <Link
                      href="#templates"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-dark hover:bg-opacity-70 md:py-4 md:text-lg md:px-10"
                    >
                      View templates
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Features section */}
        <div id="features" className="py-24 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                Smart Features for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                  Smart Careers
                </span>
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Our platform is designed to make resume creation effortless and
                professional. Get noticed by employers with our advanced features.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {/* AI-Powered Content Suggestions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl transform -rotate-6 group-hover:rotate-0 transition-transform duration-300 opacity-10"></div>
                <div className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-14 h-14 bg-blue-500 text-white rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">AI-Powered Content</h3>
                  <p className="text-gray-600">
                    Get intelligent suggestions for skills, achievements, and job
                    descriptions based on your industry and experience.
                  </p>
                </div>
              </motion.div>

              {/* ATS-Friendly Templates */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl transform -rotate-6 group-hover:rotate-0 transition-transform duration-300 opacity-10"></div>
                <div className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-14 h-14 bg-blue-500 text-white rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">ATS-Friendly Templates</h3>
                  <p className="text-gray-600">
                    Our templates are designed to pass Applicant Tracking Systems
                    while maintaining professional aesthetics.
                  </p>
                </div>
              </motion.div>

              {/* Real-Time Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl transform -rotate-6 group-hover:rotate-0 transition-transform duration-300 opacity-10"></div>
                <div className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-14 h-14 bg-blue-500 text-white rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Real-Time Preview</h3>
                  <p className="text-gray-600">
                    See your changes instantly with our live preview feature.
                    Perfect your resume in real-time.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400"></div>
          <div className="absolute inset-0 bg-grid-white/[0.1] bg-grid"></div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">
                Ready to boost your career?
                <br />
                <span className="mt-2 block text-3xl md:text-4xl opacity-90">
                  Start building your resume today.
                </span>
              </h2>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 flex justify-center"
              >
                <Link
                  href="/auth/register"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-full text-blue-600 bg-white hover:bg-blue-50 hover:text-blue-500 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform duration-200"
                >
                  Get started for free
                  <svg className="ml-3 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
