import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function CursoDetalle() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [curso, setCurso] = useState(null);
  const [seccionActual, setSeccionActual] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurso();
  }, [slug]);

  useEffect(() => {
    if (curso && curso.secciones && curso.secciones.length > 0 && !seccionActual) {
      setSeccionActual(curso.secciones[0]);
    }
  }, [curso]);

  const fetchCurso = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/cursos/${slug}`);
      setCurso(response.data.curso);
    } catch (error) {
      console.error('Error al cargar curso:', error);
    } finally {
      setLoading(false);
    }
  };

  const cambiarSeccion = (seccion) => {
    setSeccionActual(seccion);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Cargando curso...</p>
        </div>
      </div>
    );
  }

  if (!curso) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-5xl md:text-6xl mb-4">❌</div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Curso no encontrado</h2>
          <p className="text-sm md:text-base text-gray-600 mb-6">El curso que buscas no existe</p>
          <button
            onClick={() => navigate('/cursos')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition w-full md:w-auto"
          >
            Volver a cursos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center text-xs md:text-sm text-gray-600 overflow-x-auto">
            <Link to="/" className="hover:text-blue-600 whitespace-nowrap">Inicio</Link>
            <span className="mx-2">/</span>
            <Link to="/cursos" className="hover:text-blue-600 whitespace-nowrap">Cursos</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-semibold truncate">{curso.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
          {/* Columna Principal */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Video */}
            {seccionActual && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="aspect-video bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={seccionActual.videoUrl}
                    title={seccionActual.titulo}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            )}

            {/* Título de la sección actual */}
            {seccionActual && (
              <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                <div className="flex items-start gap-2 md:gap-3 mb-4">
                  <span className="bg-blue-100 text-blue-700 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold flex-shrink-0">
                    Sección {seccionActual.numero}
                  </span>
                  <h2 className="text-lg md:text-2xl font-bold text-gray-800 flex-1">
                    {seccionActual.titulo}
                  </h2>
                </div>

                {seccionActual.temario && seccionActual.temario.length > 0 && (
                  <div className="mt-4 md:mt-6">
                    <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4">Contenido de esta sección:</h3>
                    <ul className="space-y-2">
                      {seccionActual.temario.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 md:gap-3">
                          <span className="text-green-500 text-base md:text-lg flex-shrink-0 mt-1">✓</span>
                          <p className="text-sm md:text-base text-gray-700">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* BOTÓN DE CERTIFICADO - NUEVO */}
            {user && (
              <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl shadow-lg p-4 md:p-6 text-white">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg md:text-xl font-bold mb-2">¡Genera tu Certificado!</h3>
                    <p className="text-xs md:text-sm text-green-100">
                      Completa el curso y obtén tu certificado oficial en formato PDF
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/certificado/${slug}`)}
                    className="bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg transform hover:scale-105 whitespace-nowrap w-full md:w-auto"
                  >
                    Obtener Certificado
                  </button>
                </div>
              </div>
            )}

            {/* Descripción del curso */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                Acerca de este curso
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
                {curso.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 md:gap-4 pt-4 md:pt-6 border-t">
                <div>
                  <h3 className="font-bold text-gray-800 mb-2 text-sm md:text-base">Instructor</h3>
                  <p className="text-xs md:text-sm text-gray-600">{curso.instructor?.name || 'Instructor'}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2 text-sm md:text-base">Nivel</h3>
                  <p className="text-xs md:text-sm text-gray-600">{curso.level}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2 text-sm md:text-base">Duración</h3>
                  <p className="text-xs md:text-sm text-gray-600">{curso.duration}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2 text-sm md:text-base">Estudiantes</h3>
                  <p className="text-xs md:text-sm text-gray-600">{curso.students.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Lo que aprenderás */}
            {curso.whatYouWillLearn && curso.whatYouWillLearn.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
                  Lo que aprenderás en este curso
                </h2>
                <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  {curso.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 md:gap-3">
                      <span className="text-green-500 text-lg md:text-xl flex-shrink-0 mt-1">✓</span>
                      <p className="text-xs md:text-sm text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requisitos */}
            {curso.requirements && curso.requirements.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
                  Requisitos
                </h2>
                <ul className="space-y-2 md:space-y-3">
                  {curso.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 md:gap-3">
                      <span className="text-blue-500 text-lg md:text-xl flex-shrink-0">•</span>
                      <p className="text-xs md:text-sm text-gray-700">{req}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar - Temario */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg sticky top-20">
              <div className="p-4 md:p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-xl">
                <h3 className="text-lg md:text-xl font-bold">Temario del Curso</h3>
                <p className="text-xs md:text-sm text-blue-100 mt-1">
                  {curso.secciones?.length || 0} secciones disponibles
                </p>
              </div>

              <div className="max-h-96 md:max-h-[calc(100vh-250px)] overflow-y-auto">
                {curso.secciones && curso.secciones.length > 0 ? (
                  <div className="divide-y">
                    {curso.secciones.map((seccion, index) => (
                      <button
                        key={index}
                        onClick={() => cambiarSeccion(seccion)}
                        className={`w-full text-left p-3 md:p-4 hover:bg-blue-50 transition ${
                          seccionActual?.numero === seccion.numero
                            ? 'bg-blue-50 border-l-4 border-blue-600'
                            : ''
                        }`}
                      >
                        <div className="flex items-start gap-2 md:gap-3">
                          <span className={`flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold ${
                            seccionActual?.numero === seccion.numero
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {seccion.numero}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-semibold text-xs md:text-sm line-clamp-2 ${
                              seccionActual?.numero === seccion.numero
                                ? 'text-blue-600'
                                : 'text-gray-800'
                            }`}>
                              {seccion.titulo}
                            </h4>
                            {seccion.temario && (
                              <p className="text-xs text-gray-500 mt-1">
                                {seccion.temario.length} temas
                              </p>
                            )}
                          </div>
                          {seccionActual?.numero === seccion.numero && (
                            <span className="text-blue-600 flex-shrink-0">▶</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <p>No hay secciones disponibles</p>
                  </div>
                )}
              </div>

              <div className="p-3 md:p-4 bg-gray-50 rounded-b-xl border-t">
                <Link
                  to="/cursos"
                  className="block text-center bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition text-sm md:text-base"
                >
                  Volver a cursos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}