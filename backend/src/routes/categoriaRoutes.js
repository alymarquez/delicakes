const { Router } = require('express');
const categoriaController = require('../controllers/categoriaController')
const { validarCategoria } = require('../middlewares/validarSchema')
const { existeCategoria } = require('../middlewares/validarExistencia')
const validarRol = require('../middlewares/validarRol')
const validarJWT = require('../middlewares/validarJWT')
const router = Router()

router.get('/', categoriaController.obtenerCategorias)
router.get('/:id', existeCategoria, categoriaController.obtenerCategoria)
router.post('/', validarJWT, validarRol('admin'), validarCategoria, categoriaController.crearCategoria)
router.put('/:id', validarJWT, validarRol('admin'), existeCategoria, validarCategoria, existeCategoria, categoriaController.actualizarCategoria)
router.delete('/:id', validarJWT, validarRol('admin'), existeCategoria, categoriaController.eliminarCategoria)

module.exports = router;
