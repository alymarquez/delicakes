const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  console.log('--- Validando JWT ---');
  console.log('Token recibido:', token);

  if (!token) {
    console.log('Error: Token no proporcionado.');
    return res.status(401).json({ msg: 'No token, autorización denegada' });
  }

  try {
    console.log('Clave usada para verificar:', process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verificado con éxito. Usuario:', decoded);
    req.usuario = decoded;
    next();
  } catch (error) {
    console.log('Error al verificar el token:', error.message);
    return res.status(401).json({ msg: 'Token no válido' });
  }
};

module.exports = validarJWT;
