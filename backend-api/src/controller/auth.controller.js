import authService from '../service/auth.service.js'
import { CREATED, OK } from '../handler/success-response.js'

const register = async (req, res) => {
  const result = await authService.register(req.body)
  new CREATED({
    message: 'Registered successfully',
    metadata: result
  }).send(res)
}

const verifyEmail = async (req, res) => {
  const { token } = req.params
  const result = await authService.verifyEmail(token)
  new OK({
    message: 'Email verified successfully',
    metadata: result
  }).send(res)
}

const login = async (req, res) => {
  const result = await authService.login(req.body)
  new OK({
    message: 'Login successfully',
    metadata: result
  }).send(res)
}

export default {
  register,
  verifyEmail,
  login
}
