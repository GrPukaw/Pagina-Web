import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ForgotPassword() {
const [email, setEmail] = useState('');
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState('');
const [error, setError] = useState('');
const [success, setSuccess] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
        const response = await axios.post('http://localhost:5000/api/auth/forgot-password', {
        email
    });
    
    setSuccess(true);
    setMessage(response.data.message);
    } catch (err) {
    setError(err.response?.data?.message || 'Error al enviar el correo de recuperación');
    } finally {
    setLoading(false);
    }
};

return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
    <div className="max-w-md w-full">
        <div className="text-center mb-8">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🔐</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
            ¿Olvidaste tu contraseña?
        </h2>
        <p className="text-gray-600">
            No te preocupes, te enviaremos un enlace para recuperarla
        </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
        {!success ? (
            <form onSubmit={handleSubmit}>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
                </div>
            )}

            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
                </label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="tu@email.com"
                required
                />
                <p className="text-xs text-gray-500 mt-2">
                Ingresa el email con el que te registraste
                </p>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                </span>
                ) : (
                '📧 Enviar enlace de recuperación'
                )}
            </button>
            </form>
        ) : (
            <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
                ¡Correo enviado!
            </h3>
            <p className="text-gray-600 mb-6">
                {message}
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                <span className="font-semibold">📧 Revisa tu bandeja de entrada</span>
                <br />
                <span className="text-xs text-gray-600">
                    Si no ves el correo, revisa tu carpeta de spam
                </span>
                </p>
            </div>
            <Link
                to="/login"
                className="text-blue-500 hover:text-blue-700 font-semibold"
            >
                ← Volver al login
            </Link>
            </div>
        )}

        {!success && (
            <div className="mt-6 text-center space-y-2">
            <Link
                to="/login"
                className="block text-blue-500 hover:text-blue-700 font-semibold"
            >
                ← Volver al login
            </Link>
            <p className="text-sm text-gray-600">
                ¿No tienes cuenta?{' '}
                <Link to="/register" className="text-blue-500 hover:text-blue-700 font-semibold">
                Regístrate aquí
                </Link>
            </p>
            </div>
        )}
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
            <span className="text-xl mr-2">💡</span>
            Consejos de seguridad
        </h4>
        <ul className="text-xs text-gray-600 space-y-1">
            <li>• El enlace de recuperación expira en 1 hora</li>
            <li>• Nunca compartas tu contraseña con nadie</li>
            <li>• Usa una contraseña segura con letras, números y símbolos</li>
        </ul>
        </div>
    </div>
    </div>
);
}