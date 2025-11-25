const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verificar que el usuario esté autenticado
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Acceso denegado. No hay token.' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Usuario no encontrado' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false,
      message: 'Token inválido' 
    });
  }
};

// Verificar que el usuario sea admin
const adminMiddleware = (req, res, next) => {
  if (req.user.userType !== 'admin') {
    return res.status(403).json({ 
      success: false,
      message: 'Acceso denegado. Solo administradores.' 
    });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };