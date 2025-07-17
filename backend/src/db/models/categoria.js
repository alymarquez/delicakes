'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    static associate(models) {
      Categoria.belongsToMany(models.Producto, {
        through: 'CategoriaProducto',
        foreignKey: 'categoriaId',
        hooks: true
      })
    }
  }
  Categoria.init({
    nombre: DataTypes.STRING,
    imagenUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categoria',
    tableName: 'Categorias'
  });
  return Categoria;
};