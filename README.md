# Professional Resume Builder

A modern, feature-rich resume builder application built with Next.js, React, and MongoDB. Create, customize, and manage professional resumes with complete design freedom.

## Features

- **Full Customization Freedom**
  - Drag-and-drop section reordering
  - Custom themes and layouts
  - Font customization
  - Spacing and margin controls
  - Section management

- **User Management**
  - Secure authentication with email/password and Google OAuth
  - Personal dashboard
  - Multiple resume versions

- **Professional Templates**
  - Pre-designed templates
  - Custom template creation
  - Industry-specific suggestions

- **Export Options**
  - PDF export with pixel-perfect design
  - DOCX export
  - Shareable links

## Tech Stack

- **Frontend**
  - Next.js 14 (App Router)
  - React
  - Tailwind CSS
  - TypeScript
  - React Beautiful DnD

- **Backend**
  - Next.js API Routes
  - MongoDB with Mongoose
  - NextAuth.js for authentication

- **Additional Tools**
  - PDF generation with jsPDF
  - Form handling with React Hook Form
  - Validation with Zod

## Getting Started

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/resume-builder.git
   cd resume-builder
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   - Copy \`.env.example\` to \`.env.local\`
   - Fill in the required environment variables:
     - MongoDB URI
     - NextAuth secret
     - Google OAuth credentials

4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- \`/src/app\` - Next.js app router pages and API routes
- \`/src/components\` - Reusable React components
- \`/src/lib\` - Utility functions and database connection
- \`/src/models\` - Mongoose models
- \`/src/context\` - React context providers
- \`/public\` - Static assets

## Development

1. **Database Models**
   - User model for authentication
   - Resume model for storing resume data
   - Customizable templates and themes

2. **API Routes**
   - Authentication endpoints
   - Resume CRUD operations
   - PDF and DOCX export

3. **Frontend Pages**
   - Landing page
   - Authentication pages
   - Dashboard
   - Resume builder
   - Preview and export

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB team for the powerful database
- All contributors who help improve the project
