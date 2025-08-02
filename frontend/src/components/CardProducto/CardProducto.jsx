import { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import {obtenerCategoria} from '../../services/categoriasApi'
import '../CardProducto/CardProducto.css'
import CardProductoIndividual from '../CardProductoIndividual/CardProductoIndividual'
import { AuthContext } from '../../context/AuthContext';

function CardProducto() {
  const { categoriaId } = useParams()
  const [productos, setProductos] = useState([])
  const [categoriaNombre, setCategoriaNombre] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { authInfo } = useContext(AuthContext)

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
          <CardProductoIndividual
            key={producto.id} 
            producto={producto} 
            token={authInfo?.token || null} 
          />
        ))}
      </div>
    </div>
  )
}

export default CardProducto
