import jwt from 'jsonwebtoken'
import { AuthFailureError } from '../handler/error-response.js'
import asyncHandler from './asyncHandler.js'

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AuthFailureError('Authentication required')
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    throw new AuthFailureError('Invalid or expired token')
  }
})

export default authMiddleware