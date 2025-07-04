const productoSchema = require('./schemas/productoSchema')
const registroSchema = require('./schemas/registroSchema')
const loginSchema = require('./schemas/loginSchema')

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
const validarRegistro = validarSchema(registroSchema, 'usuario')
const validarLogin = validarSchema(loginSchema, 'usuario')

module.exports = {
    validarProducto,
    validarRegistro,
    validarLogin
}