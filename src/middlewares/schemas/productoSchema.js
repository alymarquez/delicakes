const Joi = require('joi')

const productoSchema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(150)
        .required(),
    
    descripcion: Joi.string()
        .min(5)
        .max(250)
        .required(),
    
    precio: Joi.number()
        .required(),
    
    imagen: Joi.string()
        .required(),
})


module.exports = productoSchema