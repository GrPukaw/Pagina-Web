const mongoose = require('mongoose');

const seccionSchema = new mongoose.Schema({
  numero: {
    type: Number,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  temario: [String],
  duracion: String
});

const cursoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: '/images/cursos/default.jpg'
  },
  level: {
    type: String,
    enum: ['Principiante', 'Intermedio', 'Avanzado'],
    default: 'Principiante'
  },
  duration: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  instructor: {
    name: String,
    bio: String,
    avatar: String
  },
  secciones: [seccionSchema], // ⭐ NUEVO: Array de secciones/lecciones
  requirements: [String],
  whatYouWillLearn: [String],
  category: {
    type: String,
    enum: ['programacion', 'diseno', 'negocios', 'idiomas', 'otros'],
    default: 'programacion'
  },
  students: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 4.8
  },
  reviews: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Índice para búsquedas
cursoSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Curso', cursoSchema);