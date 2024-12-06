'use client'

import { useState } from 'react'
import { useResume } from '@/context/ResumeContext'
import { motion, AnimatePresence } from 'framer-motion'

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
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
}

export default function SkillsEditor() {
  const { state, dispatch } = useResume()
  const [newCategory, setNewCategory] = useState('')
  const [newSkill, setNewSkill] = useState({ name: '', level: 3 })
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCategory.trim()) {
      dispatch({ type: 'ADD_SKILL_CATEGORY', payload: { name: newCategory } })
      setNewCategory('')
    }
  }

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedCategory && newSkill.name.trim()) {
      dispatch({
        type: 'ADD_SKILL',
        payload: {
          categoryId: selectedCategory,
          skill: {
            name: newSkill.name,
            level: newSkill.level
          }
        }
      })
      setNewSkill({ name: '', level: 3 })
    }
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 p-4"
    >
      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-medium mb-4">Skill Categories</h3>
        <form onSubmit={handleAddCategory} className="flex gap-2 mb-4">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New Category"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-all"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            Add
          </motion.button>
        </form>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-medium mb-4">Skills</h3>
        <AnimatePresence>
          <motion.div className="space-y-4">
            {state.skillCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">{category.name}</h4>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className="text-sm text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    Add Skill
                  </motion.button>
                </div>

                <AnimatePresence>
                  {selectedCategory === category.id && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleAddSkill}
                      className="flex gap-2 mb-4"
                    >
                      <input
                        type="text"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                        placeholder="Skill name"
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                      <select
                        value={newSkill.level}
                        onChange={(e) => setNewSkill({ ...newSkill, level: Number(e.target.value) })}
                        className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="1">Beginner</option>
                        <option value="2">Intermediate</option>
                        <option value="3">Advanced</option>
                        <option value="4">Expert</option>
                      </select>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                      >
                        Add
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>

                <motion.div layout className="space-y-2">
                  {category.skills.map((skill) => (
                    <motion.div
                      layout
                      key={skill.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                    >
                      <span>{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          {['Beginner', 'Intermediate', 'Advanced', 'Expert'][skill.level - 1]}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1, color: '#ef4444' }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            dispatch({
                              type: 'DELETE_SKILL',
                              payload: { categoryId: category.id, skillId: skill.id }
                            })
                          }
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
