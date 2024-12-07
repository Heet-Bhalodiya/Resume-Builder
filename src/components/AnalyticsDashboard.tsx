import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

interface AnalyticsDashboardProps {
  resumeData: any;
  className?: string;
}

export default function AnalyticsDashboard({ resumeData, className = '' }: AnalyticsDashboardProps) {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchAnalytics();
  }, [resumeData]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeData }),
      });

      if (!response.ok) throw new Error('Failed to fetch analytics');

      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Analytics error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  const scoreChartData = {
    labels: ['Action Verbs', 'Technical Skills', 'Soft Skills', 'Readability'],
    datasets: [
      {
        label: 'Score',
        data: [
          analytics.atsScore.details.actionVerbs,
          analytics.atsScore.details.technicalSkills,
          analytics.atsScore.details.softSkills,
          analytics.atsScore.details.readability,
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  const sectionQualityData = {
    labels: ['Summary', 'Experience', 'Skills'],
    datasets: [
      {
        label: 'Section Quality',
        data: [
          analytics.sectionAnalysis.summary.quality,
          analytics.sectionAnalysis.experience.quality,
          analytics.sectionAnalysis.skills.quality,
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(59, 130, 246)',
      },
    ],
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Resume Analytics</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'overview'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('improvements')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'improvements'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Improvements
          </button>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">ATS Score</h3>
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-blue-600">
                      {analytics.atsScore.overall}%
                    </span>
                  </div>
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle
                      className="text-gray-200"
                      strokeWidth="12"
                      stroke="currentColor"
                      fill="transparent"
                      r="58"
                      cx="64"
                      cy="64"
                    />
                    <circle
                      className="text-blue-600"
                      strokeWidth="12"
                      strokeDasharray={364.4}
                      strokeDashoffset={364.4 * (1 - analytics.atsScore.overall / 100)}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="58"
                      cx="64"
                      cy="64"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Score Breakdown</h3>
              <Bar
                data={scoreChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Section Quality</h3>
              <Radar
                data={sectionQualityData}
                options={{
                  responsive: true,
                  scales: {
                    r: {
                      beginAtZero: true,
                      max: 100,
                    },
                  },
                }}
              />
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Competitive Analysis</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Industry</p>
                  <p className="font-semibold">{analytics.competitiveAnalysis.industry}</p>
                </div>
                <div>
                  <p className="text-gray-600">Industry Percentile</p>
                  <p className="font-semibold">{analytics.competitiveAnalysis.percentile}%</p>
                </div>
                <div>
                  <p className="text-gray-600">Common Missing Keywords</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {analytics.competitiveAnalysis.commonMissingKeywords.map((keyword: string) => (
                      <span
                        key={keyword}
                        className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {analytics.improvements.map((improvement: any, index: number) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">{improvement.category}</h3>
              <ul className="space-y-2">
                {improvement.suggestions.map((suggestion: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Section-Specific Improvements</h3>
            {Object.entries(analytics.sectionAnalysis).map(([section, analysis]: [string, any]) => (
              <div key={section} className="mb-6 last:mb-0">
                <h4 className="font-semibold text-gray-700 capitalize mb-2">{section}</h4>
                <ul className="space-y-2">
                  {analysis.suggestions.map((suggestion: string, i: number) => (
                    <li key={i} className="flex items-start text-gray-600">
                      <span className="text-blue-500 mr-2">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
