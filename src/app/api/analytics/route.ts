import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';

// ATS scoring criteria
const atsScoring = {
  keywords: [
    'managed', 'developed', 'created', 'implemented', 'led', 'increased',
    'decreased', 'improved', 'achieved', 'coordinated', 'launched', 'delivered',
    'generated', 'reduced', 'negotiated', 'resolved', 'streamlined', 'optimized'
  ],
  technicalSkills: [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'AWS', 'Docker',
    'Kubernetes', 'SQL', 'MongoDB', 'TypeScript', 'Git', 'CI/CD', 'Azure'
  ],
  softSkills: [
    'leadership', 'communication', 'problem-solving', 'teamwork', 'collaboration',
    'analytical', 'project management', 'time management', 'adaptability'
  ]
};

interface AnalyticsResponse {
  atsScore: {
    overall: number;
    details: {
      actionVerbs: number;
      technicalSkills: number;
      softSkills: number;
      readability: number;
    };
  };
  keywordDensity: {
    [key: string]: number;
  };
  improvements: {
    category: string;
    suggestions: string[];
  }[];
  sectionAnalysis: {
    [key: string]: {
      length: number;
      quality: number;
      suggestions: string[];
    };
  };
  competitiveAnalysis: {
    industry: string;
    percentile: number;
    commonMissingKeywords: string[];
  };
}

function analyzeContent(content: string): number {
  const words = content.toLowerCase().split(/\s+/);
  const uniqueWords = new Set(words);
  
  // Check for keyword presence
  const keywordScore = atsScoring.keywords.reduce((score, keyword) => {
    return score + (uniqueWords.has(keyword.toLowerCase()) ? 1 : 0);
  }, 0) / atsScoring.keywords.length;

  // Check for technical skills
  const technicalScore = atsScoring.technicalSkills.reduce((score, skill) => {
    return score + (content.toLowerCase().includes(skill.toLowerCase()) ? 1 : 0);
  }, 0) / atsScoring.technicalSkills.length;

  // Check for soft skills
  const softScore = atsScoring.softSkills.reduce((score, skill) => {
    return score + (content.toLowerCase().includes(skill.toLowerCase()) ? 1 : 0);
  }, 0) / atsScoring.softSkills.length;

  return (keywordScore + technicalScore + softScore) / 3;
}

function calculateReadability(content: string): number {
  const sentences = content.split(/[.!?]+/);
  const words = content.split(/\s+/);
  const avgWordsPerSentence = words.length / sentences.length;
  
  // Simple readability score (lower is better)
  const readabilityScore = Math.min(1, Math.max(0, 1 - (Math.abs(avgWordsPerSentence - 15) / 15)));
  
  return readabilityScore;
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { resumeData } = await request.json();

    // Combine all text content for analysis
    const fullContent = [
      resumeData.personalInfo.summary,
      ...resumeData.experience.map((exp: any) => exp.description.join(' ')),
      resumeData.skills.join(' ')
    ].join(' ');

    // Calculate ATS score
    const contentScore = analyzeContent(fullContent);
    const readabilityScore = calculateReadability(fullContent);

    const analytics: AnalyticsResponse = {
      atsScore: {
        overall: Math.round((contentScore * 0.7 + readabilityScore * 0.3) * 100),
        details: {
          actionVerbs: Math.round(contentScore * 100),
          technicalSkills: Math.round(contentScore * 100),
          softSkills: Math.round(contentScore * 100),
          readability: Math.round(readabilityScore * 100)
        }
      },
      keywordDensity: {},
      improvements: [
        {
          category: 'Action Verbs',
          suggestions: [
            'Add more measurable achievements',
            'Use stronger action verbs',
            'Include specific metrics and results'
          ]
        },
        {
          category: 'Technical Skills',
          suggestions: [
            'Add relevant technical skills',
            'Include certifications',
            'Highlight tools and technologies used'
          ]
        },
        {
          category: 'Soft Skills',
          suggestions: [
            'Demonstrate leadership abilities',
            'Highlight team collaboration',
            'Show problem-solving examples'
          ]
        }
      ],
      sectionAnalysis: {
        summary: {
          length: resumeData.personalInfo.summary.length,
          quality: Math.round(analyzeContent(resumeData.personalInfo.summary) * 100),
          suggestions: [
            'Make it more concise',
            'Add your unique value proposition',
            'Include career objectives'
          ]
        },
        experience: {
          length: resumeData.experience.reduce((acc: number, exp: any) => 
            acc + exp.description.join(' ').length, 0),
          quality: Math.round(analyzeContent(
            resumeData.experience.map((exp: any) => 
              exp.description.join(' ')).join(' ')) * 100),
          suggestions: [
            'Add more quantifiable achievements',
            'Use industry-specific keywords',
            'Focus on results rather than duties'
          ]
        },
        skills: {
          length: resumeData.skills.join(' ').length,
          quality: Math.round(analyzeContent(resumeData.skills.join(' ')) * 100),
          suggestions: [
            'Add more technical skills',
            'Include skill proficiency levels',
            'Group skills by category'
          ]
        }
      },
      competitiveAnalysis: {
        industry: 'Technology',
        percentile: Math.round(contentScore * 100),
        commonMissingKeywords: [
          'artificial intelligence',
          'machine learning',
          'cloud computing',
          'agile methodology'
        ]
      }
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to generate analytics' },
      { status: 500 }
    );
  }
}
