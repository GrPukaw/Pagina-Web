import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-20 md:py-32 px-4 bg-cover bg-center text-white overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(37, 99, 235, 0.85), rgba(147, 51, 234, 0.85)), url(/images/home/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Patrón de fondo decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-white rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 animate-fade-in px-4">
            PUENTEX: Conectamos estudiantes con oportunidades que transforman
          </h1>
          <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
            Accede a cursos de calidad, obtén becas universitarias y desarrolla tus habilidades con nuestra plataforma educativa
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
            <Link
              to="/cursos"
              className="bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-gray-100 transition shadow-lg transform hover:scale-105"
            >
              Ver Cursos
            </Link>
            <Link
              to="/register"
              className="bg-transparent border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-white hover:text-blue-600 transition shadow-lg transform hover:scale-105"
            >
              Solicitar Beca
            </Link>
          </div>
        </div>
      </section>

      {/* Como Funciona - CON IMÁGENES */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 md:mb-12">
            ¿Cómo funciona?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Paso 1 */}
            <div className="group text-center transform hover:scale-105 transition-all duration-300">
              <div className="relative w-full h-48 md:h-56 rounded-2xl overflow-hidden mb-4 shadow-lg">
                <img 
                  src="/images/home/feature-1.jpg" 
                  alt="Regístrate" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="%234F46E5" width="400" height="300"/><text x="50%" y="50%" fill="white" font-size="60" text-anchor="middle">📘</text></svg>';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent flex items-end justify-center pb-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                    <span className="text-2xl md:text-3xl font-bold text-blue-600">1</span>
                  </div>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Regístrate</h3>
              <p className="text-sm md:text-base text-gray-600 px-2">
                Crea tu cuenta como becado o comprador en minutos
              </p>
            </div>

            {/* Paso 2 */}
            <div className="group text-center transform hover:scale-105 transition-all duration-300">
              <div className="relative w-full h-48 md:h-56 rounded-2xl overflow-hidden mb-4 shadow-lg">
                <img 
                  src="/images/home/feature-2.jpg" 
                  alt="Elige tu curso" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="%239333EA" width="400" height="300"/><text x="50%" y="50%" fill="white" font-size="60" text-anchor="middle">📚</text></svg>';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 to-transparent flex items-end justify-center pb-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                    <span className="text-2xl md:text-3xl font-bold text-purple-600">2</span>
                  </div>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Elige tu curso</h3>
              <p className="text-sm md:text-base text-gray-600 px-2">
                Explora nuestro catálogo y selecciona el curso ideal para ti
              </p>
            </div>

            {/* Paso 3 */}
            <div className="group text-center transform hover:scale-105 transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <div className="relative w-full h-48 md:h-56 rounded-2xl overflow-hidden mb-4 shadow-lg">
                <img 
                  src="/images/home/feature-3.jpg" 
                  alt="Aprende" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="%2310B981" width="400" height="300"/><text x="50%" y="50%" fill="white" font-size="60" text-anchor="middle">🎓</text></svg>';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-600/80 to-transparent flex items-end justify-center pb-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                    <span className="text-2xl md:text-3xl font-bold text-green-600">3</span>
                  </div>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Aprende</h3>
              <p className="text-sm md:text-base text-gray-600 px-2">
                Aprende a tu ritmo y obtén tu certificado al finalizar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios - CON IMÁGENES */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 md:mb-12">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Beneficio 1 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2">
              <div className="relative h-40 md:h-48 overflow-hidden">
                <img 
                  src="/images/home/benefit-1.jpg" 
                  alt="Contenido de Calidad" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="%233B82F6" width="400" height="300"/><text x="50%" y="50%" fill="white" font-size="80" text-anchor="middle">🎯</text></svg>';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2">Contenido de Calidad</h3>
                <p className="text-xs md:text-sm text-gray-600">
                  Cursos diseñados por expertos de la industria
                </p>
              </div>
            </div>

            {/* Beneficio 2 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2">
              <div className="relative h-40 md:h-48 overflow-hidden">
                <img 
                  src="/images/home/benefit-2.jpg" 
                  alt="Becas Disponibles" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="%2310B981" width="400" height="300"/><text x="50%" y="50%" fill="white" font-size="80" text-anchor="middle">💰</text></svg>';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent"></div>
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2">Becas Disponibles</h3>
                <p className="text-xs md:text-sm text-gray-600">
                  Programa de becas para estudiantes universitarios
                </p>
              </div>
            </div>

            {/* Beneficio 3 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2">
              <div className="relative h-40 md:h-48 overflow-hidden">
                <img 
                  src="/images/home/benefit-3.jpg" 
                  alt="Certificados" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="%239333EA" width="400" height="300"/><text x="50%" y="50%" fill="white" font-size="80" text-anchor="middle">📜</text></svg>';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2">Certificados</h3>
                <p className="text-xs md:text-sm text-gray-600">
                  Obtén certificados reconocidos al completar
                </p>
              </div>
            </div>

            {/* Beneficio 4 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2">
              <div className="relative h-40 md:h-48 overflow-hidden">
                <img 
                  src="/images/home/benefit-4.jpg" 
                  alt="A tu Ritmo" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="%23F59E0B" width="400" height="300"/><text x="50%" y="50%" fill="white" font-size="80" text-anchor="middle">⏰</text></svg>';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 to-transparent"></div>
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2">A tu Ritmo</h3>
                <p className="text-xs md:text-sm text-gray-600">
                  Aprende cuando quieras, donde quieras
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 text-center">
            <div className="p-4">
              <div className="text-3xl md:text-5xl font-bold text-blue-600 mb-2">2,500+</div>
              <p className="text-sm md:text-base text-gray-600">Estudiantes activos</p>
            </div>
            <div className="p-4">
              <div className="text-3xl md:text-5xl font-bold text-purple-600 mb-2">150+</div>
              <p className="text-sm md:text-base text-gray-600">Cursos disponibles</p>
            </div>
            <div className="p-4">
              <div className="text-3xl md:text-5xl font-bold text-green-600 mb-2">95%</div>
              <p className="text-sm md:text-base text-gray-600">Tasa de satisfacción</p>
            </div>
            <div className="p-4">
              <div className="text-3xl md:text-5xl font-bold text-pink-600 mb-2">500+</div>
              <p className="text-sm md:text-base text-gray-600">Becas otorgadas</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-white rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center text-white relative z-10 px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-base md:text-xl mb-6 md:mb-8 text-blue-100">
            Únete a miles de estudiantes que ya están aprendiendo con nosotros
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-gray-100 transition shadow-lg transform hover:scale-105"
          >
            Crear Cuenta Gratis
          </Link>
        </div>
      </section>
    </div>
  );
}