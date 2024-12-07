import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

// Sample improvement suggestions for different resume sections
const improvementSuggestions = {
  experience: {
    weak: [
      'Worked on projects',
      'Helped customers',
      'Did daily tasks',
    ],
    strong: [
      'Led cross-functional team of 5 to deliver project 2 weeks ahead of schedule',
      'Increased customer satisfaction by 25% through implementation of automated response system',
      'Streamlined workflow processes resulting in 30% efficiency improvement',
    ],
    tips: [
      'Use specific metrics and numbers',
      'Start with strong action verbs',
      'Focus on achievements rather than duties',
      'Include quantifiable results',
    ],
  },
  skills: {
    technical: [
      'React', 'Node.js', 'TypeScript', 'MongoDB',
      'AWS', 'Docker', 'Git', 'CI/CD',
    ],
    soft: [
      'Leadership', 'Communication', 'Problem Solving',
      'Team Collaboration', 'Project Management',
    ],
  },
  education: {
    tips: [
      'Include relevant coursework',
      'Highlight academic achievements',
      'List any certifications',
      'Mention research projects',
    ],
  },
};

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { section, content } = await request.json();

    // Basic content improvement suggestions
    let suggestions = [];
    
    switch (section) {
      case 'experience':
        // Check if content uses weak phrases
        const isWeak = improvementSuggestions.experience.weak.some(
          phrase => content.toLowerCase().includes(phrase.toLowerCase())
        );
        
        if (isWeak) {
          suggestions.push({
            type: 'improvement',
            message: 'Consider using stronger action verbs and specific metrics',
            examples: improvementSuggestions.experience.strong.slice(0, 2),
          });
        }
        
        // Add general tips
        suggestions.push({
          type: 'tips',
          message: 'General tips for experience section:',
          tips: improvementSuggestions.experience.tips,
        });
        break;

      case 'skills':
        // Suggest relevant technical skills based on content
        const missingTechSkills = improvementSuggestions.skills.technical.filter(
          skill => !content.toLowerCase().includes(skill.toLowerCase())
        );
        
        if (missingTechSkills.length > 0) {
          suggestions.push({
            type: 'suggestion',
            message: 'Consider adding these relevant technical skills:',
            skills: missingTechSkills.slice(0, 3),
          });
        }
        break;

      case 'education':
        suggestions.push({
          type: 'tips',
          message: 'Tips for education section:',
          tips: improvementSuggestions.education.tips,
        });
        break;

      default:
        suggestions.push({
          type: 'general',
          message: 'Focus on highlighting achievements and using specific metrics',
        });
    }

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('AI suggestion error:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    );
  }
}
