'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate(models) {
       Producto.belongsToMany(models.Pedido, {
        through: models.PedidoProducto,
        foreignKey: 'productoId',
        otherKey: 'pedidoId'
      });
    }
  }
  
  Producto.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    precio: DataTypes.FLOAT,
    imagen: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Producto',
  });
  return Producto;
};