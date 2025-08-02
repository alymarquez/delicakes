import { apiFetch } from './apiFetch'

export const registrarUsuario = async (usuarioData) => {
    return apiFetch('usuarios/register', 'POST', usuarioData);
}

export const loginUsuario = async (usuarioData) => {
    return apiFetch('usuarios/login', 'POST', usuarioData);
}

export const eliminarUsuario = async (id, token) => {
    return apiFetch(`usuarios/${id}`, 'DELETE', { 'Authorization': `Bearer ${token}` });
}