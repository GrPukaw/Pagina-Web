import React from 'react';

export default function Contacto() {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: '📘 f',
      url: 'https://www.facebook.com/carlos.florestorres.50/',
      color: 'from-blue-600 to-blue-700',
      description: 'Síguenos para novedades y eventos'
    },
    {
      name: 'Instagram',
      icon: '📸',
      url: 'https://www.instagram.com/carlos.florestorres.50/',
      color: 'from-purple-600 via-pink-500 to-orange-400',
      description: 'Contenido exclusivo y tips diarios'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: 'https://www.linkedin.com/in/hector-carlos-flores-torres-109a71380/',
      color: 'from-blue-700 to-blue-800',
      description: 'Conecta con nuestra comunidad profesional'
    },
    {
      name: 'Twitter',
      icon: '✖️☑️',
      url: 'https://twitter.com',
      color: 'from-sky-500 to-sky-600',
      description: 'Últimas actualizaciones en tiempo real'
    },
    {
      name: 'WhatsApp',
      icon: '🟢📱💬',
      url: 'https://wa.me/+51985226470',
      color: 'from-green-500 to-green-600',
      description: 'Atención directa e inmediata'
    },
    {
      name: 'Email',
      icon: '✉️',
      url: 'frecalo12@gmail.com',
      color: 'from-red-500 to-red-600',
      description: 'Escríbenos tus consultas'
    }
  ];

  const contactInfo = [
    { icon: '🚩', title: 'Dirección', content: 'Juliaca - Perú' },
    { icon: '🕐', title: 'Horario', content: 'Lun-Vie: 9:00 AM - 6:00 PM' },
    { icon: '🌐', title: 'Sitio Web', content: 'Proximamente' }
  ];

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">¡Conecta con Nosotros!</h1>
          <p className="text-xl text-blue-100 mb-8">
            Estamos aquí para ayudarte. Elige tu canal favorito de comunicación
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm">
              Respuesta Rápida
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm">
              Atención Personalizada
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm">
              Soporte 24/7
            </span>
          </div>
        </div>
      </div>

      {/* Social Media Cards */}
      <div className="max-w-6xl mx-auto px-4 -mt-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {socialLinks.map((social, index) => (
            <button
              key={index}
              onClick={() => handleSocialClick(social.url)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden group text-left"
            >
              <div className={`bg-gradient-to-br ${social.color} p-6 flex items-center justify-center`}>
                <span className="text-6xl">{social.icon}</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {social.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{social.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Click para abrir</span>
                  <span className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all">→</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Información de Contacto
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{info.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{info.title}</h3>
                <p className="text-gray-600">{info.content}</p>
              </div>
            ))}
          </div>

          <div className="border-t pt-8">
            <h3 className="font-bold text-gray-800 mb-4 text-center">Enlaces Rápidos</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
                🏠 Inicio
              </a>
              <a href="/cursos" className="text-blue-600 hover:text-blue-800 transition-colors">
                📚 Cursos
              </a>
              <a href="/becados" className="text-blue-600 hover:text-blue-800 transition-colors">
                🎓 Becados
              </a>
              <a href="/register" className="text-blue-600 hover:text-blue-800 transition-colors">
                📝 Regístrate
              </a>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Preguntas Frecuentes</h2>
          
          <div className="space-y-4">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-semibold text-gray-800">¿Cómo solicito una beca?</span>
                <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="p-4 text-gray-600">
                Regístrate como "Estudiante Becado" y completa el formulario con tus datos académicos. Nuestro equipo revisará tu solicitud en 1-3 días hábiles.
              </p>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-semibold text-gray-800">¿Cuánto tiempo dura un curso?</span>
                <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="p-4 text-gray-600">
                Los cursos varían entre 6 y 16 semanas, con acceso de por vida al contenido. Puedes aprender a tu propio ritmo.
              </p>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-semibold text-gray-800">¿Entregan certificados?</span>
                <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="p-4 text-gray-600">
                Sí, al completar un curso recibes un certificado digital verificable que puedes compartir en LinkedIn y tu CV.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}