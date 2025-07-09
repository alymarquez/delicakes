const {Producto} = require('../db/models')

const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll()
        res.status(200).json(productos)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error interno del servidor al obtener productos', error: error.message })
    }
};

const obtenerProductoPorId = async (req, res) => {
    try {
        const producto = req.producto
        res.status(200).json(producto)
    } catch (error) {
        console.error('Error al obtener la producto por ID:', error)
        res.status(500).json({ message: 'Error interno del servidor al obtener la producto', error: error.message })
    }
};

const crearProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, imagen } = req.body

        const producto = await Producto.create({ nombre, descripcion, precio, imagen })

        res.status(201).json(producto); 
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al crear producto' })
    }
}

const actualizarProducto = async (req, res) => {
    try {
        const producto = req.producto
        const { nombre, descripcion, precio, imagen } = req.body

        producto.nombre = nombre,
        producto.descripcion = descripcion,
        producto.precio = precio
        producto.imagen = imagen

        await producto.save()
        res.status(200).json(producto)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al actualizar producto' })
    }
}

const eliminarProducto = async (req, res) => {
    try {
        const producto = req.producto
        await producto.destroy()
        res.status(200).json({message: "Producto eliminado"})
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al eliminar producto' })
    }
}

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}

