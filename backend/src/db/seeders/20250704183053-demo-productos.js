"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Productos",
      [
        {
          nombre: "Torta de Chocolate",
          descripcion: "Rica torta con cobertura de chocolate",
          precio: 20.5,
          imagen:
            "https://1.bp.blogspot.com/-8pnAPU-A1EA/X4j5gXLTaEI/AAAAAAAAAuY/cBYy3ke0RNEhoWx22uVI0zAr6YZOuuAmQCLcBGAsYHQ/w1200-h630-p-k-no-nu/1539383192_archive_0_shutterstock_210631372.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Cupcake Vainilla",
          descripcion: "Suave cupcake con glaseado de vainilla",
          precio: 5.0,
          imagen:
            "https://img.freepik.com/foto-gratis/delicioso-cupcake-glaseado-vainilla_23-2150798112.jpg?t=st=1712919565~exp=1712923165~hmac=77abd1caf7eca9aacd16d1ce454054aae387ea97605f4c9212d9925b3eee8bfe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Torta Selva Negra",
          descripcion: "Clásica torta con cerezas y crema.",
          precio: 25.5,
          imagen: "url_selva_negra.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Galletas de Mantequilla",
          descripcion: "Suaves galletas artesanales.",
          precio: 1.5,
          imagen: "url_galletas_mantequilla.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Pastel de Boda Clásico",
          descripcion: "Pastel de varios pisos para bodas.",
          precio: 300.0,
          imagen: "url_pastel_boda.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Cupcake de Chocolate",
          descripcion: "Cupcake húmedo de chocolate con crema.",
          precio: 3.2,
          imagen: "url_cupcake_chocolate.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Productos", null, {});
  },
};
