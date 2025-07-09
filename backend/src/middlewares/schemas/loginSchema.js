const Joi = require('joi')

const loginSchema = Joi.object({
    email: Joi.string()
        .min(5)
        .max(150)
        .required(),
    
    password: Joi.string()
        .min(8)
        .max(300)
        .required(),

})


module.exports = loginSchema