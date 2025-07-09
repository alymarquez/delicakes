const { Router } = require('express');
const usuarioController = require('../controllers/usuarioController')
const { validarRegistro, validarLogin } = require('../middlewares/validarSchema')
const { existeUsuario } = require('../middlewares/validarExistencia')
const router = Router()

router.post('/registro', validarRegistro, usuarioController.registrarUsuario)
router.post('/login', validarLogin, usuarioController.loginUsuario)
router.delete('/:id', validarLogin, existeUsuario, usuarioController.eliminarUsuario)

module.exports = router;
