import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/cursos');
      setCursos(response.data.cursos);
    } catch (error) {
      console.error('Error al cargar cursos:', error);
    } finally {
      setLoading(false);
    }
  };

  const cursosFiltrados = cursos.filter(curso =>
    curso.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    curso.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            🎓 Cursos Gratuitos de Programación
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Aprende a programar desde cero con nuestros cursos completos y gratuitos
          </p>
          
          {/* Buscador */}
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="🔍 Buscar curso por nombre o tecnología..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-lg text-gray-800 text-lg focus:ring-4 focus:ring-blue-300 outline-none shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Cargando cursos...</p>
          </div>
        ) : cursosFiltrados.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No se encontraron cursos
            </h3>
            <p className="text-gray-600">
              Intenta con otra búsqueda
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                📚 {cursosFiltrados.length} {cursosFiltrados.length === 1 ? 'Curso Disponible' : 'Cursos Disponibles'}
              </h2>
              <p className="text-gray-600 mt-2">
                Todos los cursos son completamente gratuitos y sin restricciones
              </p>
            </div>

            {/* Grid de Cursos */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cursosFiltrados.map((curso) => (
                <Link
                  key={curso._id}
                  to={`/cursos/${curso.slug}`}
                  className="group bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-500 hover:shadow-2xl transition-all duration-300"
                >
                  {/* Imagen del Curso */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500">
                    <img
                      src={curso.image}
                      alt={curso.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        // Si la imagen no carga, mostrar un gradiente con emoji
                        e.target.style.display = 'none';
                      }}
                    />
                    {/* Fallback si no hay imagen */}
                    <div className="absolute inset-0 flex items-center justify-center text-7xl bg-gradient-to-br from-blue-500 to-purple-500">
                      {curso.image.includes('emoji') ? curso.image : '💻'}
                    </div>
                  </div>
                  
                  {/* Contenido */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-bold">
                        ✓ GRATIS
                      </span>
                      <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold">
                        {curso.level}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {curso.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {curso.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <span>📺</span> {curso.secciones?.length || 0} secciones
                      </span>
                      <span className="flex items-center gap-1">
                        <span>👥</span> {curso.students.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-sm text-gray-500">
                        ⭐ {curso.rating} ({curso.reviews})
                      </span>
                      <span className="text-blue-600 font-semibold group-hover:translate-x-2 transition-transform flex items-center gap-1">
                        Ver curso <span>→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Banner Becas */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 py-16 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            🎓 ¿Eres estudiante universitario?
          </h2>
          <p className="text-lg mb-6 text-green-100">
            Obtén certificados oficiales y acceso a contenido premium exclusivo
          </p>
          <Link
            to="/register"
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition inline-block text-lg shadow-lg"
          >
            Solicitar Beca →
          </Link>
        </div>
      </div>
    </div>
  );
}