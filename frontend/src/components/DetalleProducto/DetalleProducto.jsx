import { useContext, useEffect, useState } from "react";
import { obtenerProducto } from "../../services/productosApi";
import { AuthContext } from "../../context/AuthContext";
import { useParams, Link } from "react-router-dom";
import "./DetalleProducto.css";
import { agregarProductoAlCarrito } from "../../services/pedidosApi";

function DetalleProducto() {
  const { idProducto } = useParams(); // ID desde la URL
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);
  const { authInfo } = useContext(AuthContext);
  const token = authInfo?.token || null;

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const data = await obtenerProducto(idProducto);
        setProducto(data);
      } catch (err) {
        setError("Error al cargar el detalle de la publicación");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (idProducto) {
      fetchProducto();
    }
  }, [idProducto]);

  const handleAumentarCantidad = () => {
    setCantidad((prev) => prev + 1);
  };

  const handleDisminuirCantidad = () => {
    if (cantidad > 1) {
      setCantidad((prev) => prev - 1);
    }
  };

  const handleAgregarAlCarrito = async () => {
    if (!token) {
      setError("Debes iniciar sesión para agregar productos al carrito.");
      return;
    }

    setLoading(true);
    setError(null);
    setAgregado(false);

    try {
      await agregarProductoAlCarrito(
        { productoId: producto.id, cantidad: cantidad },
        token
      );
      setAgregado(true);
      setTimeout(() => setAgregado(false), 2000);
    } catch (err) {
      setError("Error al agregar al carrito. Inténtalo de nuevo.");
      console.error("Error al agregar al carrito:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-status">Cargando detalles del producto...</div>
    );
  }

  if (error) {
    return <div className="error-status">{error}</div>;
  }

  if (!producto) {
    return <div className="not-found-status">Producto no encontrado.</div>;
  }

  return (
    <div className="detalle-producto-container">
      <Link to="/catalogo" className="back-button">
        Volver al Catálogo
      </Link>
      <div className="detalle-producto-card">
        <img
          src={producto.imagenUrl}
          alt={producto.nombre}
          className="detalle-producto-imagen"
        />
        <div className="detalle-producto-contenido">
          <h1 className="detalle-producto-nombre">{producto.nombre}</h1>
          <p className="detalle-producto-descripcion">{producto.descripcion}</p>
          <div className="detalle-producto-info">
            <span className="detalle-producto-precio">
              Precio: ${producto.precio}
            </span>
           
          </div>
          <div className="contenedor-interaccion">
            <div className="contenedor-botones-cantidad">
              <button
                className="boton-cantidad"
                onClick={handleDisminuirCantidad}
                disabled={loading || cantidad <= 1}
              >
                -
              </button>
              <span className="cantidad-display">{cantidad}</span>
              <button
                className="boton-cantidad"
                onClick={handleAumentarCantidad}
                disabled={loading}
              >
                +
              </button>
            </div>

            <button
              onClick={handleAgregarAlCarrito}
              disabled={loading}
              className="boton-agregar"
            >
              {loading
                ? "Agregando..."
                : "Agregar al carrito"
                }
            </button>
          </div>

          {agregado && <p className="mensaje-exito">¡Agregado!</p>}
          {error && <p className="mensaje-error">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;
