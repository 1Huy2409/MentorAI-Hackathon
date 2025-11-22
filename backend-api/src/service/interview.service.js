import InterviewRecord from '../model/InterviewRecord.js'
import { NotFoundError } from '../handler/error-response.js'

const saveInterview = async (userId, data) => {
  const interview = await InterviewRecord.create({
    userId,
    ...data
  })
  return interview
}

const getHistory = async (userId) => {
  const history = await InterviewRecord.find({ userId }).sort({ createdAt: -1 })
  return history
}

const getInterviewById = async (id, userId) => {
  const interview = await InterviewRecord.findOne({ _id: id, userId })
  if (!interview) {
    throw new NotFoundError('Interview record not found')
  }
  return interview
}

export default {
  saveInterview,
  getHistory,
  getInterviewById
}
