import { apiFetch } from './apiFetch'

export const crearProducto = async (productoData, token) => {
    return apiFetch(`productos`, 'POST', productoData, { 'Authorization': `Bearer ${token}` })
}

export const obtenerProductos = async () => {
    return apiFetch(`productos`, 'GET')
}

export const obtenerProducto = async (id) => {
    return apiFetch(`productos/${id}`, 'GET')
}

export const actualizarProducto = async (id, productoData, token) => {
    return apiFetch(`productos/${id}`, 'PUT', productoData, { 'Authorization': `Bearer ${token}` })
}

export const eliminarProducto = async (id, token) => {
    return apiFetch(`productos/${id}`, 'DELETE', { 'Authorization': `Bearer ${token}` })
}

