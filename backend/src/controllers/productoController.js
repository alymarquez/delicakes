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

const asociarACategoria = async (req, res) => {
    try {
        const producto = req.producto
        const categoria = req.categoria

        const yaAsociado = await producto.hasCategoria(categoria)

        if (yaAsociado) {
            return res.status(409).json({ message: `El producto ${producto.id} ya está asociado a la categoría ${categoria.id}.` })
        }

        await producto.addCategoria(categoria)

        res.status(200).json({ message: `Producto ${producto.id} asociado a la categoría ${categoria.id} correctamente.` })
    } catch (error) {
        console.error('Error al asociar categoria a producto:', error)
        res.status(500).json({ msg: 'Error intero del servidor al asociar categoría' })
    }
}


const desasociarCategoria = async (req, res) => {
    try {
        const producto = req.producto
        const categoria = req.categoria

        const yaAsociado = await producto.hasCategoria(categoria);

        if (!yaAsociado) {
            return res.status(404).json({ message: `El producto ${producto.id} no está asociado a la categoría ${categoria.id}. No hay nada que desasociar.` })
        }

        await producto.removeCategoria(categoria)

        res.status(200).json({ message: `Producto ${producto.id} desasociado de la categoría ${categoria.id} correctamente.` })
    } catch (error) {
        console.error('Error al desasociar categoría de producto:', error)
        res.status(500).json({ message: 'Error interno del servidor al desasociar categoría.' })
    }
}

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    asociarACategoria,
    desasociarCategoria
}

