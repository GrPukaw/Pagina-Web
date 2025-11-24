const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Obtener becados aprobados (públicos)
router.get('/aprobados', async (req, res) => {
  try {
    const becados = await User.find({
      userType: 'becado',
      'scholarship.status': 'approved'
    })
    .select('fullName scholarship.university scholarship.career scholarship.motivation createdAt')
    .sort({ 'scholarship.approvedAt': -1 })
    .limit(20);

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

// Obtener estadísticas de becados
router.get('/estadisticas', async (req, res) => {
  try {
    const total = await User.countDocuments({ userType: 'becado' });
    const aprobados = await User.countDocuments({ 
      userType: 'becado',
      'scholarship.status': 'approved' 
    });
    const pendientes = await User.countDocuments({ 
      userType: 'becado',
      'scholarship.status': 'pending' 
    });

    res.json({
      success: true,
      estadisticas: {
        total,
        aprobados,
        pendientes,
        tasaAprobacion: total > 0 ? Math.round((aprobados / total) * 100) : 0
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