const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'El nombre completo es requerido'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: 6
  },
  userType: {
    type: String,
    enum: ['becado', 'comprador', 'admin'],
    required: true
  },
  scholarship: {
    university: String,
    studentId: String,
    career: String,
    semester: Number,
    motivation: String,
    documentUrl: String,
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    approvedAt: Date
  },
  phone: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

module.exports = mongoose.model('User', userSchema);
