const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const helmet = require('helmet'); // INSTALAR: npm install helmet
const mongoSanitize = require('express-mongo-sanitize'); // INSTALAR: npm install express-mongo-sanitize
const rateLimit = require('express-rate-limit'); // INSTALAR: npm install express-rate-limit

require('dotenv').config();

const app = express();
const passport = require('./config/passport');

// ============== SEGURIDAD ====================

// 1. Helmet - Protección de headers HTTP
app.use(helmet({
  contentSecurityPolicy: false, // Ajustar según necesites
  crossOriginEmbedderPolicy: false
}));

// 2. CORS configurado correctamente
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000'];

app.use(cors({
  origin: function(origin, callback) {
    // Permitir requests sin origin (como mobile apps o curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'La política CORS no permite acceso desde este origen.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Rate Limiting - Prevenir ataques de fuerza bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 requests por IP
  message: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos de login por IP
  message: 'Demasiados intentos de login, intenta de nuevo en 15 minutos.',
  skipSuccessfulRequests: true
});

// Aplicar limitadores
app.use('/api/', limiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// 4. Sanitización contra NoSQL injection
app.use(mongoSanitize());

// 5. Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============== CONEXIÓN A BASE DE DATOS ====================
connectDB();

// ============== RUTAS ====================
const authRoutes = require('./routes/auth');
const becadosRoutes = require('./routes/becados');
const adminRoutes = require('./routes/admin');
const cursosRoutes = require('./routes/cursos');

app.use('/api/auth', authRoutes);
app.use('/api/becados', becadosRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/cursos', cursosRoutes);

// ============== RUTA DE SALUD ====================
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    environment: process.env.NODE_ENV,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// ============== RUTA RAÍZ ====================
app.get('/', (req, res) => {
  res.json({ 
    message: 'API PuenteX',
    version: '1.0.0',
    status: 'online',
    environment: process.env.NODE_ENV
  });
});

// ============== MANEJO DE ERRORES ====================
// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Ruta no encontrada' 
  });
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // No exponer detalles del error en producción
  const message = process.env.NODE_ENV === 'production' 
    ? 'Error interno del servidor'
    : err.message;

  res.status(err.status || 500).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ============== INICIO DEL SERVIDOR ====================
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║   🚀 SERVIDOR INICIADO EXITOSAMENTE       ║');
  console.log('╠════════════════════════════════════════════╣');
  console.log(`║   📍 Puerto: ${PORT}                           ║`);
  console.log(`║   🌍 Entorno: ${process.env.NODE_ENV || 'development'}             ║`);
  console.log('╚════════════════════════════════════════════╝\n');
});

// Manejo de shutdown graceful
process.on('SIGTERM', () => {
  console.log('SIGTERM recibido. Cerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado');
    mongoose.connection.close(false, () => {
      console.log('Conexión MongoDB cerrada');
      process.exit(0);
    });
  });
});

module.exports = app;