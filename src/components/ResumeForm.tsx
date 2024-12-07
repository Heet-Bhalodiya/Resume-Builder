'use client';

import { useState } from 'react';
import ImageUpload from './ImageUpload';

interface ResumeFormProps {
  initialData?: any;
  onSave: (data: any) => void;
}

export default function ResumeForm({ initialData, onSave }: ResumeFormProps) {
  const [formData, setFormData] = useState({
    personalInfo: {
      profileImage: initialData?.personalInfo?.profileImage || '',
      imageShape: initialData?.personalInfo?.imageShape || 'circle',
      name: initialData?.personalInfo?.name || '',
      title: initialData?.personalInfo?.title || '',
      email: initialData?.personalInfo?.email || '',
      phone: initialData?.personalInfo?.phone || '',
      location: initialData?.personalInfo?.location || '',
      summary: initialData?.personalInfo?.summary || '',
    },
    education: initialData?.education || [],
    experience: initialData?.experience || [],
    skills: initialData?.skills || [],
    skillCategories: initialData?.skillCategories || [],
  });

  const handleImageUpload = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        profileImage: imageUrl
      }
    }));
  };

  const handleShapeChange = (shape: 'circle' | 'square' | 'rounded') => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        imageShape: shape
      }
    }));
  };

  return (
    <div className="space-y-8">
      {/* Personal Information Section */}
      <section className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
        
        <div className="flex flex-col items-center mb-8">
          <ImageUpload
            onImageUpload={handleImageUpload}
            shape={formData.personalInfo.imageShape}
            currentImage={formData.personalInfo.profileImage}
            size="large"
          />
          
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => handleShapeChange('circle')}
              className={`px-4 py-2 rounded-full text-sm ${
                formData.personalInfo.imageShape === 'circle'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Circle
            </button>
            <button
              type="button"
              onClick={() => handleShapeChange('square')}
              className={`px-4 py-2 text-sm ${
                formData.personalInfo.imageShape === 'square'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Square
            </button>
            <button
              type="button"
              onClick={() => handleShapeChange('rounded')}
              className={`px-4 py-2 rounded-lg text-sm ${
                formData.personalInfo.imageShape === 'rounded'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Rounded
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.personalInfo.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, name: e.target.value },
                }))
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Professional Title
            </label>
            <input
              type="text"
              value={formData.personalInfo.title}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, title: e.target.value },
                }))
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Software Engineer"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.personalInfo.email}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, email: e.target.value },
                }))
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={formData.personalInfo.phone}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, phone: e.target.value },
                }))
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="+1 (123) 456-7890"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.personalInfo.location}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, location: e.target.value },
                }))
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="City, Country"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-2">
              Professional Summary
            </label>
            <textarea
              value={formData.personalInfo.summary}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, summary: e.target.value },
                }))
              }
              rows={4}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Write a brief summary of your professional background and key achievements..."
            />
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Work Experience</h2>
          <button className="text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
        {/* Work experience form fields will go here */}
      </section>

      {/* Education Section */}
      <section className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Education</h2>
          <button className="text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
        {/* Education form fields will go here */}
      </section>

      {/* Skills Section */}
      <section className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Skill Categories</h2>
        <input
          type="text"
          placeholder="New Category"
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
        />
        
        <h2 className="text-xl font-semibold mb-4">Skills</h2>
        {/* Skills form fields will go here */}
      </section>

      {/* Save Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="max-w-[21cm] mx-auto flex justify-between items-center">
          <button
            onClick={() => onSave(formData)}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}
