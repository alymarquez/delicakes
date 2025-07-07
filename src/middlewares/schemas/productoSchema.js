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
        .positive()
        .required(),
    
    imagen: Joi.string()
        .uri()
        .required(),
})


module.exports = productoSchema