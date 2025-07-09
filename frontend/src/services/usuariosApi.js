import { apiFetch } from './apiFetch'

export const registrarUsuario = async (usuarioData) => {
    return apiFetch('/usuarios/register', 'POST', usuarioData);
}

export const logearUsuario = async (usuarioData) => {
    return apiFetch('/usuarios/login', 'POST', usuarioData);
}

export const eliminarUsuario = async (token) => {
    return apiFetch('/usuarios/delete', 'DELETE', { 'Authorization': `Bearer ${token}` });
}