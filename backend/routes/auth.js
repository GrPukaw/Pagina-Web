const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: 'Credenciales inválidas' 
      });
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ 
        success: false,
        message: 'Credenciales inválidas' 
      });
    }
    
    if (user.userType === 'becado' && user.scholarship.status === 'pending') {
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
    console.error('Error en login:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al iniciar sesión' 
    });
  }
});

module.exports = router;