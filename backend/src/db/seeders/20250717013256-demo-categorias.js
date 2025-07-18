'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categorias', [
      {
        nombre: 'Tortas',
        imagenUrl: 'https://th.bing.com/th/id/R.f3c15cbf2ca24bc0f1b96972f134a69f?rik=Rie0RJBV0Wyg%2bA&riu=http%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-birthday-cakefood-chocolate-cake-sweet-tasty-birthday-eat-delicious-941524600851xxygd.png&ehk=XvR8TDH3gU72kZrRWcLBrvbACyp8QS52EdfKc0uVo5A%3d&risl=1&pid=ImgRaw&r=0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Cupcakes',
        imagenUrl: 'https://tse3.mm.bing.net/th/id/OIP.CzaIMtxtS_e5ma7yNBVW4QHaH_?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Cookies',
        imagenUrl: 'https://tse2.mm.bing.net/th/id/OIP.2VSGw4QWVryscL2NILZV-gHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Bodas',
        imagenUrl: 'https://tse2.mm.bing.net/th/id/OIP.7KpXqii7wBofBmR3yHzBawAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {})
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Categorias', null, {});
  }
};
