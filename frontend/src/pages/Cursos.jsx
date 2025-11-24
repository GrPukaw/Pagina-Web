import React from 'react';

export default function Cursos() {
  const cursos = [
    {
      id: 1,
      title: 'Desarrollo Web Full Stack',
      description: 'Aprende HTML, CSS, JavaScript, React y Node.js',
      level: 'Intermedio',
      duration: '12 semanas',
      price: 299,
      image: '💻'
    },
    {
      id: 2,
      title: 'Python para Data Science',
      description: 'Domina Python, Pandas, NumPy y visualización de datos',
      level: 'Principiante',
      duration: '10 semanas',
      price: 249,
      image: '🐍'
    },
    {
      id: 3,
      title: 'Diseño UX/UI',
      description: 'Diseña experiencias de usuario increíbles con Figma',
      level: 'Principiante',
      duration: '8 semanas',
      price: 199,
      image: '🎨'
    },
    {
      id: 4,
      title: 'Marketing Digital',
      description: 'SEO, SEM, Redes Sociales y Analítica Web',
      level: 'Principiante',
      duration: '6 semanas',
      price: 179,
      image: '📱'
    },
    {
      id: 5,
      title: 'Inglés de Negocios',
      description: 'Mejora tu inglés profesional para el mundo laboral',
      level: 'Intermedio',
      duration: '16 semanas',
      price: 349,
      image: '🌐'
    },
    {
      id: 6,
      title: 'Gestión de Proyectos',
      description: 'Metodologías ágiles, Scrum y gestión efectiva',
      level: 'Avanzado',
      duration: '8 semanas',
      price: 229,
      image: '📊'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Catálogo de Cursos
          </h1>
          <p className="text-xl text-gray-600">
            Descubre nuestra oferta educativa y comienza a aprender hoy
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="🔍 Buscar curso..."
              className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="">Todos los niveles</option>
              <option value="principiante">Principiante</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzado">Avanzado</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="">Todas las categorías</option>
              <option value="programacion">Programación</option>
              <option value="diseno">Diseño</option>
              <option value="negocios">Negocios</option>
              <option value="idiomas">Idiomas</option>
            </select>
          </div>
        </div>

        {/* Grid de Cursos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cursos.map((curso) => (
            <div key={curso.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-12 flex items-center justify-center">
                <span className="text-8xl">{curso.image}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold">
                    {curso.level}
                  </span>
                  <span className="text-gray-500 text-sm">⏱️ {curso.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{curso.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{curso.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-gray-800">${curso.price}</span>
                    <p className="text-xs text-gray-500">Acceso de por vida</p>
                  </div>
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
                    Ver más
                  </button>
                </div>
                <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm text-gray-500">
                  <span>⭐ 4.8 (234 reviews)</span>
                  <span>👥 1,250 estudiantes</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Becados */}
        <div className="mt-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl shadow-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Eres estudiante universitario?
          </h2>
          <p className="text-lg mb-6 text-green-100">
            Solicita una beca y accede a estos cursos con descuentos de hasta 50% o completamente gratis
          </p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Solicitar Beca Ahora
          </button>
        </div>
      </div>
    </div>
  );
}