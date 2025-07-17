import { useEffect, useState } from "react"
import { obtenerCategorias } from "../../services/categoriasApi"
import './Categoria.css'
import { Link } from "react-router-dom"

function Categoria() {
  const [categorias, setCategoria] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoriaData = async () => {
      try {
        const data = await obtenerCategorias()
        setCategoria(data);
      } catch (err) {
        setError(
          "Error al cargar los productos. Inténtalo de nuevo más tarde."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriaData();
  }, []);

  if (loading) {
    return <div className="product-status">Cargando productos...</div>;
  }

  if (error) {
    return <div className="product-status error">{error}</div>;
  }

  return (
    <div className="catalogo-categorias-container">
      <h1>Nuestras Categorías</h1>
      <div className="categorias-grid">
        {categorias.map((categoria) => (
          <Link to={`/catalogo/${categoria.id}/`} key={categoria.id} className="categoria-card">
            {categoria.imagenUrl && (
              <img src={categoria.imagenUrl} alt={categoria.nombre} className="categoria-imagen" />
            )}
            <h3 className="categoria-nombre">{categoria.nombre}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categoria
