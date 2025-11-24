import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

export default function Register() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    university: '',
    studentId: '',
    career: '',
    semester: '',
    motivation: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setStep(2);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Nombre requerido';
    if (!formData.email.includes('@')) newErrors.email = 'Email inválido';
    if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (userType === 'becado') {
      if (!formData.university) newErrors.university = 'Universidad requerida';
      if (!formData.career) newErrors.career = 'Carrera requerida';
      if (!formData.studentId) newErrors.studentId = 'Matrícula requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const submitData = { ...formData, userType };
      await authAPI.register(submitData);
      setSuccess(true);
      setStep(3);
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Error al registrar' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Crear Cuenta</h1>
          <p className="text-gray-600">Únete a nuestra plataforma educativa</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>1</div>
            <div className={`w-24 h-1 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>2</div>
            <div className={`w-24 h-1 ${step >= 3 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>3</div>
          </div>
        </div>

        {/* Step 1: User Type Selection */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              ¿Cómo quieres registrarte?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => handleUserTypeSelect('becado')}
                className="p-8 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition text-left"
              >
                <div className="text-green-600 text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Estudiante Becado</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Soy estudiante universitario y quiero acceder a becas
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Cursos gratuitos
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Descuentos especiales
                  </li>
                </ul>
              </button>

              <button
                onClick={() => handleUserTypeSelect('comprador')}
                className="p-8 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-lg transition text-left"
              >
                <div className="text-purple-600 text-4xl mb-4">🛒</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Comprador</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Quiero adquirir cursos y aprender nuevas habilidades
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">✓</span>
                    Acceso inmediato
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">✓</span>
                    Todos los cursos
                  </li>
                </ul>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Registration Form */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <button
              onClick={() => setStep(1)}
              className="text-gray-600 hover:text-gray-800 mb-4"
            >
              ← Volver
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {userType === 'becado' ? '🎓 Registro de Becado' : '🛒 Registro de Comprador'}
            </h2>

            {errors.submit && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {errors.submit}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Ej: María González"
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder={userType === 'becado' ? 'maria@uni.edu.pe' : 'maria@email.com'}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contraseña *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Mínimo 6 caracteres"
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirmar Contraseña *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Repite tu contraseña"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              {userType === 'becado' && (
                <div className="border-t pt-4 mt-6 space-y-4">
                  <h3 className="font-semibold text-gray-700">📚 Información Académica</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Universidad *</label>
                      <input
                        type="text"
                        name="university"
                        value={formData.university}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.university ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Ej: Universidad Nacional"
                      />
                      {errors.university && <p className="text-red-500 text-xs mt-1">{errors.university}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">N° de Matrícula *</label>
                      <input
                        type="text"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.studentId ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Ej: 20210234"
                      />
                      {errors.studentId && <p className="text-red-500 text-xs mt-1">{errors.studentId}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Carrera *</label>
                      <input
                        type="text"
                        name="career"
                        value={formData.career}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.career ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Ej: Ing. de Sistemas"
                      />
                      {errors.career && <p className="text-red-500 text-xs mt-1">{errors.career}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Semestre</label>
                      <select
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="">Selecciona</option>
                        {[1,2,3,4,5,6,7,8,9,10].map(sem => (
                          <option key={sem} value={sem}>{sem}° Semestre</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Carta de Motivación</label>
                    <textarea
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="¿Por qué quieres acceder a nuestra beca?"
                    />
                  </div>
                </div>
              )}

              {userType === 'comprador' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="+51 999 999 999"
                  />
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-4 rounded-lg text-white font-semibold text-lg transition hover:shadow-lg disabled:opacity-50 ${
                  userType === 'becado' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-purple-500 hover:bg-purple-600'
                }`}
              >
                {loading ? 'Registrando...' : userType === 'becado' ? '📝 Solicitar Beca' : '🛒 Crear Cuenta'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && success && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">✓</span>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {userType === 'becado' ? '¡Solicitud Enviada!' : '¡Cuenta Creada!'}
            </h2>
            
            {userType === 'becado' ? (
              <div>
                <p className="text-gray-600 mb-6">
                  Tu solicitud de beca está en revisión. Recibirás un email en 1-3 días hábiles.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-6">
                  ¡Bienvenido! Ya puedes explorar nuestro catálogo de cursos.
                </p>
              </div>
            )}

            <button 
              onClick={() => navigate('/login')}
              className={`px-8 py-3 rounded-lg text-white font-semibold transition hover:shadow-lg ${
                userType === 'becado' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-purple-500 hover:bg-purple-600'
              }`}
            >
              Ir al Login
            </button>
          </div>
        )}

        <p className="mt-6 text-center text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-blue-500 font-semibold hover:text-blue-700">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}