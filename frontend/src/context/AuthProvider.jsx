// src/context/AuthProvider.js

import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext'; // Importamos el contexto desde el archivo anterior
import { loginUsuario, registrarUsuario } from '../services/usuariosApi';

export function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState({
    token: null,
    usuario: null,
    isAuthenticated: false,
    loading: true,
  });

  useEffect(() => {
    const loadAuthInfo = () => {
      const token = localStorage.getItem('token');
      const usuarioString = localStorage.getItem('usuario');
      
      if (token && usuarioString) {
        try {
          const usuario = JSON.parse(usuarioString);
          setAuthInfo({
            token,
            usuario,
            isAuthenticated: true,
            loading: false,
          });
        } catch (e) {
          console.error("Error al parsear el usuario del localStorage", e);
          localStorage.removeItem('token');
          localStorage.removeItem('usuario');
          setAuthInfo(prev => ({ ...prev, loading: false }));
        }
      } else {
        setAuthInfo(prev => ({ ...prev, loading: false }));
      }
    };
    loadAuthInfo();
  }, []);

  const login = async (credenciales) => {
    // Lógica para iniciar sesión con la API
    try {
      const response = await loginUsuario(credenciales);
      const { token, usuario } = response;
      
      if (token && usuario) {
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        
        setAuthInfo({
          token,
          usuario,
          isAuthenticated: true,
          loading: false,
        });
        return { success: true };
      } else {
        return { success: false, error: 'Respuesta de la API de login incompleta.' };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    // Lógica para registrarse con la API
    try {
      await registrarUsuario(userData);
      return { success: true };
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    // Lógica para cerrar sesión
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setAuthInfo({
      token: null,
      usuario: null,
      isAuthenticated: false,
      loading: false,
    });
  };

  const value = {
    ...authInfo,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {authInfo.loading ? <div>Cargando sesión...</div> : children}
    </AuthContext.Provider>
  );
}