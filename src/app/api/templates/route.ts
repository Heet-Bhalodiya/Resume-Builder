import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';

// Define basic template structure
const defaultTemplates = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'A clean and modern design perfect for tech professionals',
    sections: ['header', 'summary', 'experience', 'education', 'skills', 'projects'],
    previewImage: '/templates/modern.png',
  },
  {
    id: 'classic',
    name: 'Classic Traditional',
    description: 'Traditional layout ideal for conservative industries',
    sections: ['header', 'experience', 'education', 'skills', 'references'],
    previewImage: '/templates/classic.png',
  },
  {
    id: 'creative',
    name: 'Creative Portfolio',
    description: 'Creative design for artists and designers',
    sections: ['header', 'portfolio', 'experience', 'skills', 'education'],
    previewImage: '/templates/creative.png',
  },
];

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    // For now, return default templates
    // Later, we can fetch custom templates from the database
    return NextResponse.json(defaultTemplates);
  } catch (error) {
    console.error('Template fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}
