import { useEffect, useState } from "react";
import {
  obtenerCarrito,
  finalizarCompra,
  eliminarProductoDelCarrito,
  agregarProductoAlCarrito,
  disminuirProducto
} from "../../services/pedidosApi";
import { useAuth } from "../../context/AuthContext";

function ComponenteCarrito() {
  const [carrito, setCarrito] = useState(null);
  const [loading, setLoading] = useState(true);
  const [compraConfirmada, setCompraConfirmada] = useState(false); 
  const { token } = useAuth();

  useEffect(() => {
    const fetchCarritoData = async () => {
      if (!token) {
        setLoading(false);
        setCarrito({ productos: [], total: 0 }); 
        return;
      }
      try {
        const data = await obtenerCarrito(token);
        setCarrito(data.carrito || { productos: [], total: 0 });
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
        setCarrito({ productos: [], total: 0 });
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchCarritoData();
    } else {
      setLoading(false);
      setCarrito({ productos: [], total: 0 });
    }
  }, [token]);

  const handleFinalizarCompra = async () => {
    try {
      const response = await finalizarCompra(token);
      console.log("Compra finalizada:", response);
      setCarrito(null); 
      setCompraConfirmada(true);
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
    }
  };

  const handleEliminarProducto = async (productoId) => {
    try {
      await eliminarProductoDelCarrito(productoId, token);
      setCarrito((prevCarrito) => ({
        ...prevCarrito,
        productos: prevCarrito.productos.filter((p) => p.id !== productoId),
      }));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

const handleAumentarCantidad = async (e, productoId) => {
    e.preventDefault() // Previene la recarga de la página
    try {
        await agregarProductoAlCarrito({ productoId, cantidad: 1 }, token);
        const updatedCarrito = await obtenerCarrito(token);
        setCarrito(updatedCarrito.carrito);
    } catch (error) {
        console.error('Error al aumentar la cantidad:', error);
    }
};

const handleDisminuirCantidad = async (e, productoId) => {
    e.preventDefault()
    try {
        await disminuirProducto({ productoId, cantidad: 1 }, token);
        const updatedCarrito = await obtenerCarrito(token);
        setCarrito(updatedCarrito.carrito);
    } catch (error) {
        console.error('Error al disminuir la cantidad:', error);
    }
};

  if (loading) return <div>Cargando carrito...</div>;

  if (compraConfirmada) {
    return (
      <div className="mensaje-confirmacion">
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu pedido ha sido procesado con éxito.</p>
      </div>
    );
  }

  if (!carrito || carrito.productos.length === 0) {
    return <div>Tu carrito está vacío.</div>;
  }
  
  return (
    <div>
      <h2>Mi Carrito</h2>
      {carrito.productos.map((p) => (
        <div key={p.id}>
          <h4>{p.nombre}</h4>

                <span>Cantidad: {p.PedidoProducto.cantidad}</span>
                <button onClick={(e) => handleDisminuirCantidad(e, p.id)}>-</button>
                <button onClick={(e) => handleAumentarCantidad(e, p.id)}>+</button>
                <button onClick={() => handleEliminarProducto(p.id)}>Eliminar</button>
        </div>
      ))}
      <h3>Total: ${carrito.total}</h3>
      <button onClick={handleFinalizarCompra}>Finalizar Compra</button>
    </div>
  );
}

export default ComponenteCarrito;
