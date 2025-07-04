// src/hooks/useAuth.js
import { useState } from 'react';
import { loginUser } from '../services/authService';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const token = await loginUser(email, password);
      localStorage.setItem('token', token);
      return true; // ✅ login exitoso
    } catch (err) {
      setError('Credenciales inválidas o error del servidor.');
      return false; // ❌ login fallido
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}

