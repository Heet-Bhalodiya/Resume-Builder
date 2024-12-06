import bcrypt from 'bcryptjs'
import dbConnect from '../src/lib/mongodb'
import User from '../src/models/User'

async function createAdmin() {
  try {
    await dbConnect()

    const adminEmail = 'admin@resumebuilder.com'
    const adminPassword = 'Admin@123'

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail })
    if (existingAdmin) {
      console.log('Admin account already exists')
      process.exit(0)
    }

    // Create admin account
    const hashedPassword = await bcrypt.hash(adminPassword, 10)
    await User.create({
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
    })

    console.log('Admin account created successfully')
    console.log('Email:', adminEmail)
    console.log('Password:', adminPassword)
    process.exit(0)
  } catch (error) {
    console.error('Error creating admin account:', error)
    process.exit(1)
  }
}

createAdmin()
