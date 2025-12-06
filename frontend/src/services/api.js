import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000,
});

// Interceptor para agregar token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log para debug
    console.log('[API REQUEST]', config.method.toUpperCase(), config.url, config.data);
    
    return config;
  },
  (error) => {
    console.error('[API REQUEST ERROR]', error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => {
    console.log('[API RESPONSE]', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('[API RESPONSE ERROR]', error.response?.config?.url, error.response?.status);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
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