import { apiFetch } from "./apiFetch"

export const crearCategoria = async (categoriaData, token) => {
    return apiFetch(`categorias`, 'POST', categoriaData, { 'Authorization': `Bearer ${token}`})
}

export const obtenerCategorias = async () => {
    return apiFetch(`categorias`, 'GET')
}

export const obtenerCategoria = async (id) => {
    return apiFetch(`categorias/${id}`, 'GET')
}

export const actualizarCategoria = async (id, categoriaData, token) => {
    return apiFetch(`categorias/${id}`, 'PUT', categoriaData, { 'Authorization': `Bearer ${token}`})
}

export const eliminarCategoria = async (id, token) => {
    return apiFetch(`categorias/${id}`, 'DELETE', { 'Authorization': `Bearer ${token}`})
}
