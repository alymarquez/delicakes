const {Producto, Categoria} = require('../db/models')

const crearCategoria = async (req, res) => {
    try {
        const {nombre} = req.body

        const categoria = await Categoria.create({nombre})

        res.status(201).json({ msg: 'Categoria creada', categoria: categoria })
    } catch (error) {
        console.error('Error al crear categoria:', error)
        res.status(500).json({ msg: 'Error en el servidor' })
    }
}


const obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll()
        res.status(200).json(categorias)
    } catch (error) {
        
    }
}


const obtenerCategoria = async (req, res) => {
    try {
        const categoria = req.categoria
        res.status(200).json(categoria)
    } catch (error) {
        
    }
}

const actualizarCategoria = async (req, res) => {
    try {
        const categoria = req.categoria
        const { nombre } = req.body

        categoria.nombre = nombre,

        await categoria.save()
        res.status(200).json(categoria)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al actualizar categoria' })
    }
}

const eliminarCategoria = async (req, res) => {
    try {
        const categoria = req.categoria
        await categoria.destroy()
        res.status(200).json({message: "Categoria eliminada"})
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al eliminar categoria' })
    }
}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria
}