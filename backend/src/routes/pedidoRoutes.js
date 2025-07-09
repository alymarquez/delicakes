const { Router } = require('express');
const pedidoController = require('../controllers/pedidoController')
const { validarPedido } = require('../middlewares/validarSchema')
const { existePedido, existeProducto } = require('../middlewares/validarExistencia')
const validarRol = require('../middlewares/validarRol')
const validarJWT = require('../middlewares/validarJWT')
const router = Router()

router.get('/', validarJWT, validarRol('admin'), pedidoController.listarPedidos)
router.get('/:id', validarJWT, validarRol('admin'), existePedido, pedidoController.obtenerPedido)
router.post('/', validarJWT, validarRol('usuario', 'admin'), validarPedido, existeProducto, pedidoController.crearPedido)
router.put('/:id', validarJWT, validarRol('admin'), existePedido, validarPedido, existeProducto, pedidoController.actualizarPedido)
router.delete('/:id', validarJWT, validarRol('admin'), existePedido, pedidoController.eliminarPedido)

module.exports = router;
