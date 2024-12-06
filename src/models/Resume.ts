import mongoose from 'mongoose'

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  personal: {
    name: String,
    email: String,
    phone: String,
    location: String,
    website: String,
    summary: String,
  },
  experience: [{
    company: String,
    position: String,
    location: String,
    startDate: Date,
    endDate: Date,
    current: Boolean,
    description: String,
    achievements: [String],
  }],
  education: [{
    school: String,
    degree: String,
    field: String,
    location: String,
    startDate: Date,
    endDate: Date,
    gpa: String,
    achievements: [String],
  }],
  skills: [{
    category: String,
    items: [String],
  }],
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    link: String,
    startDate: Date,
    endDate: Date,
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: Date,
    link: String,
  }],
  layout: {
    template: String,
    theme: {
      primary: String,
      secondary: String,
      text: String,
      background: String,
    },
    font: {
      family: String,
      size: String,
      lineHeight: String,
    },
    spacing: {
      sections: Number,
      items: Number,
    },
    order: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema)
