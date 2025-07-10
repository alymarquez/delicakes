const {Producto, Usuario, Pedido, Categoria} = require('../db/models')

const validarExistenciaId = (modelo, data = 'id', cuerpo, nombre) => async (req, res, next) => {
    try {
        const id = req[cuerpo][data];
        const existeId = await modelo.findByPk(id)
        if (!existeId) {
          return res.status(404).json({ message: `${nombre} inexistente.` });
        }
        req[nombre] = existeId; // guardar el producto para el controlador
        next()
    } catch (error) {
        console.error('Error en validarExistenciaId:', error)
        return res.status(500).json({ message: "Error al validar existencia", error: error.message })
    }
}

const existeProducto = validarExistenciaId(Producto, 'id', 'params', 'producto')
const existeUsuario = validarExistenciaId(Usuario, 'id', 'params', 'usuario')
const existePedido = validarExistenciaId(Pedido, 'id', 'params', 'pedido')
const existeCategoria = validarExistenciaId(Categoria, 'id', 'params', 'categoria')

const existeProductoAsociacion = validarExistenciaId(Producto, 'productoId', 'params', 'producto')
const existeCategoriaAsociacion = validarExistenciaId(Categoria, 'categoriaId', 'params', 'categoria')


module.exports = {
    existeProducto,
    existeUsuario,
    existePedido,
    existeCategoria,
    existeProductoAsociacion,
    existeCategoriaAsociacion
}