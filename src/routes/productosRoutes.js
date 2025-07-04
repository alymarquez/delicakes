const { Router } = require('express');
const productoController = require('../controllers/productoController')
const { validarProducto } = require('../middlewares/validarSchema')
const { existeProducto } = require('../middlewares/validarExistencia')
const router = Router()

router.get('/', productoController.obtenerProductos)
router.get('/:id', existeProducto, productoController.obtenerProductoPorId)
router.post('/', validarProducto, productoController.crearProducto)
router.put('/:id', validarProducto, existeProducto, productoController.actualizarProducto)
router.delete('/:id', existeProducto, productoController.eliminarProducto)

module.exports = router;