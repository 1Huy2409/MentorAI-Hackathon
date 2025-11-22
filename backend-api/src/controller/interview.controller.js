import interviewService from '../service/interview.service.js'
import { CREATED, OK } from '../handler/success-response.js'

const saveInterview = async (req, res) => {
  const result = await interviewService.saveInterview(req.user.userId, req.body)
  new CREATED({
    message: 'Interview saved successfully',
    metadata: result
  }).send(res)
}

const getHistory = async (req, res) => {
  const result = await interviewService.getHistory(req.user.userId)
  new OK({
    message: 'Get history successfully',
    metadata: result
  }).send(res)
}

const getInterviewById = async (req, res) => {
  const { id } = req.params
  const result = await interviewService.getInterviewById(id, req.user.userId)
  new OK({
    message: 'Get interview detail successfully',
    metadata: result
  }).send(res)
}

export default {
  saveInterview,
  getHistory,
  getInterviewById
}
