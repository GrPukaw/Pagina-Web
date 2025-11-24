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
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;