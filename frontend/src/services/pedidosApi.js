import { apiFetch } from './apiFetch'

export const crearPedido = async (pedidoData) => {
    return apiFetch(`pedidos`, 'POST', pedidoData)
}

export const obtenerPedidos = async (token) => {
    return apiFetch(`pedidos`, 'GET', { 'Authorization': `Bearer ${token}`})
}

export const obtenerPedido = async (id, token) => {
    return apiFetch(`pedidos/${id}`, 'GET', { 'Authorization': `Bearer ${token}`})
}

export const actualizarPedido = async (id, pedidoData, token) => {
    return apiFetch(`pedidos/${id}`, 'PUT', pedidoData, { 'Authorization': `Bearer ${token}`})
}

export const eliminarPedido = async (id, token) => {
    return apiFetch(`pedidos/${id}`, 'DELETE', { 'Authorization': `Bearer ${token}`})
}


// carrito
export const obtenerCarrito = async (token) => {
  return apiFetch('pedidos/carrito', 'GET', null, { 'Authorization': `Bearer ${token}` })
}

export const agregarProductoAlCarrito = async (data, token) => {
    return apiFetch('pedidos/carrito', 'POST', data, { 'Authorization': `Bearer ${token}` })
}

export const eliminarProductoDelCarrito = async (productoId, token) => {
  return apiFetch(`pedidos/carrito/${productoId}`, 'DELETE', null, { 'Authorization': `Bearer ${token}` })
}

export const finalizarCompra = async (token) => {
  return apiFetch('pedidos/checkout', 'POST', null, { 'Authorization': `Bearer ${token}` })
}

export const disminuirProducto = async (data, token) => {
    return apiFetch('pedidos/carrito/disminuir', 'PUT', data, { 'Authorization': `Bearer ${token}` })
}