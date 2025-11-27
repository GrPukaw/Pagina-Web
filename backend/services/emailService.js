const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Plataforma Educativa" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    
    console.log('✅ Email enviado:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error al enviar email:', error);
    return { success: false, error: error.message };
  }
};

const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4F46E5;">🔐 Recuperación de Contraseña</h2>
      <p>Hola,</p>
      <p>Recibimos una solicitud para restablecer tu contraseña en Plataforma Educativa.</p>
      <p>Haz clic en el siguiente botón para crear una nueva contraseña:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" 
           style="background-color: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Restablecer Contraseña
        </a>
      </div>
      <p style="color: #666; font-size: 14px;">
        O copia y pega este enlace en tu navegador:<br>
        <a href="${resetUrl}">${resetUrl}</a>
      </p>
      <p style="color: #666; font-size: 14px;">
        ⏰ Este enlace expirará en 1 hora.
      </p>
      <p style="color: #666; font-size: 14px;">
        Si no solicitaste restablecer tu contraseña, ignora este mensaje.
      </p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
      <p style="color: #999; font-size: 12px;">
        © ${new Date().getFullYear()} Plataforma Educativa. Todos los derechos reservados.
      </p>
    </div>
  `;
  
  return sendEmail(email, 'Recuperación de Contraseña', html);
};

const sendWelcomeEmail = async (email, fullName) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4F46E5;">🎉 ¡Bienvenido a Plataforma Educativa!</h2>
      <p>Hola ${fullName},</p>
      <p>Gracias por registrarte en nuestra plataforma educativa.</p>
      <p>Estamos emocionados de tenerte como parte de nuestra comunidad de aprendizaje.</p>
      <div style="background-color: #F3F4F6; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3 style="margin-top: 0;">🚀 Próximos Pasos:</h3>
        <ul>
          <li>Explora nuestro catálogo de cursos</li>
          <li>Completa tu perfil</li>
          <li>Comienza a aprender</li>
        </ul>
      </div>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.FRONTEND_URL}/cursos" 
           style="background-color: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Ver Cursos
        </a>
      </div>
      <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
      <p>¡Feliz aprendizaje!</p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
      <p style="color: #999; font-size: 12px;">
        © ${new Date().getFullYear()} Plataforma Educativa. Todos los derechos reservados.
      </p>
    </div>
  `;
  
  return sendEmail(email, '¡Bienvenido a Plataforma Educativa!', html);
};

const sendBecaAprobadaEmail = async (email, fullName) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #10B981;">✅ ¡Tu Beca ha sido Aprobada!</h2>
      <p>Hola ${fullName},</p>
      <p>¡Tenemos excelentes noticias! Tu solicitud de beca ha sido <strong>APROBADA</strong>.</p>
      <div style="background-color: #D1FAE5; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #10B981;">
        <h3 style="margin-top: 0; color: #065F46;">🎓 Beneficios de tu Beca:</h3>
        <ul style="color: #065F46;">
          <li>Acceso gratuito a cursos básicos</li>
          <li>50% de descuento en cursos premium</li>
          <li>Certificados oficiales</li>
          <li>Comunidad exclusiva de becados</li>
        </ul>
      </div>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.FRONTEND_URL}/cursos" 
           style="background-color: #10B981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Explorar Cursos
        </a>
      </div>
      <p>¡Felicitaciones y bienvenido al programa de becas!</p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
      <p style="color: #999; font-size: 12px;">
        © ${new Date().getFullYear()} Plataforma Educativa. Todos los derechos reservados.
      </p>
    </div>
  `;
  
  return sendEmail(email, '¡Tu Beca ha sido Aprobada!', html);
};

module.exports = {
  sendEmail,
  sendPasswordResetEmail,
  sendWelcomeEmail,
  sendBecaAprobadaEmail
};