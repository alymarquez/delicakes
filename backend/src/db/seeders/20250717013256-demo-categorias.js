'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categorias', [
      {
        nombre: 'Tortas',
        imagenUrl: 'https://th.bing.com/th/id/R.8630a3cb567743ccdd3e1b36d6a45574?rik=U8uewWOF0tgbiQ&riu=http%3a%2f%2feltrebolsa.weebly.com%2fuploads%2f5%2f0%2f8%2f7%2f50870337%2f2255973_orig.jpg&ehk=GS315DBGUfXZz2Jla9teC2qBrfZmTY9zMuV%2fV9QjAw0%3d&risl=&pid=ImgRaw&r=0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Cupcakes',
        imagenUrl: 'https://tse4.mm.bing.net/th/id/OIP.jpXv233H4qVctC4-9-0OLwHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Cookies',
        imagenUrl: 'https://tse2.mm.bing.net/th/id/OIP.CphYaH68oiPzF00_p32LIgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Bodas',
        imagenUrl: 'https://th.bing.com/th/id/R.678c06b26c89fe36b84af75cd121959a?rik=K9GztM0A9QWASQ&pid=ImgRaw&r=0',
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {})
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Categorias', null, {});
  }
};
