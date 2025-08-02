"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PedidoProducto extends Model {
    static associate(models) {
      this.belongsTo(models.Pedido, {
        foreignKey: 'pedidoId'
      })

      this.belongsTo(models.Producto, {
        foreignKey: 'productoId'
      })
    }
  }

  PedidoProducto.init(
    {
      pedidoId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Pedidos",
          key: "id",
        },
      },
      productoId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Productos",
          key: "id",
        },
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PedidoProducto",
    }
  );
  return PedidoProducto;
};
