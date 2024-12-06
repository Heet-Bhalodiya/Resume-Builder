'use client'

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  crypto,
} from 'react'

interface ResumeState {
  personal: {
    name: string
    email: string
    phone: string
    location: string
  }
  experience: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }>
  education: Array<{
    id: string
    school: string
    degree: string
    field: string
    graduationDate: string
  }>
  skillCategories: Array<{
    id: string
    name: string
    skills: Array<{
      id: string
      name: string
      level: number
    }>
  }>
  style: {
    theme: string
    font: string
    spacing: number
  }
}

type Action =
  | { type: 'UPDATE_PERSONAL'; payload: Partial<ResumeState['personal']> }
  | { type: 'ADD_EXPERIENCE'; payload: ResumeState['experience'][0] }
  | { type: 'UPDATE_EXPERIENCE'; payload: { id: string; data: Partial<ResumeState['experience'][0]> } }
  | { type: 'DELETE_EXPERIENCE'; payload: string }
  | { type: 'ADD_EDUCATION'; payload: ResumeState['education'][0] }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<ResumeState['education'][0]> } }
  | { type: 'DELETE_EDUCATION'; payload: string }
  | { type: 'ADD_SKILL_CATEGORY'; payload: { name: string } }
  | { type: 'ADD_SKILL'; payload: { categoryId: string; skill: { name: string; level: number } } }
  | { type: 'UPDATE_SKILL'; payload: { categoryId: string; skillId: string; data: Partial<{ name: string; level: number }> } }
  | { type: 'DELETE_SKILL'; payload: { categoryId: string; skillId: string } }
  | { type: 'UPDATE_TEMPLATE'; payload: string }
  | { type: 'UPDATE_STYLE'; payload: Partial<ResumeState['style']> }

const initialState: ResumeState = {
  personal: {
    name: '',
    email: '',
    phone: '',
    location: '',
  },
  experience: [],
  education: [],
  skillCategories: [],
  style: {
    theme: 'default',
    font: 'Inter',
    spacing: 1,
  },
}

function resumeReducer(state: ResumeState, action: Action): ResumeState {
  switch (action.type) {
    case 'UPDATE_PERSONAL':
      return {
        ...state,
        personal: { ...state.personal, ...action.payload },
      }
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        experience: [...state.experience, action.payload],
      }
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.map((exp) =>
          exp.id === action.payload.id
            ? { ...exp, ...action.payload.data }
            : exp
        ),
      }
    case 'DELETE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.filter((exp) => exp.id !== action.payload),
      }
    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [...state.education, action.payload],
      }
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map((edu) =>
          edu.id === action.payload.id
            ? { ...edu, ...action.payload.data }
            : edu
        ),
      }
    case 'DELETE_EDUCATION':
      return {
        ...state,
        education: state.education.filter((edu) => edu.id !== action.payload),
      }
    case 'ADD_SKILL_CATEGORY':
      return {
        ...state,
        skillCategories: [
          ...state.skillCategories,
          { id: crypto.randomUUID(), name: action.payload.name, skills: [] },
        ],
      }
    case 'ADD_SKILL':
      return {
        ...state,
        skillCategories: state.skillCategories.map((category) =>
          category.id === action.payload.categoryId
            ? {
                ...category,
                skills: [
                  ...category.skills,
                  { ...action.payload.skill, id: crypto.randomUUID() },
                ],
              }
            : category
        ),
      }
    case 'UPDATE_SKILL':
      return {
        ...state,
        skillCategories: state.skillCategories.map((category) =>
          category.id === action.payload.categoryId
            ? {
                ...category,
                skills: category.skills.map((skill) =>
                  skill.id === action.payload.skillId
                    ? { ...skill, ...action.payload.data }
                    : skill
                ),
              }
            : category
        ),
      }
    case 'DELETE_SKILL':
      return {
        ...state,
        skillCategories: state.skillCategories.map((category) =>
          category.id === action.payload.categoryId
            ? {
                ...category,
                skills: category.skills.filter(
                  (skill) => skill.id !== action.payload.skillId
                ),
              }
            : category
        ),
      }
    case 'UPDATE_TEMPLATE':
      return {
        ...state,
        style: { ...state.style, theme: action.payload },
      }
    case 'UPDATE_STYLE':
      return {
        ...state,
        style: { ...state.style, ...action.payload },
      }
    default:
      return state
  }
}

const ResumeContext = createContext<{
  state: ResumeState
  dispatch: React.Dispatch<Action>
} | null>(null)

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState)

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider')
  }
  return context
}
