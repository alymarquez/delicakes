const { Router } = require('express');
const productoController = require('../controllers/productoController')
const { validarProducto } = require('../middlewares/validarSchema')
const { existeProducto } = require('../middlewares/validarExistencia')
const validarRol = require('../middlewares/validarRol')
const validarJWT = require('../middlewares/validarJWT')
const router = Router()

router.get('/', productoController.obtenerProductos)
router.get('/:id', existeProducto, productoController.obtenerProductoPorId)
router.post('/', validarJWT, validarRol('admin'), validarProducto, productoController.crearProducto)
router.put('/:id', validarJWT, validarRol('admin'), validarProducto, existeProducto, productoController.actualizarProducto)
router.delete('/:id', validarJWT, validarRol('admin'), existeProducto, productoController.eliminarProducto)

module.exports = router;