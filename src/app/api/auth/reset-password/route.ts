import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import PasswordReset from '@/models/PasswordReset'

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json()

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      )
    }

    await dbConnect()

    // Find valid reset token
    const resetRequest = await PasswordReset.findOne({
      token,
      used: false,
      expires: { $gt: new Date() },
    })

    if (!resetRequest) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      )
    }

    // Update password
    const hashedPassword = await bcrypt.hash(password, 10)
    await User.findOneAndUpdate(
      { email: resetRequest.email },
      { password: hashedPassword }
    )

    // Mark token as used
    await PasswordReset.findByIdAndUpdate(resetRequest._id, { used: true })

    return NextResponse.json({ message: 'Password reset successful' })
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: 'Error processing request' },
      { status: 500 }
    )
  }
}
