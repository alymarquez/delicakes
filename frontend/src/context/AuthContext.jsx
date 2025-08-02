import { createContext, useContext } from 'react';

// Crea el contexto sin un valor por defecto, ya que el Provider lo proporcionará.
export const AuthContext = createContext(null);

// Un hook personalizado para usar el contexto de forma segura.
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}