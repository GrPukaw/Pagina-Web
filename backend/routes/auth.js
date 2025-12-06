const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');
const passport = require('../config/passport');
const { sendPasswordResetEmail, sendWelcomeEmail } = require('../services/emailService');

router.post('/register', async (req, res) => {
  try {
    const { 
      fullName, email, password, userType, 
      university, studentId, career, semester, motivation,
      phone 
    } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'El email ya está registrado' 
      });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const userData = {
      fullName,
      email,
      password: hashedPassword,
      userType
    };
    
    if (userType === 'becado') {
      userData.scholarship = {
        university,
        studentId,
        career,
        semester: parseInt(semester),
        motivation,
        status: 'pending'
      };
    }
    
    if (userType === 'comprador') {
      userData.phone = phone;
    }
    
    const user = new User(userData);
    await user.save();

    try {
      await sendWelcomeEmail(user.email, user.fullName);
    } catch (emailError) {
      console.error('Error al enviar email de bienvenida:', emailError);
    }
            
    res.status(201).json({ 
      success: true,
      message: userType === 'becado' 
        ? 'Solicitud de beca enviada exitosamente. Te contactaremos pronto.' 
        : 'Cuenta creada exitosamente',
      userId: user._id
    });
    
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al registrar usuario',
      error: error.message 
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('[LOGIN] Intento de login para:', email);
    
    const user = await User.findOne({ email });
    if (!user) {
      console.log('[LOGIN] Usuario NO encontrado:', email);
      return res.status(400).json({ 
        success: false,
        message: 'Credenciales inválidas' 
      });
    }
    
    console.log('[LOGIN] Usuario encontrado:', user.fullName, '-', user.userType);
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log('[LOGIN] Contraseña incorrecta');
      return res.status(400).json({ 
        success: false,
        message: 'Credenciales inválidas' 
      });
    }
    
    console.log('[LOGIN] Contraseña válida');
    
    if (user.userType === 'becado' && user.scholarship && user.scholarship.status === 'pending') {
      console.log('[LOGIN] Becado con solicitud pendiente');
      return res.status(403).json({ 
        success: false,
        message: 'Tu solicitud de beca está en revisión. Te notificaremos pronto.' 
      });
    }
    
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        userType: user.userType 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    console.log('[LOGIN] Login exitoso, token generado');
    
    res.json({ 
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        userType: user.userType
      }
    });
    
  } catch (error) {
    console.error('[LOGIN] Error en login:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al iniciar sesión',
      error: error.message
    });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ 
        success: true,
        message: 'Si el email existe, recibirás un enlace de recuperación.' 
      });
    }
    
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpires = Date.now() + 3600000;
    
    await user.save();
    
    const emailResult = await sendPasswordResetEmail(email, resetToken);
    
    if (emailResult.success) {
      res.json({ 
        success: true,
        message: 'Enlace de recuperación enviado a tu email.' 
      });
    } else {
      res.status(500).json({ 
        success: false,
        message: 'Error al enviar el email. Intenta de nuevo.' 
      });
    }
    
  } catch (error) {
    console.error('Error en forgot-password:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al procesar la solicitud' 
    });
  }
});

router.get('/reset-password/:token', async (req, res) => {
  try {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: 'Token inválido o expirado' 
      });
    }
    
    res.json({ 
      success: true,
      message: 'Token válido',
      email: user.email
    });
    
  } catch (error) {
    console.error('Error al verificar token:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al verificar el token' 
    });
  }
});

router.post('/reset-password/:token', async (req, res) => {
  try {
    const { password } = req.body;
    
    if (!password || password.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: 'La contraseña debe tener al menos 6 caracteres' 
      });
    }
    
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: 'Token inválido o expirado' 
      });
    }
    
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    
    res.json({ 
      success: true,
      message: 'Contraseña actualizada exitosamente' 
    });
    
  } catch (error) {
    console.error('Error al restablecer contraseña:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al restablecer la contraseña' 
    });
  }
});

router.post('/change-password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'No autorizado' 
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'Usuario no encontrado' 
      });
    }
    
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ 
        success: false,
        message: 'Contraseña actual incorrecta' 
      });
    }
    
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    
    res.json({ 
      success: true,
      message: 'Contraseña actualizada exitosamente' 
    });
    
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al cambiar la contraseña' 
    });
  }
});

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login?error=google` }),
  (req, res) => {
    const token = jwt.sign(
      { 
        userId: req.user._id, 
        email: req.user.email,
        userType: req.user.userType 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}&user=${encodeURIComponent(JSON.stringify({
      id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      userType: req.user.userType
    }))}`);
  }
);

router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login?error=github` }),
  (req, res) => {
    const token = jwt.sign(
      { 
        userId: req.user._id, 
        email: req.user.email,
        userType: req.user.userType 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}&user=${encodeURIComponent(JSON.stringify({
      id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      userType: req.user.userType
    }))}`);
  }
);

module.exports = router;