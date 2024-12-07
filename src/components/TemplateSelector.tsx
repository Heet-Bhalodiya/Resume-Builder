'use client';

import { useState } from 'react';

interface Template {
  id: string;
  name: string;
  description: string;
}

const templates: Template[] = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and professional layout suitable for most industries'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with a creative touch'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant design focusing on content'
  }
];

export default function TemplateSelector() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('professional');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            className={`relative p-4 rounded-lg border-2 transition-all ${
              selectedTemplate === template.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            {/* Template Preview Box */}
            <div className="w-full aspect-[8.5/11] mb-3 rounded border bg-white shadow-sm overflow-hidden">
              {/* Template preview content - you can replace this with actual template previews */}
              <div className="w-full h-full p-2">
                <div className="w-full h-2 bg-gray-200 rounded mb-2" />
                <div className="w-3/4 h-2 bg-gray-200 rounded mb-4" />
                <div className="space-y-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-full h-1 bg-gray-100 rounded" />
                  ))}
                </div>
              </div>
            </div>

            {/* Template Info */}
            <div className="text-left">
              <h3 className="font-medium text-gray-900">{template.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{template.description}</p>
            </div>

            {/* Selected Indicator */}
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
