'use strict';

const { Producto, Categoria } = require('../models')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const tortaSelvaNegra = await Producto.findOne({ where: { nombre: 'Torta Selva Negra' } });
    const cupcakeVainilla = await Producto.findOne({ where: { nombre: 'Cupcake Vainilla' } });
    const galletasMantequilla = await Producto.findOne({ where: { nombre: 'Galletas de Mantequilla' } });
    const pastelBodaClasico = await Producto.findOne({ where: { nombre: 'Pastel de Boda Clásico' } });
    const tortaChocolate = await Producto.findOne({ where: { nombre: 'Torta de Chocolate' } });
    const cupcakeChocolate = await Producto.findOne({ where: { nombre: 'Cupcake de Chocolate' } });


    const categoriaTortas = await Categoria.findOne({ where: { nombre: 'Tortas' } });
    const categoriaCupcakes = await Categoria.findOne({ where: { nombre: 'Cupcakes' } });
    const categoriaCookies = await Categoria.findOne({ where: { nombre: 'Cookies' } });
    const categoriaBodas = await Categoria.findOne({ where: { nombre: 'Bodas' } });

    if (tortaSelvaNegra && categoriaTortas) {
      await tortaSelvaNegra.addCategoria(categoriaTortas)
    }

    if (cupcakeVainilla && categoriaCupcakes) {
      await cupcakeVainilla.addCategoria(categoriaCupcakes)
    }

    if (galletasMantequilla && categoriaCookies) {
      await galletasMantequilla.addCategoria(categoriaCookies)
    }

    if (pastelBodaClasico && categoriaBodas) {
      await pastelBodaClasico.addCategoria(categoriaBodas)
    }

    if (tortaChocolate && categoriaTortas) {
      await tortaChocolate.addCategoria(categoriaTortas)
    }

    if (cupcakeChocolate && categoriaCupcakes) {
      await cupcakeChocolate.addCategoria(categoriaCupcakes)
    }

    // Ejemplo de un producto que pertenece a múltiples categorías
    // "Torta de Boda con Flores" pertenece a 'Tortas' y 'Bodas'
    // const tortaBodaFlores = await Producto.create({ /* ... */ });
    // if (tortaBodaFlores && categoriaTortas && categoriaBodas) {
    //   await tortaBodaFlores.addCategorias([categoriaTortas, categoriaBodas]);
    // }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CategoriaProducto', null, {})
  }
};
