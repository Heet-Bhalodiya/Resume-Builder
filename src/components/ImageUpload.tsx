'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  shape: 'circle' | 'square' | 'rounded';
  currentImage?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function ImageUpload({ 
  onImageUpload, 
  shape = 'circle',
  currentImage,
  size = 'medium'
}: ImageUploadProps) {
  const [image, setImage] = useState<string>(currentImage || '');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    small: 'w-24 h-24',
    medium: 'w-32 h-32',
    large: 'w-40 h-40'
  };

  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-lg'
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      
      // Create a local URL for the image
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      onImageUpload(imageUrl);
      
    } catch (error) {
      console.error('Error handling image:', error);
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setImage('');
    onImageUpload('');
    // Clean up the object URL to avoid memory leaks
    if (image.startsWith('blob:')) {
      URL.revokeObjectURL(image);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <div
        className={`relative ${sizeClasses[size]} ${shapeClasses[shape]} border-2 border-dashed border-gray-200 overflow-hidden bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors`}
        onClick={triggerFileInput}
      >
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : image ? (
          <div className="relative w-full h-full">
            <img
              src={image}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      <div className="flex gap-2 text-sm">
        <button
          type="button"
          onClick={handleRemove}
          className={`px-3 py-1 rounded-md ${
            image ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-400 cursor-not-allowed'
          }`}
          disabled={!image}
        >
          Remove
        </button>
        <button
          type="button"
          onClick={triggerFileInput}
          className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-md"
        >
          Change
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
