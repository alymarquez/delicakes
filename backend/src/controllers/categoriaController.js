const {Producto, Categoria} = require('../db/models')

const crearCategoria = async (req, res) => {
    try {
        const {nombre, imagenUrl} = req.body

        const categoria = await Categoria.create({nombre, imagenUrl})

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
        console.error(error)
        res.status(500).json({ error: 'Error al obtener categorias' })
    }
}


const obtenerCategoria = async (req, res) => {
    try {
        const {id} = req.params
        const categoria = await Categoria.findByPk(id, {
        include: [{
            model: Producto,
            as: 'Productos',
            through: { attributes: [] }
            }]
        })

        res.status(200).json(categoria)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al obtener productos de categoria' })
    }
}

const actualizarCategoria = async (req, res) => {
    try {
        const categoria = req.categoria
        const { nombre, imagenUrl } = req.body

        categoria.nombre = nombre,
        categoria.imagenUrl = imagenUrl

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