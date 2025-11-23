const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔄 Conectando a MongoDB Atlas...');
    
    if (!process.env.MONGODB_URI) {
      throw new Error('❌ MONGODB_URI no está definido en .env');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('✅ MongoDB Atlas conectado exitosamente!');
    console.log(`📦 Base de datos: ${conn.connection.name}`);
    console.log(`🌐 Cluster: ${conn.connection.host}`);
    
  } catch (error) {
    console.error('❌ Error de conexión a MongoDB:', error.message);
    process.exit(1);
  }
};

mongoose.connection.on('connected', () => {
  console.log('📡 Mongoose conectado a MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Error de Mongoose:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose desconectado');
});

module.exports = connectDB;