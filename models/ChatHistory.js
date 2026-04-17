const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({
  role: { type: String, enum: ['user','assistant'], required: true },
  content: { type: String, required: true, maxlength: 5000, trim: true },
  timestamp: { type: Date, default: Date.now },
  tokens: Number,
  latency: Number
});

const chatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },

  sessionId: { type: String, required: true, index: true },

  provider: { type: String, enum: ['openai','gemini','ollama'], default: 'openai' },

  language: { type: String, enum: ['en','hi','mr','ta','bn'], default: 'en' },

  messages: {
    type: [msgSchema],
    default: [],
    validate: [arr => arr.length <= 100, 'Message limit exceeded']
  },

  queryCount: { type: Number, default: 0 }

}, {
  timestamps: true,
  strict: true
});

// Indexes
chatSchema.index({ createdAt: -1 });
chatSchema.index({ userId: 1, updatedAt: -1 });
chatSchema.index({ userId: 1, createdAt: -1 });
chatSchema.index({ userId: 1, sessionId: 1 }, { unique: true });

// Optional features
chatSchema.index({ 'messages.content': 'text' }); // search
// chatSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 }); // TTL

module.exports = mongoose.model('ChatHistory', chatSchema);