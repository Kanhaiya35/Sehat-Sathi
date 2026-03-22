const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  title:    { type: String, required: true, trim: true, maxlength: 200 },
  message:  { type: String, required: true, trim: true, maxlength: 1000 },
  severity: { type: String, enum: ['low','medium','high','critical'], default: 'medium' },
  region:   { type: String, required: true, trim: true },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  expiresAt: { type: Date, default: () => new Date(Date.now() + 7*24*60*60*1000) },
}, { timestamps: true });

alertSchema.index({ isActive: 1, expiresAt: 1 });

module.exports = mongoose.model('OutbreakAlert', alertSchema);