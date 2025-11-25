import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [becadosPendientes, setBecadosPendientes] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [procesando, setProcesando] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [pendientesRes, statsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/becas/pendientes', { headers }),
        axios.get('http://localhost:5000/api/admin/estadisticas', { headers })
      ]);

      setBecadosPendientes(pendientesRes.data.becados);
      setEstadisticas(statsRes.data.estadisticas);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      setLoading(false);
    }
  };

  const handleAprobar = async (userId, fullName) => {
    if (!window.confirm(`¿Aprobar la beca de ${fullName}?`)) return;

    setProcesando(userId);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/admin/becas/${userId}/aprobar`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('✅ Beca aprobada exitosamente');
      fetchData();
    } catch (error) {
      console.error('Error al aprobar:', error);
      alert('❌ Error al aprobar la beca');
    } finally {
      setProcesando(null);
    }
  };

  const handleRechazar = async (userId, fullName) => {
    const motivo = prompt(`¿Por qué rechazar la beca de ${fullName}?`);
    if (!motivo) return;

    setProcesando(userId);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/admin/becas/${userId}/rechazar`,
        { motivo },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('❌ Beca rechazada');
      fetchData();
    } catch (error) {
      console.error('Error al rechazar:', error);
      alert('❌ Error al rechazar la beca');
    } finally {
      setProcesando(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            👨‍💼 Panel de Administración
          </h1>
          <p className="text-gray-600">Gestiona becas y usuarios de la plataforma</p>
        </div>

        {/* Estadísticas */}
        {estadisticas && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl font-bold text-blue-600">{estadisticas.totalUsuarios}</div>
              <div className="text-sm text-gray-600">Total Usuarios</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl font-bold text-yellow-600">{estadisticas.becadosPendientes}</div>
              <div className="text-sm text-gray-600">Becas Pendientes</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl font-bold text-green-600">{estadisticas.becadosAprobados}</div>
              <div className="text-sm text-gray-600">Becas Aprobadas</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl font-bold text-red-600">{estadisticas.becadosRechazados}</div>
              <div className="text-sm text-gray-600">Becas Rechazadas</div>
            </div>
          </div>
        )}

        {/* Becados Pendientes */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              ⏳ Solicitudes Pendientes ({becadosPendientes.length})
            </h2>
            <button
              onClick={fetchData}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              🔄 Actualizar
            </button>
          </div>

          {becadosPendientes.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <p className="text-gray-600 text-lg">No hay solicitudes pendientes</p>
            </div>
          ) : (
            <div className="space-y-4">
              {becadosPendientes.map((becado) => (
                <div
                  key={becado._id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Información del Becado */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {becado.fullName}
                      </h3>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-600">
                          <span className="font-semibold">📧 Email:</span> {becado.email}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">🏛️ Universidad:</span>{' '}
                          {becado.scholarship.university}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">📚 Carrera:</span>{' '}
                          {becado.scholarship.career}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">🎓 Semestre:</span>{' '}
                          {becado.scholarship.semester}°
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">🆔 Matrícula:</span>{' '}
                          {becado.scholarship.studentId}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">📅 Solicitado:</span>{' '}
                          {new Date(becado.createdAt).toLocaleDateString('es-PE')}
                        </p>
                      </div>
                    </div>

                    {/* Motivación */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">💭 Carta de Motivación:</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 text-sm italic">
                          "{becado.scholarship.motivation || 'No proporcionada'}"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Botones de Acción */}
                  <div className="flex gap-3 mt-6 pt-6 border-t">
                    <button
                      onClick={() => handleAprobar(becado._id, becado.fullName)}
                      disabled={procesando === becado._id}
                      className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {procesando === becado._id ? '⏳ Procesando...' : '✅ Aprobar Beca'}
                    </button>
                    <button
                      onClick={() => handleRechazar(becado._id, becado.fullName)}
                      disabled={procesando === becado._id}
                      className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {procesando === becado._id ? '⏳ Procesando...' : '❌ Rechazar Beca'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}