const Joi = require('joi')

const registroSchema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(150)
        .required(),
    
    email: Joi.string()
        .min(5)
        .max(150)
        .required(),
    
    password: Joi.string()
        .min(8)
        .max(300)
        .required(),

})


module.exports = registroSchema