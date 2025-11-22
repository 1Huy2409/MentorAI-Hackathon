require('dotenv').config();
const axios = require("axios");

const express = require('express');
const { AccessToken } = require('livekit-server-sdk');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Environment variables
const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL;

if (!API_KEY || !API_SECRET || !LIVEKIT_URL) {
  console.error("Missing LiveKit environment variables!");
}

// Root endpoint
app.get('/', (req, res) => {
  res.send('MentorAI Backend is running');
});

// Generate Token Endpoint
app.post('/getToken', async (req, res) => {
  const { roomName, participantName } = req.body;

  if (!roomName || !participantName) {
    return res.status(400).json({ error: 'roomName and participantName are required' });
  }

  try {
    const at = new AccessToken(API_KEY, API_SECRET, {
      identity: participantName,
    });

    at.addGrant({ roomJoin: true, room: roomName });

    const token = await at.toJwt();
    console.log(`Token generated for ${participantName} in room ${roomName}`);
    res.json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

// Webhook Endpoint (Placeholder for N8n integration)
app.post('/webhook', async (req, res) => {
  console.log('Webhook received from Agent:', req.body);

  try {
    const n8nWebhookURL = process.env.N8N_WEBHOOK_URL;

    if (!n8nWebhookURL) {
      return res.status(500).json({ error: "Missing N8N_WEBHOOK_URL env variable" });
    }

    // Forward to N8N
    await axios.post(n8nWebhookURL, req.body);

    console.log("Forwarded to N8N successfully");
    res.status(200).send("OK");
  } catch (err) {
    console.error("Failed to forward to N8N:", err);
    res.status(500).json({ error: "Forward failed" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
