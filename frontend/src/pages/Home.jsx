import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-cover bg-center text-white relative overflow-hidden" style={{backgroundImage: 'linear-gradient(rgba(37, 99, 235, 0.85), rgba(147, 51, 234, 0.85)), url(/images/hero-bg.jpg)'}}>
        {/* Patrón de fondo decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            BIENVENIDO A LA PLATAFORMA EDUCATIVA PUENTEX
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Accede a cursos de calidad, obtén becas universitarias y desarrolla tus habilidades con nuestra plataforma educativa
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/cursos"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition shadow-lg transform hover:scale-105"
            >
              Ver Cursos
            </Link>
            <Link
              to="/register"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition shadow-lg transform hover:scale-105"
            >
              Solicitar Beca
            </Link>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            ¿Cómo funciona?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center transform hover:scale-105 transition">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📘</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">1. Regístrate</h3>
              <p className="text-gray-600">
                Crea tu cuenta como becado o comprador en minutos
              </p>
            </div>
            <div className="text-center transform hover:scale-105 transition">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">2. Elige tu curso</h3>
              <p className="text-gray-600">
                Explora nuestro catálogo y selecciona el curso ideal para ti
              </p>
            </div>
            <div className="text-center transform hover:scale-105 transition">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎓</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">3. Aprende</h3>
              <p className="text-gray-600">
                Aprende a tu ritmo y obtén tu certificado al finalizar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Contenido de Calidad</h3>
              <p className="text-gray-600 text-sm">
                Cursos diseñados por expertos de la industria
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Becas Disponibles</h3>
              <p className="text-gray-600 text-sm">
                Programa de becas para estudiantes universitarios
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="text-4xl mb-4">📜</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Certificados</h3>
              <p className="text-gray-600 text-sm">
                Obtén certificados reconocidos al completar
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">A tu Ritmo</h3>
              <p className="text-gray-600 text-sm">
                Aprende cuando quieras, donde quieras
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">2,500+</div>
              <p className="text-gray-600">Estudiantes activos</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-purple-600 mb-2">150+</div>
              <p className="text-gray-600">Cursos disponibles</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-600 mb-2">95%</div>
              <p className="text-gray-600">Tasa de satisfacción</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-pink-600 mb-2">500+</div>
              <p className="text-gray-600">Becas otorgadas</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center text-white relative z-10">
          <h2 className="text-4xl font-bold mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Únete a miles de estudiantes que ya están aprendiendo con nosotros
          </p>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition inline-block shadow-lg transform hover:scale-105"
          >
            Crear Cuenta Gratis
          </Link>
        </div>
      </section>
    </div>
  );
}