'use client'

import { useState } from 'react'

export default function Toolbar() {
  const [activeTab, setActiveTab] = useState('layout')

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="space-y-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('layout')}
            className={`px-4 py-2 text-sm rounded-lg ${
              activeTab === 'layout'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Layout
          </button>
          <button
            onClick={() => setActiveTab('style')}
            className={`px-4 py-2 text-sm rounded-lg ${
              activeTab === 'style'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Style
          </button>
        </div>

        {activeTab === 'layout' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Add Section</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                  + Work Experience
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                  + Education
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                  + Skills
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                  + Projects
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'style' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Theme</h3>
              <div className="grid grid-cols-3 gap-2">
                <button className="w-8 h-8 rounded-full bg-primary" />
                <button className="w-8 h-8 rounded-full bg-secondary" />
                <button className="w-8 h-8 rounded-full bg-accent" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Font</h3>
              <select className="w-full text-sm border rounded-lg p-2">
                <option>Inter</option>
                <option>Playfair Display</option>
                <option>Roboto</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90">
          Export PDF
        </button>
      </div>
    </aside>
  )
}
