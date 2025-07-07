'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    static associate(models) {
      Pedido.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
    }
  }
  Pedido.init({
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productos: {
      type: DataTypes.JSON, // lista de productos con cantidades
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pendiente'
    }
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};
