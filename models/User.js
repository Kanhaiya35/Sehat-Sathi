const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email']
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      'Password must include uppercase, lowercase, number, and special character'
    ]
  },

  phone: {
    type: String,
    match: [/^[6-9]\d{9}$/, 'Invalid phone']
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },

  preferredLanguage: {
    type: String,
    enum: ['en','hi','mr','ta','bn'],
    default: 'en'
  },

  isActive: { type: Boolean, default: true },

  lastLogin: Date,
  loginCount: { type: Number, default: 0 },

  failedLoginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date },

  passwordChangedAt: Date

}, {
  timestamps: true,
  strict: true
});

// Hash password
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordChangedAt = Date.now();

    next();
  } catch (err) {
    next(err);
  }
});

// Compare password
userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

// Remove password from output
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);