const {Pedido, Usuario, Producto, PedidoProducto} = require('../db/models')

const crearPedido = async (req, res) => {
    try {
        const { productos, total } = req.body
        const usuarioId = req.usuario.id

        const nuevoPedido = await Pedido.create({ usuarioId, total, estado: 'pendiente' });
        await PedidoProducto.bulkCreate(
          productos.map(p => ({
            pedidoId: nuevoPedido.id,
            productoId: p.productoId,
            cantidad: p.cantidad
          }))
        )

        res.status(201).json({ msg: 'Pedido creado', pedido: nuevoPedido })
    } catch (error) {
        console.error('Error al crear pedido:', error)
        res.status(500).json({ msg: 'Error en el servidor' })
    }
}

const listarPedidos = async (_, res) => {
    try {
      const pedidos = await Pedido.findAll({
        include: [{ model: Usuario, attributes: ['id', 'nombre', 'email'] }],
        include: [{ model: Producto, attributes: ['id', 'nombre', 'precio'], through: {attributes: ['cantidad']} }]
      })
      res.json(pedidos)
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error al listar pedidos" })
    }
}

const obtenerPedido = async (req, res) => {
    try {
      const pedido = req.pedido
      res.json(pedido)
    } catch (error) {
      console.error(error)
      res.status(500).json({ msg: "Error al obtener el pedido" })
    }
}

const actualizarPedido = async (req, res) => {
    try {
      const pedido = req.pedido;
      const { productos, total, estado } = req.body

      pedido.total = total
      pedido.estado = estado
      await pedido.save()

      await PedidoProducto.destroy({ where: { pedidoId: pedido.id } });

      await PedidoProducto.bulkCreate(
        productos.map(p => ({
          pedidoId: pedido.id,
          productoId: p.productoId,
          cantidad: p.cantidad
        }))
      )

      res.json({ msg: "Pedido actualizado", pedido })
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error al actualizar el pedido" })
    }
}

const eliminarPedido = async (req, res) => {
    try {
      const pedido = req.pedido
      await PedidoProducto.destroy({ where: { pedidoId: pedido.id } });
      await pedido.destroy()
      res.json({ msg: "Pedido eliminado correctamente" })
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error al eliminar el pedido" })
    }
}


module.exports = {
    crearPedido,
    listarPedidos,
    obtenerPedido,
    actualizarPedido,
    eliminarPedido
}