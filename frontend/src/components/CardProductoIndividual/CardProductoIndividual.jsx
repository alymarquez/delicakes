import './CardProductoIndividual.css'
import { Link } from 'react-router-dom';

const CardProductoIndividual = ({ producto }) => {
    return (
        <Link to={`/productos/${producto.id}`} className="card-producto-link">
            <div className="producto-card">
                <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />
                <h3 className="producto-nombre">{producto.nombre}</h3>
                <p className="producto-descripcion">{producto.descripcion}</p>
                <p className="producto-precio">${producto.precio}</p>
            </div>
        </Link>
    );
};

export default CardProductoIndividual