'use client'

import { motion } from 'framer-motion'

export default function Logo({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileHover={{ scale: 1.05 }}
    >
      <motion.path
        d="M6 4C6 2.89543 6.89543 2 8 2H24C25.1046 2 26 2.89543 26 4V28C26 29.1046 25.1046 30 24 30H8C6.89543 30 6 29.1046 6 28V4Z"
        fill="currentColor"
        fillOpacity="0.1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      <motion.path
        d="M10 8H22M10 16H18M10 12H20M10 20H16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.path
        d="M6 4C6 2.89543 6.89543 2 8 2H24C25.1046 2 26 2.89543 26 4V28C26 29.1046 25.1046 30 24 30H8C6.89543 30 6 29.1046 6 28V4Z"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </motion.svg>
  )
}
