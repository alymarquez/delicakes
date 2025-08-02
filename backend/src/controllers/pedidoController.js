const { Pedido, Usuario, Producto, PedidoProducto } = require("../db/models");

const crearPedido = async (req, res) => {
  try {
    const { productos, total } = req.body;
    const usuarioId = req.usuario.id;

    const nuevoPedido = await Pedido.create({
      usuarioId,
      total,
      estado: "pendiente",
    });
    await PedidoProducto.bulkCreate(
      productos.map((p) => ({
        pedidoId: nuevoPedido.id,
        productoId: p.productoId,
        cantidad: p.cantidad,
      }))
    );

    res.status(201).json({ msg: "Pedido creado", pedido: nuevoPedido });
  } catch (error) {
    console.error("Error al crear pedido:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const listarPedidos = async (_, res) => {
  try {
    const pedidos = await Pedido.findAll({
      include: [
        { model: Usuario, attributes: ["id", "nombre", "email"] },
        {
          model: PedidoProducto,
          attributes: ["cantidad"],
          include: [
            {
              model: Producto,
              attributes: ["id", "nombre", "precio"],
            },
          ],
        },
      ],
    });
    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al listar pedidos" });
  }
};

const obtenerPedido = async (req, res) => {
  try {
    const pedido = req.pedido;
    res.json(pedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener el pedido" });
  }
};

const actualizarPedido = async (req, res) => {
  try {
    const pedido = req.pedido;
    const { productos, total, estado } = req.body;

    pedido.total = total;
    pedido.estado = estado;
    await pedido.save();

    await PedidoProducto.destroy({ where: { pedidoId: pedido.id } });

    await PedidoProducto.bulkCreate(
      productos.map((p) => ({
        pedidoId: pedido.id,
        productoId: p.productoId,
        cantidad: p.cantidad,
      }))
    );

    res.json({ msg: "Pedido actualizado", pedido });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar el pedido" });
  }
};

const eliminarPedido = async (req, res) => {
  try {
    const pedido = req.pedido;
    await PedidoProducto.destroy({ where: { pedidoId: pedido.id } });
    await pedido.destroy();
    res.json({ msg: "Pedido eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar el pedido" });
  }
};

const obtenerCarrito = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;

    const carrito = await Pedido.findOne({
      where: { usuarioId: usuarioId, estado: "pendiente" },
      include: [
        {
          model: Producto,
          as: "productos",
          attributes: ["id", "nombre", "precio", "imagen"],
          through: { attributes: ["cantidad"] },
        },
      ],
    });

    if (!carrito) {
      return res.status(200).json({
        msg: "El carrito está vacio",
        carrito: { productos: [], total: 0 },
      });
    }

    const productosEnCarrito = carrito.productos || [];

    if (productosEnCarrito.length === 0) {
      return res.status(200).json({
        msg: "El carrito está vacio",
        carrito: { productos: [], total: 0 },
      });
    }

    res.status(200).json({
      msg: "Carrito obtenido correctamente",
      carrito: { ...carrito.toJSON(), productos: productosEnCarrito },
    });
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

const agregarProductoAlCarrito = async (req, res) => {
  try {
    const { productoId } = req.body;
    const cantidad = Number(req.body.cantidad);
    const usuarioId = req.usuario.id;

    if (isNaN(cantidad) || cantidad <= 0) {
      return res
        .status(400)
        .json({ msg: "La cantidad debe ser un número positivo." });
    }

    let carrito = await Pedido.findOne({
      where: { usuarioId, estado: "pendiente" },
    });
    if (!carrito) {
      carrito = await Pedido.create({
        usuarioId,
        total: 0,
        estado: "pendiente",
      });
    }

    const productoEnCarrito = await PedidoProducto.findOne({
      where: { pedidoId: carrito.id, productoId },
    });

    let productoAActualizar;
    if (productoEnCarrito) {
      productoAActualizar = productoEnCarrito;
      productoAActualizar.cantidad += cantidad;
      await productoAActualizar.save();
    } else {
      productoAActualizar = await PedidoProducto.create({
        pedidoId: carrito.id,
        productoId,
        cantidad,
      });
    }

    const productosDelCarrito = await PedidoProducto.findAll({
      where: { pedidoId: carrito.id },
      include: [{ model: Producto, attributes: ["precio"] }],
    });

    const nuevoTotal = productosDelCarrito.reduce(
      (acc, item) => acc + item.cantidad * item.Producto.precio,
      0
    );
    await carrito.update({ total: nuevoTotal });

    res
      .status(200)
      .json({ msg: "Producto agregado al carrito", productosDelCarrito });
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

const finalizarCompra = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;

    const carrito = await Pedido.findOne({
      where: { usuarioId, estado: "pendiente" },
    });

    if (!carrito) {
      return res
        .status(404)
        .json({ msg: "No se encontró un carrito para finalizar" });
    }

    carrito.estado = "confirmado";
    await carrito.save();

    res
      .status(200)
      .json({ msg: "Compra finalizada con éxito", pedidoId: carrito.id });
  } catch (error) {
    console.error("Error al finalizar la compra:", error);
    res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

const eliminarProductoDelCarrito = async (req, res) => {
  try {
    const { productoId } = req.params;
    const usuarioId = req.usuario.id;

    const carrito = await Pedido.findOne({
      where: { usuarioId, estado: "pendiente" },
    });
    if (!carrito) {
      return res.status(404).json({ msg: "Carrito no encontrado" });
    }

    const resultado = await PedidoProducto.destroy({
      where: { pedidoId: carrito.id, productoId },
    });

    if (resultado === 0) {
      return res
        .status(404)
        .json({ msg: "Producto no encontrado en el carrito" });
    }

    const productosDelCarrito = await PedidoProducto.findAll({
      where: { pedidoId: carrito.id },
      include: [{ model: Producto, attributes: ["precio"] }],
    });
    const nuevoTotal = productosDelCarrito.reduce(
      (acc, item) => acc + item.cantidad * item.Producto.precio,
      0
    );
    await carrito.update({ total: nuevoTotal });

    res.status(200).json({ msg: "Producto eliminado del carrito con éxito" });
  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error);
    res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

const disminuirProducto = async (req, res) => {
    try {
        const { productoId } = req.body;
        const usuarioId = req.usuario.id;

        let carrito = await Pedido.findOne({ where: { usuarioId, estado: 'pendiente' } });
        if (!carrito) {
            return res.status(404).json({ msg: "No se encontró un carrito activo." });
        }

        const productoEnCarrito = await PedidoProducto.findOne({
            where: { pedidoId: carrito.id, productoId }
        });

        if (!productoEnCarrito) {
            return res.status(404).json({ msg: "El producto no está en el carrito." });
        }

        if (productoEnCarrito.cantidad > 1) {
            await productoEnCarrito.decrement('cantidad');
        } else {
            await productoEnCarrito.destroy();
        }

        const productosDelCarrito = await PedidoProducto.findAll({
            where: { pedidoId: carrito.id },
            include: [{ model: Producto, attributes: ['precio'] }]
        });

        const nuevoTotal = productosDelCarrito.reduce(
            (acc, item) => acc + item.cantidad * item.Producto.precio,
            0
        );

        await carrito.update({ total: nuevoTotal });

        const carritoActualizado = await Pedido.findOne({
            where: { id: carrito.id },
            include: [{ model: Producto, as: 'productos', through: { attributes: ['cantidad'] } }]
        });

        res.status(200).json({ msg: "Producto disminuido del carrito", carrito: carritoActualizado });

    } catch (error) {
        console.error('Error al disminuir producto del carrito:', error);
        res.status(500).json({ msg: "Error interno en el servidor" });
    }
};

module.exports = {
  crearPedido,
  listarPedidos,
  obtenerPedido,
  actualizarPedido,
  eliminarPedido,
  obtenerCarrito,
  agregarProductoAlCarrito,
  finalizarCompra,
  eliminarProductoDelCarrito,
  disminuirProducto
};
