import axios from 'axios';
import { useToastStore } from '@/stores/toast';

const api = axios.create({
  baseURL: 'http://api.localhost:8000/v1',
  headers: {
    'Accept': 'application/json'
  }
});

// Request interceptor to add the auth token if available
api.interceptors.request.use(
  (config) => {
    // You can also get this from localStorage or Pinia store
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'Terjadi kesalahan pada server';
    let skipGlobalToast = false;
    let action = null;
    
    if (error.response) {
      errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;

      // Handle Laravel Validation Errors (422)
      if (error.response.status === 422) {
        skipGlobalToast = true;
        if (error.response.data?.errors) {
          // Get the first error message from the validation errors object
          const firstError = Object.values(error.response.data.errors)[0][0];
          errorMessage = firstError;
          // Mutate response so local catch blocks also show the specific error
          error.response.data.message = errorMessage;
        }
      }

      if (error.response.status === 401) {
        // Token expired or unauthorized
        localStorage.removeItem('auth_token');
        localStorage.removeItem('admin_auth');
        localStorage.removeItem('admin_current_user');
        errorMessage = 'Sesi Anda telah habis. Silakan login kembali.';
        // Redirect to login if not already there
        if (window.location.pathname !== '/admin/login') {
          window.location.href = '/admin/login';
        }
      }
    } else if (error.request) {
      errorMessage = 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
    }

    if (errorMessage === 'Tidak ada periode aktif.') {
      errorMessage = 'Tidak ada periode aktif. Silakan buat periode baru terlebih dahulu.';
      action = { label: 'Buat Periode Baru', route: '/admin/qurban/periode' };
    }

    // Show toast for error
    if (typeof skipGlobalToast === 'undefined' || !skipGlobalToast) {
      try {
        const toast = useToastStore();
        toast.addToast(errorMessage, 'error', action);
      } catch (e) {
        console.error('Toast failed to display:', e);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
