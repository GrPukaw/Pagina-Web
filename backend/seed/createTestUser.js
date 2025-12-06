const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const createTestUsers = async () => {
  try {
    console.log('Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB\n');

    // USUARIO ADMIN
    const adminEmail = 'admin@puentex.com';
    let admin = await User.findOne({ email: adminEmail });
    
    if (admin) {
      console.log('Admin ya existe, actualizando contraseña...');
      admin.password = await bcrypt.hash('admin123', 10);
      await admin.save();
      console.log('Contraseña de admin actualizada');
    } else {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      admin = new User({
        fullName: 'Administrador PuenteX',
        email: adminEmail,
        password: hashedPassword,
        userType: 'admin'
      });
      await admin.save();
      console.log('Usuario ADMIN creado');
    }

    console.log('\nCredenciales de prueba:');
    console.log('Email: admin@puentex.com');
    console.log('Password: admin123\n');

    // USUARIO COMPRADOR
    const compradorEmail = 'comprador@test.com';
    let comprador = await User.findOne({ email: compradorEmail });
    
    if (comprador) {
      console.log('Comprador ya existe, actualizando contraseña...');
      comprador.password = await bcrypt.hash('comprador123', 10);
      await comprador.save();
      console.log('Contraseña de comprador actualizada');
    } else {
      const hashedPassword = await bcrypt.hash('comprador123', 10);
      comprador = new User({
        fullName: 'Juan Perez Comprador',
        email: compradorEmail,
        password: hashedPassword,
        userType: 'comprador',
        phone: '+51 999 888 777'
      });
      await comprador.save();
      console.log('Usuario COMPRADOR creado');
    }

    console.log('\nCredenciales de prueba:');
    console.log('Email: comprador@test.com');
    console.log('Password: comprador123\n');

    // USUARIO BECADO APROBADO
    const becadoEmail = 'becado@test.com';
    let becado = await User.findOne({ email: becadoEmail });
    
    if (becado) {
      console.log('Becado ya existe, actualizando contraseña y estado...');
      becado.password = await bcrypt.hash('becado123', 10);
      becado.scholarship.status = 'approved';
      await becado.save();
      console.log('Contraseña y estado de becado actualizados');
    } else {
      const hashedPassword = await bcrypt.hash('becado123', 10);
      becado = new User({
        fullName: 'Maria Garcia Becada',
        email: becadoEmail,
        password: hashedPassword,
        userType: 'becado',
        scholarship: {
          university: 'Universidad Nacional',
          studentId: '2021001234',
          career: 'Ingenieria de Sistemas',
          semester: 5,
          motivation: 'Usuario de prueba',
          status: 'approved',
          approvedAt: new Date()
        }
      });
      await becado.save();
      console.log('Usuario BECADO creado');
    }

    console.log('\nCredenciales de prueba:');
    console.log('Email: becado@test.com');
    console.log('Password: becado123\n');

    // MOSTRAR TODOS LOS USUARIOS
    console.log('Usuarios en la base de datos:\n');
    const allUsers = await User.find().select('fullName email userType scholarship.status');
    
    allUsers.forEach((user, index) => {
      const status = user.userType === 'becado' 
        ? ` - ${user.scholarship?.status || 'pending'}`
        : '';
      console.log(`${index + 1}. ${user.fullName}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Tipo: ${user.userType}${status}\n`);
    });

    console.log('Script completado exitosamente!\n');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createTestUsers();