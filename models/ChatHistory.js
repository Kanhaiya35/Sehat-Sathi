const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({
  role: { type: String, enum: ['user','assistant'], required: true },
  content: { type: String, required: true, maxlength: 5000 },
  timestamp: { type: Date, default: Date.now }
});

const chatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  sessionId: { type: String, required: true, index: true },
  provider: { type: String, enum: ['openai','gemini','ollama'], default: 'openai' },
  language: { type: String, enum: ['en','hi','mr','ta','bn'], default: 'en' },
  messages: { type: [msgSchema], default: [] },
  queryCount: { type: Number, default: 0 }
}, { timestamps: true });

chatSchema.index({ createdAt: -1 });
chatSchema.index({ userId: 1, updatedAt: -1 });
chatSchema.index({ userId: 1, sessionId: 1 }, { unique: true });

module.exports = mongoose.model('ChatHistory', chatSchema);