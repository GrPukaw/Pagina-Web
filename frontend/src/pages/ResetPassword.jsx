import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
const { token } = useParams();
const navigate = useNavigate();
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [loading, setLoading] = useState(false);
const [validating, setValidating] = useState(true);
const [error, setError] = useState('');
const [success, setSuccess] = useState(false);
const [tokenValid, setTokenValid] = useState(false);

// useCallback para validateToken
const validateToken = useCallback(async () => {
    try {
    await axios.get(`http://localhost:5000/api/auth/reset-password/${token}`);
    setTokenValid(true);
    } catch (err) {
    setError('El enlace de recuperación es inválido o ha expirado');
    setTokenValid(false);
    } finally {
    setValidating(false);
    }
}, [token]);

// Incluir validateToken en las dependencias
useEffect(() => {
    validateToken();
}, [validateToken]);

const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password.length < 6) {
    setError('La contraseña debe tener al menos 6 caracteres');
    return;
    }
    
    if (password !== confirmPassword) {
    setError('Las contraseñas no coinciden');
    return;
    }

    setLoading(true);
    setError('');

    try {
    await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
        password
    });
    
    setSuccess(true);
    setTimeout(() => {
        navigate('/login');
    }, 3000);
    } catch (err) {
    setError(err.response?.data?.message || 'Error al restablecer la contraseña');
    } finally {
    setLoading(false);
    }
};

if (validating) {
    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Validando enlace...</p>
        </div>
    </div>
    );
}

if (!tokenValid) {
    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">❌</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Enlace Inválido
            </h2>
            <p className="text-gray-600 mb-6">
            {error}
            </p>
            <Link
            to="/forgot-password"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition inline-block"
            >
            Solicitar nuevo enlace
            </Link>
        </div>
        </div>
    </div>
    );
}

return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
    <div className="max-w-md w-full">
        <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🔑</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Nueva Contraseña
        </h2>
        <p className="text-gray-600">
            Crea una contraseña segura para tu cuenta
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

            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nueva Contraseña
                </label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Mínimo 6 caracteres"
                required
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirmar Contraseña
                </label>
                <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Repite tu contraseña"
                required
                />
            </div>

            {password && (
                <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600">Fortaleza:</span>
                    <span className={`text-xs font-semibold ${
                    password.length < 6 ? 'text-red-500' :
                    password.length < 8 ? 'text-yellow-500' :
                    'text-green-500'
                    }`}>
                    {password.length < 6 ? 'Débil' :
                    password.length < 8 ? 'Media' :
                    'Fuerte'}
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                    className={`h-2 rounded-full transition-all ${
                        password.length < 6 ? 'bg-red-500 w-1/3' :
                        password.length < 8 ? 'bg-yellow-500 w-2/3' :
                        'bg-green-500 w-full'
                    }`}
                    ></div>
                </div>
                </div>
            )}

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
                    Actualizando...
                </span>
                ) : (
                '🔒 Restablecer Contraseña'
                )}
            </button>
            </form>
        ) : (
            <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
                ¡Contraseña Actualizada!
            </h3>
            <p className="text-gray-600 mb-4">
                Tu contraseña se ha restablecido exitosamente
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700">
                Redirigiendo al login en 3 segundos...
                </p>
            </div>
            <Link
                to="/login"
                className="text-blue-500 hover:text-blue-700 font-semibold"
            >
                Ir al login ahora →
            </Link>
            </div>
        )}
        </div>

        {!success && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
            <span className="text-xl mr-2">🛡️</span>
            Consejos para una contraseña segura
            </h4>
            <ul className="text-xs text-gray-600 space-y-1">
            <li>• Usa al menos 8 caracteres</li>
            <li>• Combina letras mayúsculas y minúsculas</li>
            <li>• Incluye números y símbolos</li>
            <li>• No uses información personal obvia</li>
            </ul>
        </div>
        )}
    </div>
    </div>
);
}