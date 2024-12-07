import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';

interface Suggestion {
  type: string;
  message: string;
  examples?: string[];
  tips?: string[];
  skills?: string[];
}

interface SmartContentEditorProps {
  section: 'experience' | 'skills' | 'education';
  initialContent?: string;
  onChange?: (content: string) => void;
}

export default function SmartContentEditor({
  section,
  initialContent = '',
  onChange,
}: SmartContentEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce the API call to prevent too many requests
  const getSuggestions = useCallback(
    debounce(async (text: string) => {
      if (!text.trim()) return;

      try {
        setIsLoading(true);
        const response = await fetch('/api/ai/suggestions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            section,
            content: text,
          }),
        });

        if (!response.ok) throw new Error('Failed to get suggestions');

        const data = await response.json();
        setSuggestions(data.suggestions);
      } catch (error) {
        console.error('Error getting suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    }, 1000),
    [section]
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    onChange?.(newContent);
    getSuggestions(newContent);
  };

  const applySuggestion = (suggestion: string) => {
    setContent(prevContent => {
      const newContent = prevContent + '\\n' + suggestion;
      onChange?.(newContent);
      return newContent;
    });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          className="w-full min-h-[200px] p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={content}
          onChange={handleChange}
          placeholder={`Enter your ${section} details...`}
        />
        {isLoading && (
          <div className="absolute top-2 right-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />
          </div>
        )}
      </div>

      {suggestions.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h3 className="font-semibold text-lg">AI Suggestions</h3>
          {suggestions.map((suggestion, index) => (
            <div key={index} className="space-y-2">
              <p className="text-gray-700">{suggestion.message}</p>
              
              {suggestion.examples && (
                <div className="space-y-2">
                  <p className="font-medium">Examples:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {suggestion.examples.map((example, i) => (
                      <li key={i} className="text-gray-600">
                        {example}
                        <button
                          onClick={() => applySuggestion(example)}
                          className="ml-2 text-blue-500 text-sm hover:text-blue-600"
                        >
                          Apply
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {suggestion.tips && (
                <div className="space-y-2">
                  <p className="font-medium">Tips:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {suggestion.tips.map((tip, i) => (
                      <li key={i} className="text-gray-600">{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {suggestion.skills && (
                <div className="space-y-2">
                  <p className="font-medium">Suggested Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestion.skills.map((skill, i) => (
                      <button
                        key={i}
                        onClick={() => applySuggestion(skill)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                      >
                        + {skill}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
