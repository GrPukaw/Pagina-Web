import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-bold">
              🌉 Plataforma Educativa
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-gray-200 transition">
              Inicio
            </Link>
            <Link to="/cursos" className="text-white hover:text-gray-200 transition">
              Cursos
            </Link>
            <Link to="/becados" className="text-white hover:text-gray-200 transition">
              Becados
            </Link>
            <Link to="/contacto" className="text-white hover:text-gray-200 transition">
              Contacto
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white">Hola, {user.fullName}</span>
                
                {/* Botón Panel Admin - Solo visible para admins */}
                {user.userType === 'admin' && (
                  <Link
                    to="/admin"
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
                  >
                    👨‍💼 Panel Admin
                  </Link>
                )}
                
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}