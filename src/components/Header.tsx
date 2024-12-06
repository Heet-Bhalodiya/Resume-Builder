'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'

const navigation = [
  { name: 'Features', href: '/features' },
  { name: 'Templates', href: '/templates' },
  { name: 'Pricing', href: '/pricing' },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-300 text-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="w-8 h-8 text-white" />
              <motion.span
                className="text-xl font-bold text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                ResumeRise
              </motion.span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-base font-medium ${
                  pathname === link.href
                    ? 'text-white'
                    : 'text-blue-100 hover:text-white'
                } relative group transition-colors duration-200`}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                    layoutId="underline"
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
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

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-white hover:text-blue-100 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="pt-2 pb-4 space-y-1">
            {navigation.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href
                    ? 'text-white bg-blue-600'
                    : 'text-blue-100 hover:text-white hover:bg-blue-600'
                } transition-colors duration-200`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Link
                href="/auth/signin"
                className="block px-3 py-2 text-blue-100 hover:text-white transition-colors duration-200"
              >
                Sign in
              </Link>
              <Link
                href="/auth/register"
                className="block mx-3 px-3 py-2 bg-white text-blue-500 hover:bg-blue-50 rounded-full text-center font-medium transition-colors duration-200"
              >
                Get started
              </Link>
            </div>
          </div>
        </motion.div>
      </nav>
    </header>
  )
}
