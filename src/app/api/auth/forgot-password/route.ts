import { NextResponse } from 'next/server'
import crypto from 'crypto'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import PasswordReset from '@/models/PasswordReset'
import { sendEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    await dbConnect()

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { error: 'No account found with this email' },
        { status: 404 }
      )
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString('hex')
    const expires = new Date()
    expires.setHours(expires.getHours() + 1) // Token expires in 1 hour

    // Save reset token
    await PasswordReset.create({
      email,
      token,
      expires,
    })

    // Send reset email
    const resetUrl = \`\${process.env.NEXTAUTH_URL}/auth/reset-password?token=\${token}\`
    await sendEmail({
      to: email,
      subject: 'Reset your password',
      html: \`
        <p>You requested a password reset.</p>
        <p>Click <a href="\${resetUrl}">here</a> to reset your password.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
      \`,
    })

    return NextResponse.json({ message: 'Password reset email sent' })
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: 'Error processing request' },
      { status: 500 }
    )
  }
}
