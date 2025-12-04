import axios from 'axios';

// fallback
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000, // 10 segundos timeout
});

// Agregar token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el token expiró o es inválido
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Verificar error de red
    if (!error.response) {
      console.error('Error de red - servidor no disponible');
    }
    
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password })
};

export const cursosAPI = {
  getAll: () => api.get('/cursos'),
  getBySlug: (slug) => api.get(`/cursos/${slug}`)
};

export const becadosAPI = {
  getAprobados: () => api.get('/becados/aprobados'),
  getEstadisticas: () => api.get('/becados/estadisticas')
};

export const adminAPI = {
  getBecasPendientes: () => api.get('/admin/becas/pendientes'),
  aprobarBeca: (userId) => api.put(`/admin/becas/${userId}/aprobar`),
  rechazarBeca: (userId, motivo) => api.put(`/admin/becas/${userId}/rechazar`, { motivo })
};

export default api;