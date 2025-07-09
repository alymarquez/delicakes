import { apiFetch } from './apiFetch'

export const crearPedido = async (pedidoData) => {
    return apiFetch(`pedidos`, 'POST', pedidoData)
}

export const obtenerPedidos = async (token) => {
    return apiFetch(`pedidos`, 'GET', { 'Authorization': `Bearer ${token}`})
}

export const obtenerPedido = async (id, token) => {
    return apiFetch(`pedidos${id}`, 'GET', { 'Authorization': `Bearer ${token}`})
}

export const actualizarPedido = async (id, pedidoData, token) => {
    return apiFetch(`pedidos${id}`, 'PUT', pedidoData, { 'Authorization': `Bearer ${token}`})
}

export const eliminarPedido = async (id, token) => {
    return apiFetch(`pedidos${id}`, 'DELETE', { 'Authorization': `Bearer ${token}`})
}

