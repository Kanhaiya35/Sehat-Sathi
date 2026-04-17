const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },

  message: { type: String, required: true, trim: true, maxlength: 1000 },

  severity: {
    type: String,
    enum: ['low','medium','high','critical'],
    default: 'medium'
  },

  region: {
    country: { type: String, default: 'India' },
    state: String,
    city: String
  },

  isActive: { type: Boolean, default: true },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 7*24*60*60*1000)
  },

  source: String,
  verified: { type: Boolean, default: false },
  views: { type: Number, default: 0 }

}, {
  timestamps: true,
  strict: true
});

// Indexes
alertSchema.index({ isActive: 1, expiresAt: 1 });
alertSchema.index({ region: 1, isActive: 1 });
alertSchema.index({ severity: 1 });
alertSchema.index({ createdAt: -1 });

// TTL (auto delete expired alerts)
alertSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('OutbreakAlert', alertSchema);