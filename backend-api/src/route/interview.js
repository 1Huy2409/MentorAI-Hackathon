import express from 'express'
import interviewController from '../controller/interview.controller.js'
import authMiddleware from '../middleware/authMiddleware.js'
import asyncHandler from '../middleware/asyncHandler.js'

const router = express.Router()

router.use(authMiddleware)

router.post('/save', asyncHandler(interviewController.saveInterview))
router.get('/my-history', asyncHandler(interviewController.getHistory))
router.get('/:id', asyncHandler(interviewController.getInterviewById))

export default router
