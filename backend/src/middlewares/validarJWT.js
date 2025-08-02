const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    console.log('Error: Token no proporcionado.');
    return res.status(401).json({ msg: 'No token, autorización denegada' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    console.log('Error al verificar el token:', error.message);
    return res.status(401).json({ msg: 'Token no válido' });
  }
};

module.exports = validarJWT;
