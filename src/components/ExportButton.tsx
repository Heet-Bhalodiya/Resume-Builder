import React, { useState } from 'react';

interface ExportButtonProps {
  resumeData: any;
  className?: string;
}

export default function ExportButton({ resumeData, className = '' }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [showFormats, setShowFormats] = useState(false);

  const exportResume = async (format: 'pdf' | 'docx') => {
    try {
      setIsExporting(true);
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          format,
          resumeData,
        }),
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      // Get the blob from the response
      const blob = await response.blob();

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `resume.${format}`;

      // Add to the DOM and trigger the download
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export error:', error);
      // You might want to show an error toast here
    } finally {
      setIsExporting(false);
      setShowFormats(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowFormats(!showFormats)}
        className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors ${className}`}
        disabled={isExporting}
      >
        {isExporting ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Exporting...</span>
          </div>
        ) : (
          'Export Resume'
        )}
      </button>

      {showFormats && !isExporting && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-10">
          <button
            onClick={() => exportResume('pdf')}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Export as PDF
          </button>
          <button
            onClick={() => exportResume('docx')}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Export as Word (DOCX)
          </button>
        </div>
      )}
    </div>
  );
}
