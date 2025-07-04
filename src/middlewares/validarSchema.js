const productoSchema = require('./schemas/productoSchema')

const validarSchema = (schema, nombre) => (req,res,next) => {
    const { error } = schema.validate(req.body)
    if(error){
        return res.status(400).json({
            message: `Error al crear ${nombre}`,
            error: error.details[0].message
        })
    }
    next()
}

const validarProducto = validarSchema(productoSchema, 'producto')

module.exports = {
    validarProducto
}