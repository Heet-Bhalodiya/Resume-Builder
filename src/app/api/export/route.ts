import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { Document, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, BorderStyle } from 'docx';
import * as pdf from 'html-pdf';
import { promisify } from 'util';

const generatePdf = promisify(pdf.create);

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experience: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string[];
  }>;
  education: Array<{
    degree: string;
    school: string;
    location: string;
    graduationDate: string;
    gpa?: string;
  }>;
  skills: string[];
}

function createDocx(resumeData: ResumeData) {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Header with personal info
        new Paragraph({
          text: resumeData.personalInfo.name,
          heading: HeadingLevel.HEADING_1,
          spacing: { after: 200 },
        }),
        new Paragraph({
          children: [
            new TextRun(resumeData.personalInfo.email + " | "),
            new TextRun(resumeData.personalInfo.phone + " | "),
            new TextRun(resumeData.personalInfo.location),
          ],
          spacing: { after: 200 },
        }),

        // Summary
        new Paragraph({
          text: "Professional Summary",
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 200 },
        }),
        new Paragraph({
          text: resumeData.personalInfo.summary,
          spacing: { after: 400 },
        }),

        // Experience
        new Paragraph({
          text: "Professional Experience",
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 200 },
        }),
        ...resumeData.experience.flatMap(exp => [
          new Paragraph({
            text: exp.title + " - " + exp.company,
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: exp.location + " | " + exp.startDate + " - " + exp.endDate,
            spacing: { after: 100 },
          }),
          ...exp.description.map(desc => 
            new Paragraph({
              text: "• " + desc,
              spacing: { after: 100 },
            })
          ),
        ]),

        // Education
        new Paragraph({
          text: "Education",
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 200 },
        }),
        ...resumeData.education.map(edu => 
          new Paragraph({
            text: edu.degree + " - " + edu.school + ", " + edu.location + 
                  (edu.gpa ? " | GPA: " + edu.gpa : ""),
            spacing: { after: 100 },
          })
        ),

        // Skills
        new Paragraph({
          text: "Skills",
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 200 },
        }),
        new Paragraph({
          text: resumeData.skills.join(" • "),
          spacing: { after: 100 },
        }),
      ],
    }],
  });

  return doc;
}

function generateHtml(resumeData: ResumeData) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #2d3748; margin-bottom: 10px; }
        h2 { color: #4a5568; margin-top: 20px; border-bottom: 2px solid #e2e8f0; }
        .contact-info { color: #4a5568; margin-bottom: 20px; }
        .experience-item { margin-bottom: 15px; }
        .company-header { font-weight: bold; }
        .date-location { color: #718096; }
        ul { margin: 10px 0; padding-left: 20px; }
        .skills { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill-item { 
          background: #e2e8f0; 
          padding: 5px 10px; 
          border-radius: 15px; 
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <h1>${resumeData.personalInfo.name}</h1>
      <div class="contact-info">
        ${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}
      </div>

      <h2>Professional Summary</h2>
      <p>${resumeData.personalInfo.summary}</p>

      <h2>Professional Experience</h2>
      ${resumeData.experience.map(exp => `
        <div class="experience-item">
          <div class="company-header">${exp.title} - ${exp.company}</div>
          <div class="date-location">${exp.location} | ${exp.startDate} - ${exp.endDate}</div>
          <ul>
            ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
          </ul>
        </div>
      `).join('')}

      <h2>Education</h2>
      ${resumeData.education.map(edu => `
        <div class="experience-item">
          <div class="company-header">${edu.degree} - ${edu.school}</div>
          <div class="date-location">${edu.location} | ${edu.graduationDate}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</div>
        </div>
      `).join('')}

      <h2>Skills</h2>
      <div class="skills">
        ${resumeData.skills.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
      </div>
    </body>
    </html>
  `;
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

    const { format, resumeData } = await request.json();

    if (format === 'pdf') {
      const html = generateHtml(resumeData);
      const options = {
        format: 'Letter',
        border: {
          top: '20mm',
          right: '20mm',
          bottom: '20mm',
          left: '20mm'
        }
      };

      const buffer = await generatePdf(html, options);
      
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename=resume.pdf'
        }
      });
    } else if (format === 'docx') {
      const doc = createDocx(resumeData);
      const buffer = await doc.save();
      
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'Content-Disposition': 'attachment; filename=resume.docx'
        }
      });
    }

    return NextResponse.json(
      { error: 'Invalid format specified' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Failed to export resume' },
      { status: 500 }
    );
  }
}
