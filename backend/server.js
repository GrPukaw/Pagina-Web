const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
require('dotenv').config();
const app = express();
const passport = require('./config/passport');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// Rutas de autenticación
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Rutas de becados
const becadosRoutes = require('./routes/becados');
app.use('/api/becados', becadosRoutes);

// Rutas de administración
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

// Rutas de cursos
const cursosRoutes = require('./routes/cursos');
app.use('/api/cursos', cursosRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: '🎓 API Plataforma Educativa',
    status: 'online',
    version: '1.0.0',
    database: mongoose.connection.readyState === 1 ? '✅ Conectado' : '❌ Desconectado',
    endpoints: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      health: 'GET /api/health',
      becadosAprobados: 'GET /api/becados/aprobados',
      estadisticas: 'GET /api/becados/estadisticas'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║   🚀 SERVIDOR INICIADO EXITOSAMENTE       ║');
  console.log('╠════════════════════════════════════════════╣');
  console.log(`║   📍 URL: http://localhost:${PORT}            ║`);
  console.log(`║   🌍 Entorno: ${process.env.NODE_ENV || 'development'}                ║`);
  console.log('╚════════════════════════════════════════════╝\n');
});