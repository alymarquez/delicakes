import { useEffect, useState } from 'react'
import {obtenerProductos} from '../../services/productosApi'
import '../CardProducto/CardProducto.css'

function CardProducto() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProductosData = async () => {
      try {
        const data = await obtenerProductos()
        setProductos(data)
      } catch (err) {
        setError('Error al cargar los productos. Inténtalo de nuevo más tarde.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    };

    fetchProductosData()
  }, []);

  if (loading) {
    return <div className="product-status">Cargando productos...</div>
  }

  if (error) {
    return <div className="product-status error">{error}</div>
  }

  return (
    <section className="product-list-section">
      <h2 className="product-list-title">Nuestros Productos</h2>
      <div className="product-grid">
        {productos.map(producto => (
          <div key={producto.id} className="product-card">
            <div className="product-image-container">
              <img src={producto.imagen} alt={producto.nombre} className="product-image" />
            </div>
            <div className="product-info">
              <h4 className="product-name">{producto.nombre}</h4>
              <p className="product-description">{producto.descripcion}</p>
              <p className="product-price">${producto.precio}</p>
              <button className="add-to-cart-btn">Añadir al Carrito</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CardProducto
