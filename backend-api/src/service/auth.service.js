import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import User from '../model/User.js'
import emailService from './email.service.js'
import { BadRequestError, AuthFailureError, NotFoundError } from '../handler/error-response.js'

const register = async ({ email, password }) => {
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new BadRequestError('Email already registered')
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const verifyToken = crypto.randomBytes(32).toString('hex')
  const verifyTokenExpire = Date.now() + 24 * 60 * 60 * 1000 // 24 hours

  const newUser = await User.create({
    email,
    password: hashedPassword,
    verifyToken,
    verifyTokenExpire
  })

  await emailService.sendVerificationEmail(email, verifyToken)

  return {
    message: 'Registration successful. Please check your email to verify account.'
  }
}

const verifyEmail = async (token) => {
  const user = await User.findOne({
    verifyToken: token,
    verifyTokenExpire: { $gt: Date.now() }
  })

  if (!user) {
    throw new BadRequestError('Invalid or expired verification token')
  }

  user.isVerified = true
  user.verifyToken = undefined
  user.verifyTokenExpire = undefined
  await user.save()

  return {
    message: 'Email verified successfully'
  }
}

const login = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new AuthFailureError('Invalid credentials')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new AuthFailureError('Invalid credentials')
  }

  if (!user.isVerified) {
    throw new AuthFailureError('Account not verified. Please check your email.')
  }

  const accessToken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  return {
    user: {
      _id: user._id,
      email: user.email
    },
    token: accessToken
  }
}

export default {
  register,
  verifyEmail,
  login
}
