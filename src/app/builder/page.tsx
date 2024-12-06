'use client'

import { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import ResumeSection from '@/components/ResumeSection'
import Toolbar from '@/components/Toolbar'
import TemplateSelector from '@/components/TemplateSelector'
import SkillsEditor from '@/components/SkillsEditor'
import { ResumeProvider } from '@/context/ResumeContext'

export default function Builder() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [sidebarTab, setSidebarTab] = useState<'sections' | 'template' | 'style'>('sections')

  return (
    <ResumeProvider>
      <div className="min-h-screen flex">
        {/* Left Sidebar - Tools */}
        <div className="w-80 border-r bg-white">
          <div className="border-b p-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setSidebarTab('sections')}
                className={`px-4 py-2 rounded-md ${
                  sidebarTab === 'sections'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Sections
              </button>
              <button
                onClick={() => setSidebarTab('template')}
                className={`px-4 py-2 rounded-md ${
                  sidebarTab === 'template'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Template
              </button>
              <button
                onClick={() => setSidebarTab('style')}
                className={`px-4 py-2 rounded-md ${
                  sidebarTab === 'style'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Style
              </button>
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-5rem)]">
            {sidebarTab === 'sections' && <Toolbar />}
            {sidebarTab === 'template' && <TemplateSelector />}
            {sidebarTab === 'style' && (
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Style Options</h2>
                {/* Add style options here */}
              </div>
            )}
          </div>
        </div>

        {/* Main Content - Resume Editor */}
        <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-[21cm] mx-auto bg-white shadow-lg min-h-[29.7cm] p-8">
            <DragDropContext onDragEnd={() => {}}>
              <Droppable droppableId="resume-sections">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    <ResumeSection
                      id="personal"
                      title="Personal Information"
                      isActive={activeSection === 'personal'}
                      onActivate={() => setActiveSection('personal')}
                    />
                    <ResumeSection
                      id="experience"
                      title="Work Experience"
                      isActive={activeSection === 'experience'}
                      onActivate={() => setActiveSection('experience')}
                    />
                    <ResumeSection
                      id="education"
                      title="Education"
                      isActive={activeSection === 'education'}
                      onActivate={() => setActiveSection('education')}
                    />
                    <SkillsEditor />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </main>
      </div>
    </ResumeProvider>
  )
}
