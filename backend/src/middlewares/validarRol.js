const validarRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    try {
      const { usuario } = req;

      if (!usuario || !usuario.rol) {
        return res.status(403).json({ msg: "No tiene rol asignado" });
      }

      if (!rolesPermitidos.includes(usuario.rol)) {
        return res.status(403).json({ msg: `Acceso denegado. Rol requerido: ${rolesPermitidos.join(", ")}` });
      }

      next();
    } catch (error) {
      console.error("Error en validarRol:", error);
      return res.status(500).json({ msg: "Error en autorización" });
    }
  };
};

module.exports = validarRol;
