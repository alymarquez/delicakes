const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ msg: 'No token, autorización denegada' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'claveSecreta123');
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token no válido' });
  }
};

module.exports = validarJWT;
