const Joi = require('joi');

const pedidoSchema = Joi.object({
  usuarioId: Joi.number()
    .integer()
    .optional(),

  productos: Joi.array()
    .items(
      Joi.object({
        productoId: Joi.number().integer().required(),
        cantidad: Joi.number().integer().required()
      })
    )
    .required(),

  total: Joi.number().required(),

  estado: Joi.string()
    .valid('pendiente', 'en preparación', 'enviado', 'entregado', 'cancelado')
    .default('pendiente')
});

module.exports = pedidoSchema;
