import express from 'express'
import authController from '../controller/auth.controller.js'
import asyncHandler from '../middleware/asyncHandler.js'

const router = express.Router()

router.post('/register', asyncHandler(authController.register))
router.get('/verify/:token', asyncHandler(authController.verifyEmail))
router.post('/login', asyncHandler(authController.login))

export default router
