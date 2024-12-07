'use client'

import { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import ResumeSection from '@/components/ResumeSection'
import Toolbar from '@/components/Toolbar'
import TemplateSelector from '@/components/TemplateSelector'
import SkillsEditor from '@/components/SkillsEditor'
import { ResumeProvider } from '@/context/ResumeContext'
import ResumeForm from '@/components/ResumeForm'

export default function Builder() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [sidebarTab, setSidebarTab] = useState<'sections' | 'template' | 'style'>('sections')

  const handleSaveResume = async (data: any) => {
    try {
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save resume');
      }

      // Handle successful save
      console.log('Resume saved successfully');
    } catch (error) {
      console.error('Error saving resume:', error);
    }
  };

  return (
    <ResumeProvider>
      <div className="min-h-screen flex bg-gray-50">
        {/* Left Sidebar - Tools */}
        <div className="w-64 bg-white border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex gap-2">
              <button
                onClick={() => setSidebarTab('sections')}
                className={`flex-1 px-3 py-1.5 text-sm rounded-md ${
                  sidebarTab === 'sections'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Layout
              </button>
              <button
                onClick={() => setSidebarTab('style')}
                className={`flex-1 px-3 py-1.5 text-sm rounded-md ${
                  sidebarTab === 'style'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Style
              </button>
            </div>
          </div>

          <div className="p-4">
            {sidebarTab === 'sections' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Add Section</h3>
                  <div className="space-y-1">
                    <button className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                      + Work Experience
                    </button>
                    <button className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                      + Education
                    </button>
                    <button className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                      + Skills
                    </button>
                    <button className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                      + Projects
                    </button>
                  </div>
                </div>
              </div>
            )}
            {sidebarTab === 'style' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Template</h3>
                  <TemplateSelector />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content - Resume Editor */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <ResumeForm onSave={handleSaveResume} />
            <DragDropContext onDragEnd={() => {}}>
              <Droppable droppableId="resume-sections">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4 bg-white shadow-lg p-8 mt-8"
                  >
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
  );
}
