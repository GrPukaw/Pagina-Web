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
      icon: '🎓',
      title: 'Ser estudiante universitario activo',
      description: 'Debes estar matriculado en una universidad peruana'
    },
    {
      icon: '📊',
      title: 'Mantener buen rendimiento académico',
      description: 'Promedio ponderado mínimo de 13.0'
    },
    {
      icon: '📄',
      title: 'Presentar documentación',
      description: 'Comprobante de matrícula y carta de motivación'
    },
    {
      icon: '💪',
      title: 'Compromiso de aprendizaje',
      description: 'Dedicar tiempo necesario para completar el curso'
    }
  ];

  const beneficios = [
    '🎯 Acceso gratuito a cursos básicos',
    '💰 50% de descuento en cursos premium',
    '📜 Certificados oficiales sin costo adicional',
    '👥 Acceso a comunidad exclusiva de becados',
    '🎤 Webinars y talleres gratuitos mensuales',
    '💼 Bolsa de trabajo exclusiva para becados'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            Programa de Becas Universitarias
          </h1>
          <p className="text-xl text-green-100 mb-8">
            Apoyamos tu crecimiento académico y profesional
          </p>
          
          {/* Estadísticas */}
          {estadisticas && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{estadisticas.total}</div>
                <div className="text-sm text-green-100">Total Solicitudes</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{estadisticas.aprobados}</div>
                <div className="text-sm text-green-100">Becas Aprobadas</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{estadisticas.pendientes}</div>
                <div className="text-sm text-green-100">En Revisión</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{estadisticas.tasaAprobacion}%</div>
                <div className="text-sm text-green-100">Tasa Aprobación</div>
              </div>
            </div>
          )}
          
          <Link
            to="/register"
            className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition inline-block shadow-lg"
          >
            Solicitar Beca Ahora
          </Link>
        </div>
      </section>

      {/* Becados Aprobados */}
      {becados.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
              🌟 Nuestros Becados
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Conoce a los estudiantes que ya forman parte de nuestro programa
            </p>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Cargando becados...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {becados.map((becado, index) => (
                  <div key={becado._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
                    <div className={`bg-gradient-to-br ${getRandomColor(index)} p-8 text-center`}>
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-gray-800">
                        {getInitials(becado.fullName)}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {becado.fullName}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        🏛️ {becado.scholarship.university}
                      </p>
                      <p className="text-sm text-green-600 font-semibold mb-3">
                        📚 {becado.scholarship.career}
                      </p>
                      {becado.scholarship.motivation && (
                        <div className="bg-blue-50 rounded-lg p-3 mb-3">
                          <p className="text-xs text-gray-700 italic line-clamp-3">
                            "{becado.scholarship.motivation}"
                          </p>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>✅ Beca Aprobada</span>
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
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
            <div className="text-6xl mb-4">🎓</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              ¡Sé el Primero!
            </h3>
            <p className="text-gray-600 mb-6">
              Aún no hay becados aprobados. Solicita tu beca ahora y sé parte de nuestra primera generación.
            </p>
            <Link
              to="/register"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition inline-block"
            >
              Solicitar Beca
            </Link>
          </div>
        </section>
      )}

      {/* Requisitos */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Requisitos para Becados
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Cumple con estos requisitos para acceder a nuestro programa de becas
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {requisitos.map((req, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl text-center hover:shadow-lg transition">
                <div className="text-5xl mb-4">{req.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{req.title}</h3>
                <p className="text-gray-600 text-sm">{req.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Beneficios del Programa
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beneficios.map((beneficio, index) => (
              <div key={index} className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                <span className="text-2xl">{beneficio.split(' ')[0]}</span>
                <p className="text-gray-700 font-medium">{beneficio.substring(3)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso de Solicitud */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            ¿Cómo solicitar la beca?
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="bg-white text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Regístrate</h3>
                <p className="text-blue-100">
                  Crea tu cuenta seleccionando "Estudiante Becado" y completa el formulario con tus datos académicos.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="bg-white text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Envía tu solicitud</h3>
                <p className="text-blue-100">
                  Completa tu perfil con comprobante de matrícula y carta de motivación breve.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="bg-white text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Espera la aprobación</h3>
                <p className="text-blue-100">
                  Nuestro equipo revisará tu solicitud en 1-3 días hábiles. Recibirás un email con la respuesta.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="bg-white text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">¡Comienza a aprender!</h3>
                <p className="text-blue-100">
                  Una vez aprobado, accede inmediatamente a todos los beneficios del programa de becas.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition inline-block shadow-lg"
            >
              Solicitar Beca Ahora
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}