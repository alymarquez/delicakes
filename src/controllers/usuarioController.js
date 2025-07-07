const { Usuario } = require('../db/models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body

    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
      return res.status(400).json({ message: 'El email ya está registrado'})
    }

    const nuevoUsuario = await Usuario.create({ nombre, email, password, rol })
    res.status(201).json({ msg: 'Usuario creado', usuario: nuevoUsuario })
  } catch (error) {
    console.error('Error en registrarUsuario:', error)
    res.status(500).json({ msg: 'Error al registrar usuario' })
  }
};

const loginUsuario = async (req, res) => {
  try {
    const { email, password, rol } = req.body

    const usuario = await Usuario.findOne({ where: { email } })
    if (!usuario) {
      return res.status(404).json({ message: "Usuario inexistente." })
    }

    const passwordValido  = await bcrypt.compare(password, usuario.password)
    if (!passwordValido) {
      return res.status(400).json({ msg: 'Contraseña incorrecta' })
    }

    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET || 'claveSecreta123',
      { expiresIn: '2h' }
    )

    res.json({ msg: 'Login correcto', token })
  } catch (error) {
    console.error('Error en loginUsuario:', error)
    res.status(500).json({ msg: 'Error en el servidor' })
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const usuario = req.usuario
    await usuario.destroy()
    res.json({ msg: 'Usuario eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar usuario:', error)
    res.status(500).json({ msg: 'Error al eliminar usuario', error: error.message })
  }
}

module.exports = {
  registrarUsuario,
  loginUsuario,
  eliminarUsuario
};
