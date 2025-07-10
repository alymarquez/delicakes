const {Producto, Categoria} = require('../db/models')

const crearCategoria = async (req, res) => {
    try {
        const {nombre} = req.body
        console.log('--- DEBUG Categoria ---');
        console.log('Nombre de tabla esperado por el modelo Categoria:', Categoria.tableName);
        console.log('Opciones del modelo Categoria:', Categoria.options);
        console.log('--- FIN DEBUG Categoria ---');
        
        const categoria = await Categoria.create({nombre})

        res.status(201).json({ msg: 'Categoria creada', categoria: categoria })
    } catch (error) {
        console.error('Error al crear categoria:', error)
        res.status(500).json({ msg: 'Error en el servidor' })
    }
}


const obtenerCategorias = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}


const obtenerCategoria = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

const actualizarCategoria = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

const eliminarCategoria = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria
}