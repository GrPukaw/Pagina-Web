import React from 'react';
import { Link } from 'react-router-dom';

export default function Becados() {
  const testimonios = [
    {
      id: 1,
      name: 'María González',
      university: 'Universidad Nacional Mayor de San Marcos',
      career: 'Ingeniería de Sistemas',
      course: 'Desarrollo Web Full Stack',
      image: '👩‍💻',
      testimonial: 'Gracias al programa de becas pude aprender desarrollo web sin preocuparme por los costos. Ahora trabajo como desarrolladora frontend.'
    },
    {
      id: 2,
      name: 'Carlos Ramírez',
      university: 'Universidad Nacional de Ingeniería',
      career: 'Ingeniería Industrial',
      course: 'Data Science con Python',
      image: '👨‍💼',
      testimonial: 'El programa de becas me permitió especializarme en Data Science. Conseguí una pasantía en una empresa tech gracias a lo aprendido.'
    },
    {
      id: 3,
      name: 'Ana Torres',
      university: 'Pontificia Universidad Católica del Perú',
      career: 'Administración',
      course: 'Marketing Digital',
      image: '👩‍🎓',
      testimonial: 'Como becada pude acceder a cursos de marketing digital que complementaron mi carrera. Ahora manejo las redes sociales de una startup.'
    }
  ];

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
          <Link
            to="/register"
            className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition inline-block shadow-lg"
          >
            Solicitar Beca Ahora
          </Link>
        </div>
      </section>

      {/* Requisitos */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Requisitos para Becados
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Cumple con estos requisitos para acceder a nuestro programa de becas
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {requisitos.map((req, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="text-5xl mb-4">{req.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{req.title}</h3>
                <p className="text-gray-600 text-sm">{req.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Beneficios del Programa
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beneficios.map((beneficio, index) => (
              <div key={index} className="flex items-start space-x-3 bg-green-50 p-4 rounded-lg">
                <span className="text-2xl">{beneficio.split(' ')[0]}</span>
                <p className="text-gray-700 font-medium">{beneficio.substring(3)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Historias de Éxito
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Conoce a algunos de nuestros becados destacados
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonios.map((testimonio) => (
              <div key={testimonio.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-br from-green-500 to-teal-500 p-8 text-center">
                  <div className="text-8xl mb-4">{testimonio.image}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {testimonio.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">{testimonio.university}</p>
                  <p className="text-sm text-green-600 font-semibold mb-2">{testimonio.career}</p>
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-blue-800 font-semibold">
                      📚 Curso: {testimonio.course}
                    </p>
                  </div>
                  <p className="text-gray-700 text-sm italic">
                    "{testimonio.testimonial}"
                  </p>
                </div>
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
                <h3 className="text-xl font-bold mb-2">Sube tus documentos</h3>
                <p className="text-blue-100">
                  Adjunta tu comprobante de matrícula actualizado y escribe una carta de motivación breve.
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