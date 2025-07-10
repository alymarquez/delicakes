const { Router } = require('express');
const productoController = require('../controllers/productoController')
const { validarProducto } = require('../middlewares/validarSchema')
const { existeProducto, existeProductoAsociacion, existeCategoriaAsociacion } = require('../middlewares/validarExistencia')
const validarRol = require('../middlewares/validarRol')
const validarJWT = require('../middlewares/validarJWT')
const router = Router()

router.get('/', productoController.obtenerProductos)
router.get('/:id', existeProducto, productoController.obtenerProductoPorId)
router.post('/', validarJWT, validarRol('admin'), validarProducto, productoController.crearProducto)
router.put('/:id', validarJWT, validarRol('admin'), validarProducto, existeProducto, productoController.actualizarProducto)
router.delete('/:id', validarJWT, validarRol('admin'), existeProducto, productoController.eliminarProducto)


router.post('/:productoId/categorias/:categoriaId', 
    validarJWT,
    validarRol('admin'),
    existeProductoAsociacion,
    existeCategoriaAsociacion, 
    productoController.asociarACategoria
)

router.delete('/:productoId/categorias/:categoriaId',
    validarJWT,
    validarRol('admin'),
    existeProductoAsociacion,
    existeCategoriaAsociacion, 
    productoController.desasociarCategoria
)

module.exports = router;