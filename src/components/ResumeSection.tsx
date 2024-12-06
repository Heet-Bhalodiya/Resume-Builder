'use client'

import { motion } from 'framer-motion'
import { Draggable } from 'react-beautiful-dnd'

interface ResumeSectionProps {
  id: string
  title: string
  isActive: boolean
  onActivate: () => void
  index?: number
}

export default function ResumeSection({
  id,
  title,
  isActive,
  onActivate,
  index = 0
}: ResumeSectionProps) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`
            border rounded-lg p-6 cursor-pointer
            transition-all duration-200 ease-in-out
            ${isActive ? 'border-primary-500 shadow-lg' : 'border-gray-200 hover:border-primary-300 hover:shadow-md'}
          `}
          onClick={onActivate}
        >
          <motion.div
            layout
            className="flex items-center justify-between"
          >
            <motion.h3 
              className="text-lg font-medium"
              whileHover={{ color: '#6366f1' }}
            >
              {title}
            </motion.h3>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </motion.div>
          </motion.div>

          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              {/* Add section specific content here */}
              <p className="text-gray-600">
                Click to edit {title.toLowerCase()}
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </Draggable>
  )
}
