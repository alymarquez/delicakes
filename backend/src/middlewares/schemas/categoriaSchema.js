const Joi = require('joi')

const categoriaSchema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(150)
        .required(),
    
    imagenUrl: Joi.string()
        .uri()
        .optional(),
})


module.exports = categoriaSchema