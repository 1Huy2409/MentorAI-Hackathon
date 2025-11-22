import mongoose from 'mongoose'

const interviewRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mode: {
    type: String,
    enum: ['ANALYSIS', 'QUICK'],
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  strengths: {
    type: [String],
    default: []
  },
  weaknesses: {
    type: [String],
    default: []
  },
  transcript: [{
    from: {
      type: String,
      enum: ['ai', 'user'],
      required: true
    },
    message: {
      type: String,
      required: true
    },
    time: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('InterviewRecord', interviewRecordSchema)
