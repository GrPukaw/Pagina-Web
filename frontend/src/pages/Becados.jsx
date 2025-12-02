import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Becados() {
  const [becados, setBecados] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBecados();
    fetchEstadisticas();
  }, []);

  const fetchBecados = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/becados/aprobados');
      setBecados(response.data.becados);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar becados:', error);
      setLoading(false);
    }
  };

  const fetchEstadisticas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/becados/estadisticas');
      setEstadisticas(response.data.estadisticas);
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getRandomColor = (index) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-green-500 to-green-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
      'from-teal-500 to-teal-600',
    ];
    return colors[index % colors.length];
  };

  const requisitos = [
    {
      icon: '',
      title: 'Ser estudiante universitario activo',
      description: 'Debes estar matriculado en una universidad peruana',
      image: '/images/becados/requisito-1.jpg'
    },
    {
      icon: '',
      title: 'Mantener buen rendimiento académico',
      description: 'Promedio ponderado mínimo de 13.0',
      image: '/images/becados/requisito-2.jpg'
    },
    {
      icon: '',
      title: 'Presentar documentación',
      description: 'Comprobante de matrícula y carta de motivación',
      image: '/images/becados/requisito-3.jpg'
    },
    {
      icon: '',
      title: 'Compromiso de aprendizaje',
      description: 'Dedicar tiempo necesario para completar el curso',
      image: '/images/becados/requisito-4.jpg'
    }
  ];

  const beneficios = [
    {
      icon: '',
      title: 'Acceso gratuito a cursos básicos',
      image: '/images/becados/beneficio-1.jpg'
    },
    {
      icon: '',
      title: '50% de descuento en cursos premium',
      image: '/images/becados/beneficio-2.jpg'
    },
    {
      icon: '',
      title: 'Certificados oficiales sin costo adicional',
      image: '/images/becados/beneficio-1.jpg'
    },
    {
      icon: '',
      title: 'Acceso a comunidad exclusiva de becados',
      image: '/images/becados/beneficio-2.jpg'
    },
    {
      icon: '',
      title: 'Webinars y talleres gratuitos mensuales',
      image: '/images/becados/beneficio-1.jpg'
    },
    {
      icon: '',
      title: 'Bolsa de trabajo exclusiva para becados',
      image: '/images/becados/beneficio-2.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section con imagen de fondo */}
      <section 
        className="relative bg-gradient-to-r from-green-600 to-teal-600 text-white py-12 md:py-20 px-4 overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(5, 150, 105, 0.9), rgba(20, 184, 166, 0.9)), url(/images/becados/hero-becas.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-white rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Programa de Becas Universitarias
          </h1>
          <p className="text-base md:text-xl text-green-100 mb-6 md:mb-8">
            Apoyamos tu crecimiento académico y profesional
          </p>
          
          {/* Estadísticas - DISEÑO MEJORADO */}
          {estadisticas && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto mb-6 md:mb-8">
              {/* Total Solicitudes */}
              <div className="group bg-white/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-white/50">
                <div className="relative">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl md:text-2xl"></span>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2 mt-4 md:mt-6 group-hover:scale-110 transition-transform">
                    {estadisticas.total}
                  </div>
                  <div className="text-xs md:text-sm text-gray-700 font-semibold">Total Solicitudes</div>
                </div>
              </div>

              {/* Becas Aprobadas */}
              <div className="group bg-white/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-white/50">
                <div className="relative">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl md:text-2xl"></span>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2 mt-4 md:mt-6 group-hover:scale-110 transition-transform">
                    {estadisticas.aprobados}
                  </div>
                  <div className="text-xs md:text-sm text-gray-700 font-semibold">Becas Aprobadas</div>
                </div>
              </div>

              {/* En Revisión */}
              <div className="group bg-white/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-white/50">
                <div className="relative">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl md:text-2xl"></span>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2 mt-4 md:mt-6 group-hover:scale-110 transition-transform">
                    {estadisticas.pendientes}
                  </div>
                  <div className="text-xs md:text-sm text-gray-700 font-semibold">En Revisión</div>
                </div>
              </div>

              {/* Tasa de Aprobación */}
              <div className="group bg-white/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-white/50 col-span-2 lg:col-span-1">
                <div className="relative">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl md:text-2xl"></span>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2 mt-4 md:mt-6 group-hover:scale-110 transition-transform">
                    {estadisticas.tasaAprobacion}%
                  </div>
                  <div className="text-xs md:text-sm text-gray-700 font-semibold">Tasa Aprobación</div>
                </div>
              </div>
            </div>
          )}
          
          <Link
            to="/register"
            className="inline-block bg-white text-green-600 px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-gray-100 transition shadow-lg transform hover:scale-105"
          >
            Solicitar Beca Ahora
          </Link>
        </div>
      </section>

      {/* Becados Aprobados - DISEÑO MEJORADO */}
      {becados.length > 0 && (
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
              Nuestros Becados
            </h2>
            <p className="text-center text-gray-600 mb-8 md:mb-12 text-sm md:text-base">
              Conoce a los estudiantes que ya forman parte de nuestro programa
            </p>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Cargando becados...</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {becados.map((becado, index) => (
                  <div key={becado._id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-200">
                    {/* Header con gradiente y avatar */}
                    <div className={`relative bg-gradient-to-br ${getRandomColor(index)} p-6 md:p-8 text-center overflow-hidden`}>
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full filter blur-xl"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full filter blur-2xl"></div>
                      </div>
                      <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mx-auto text-xl md:text-2xl font-bold text-gray-800 shadow-xl group-hover:scale-110 transition-transform">
                        {getInitials(becado.fullName)}
                      </div>
                    </div>
                    
                    {/* Contenido */}
                    <div className="p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {becado.fullName}
                      </h3>
                      <div className="space-y-2 mb-4">
                        <p className="text-xs md:text-sm text-gray-600 flex items-center gap-2">
                          <span className="text-base">🏛️</span>
                          <span className="line-clamp-1">{becado.scholarship.university}</span>
                        </p>
                        <p className="text-xs md:text-sm text-green-600 font-semibold flex items-center gap-2">
                          <span className="text-base">📚</span>
                          <span className="line-clamp-1">{becado.scholarship.career}</span>
                        </p>
                      </div>
                      
                      {becado.scholarship.motivation && (
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-3 mb-3 border border-blue-100">
                          <p className="text-xs text-gray-700 italic line-clamp-3">
                            "{becado.scholarship.motivation}"
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                        <span className="flex items-center gap-1 font-semibold text-green-600">
                          <span></span> Aprobado
                        </span>
                        <span>
                          {new Date(becado.createdAt).toLocaleDateString('es-PE')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Si no hay becados aprobados */}
      {!loading && becados.length === 0 && (
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl shadow-xl p-6 md:p-8 border-2 border-gray-100">
            <div className="text-5xl md:text-6xl mb-4">🎓</div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
              ¡Sé el Primero!
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-6">
              Aún no hay becados aprobados. Solicita tu beca ahora y sé parte de nuestra primera generación.
            </p>
            <Link
              to="/register"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition transform hover:scale-105"
            >
              Solicitar Beca
            </Link>
          </div>
        </section>
      )}

      {/* Requisitos - CON IMÁGENES GRANDES */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Requisitos para Becados
          </h2>
          <p className="text-center text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-base">
            Cumple con estos requisitos para acceder a nuestro programa de becas
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {requisitos.map((req, index) => (
              <div key={index} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Imagen grande de fondo */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img 
                    src={req.image} 
                    alt={req.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="%234F46E5" width="400" height="300"/><text x="50%" y="50%" fill="white" font-size="80" text-anchor="middle">${req.icon}</text></svg>`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="text-4xl md:text-5xl">{req.icon}</div>
                  </div>
                </div>
                
                {/* Contenido */}
                <div className="p-4 md:p-6 text-center">
                  <h3 className="font-bold text-gray-800 mb-2 text-sm md:text-base group-hover:text-blue-600 transition-colors">
                    {req.title}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm">{req.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios - CON IMÁGENES GRANDES */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 md:mb-12">
            Beneficios del Programa
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {beneficios.map((beneficio, index) => (
              <div key={index} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Imagen grande de fondo */}
                <div className="relative h-40 md:h-48 overflow-hidden">
                  <img 
                    src={beneficio.image} 
                    alt={beneficio.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="%2310B981" width="400" height="300"/><text x="50%" y="50%" fill="white" font-size="80" text-anchor="middle">${beneficio.icon}</text></svg>`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-5xl md:text-6xl group-hover:scale-110 transition-transform">
                      {beneficio.icon}
                    </div>
                  </div>
                </div>
                
                {/* Contenido */}
                <div className="p-4 text-center">
                  <p className="text-gray-700 font-semibold text-xs md:text-sm group-hover:text-blue-600 transition-colors">
                    {beneficio.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso de Solicitud */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
            ¿Cómo solicitar la beca?
          </h2>
          
          <div className="space-y-4 md:space-y-6">
            {[
              { num: 1, title: 'Regístrate', desc: 'Crea tu cuenta seleccionando "Estudiante Becado" y completa el formulario con tus datos académicos.' },
              { num: 2, title: 'Envía tu solicitud', desc: 'Completa tu perfil con comprobante de matrícula y carta de motivación breve.' },
              { num: 3, title: 'Espera la aprobación', desc: 'Nuestro equipo revisará tu solicitud en 1-3 días hábiles. Recibirás un email con la respuesta.' },
              { num: 4, title: '¡Comienza a aprender!', desc: 'Una vez aprobado, accede inmediatamente a todos los beneficios del programa de becas.' }
            ].map((paso) => (
              <div key={paso.num} className="flex items-start gap-3 md:gap-4 bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl hover:bg-white/20 transition-all group">
                <div className="bg-white text-blue-600 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-lg md:text-xl flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                  {paso.num}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">{paso.title}</h3>
                  <p className="text-xs md:text-sm text-blue-100">{paso.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link
              to="/register"
              className="inline-block bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-gray-100 transition shadow-lg transform hover:scale-105"
            >
              Solicitar Beca Ahora
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}