const {Pedido, Usuario} = require('../db/models')

const crearPedido = async (req, res) => {
    try {
        const { productos, total } = req.body
        const usuarioId = req.usuario.id

        const nuevoPedido = await Pedido.create({usuarioId, productos, total, estado: 'pendiente'})
        res.status(201).json({ msg: 'Pedido creado', pedido: nuevoPedido })
    } catch (error) {
        console.error('Error al crear pedido:', error)
        res.status(500).json({ msg: 'Error en el servidor' })
    }
}

const listarPedidos = async (_, res) => {
    try {
      const pedidos = await Pedido.findAll({
        include: [{ model: Usuario, attributes: ['id', 'nombre', 'email'] }]
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

      pedido.productos = productos
      pedido.total = total
      pedido.estado = estado
      await pedido.save()
      res.json({ msg: "Pedido actualizado", pedido })
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error al actualizar el pedido" })
    }
}

const eliminarPedido = async (req, res) => {
    try {
      const pedido = req.pedido
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