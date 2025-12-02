import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-black shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-white text-xl md:text-2xl font-bold flex-shrink-0" onClick={closeMenu}>
            Plataforma educativa PuenteX
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-gray-200 transition font-medium">
              Inicio
            </Link>
            <Link to="/cursos" className="text-white hover:text-gray-200 transition font-medium">
              Cursos Gratuitos
            </Link>
            <Link to="/becados" className="text-white hover:text-gray-200 transition font-medium">
              Becados
            </Link>
            <Link to="/contacto" className="text-white hover:text-gray-200 transition font-medium">
              Contacto
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white text-sm">Hola, {user.fullName.split(' ')[0]}</span>
                
                {user.userType === 'admin' && (
                  <Link
                    to="/admin"
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition text-sm"
                  >
                    Panel Admin
                  </Link>
                )}
                
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition text-sm"
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gray-900 rounded-b-2xl shadow-xl animate-slideDown">
            <div className="px-4 pt-4 pb-6 space-y-3">
              <Link
                to="/"
                onClick={closeMenu}
                className="block text-white hover:bg-gray-700 px-4 py-3 rounded-lg transition font-medium"
              >
                🏠 Inicio
              </Link>
              <Link
                to="/cursos"
                onClick={closeMenu}
                className="block text-white hover:bg-gray-700 px-4 py-3 rounded-lg transition font-medium"
              >
                📚 Cursos Gratuitos
              </Link>
              <Link
                to="/becados"
                onClick={closeMenu}
                className="block text-white hover:bg-gray-700 px-4 py-3 rounded-lg transition font-medium"
              >
                🎓 Becados
              </Link>
              <Link
                to="/contacto"
                onClick={closeMenu}
                className="block text-white hover:bg-gray-700 px-4 py-3 rounded-lg transition font-medium"
              >
                📞 Contacto
              </Link>

              {user ? (
                <>
                  <div className="border-t border-gray-700 pt-3 mt-3">
                    <div className="text-white text-sm mb-3 px-4 font-semibold">
                      👤 {user.fullName}
                    </div>
                    
                    {user.userType === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={closeMenu}
                        className="block bg-yellow-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition text-center mb-2"
                      >
                        Panel Admin
                      </Link>
                    )}
                    
                    <button
                      onClick={handleLogout}
                      className="w-full bg-white text-blue-600 px-4 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t border-gray-700 pt-3 mt-3">
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="block bg-white text-blue-600 px-4 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-center"
                  >
                    Iniciar Sesión
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}