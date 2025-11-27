const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { sendBecaAprobadaEmail } = require('../services/emailService');

// Aplicar middlewares a todas las rutas de admin
router.use(authMiddleware);
router.use(adminMiddleware);

// Obtener todos los becados pendientes
router.get('/becas/pendientes', async (req, res) => {
  try {
    const pendientes = await User.find({
      userType: 'becado',
      'scholarship.status': 'pending'
    })
    .select('-password')
    .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: pendientes.length,
      becados: pendientes
    });
  } catch (error) {
    console.error('Error al obtener becados pendientes:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al obtener becados pendientes' 
    });
  }
});

// Obtener todos los becados (todos los estados)
router.get('/becas/todos', async (req, res) => {
  try {
    const becados = await User.find({ userType: 'becado' })
    .select('-password')
    .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: becados.length,
      becados: becados
    });
  } catch (error) {
    console.error('Error al obtener becados:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al obtener becados' 
    });
  }
});

// Aprobar una beca
router.put('/becas/:userId/aprobar', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findByIdAndUpdate(
      userId,
      {
        'scholarship.status': 'approved',
        'scholarship.approvedBy': req.user._id,
        'scholarship.approvedAt': new Date()
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'Usuario no encontrado' 
      });
    }

    // Enviar email de aprobación
    try {
      await sendBecaAprobadaEmail(user.email, user.fullName);
      console.log('✅ Email de aprobación enviado a:', user.email);
    } catch (emailError) {
      console.error('❌ Error al enviar email de aprobación:', emailError);
      // No bloqueamos la aprobación si falla el email
    }

    res.json({
      success: true,
      message: 'Beca aprobada exitosamente',
      user: user
    });
  } catch (error) {
    console.error('Error al aprobar beca:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al aprobar beca' 
    });
  }
});

// Rechazar una beca
router.put('/becas/:userId/rechazar', async (req, res) => {
  try {
    const { userId } = req.params;
    const { motivo } = req.body;
    
    const user = await User.findByIdAndUpdate(
      userId,
      {
        'scholarship.status': 'rejected',
        'scholarship.rejectedBy': req.user._id,
        'scholarship.rejectedAt': new Date(),
        'scholarship.rejectionReason': motivo || 'No especificado'
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'Usuario no encontrado' 
      });
    }

    res.json({
      success: true,
      message: 'Beca rechazada',
      user: user
    });
  } catch (error) {
    console.error('Error al rechazar beca:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al rechazar beca' 
    });
  }
});

// Obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await User.find()
    .select('-password')
    .sort({ createdAt: -1 });

    const stats = {
      total: usuarios.length,
      becados: usuarios.filter(u => u.userType === 'becado').length,
      compradores: usuarios.filter(u => u.userType === 'comprador').length,
      admins: usuarios.filter(u => u.userType === 'admin').length
    };

    res.json({
      success: true,
      stats,
      usuarios: usuarios
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al obtener usuarios' 
    });
  }
});

// Estadísticas del dashboard
router.get('/estadisticas', async (req, res) => {
  try {
    const totalUsuarios = await User.countDocuments();
    const totalBecados = await User.countDocuments({ userType: 'becado' });
    const becadosPendientes = await User.countDocuments({ 
      userType: 'becado',
      'scholarship.status': 'pending' 
    });
    const becadosAprobados = await User.countDocuments({ 
      userType: 'becado',
      'scholarship.status': 'approved' 
    });
    const becadosRechazados = await User.countDocuments({ 
      userType: 'becado',
      'scholarship.status': 'rejected' 
    });
    const compradores = await User.countDocuments({ userType: 'comprador' });

    res.json({
      success: true,
      estadisticas: {
        totalUsuarios,
        totalBecados,
        becadosPendientes,
        becadosAprobados,
        becadosRechazados,
        compradores,
        tasaAprobacion: totalBecados > 0 
          ? Math.round((becadosAprobados / totalBecados) * 100) 
          : 0
      }
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al obtener estadísticas' 
    });
  }
});

module.exports = router;