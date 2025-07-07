'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Usuarios', [
      {
        nombre: 'Admin',
        email: 'admin@delicakes.com',
        password: '$2b$10$M.ukn.3fvKLgD.OTUfq/h.4wL0aSIOM0VGtUzo6Q8llBnh3mntQLi', 
        rol: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Usuario',
        email: 'usuario@delicakes.com',
        password: '$2b$10$aQlhlrzfkmIdWA0teevZnOHA6QAzezMH8ZIeV45Cyoj00scGlN5m2', 
        rol: 'usuario',
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
