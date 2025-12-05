import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';
export const useApi = () => {
  // Estados
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);
const execute = useCallback(async (apiCall, options = {}) => {
    const {
    successMessage = null,
    errorMessage = 'Ocurrió un error',
    showSuccessToast = false,
    showErrorToast = true,
      retries = 0, // Número de reintentos
      retryDelay = 1000, // Delay entre reintentos (ms)
    onSuccess = null,
    onError = null
    } = options;
    // Reiniciar estados
    setLoading(true);
    setError(null);
    // Función recursiva para reintentos
    const attemptRequest = async (attemptsLeft) => {
    try {
        // Ejecutar la llamada a la API
        const response = await apiCall();
        
        // Extraer datos (axios devuelve data dentro de data)
        const responseData = response.data || response;
        
        // Actualizar estado
        setData(responseData);
        setLoading(false);
        // Mostrar toast
        if (showSuccessToast && successMessage) {
        toast.success(successMessage);
        }
        // Callback de éxito
        if (onSuccess) {
        onSuccess(responseData);
        }
        return responseData;
    } catch (err) {
        console.error('Error en API call:', err);
        // Si quedan reintentos, intentar de nuevo
        if (attemptsLeft > 0) {
        console.log(`Reintentando... (${attemptsLeft} intentos restantes)`);
        
          // Esperar antes de reintentar
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        
        return attemptRequest(attemptsLeft - 1);
        }
        // No quedan reintentos, manejar el error
        const errorData = {
        message: err.response?.data?.message || err.message || errorMessage,
        status: err.response?.status,
        statusText: err.response?.statusText,
        isNetworkError: !err.response
        };
        setError(errorData);
        setLoading(false);
        // Mostrar toast de error
        if (showErrorToast) {
          // Mensajes específicos según el tipo de error
        if (errorData.isNetworkError) {
            toast.error('Error de conexión. Verifica tu internet.');
        } else if (errorData.status === 401) {
            toast.error('Sesión expirada. Inicia sesión nuevamente.');
        } else if (errorData.status === 403) {
            toast.error('No tienes permisos para esta acción.');
        } else if (errorData.status === 404) {
            toast.error('Recurso no encontrado.');
        } else if (errorData.status >= 500) {
            toast.error('Error del servidor. Intenta más tarde.');
        } else {
            toast.error(errorData.message);
        }
        }
        // Callback de error
        if (onError) {
        onError(errorData);
        }
        throw errorData;
    }
    };
    // Iniciar la petición con reintentos
    return attemptRequest(retries);
}, []);
const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
}, []);

return {
    loading,
    error,
    data,
    execute,
    reset
};
};
export default useApi;