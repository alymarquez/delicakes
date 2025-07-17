import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {obtenerCategoria} from '../../services/categoriasApi'
import '../CardProducto/CardProducto.css'

function CardProducto() {
  const { categoriaId } = useParams()
  const [productos, setProductos] = useState([])
  const [categoriaNombre, setCategoriaNombre] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProductosData = async () => {
      try {
        const categoriaData = await obtenerCategoria(categoriaId)
        setCategoriaNombre(categoriaData.nombre);
        
        setProductos(categoriaData.Productos)
      } catch (err) {
        setError('Error al cargar los productos. Inténtalo de nuevo más tarde.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    };

    fetchProductosData()
  }, [categoriaId]);

  if (loading) {
    return <div className="product-status">Cargando productos...</div>
  }

  if (error) {
    return <div className="product-status error">{error}</div>
  }

  return (
    <div className="catalogo-productos-container">
      <h1>Productos de {categoriaNombre || 'la categoría'}</h1>
      <Link to="/catalogo" className="back-button">Volver a Categorías</Link>
      <div className="productos-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-card">
            <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />
            <h3 className="producto-nombre">{producto.nombre}</h3>
            <p className="producto-descripcion">{producto.descripcion}</p>
            <p className="producto-precio">${producto.precio}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardProducto
