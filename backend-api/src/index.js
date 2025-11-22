import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { AccessToken } from 'livekit-server-sdk'
import axios from 'axios'

import authRoutes from './route/auth.js'
import interviewRoutes from './route/interview.js'
import { ErrorResponse } from './handler/error-response.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err))

// Routes
app.use('/auth', authRoutes)
app.use('/interview', interviewRoutes)

// LiveKit Token Endpoint (Migrated from root index.js)
app.post('/getToken', async (req, res) => {
  const { roomName, participantName } = req.body
  const API_KEY = process.env.LIVEKIT_API_KEY
  const API_SECRET = process.env.LIVEKIT_API_SECRET

  if (!roomName || !participantName) {
    return res.status(400).json({ error: 'roomName and participantName are required' })
  }

  try {
    const at = new AccessToken(API_KEY, API_SECRET, {
      identity: participantName,
    })

    at.addGrant({ roomJoin: true, room: roomName })

    const token = await at.toJwt()
    res.json({ token })
  } catch (error) {
    console.error('Error generating token:', error)
    res.status(500).json({ error: 'Failed to generate token' })
  }
})

// Webhook Endpoint (Migrated from root index.js)
app.post('/webhook', async (req, res) => {
  try {
    const n8nWebhookURL = process.env.N8N_WEBHOOK_URL
    if (!n8nWebhookURL) {
      return res.status(500).json({ error: "Missing N8N_WEBHOOK_URL env variable" })
    }
    await axios.post(n8nWebhookURL, req.body)
    res.status(200).send("OK")
  } catch (err) {
    console.error("Failed to forward to N8N:", err)
    res.status(500).json({ error: "Forward failed" })
  }
})

// Error Handling Middleware
app.use((err, req, res, next) => {
  if (err instanceof ErrorResponse) {
    return res.status(err.status).json({
      status: 'error',
      code: err.status,
      message: err.message
    })
  }

  console.error(err)
  res.status(500).json({
    status: 'error',
    code: 500,
    message: 'Internal Server Error'
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
