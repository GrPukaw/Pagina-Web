const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');

require('dotenv').config();

const { validateEnv } = require('./config/validateEnv');
validateEnv(); 

const connectDB = require('./config/database');
const logger = require('./config/logger'); 
const passport = require('./config/passport');

const app = express();

// Log de todas las peticiones HTTP
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.http(`${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
  });
  
  next();
});

// ============== SEGURIDAD ====================

// Helmet: Protege headers HTTP
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false
}));

// CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000'];

logger.info(`CORS configurado para: ${allowedOrigins.join(', ')}`);

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      logger.warn(`Petición CORS bloqueada desde: ${origin}`);
      return callback(new Error('CORS no permitido'), false);
    }
    
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Demasiadas solicitudes. Intenta de nuevo en 15 minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Rate limit alcanzado para IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Demasiadas solicitudes. Intenta de nuevo en 15 minutos.'
    });
  }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Demasiados intentos de login. Intenta en 15 minutos.',
  },
  skipSuccessfulRequests: true,
  handler: (req, res) => {
    logger.warn(`Login rate limit para IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Demasiados intentos de login. Intenta en 15 minutos.'
    });
  }
});

app.use('/api/', limiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Sanitización
app.use(mongoSanitize());

// Body parser (sin verify que causa problemas)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============== BASE DE DATOS ====================

connectDB().catch(err => {
  logger.error('Error fatal al conectar a MongoDB:', err);
  process.exit(1);
});

// ============== RUTAS ====================
// ⚠️ ESTO ES LO QUE FALTABA - IMPORTAR authRoutes
const authRoutes = require('./routes/auth');
const becadosRoutes = require('./routes/becados');
const adminRoutes = require('./routes/admin');
const cursosRoutes = require('./routes/cursos');

app.use('/api/auth', authRoutes);
app.use('/api/becados', becadosRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/cursos', cursosRoutes);

// Health check
app.get('/health', async (req, res) => {
  const mongoose = require('mongoose');
  
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    database: {
      connected: mongoose.connection.readyState === 1,
      name: mongoose.connection.name
    },
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      unit: 'MB'
    }
  };

  if (!health.database.connected) {
    health.status = 'unhealthy';
    logger.error('Health check falló: Base de datos desconectada');
    return res.status(503).json(health);
  }

  res.json(health);
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ 
    message: 'API PuenteX',
    version: '2.0.0',
    status: 'online',
    environment: process.env.NODE_ENV,
    documentation: '/api/docs'
  });
});

// Manejar 404
app.use((req, res) => {
  logger.warn(`Ruta no encontrada: ${req.method} ${req.url}`);
  res.status(404).json({ 
    success: false,
    message: 'Ruta no encontrada',
    path: req.url
  });
});

// Manejador global de errores
app.use((err, req, res, next) => {
  logger.error('Error en la aplicación:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip
  });

  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(err.status || 500).json({
    success: false,
    message: isDevelopment ? err.message : 'Error interno del servidor',
    ...(isDevelopment && { 
      stack: err.stack,
      details: err 
    })
  });
});

// Servidor
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info('╔════════════════════════════════════════════╗');
  logger.info('║   🚀 SERVIDOR INICIADO EXITOSAMENTE       ║');
  logger.info('╠════════════════════════════════════════════╣');
  logger.info(`║   📍 Puerto: ${PORT}                           ║`);
  logger.info(`║   🌍 Entorno: ${process.env.NODE_ENV || 'development'}             ║`);
  logger.info(`║   🔒 CORS: ${allowedOrigins.length} origen(es)        ║`);
  logger.info('╚════════════════════════════════════════════╝');
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  logger.info(`\n${signal} recibido. Iniciando shutdown graceful...`);
  
  server.close(() => {
    logger.info('✅ Servidor HTTP cerrado');
    
    const mongoose = require('mongoose');
    mongoose.connection.close(false, () => {
      logger.info('✅ Conexión MongoDB cerrada');
      logger.info('👋 Proceso terminado correctamente');
      process.exit(0);
    });
  });

  setTimeout(() => {
    logger.error('⚠️  Shutdown forzado después de 30s');
    process.exit(1);
  }, 30000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Promesa rechazada no manejada:', {
    reason,
    promise
  });
});

process.on('uncaughtException', (error) => {
  logger.error('Excepción no capturada:', error);
  gracefulShutdown('uncaughtException');
});

module.exports = app;