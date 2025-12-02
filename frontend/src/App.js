import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cursos from './pages/Cursos';
import Becados from './pages/Becados';
import Contacto from './pages/Contacto';
import ForgotPassword from './pages/ForgotPassword'; 
import ResetPassword from './pages/ResetPassword';   
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import CursoDetalle from './pages/CursoDetalle';
import AuthSuccess from './pages/AuthSuccess';
import Certificado from './pages/Certificado'; 
import ChatWidget from './components/Chatbot/ChatWidget';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cursos" element={<Cursos />} />
            <Route path="/becados" element={<Becados />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/cursos/:slug" element={<CursoDetalle />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/auth/success" element={<AuthSuccess />} />
            
            
            {/* NUEVA RUTA - Certificado (requiere login) */}
            <Route 
              path="/certificado/:slug" 
              element={
                <ProtectedRoute>
                  <Certificado />
                </ProtectedRoute>
              } 
            />
            
            {/* Solo admin */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>

          {/* Footer - Aparece en todas las páginas */}
          <Footer />

          {/* Chatbot - Aparece en todas las páginas */}
          <ChatWidget />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;