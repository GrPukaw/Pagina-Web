import React from 'react';

export default function Contacto() {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: '/images/contact/facebook.png',
      url: 'https://www.facebook.com/carlos.florestorres.50/',
      color: 'from-blue-600 to-blue-700',
      description: 'Síguenos para novedades y eventos',
      emoji: '📘'
    },
    {
      name: 'Instagram',
      icon: '/images/contact/instagram.png',
      url: 'https://www.instagram.com/carlos.florestorres.50/',
      color: 'from-purple-600 via-pink-500 to-orange-400',
      description: 'Contenido exclusivo y tips diarios',
      emoji: '📸'
    },
    {
      name: 'LinkedIn',
      icon: '/images/contact/linkedin.png',
      url: 'https://www.linkedin.com/in/hector-carlos-flores-torres-109a71380/',
      color: 'from-blue-700 to-blue-800',
      description: 'Conecta con nuestra comunidad profesional',
      emoji: '💼'
    },
    {
      name: 'Twitter',
      icon: '/images/contact/twitter.png',
      url: 'https://twitter.com',
      color: 'from-sky-500 to-sky-600',
      description: 'Últimas actualizaciones en tiempo real',
      emoji: '✖️'
    },
    {
      name: 'WhatsApp',
      icon: '/images/contact/whatsapp.png',
      url: 'https://wa.me/+51985226470',
      color: 'from-green-500 to-green-600',
      description: 'Atención directa e inmediata',
      emoji: '💬'
    },
    {
      name: 'Discord',
      icon: '/images/contact/email.png',
      url: 'mailto:https://discord.gg/yUDCGQRd',
      color: 'from-red-500 to-red-600',
      description: 'Unete a nuestra comunidad en Discord',
      emoji: '✉️'
    }
  ];

  const contactInfo = [
    { icon: '📍', title: 'Dirección', content: 'Juliaca - Perú' },
    { icon: '🕐', title: 'Horario', content: 'Lun-Vie: 9:00 AM - 6:00 PM' },
    { icon: '🌐', title: 'Sitio Web', content: 'Proximamente' }
  ];

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">¡Conecta con Nosotros!</h1>
          <p className="text-base md:text-xl text-blue-100 mb-6 md:mb-8">
            Estamos aquí para ayudarte. Elige tu canal favorito de comunicación
          </p>
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            <span className="bg-white/20 backdrop-blur-sm px-3 md:px-6 py-2 rounded-full text-xs md:text-sm">
              Respuesta Rápida
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-3 md:px-6 py-2 rounded-full text-xs md:text-sm">
              Atención Personalizada
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-3 md:px-6 py-2 rounded-full text-xs md:text-sm">
              Soporte 24/7
            </span>
          </div>
        </div>
      </div>

      {/* Social Media Cards - CON IMÁGENES GRANDES */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 md:-mt-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {socialLinks.map((social, index) => (
            <button
              key={index}
              onClick={() => handleSocialClick(social.url)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden group text-left"
            >
              {/* Header con imagen GRANDE de fondo */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                {/* Imagen de fondo con gradiente */}
                <div className={`absolute inset-0 bg-gradient-to-br ${social.color}`}></div>
                
                {/* Patrón decorativo */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full filter blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full filter blur-xl"></div>
                </div>

                {/* Ícono centrado */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src={social.icon} 
                    alt={social.name}
                    className="w-24 h-24 md:w-32 md:h-32 object-contain filter drop-shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback a emoji si la imagen no carga
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<span class="text-7xl md:text-8xl relative z-10 group-hover:scale-110 transition-transform duration-300">${social.emoji}</span>`;
                    }}
                  />
                </div>

                {/* Overlay hover */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
              
              {/* Contenido */}
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {social.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mb-4">{social.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">Click para contactar</span>
                  <span className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all text-lg">→</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8 text-center">
            Información de Contacto
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                <div className="text-4xl md:text-5xl mb-3 md:mb-4">{info.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">{info.title}</h3>
                <p className="text-gray-600 text-xs md:text-sm">{info.content}</p>
              </div>
            ))}
          </div>

          <div className="border-t pt-6 md:pt-8">
            <h3 className="font-bold text-gray-800 mb-4 text-center text-sm md:text-base">Enlaces Rápidos</h3>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <a href="/" className="text-blue-600 hover:text-blue-800 transition-colors text-sm md:text-base">
                🏠 Inicio
              </a>
              <a href="/cursos" className="text-blue-600 hover:text-blue-800 transition-colors text-sm md:text-base">
                📚 Cursos
              </a>
              <a href="/becados" className="text-blue-600 hover:text-blue-800 transition-colors text-sm md:text-base">
                🎓 Becados
              </a>
              <a href="/register" className="text-blue-600 hover:text-blue-800 transition-colors text-sm md:text-base">
                📝 Regístrate
              </a>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Preguntas Frecuentes</h2>
          
          <div className="space-y-4">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-semibold text-gray-800 text-sm md:text-base">¿Cómo solicito una beca?</span>
                <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="p-4 text-gray-600 text-sm md:text-base">
                Regístrate como "Estudiante Becado" y completa el formulario con tus datos académicos. Nuestro equipo revisará tu solicitud en 1-3 días hábiles.
              </p>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-semibold text-gray-800 text-sm md:text-base">¿Cuánto tiempo dura un curso?</span>
                <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="p-4 text-gray-600 text-sm md:text-base">
                Los cursos varían entre 6 y 16 semanas, con acceso de por vida al contenido. Puedes aprender a tu propio ritmo.
              </p>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-semibold text-gray-800 text-sm md:text-base">¿Entregan certificados?</span>
                <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="p-4 text-gray-600 text-sm md:text-base">
                Sí, al completar un curso recibes un certificado digital verificable que puedes compartir en LinkedIn y tu CV.
              </p>
            </details>
          </div>
        </div>

        {/* Mapa o CTA Final */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-12 text-white text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Necesitas ayuda inmediata?</h2>
          <p className="text-sm md:text-lg text-blue-100 mb-6 md:mb-8">
            Nuestro equipo está listo para ayudarte en cualquier momento
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/+51985226470"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-lg text-sm md:text-lg font-semibold hover:bg-gray-100 transition shadow-lg transform hover:scale-105"
            >
              💬 Chatear por WhatsApp
            </a>
            <a
              href="mailto:frecalo12@gmail.com"
              className="bg-transparent border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-sm md:text-lg font-semibold hover:bg-white hover:text-blue-600 transition shadow-lg transform hover:scale-105"
            >
              ✉️ Enviar Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}