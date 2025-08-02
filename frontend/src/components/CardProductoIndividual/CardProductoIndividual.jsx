import { useState } from 'react';
import { agregarProductoAlCarrito } from '../../services/pedidosApi'
import { useAuth } from '../../context/AuthContext'
import './CardProductoIndividual.css'

const CardProductoIndividual = ({ producto }) => {
    const [cantidad, setCantidad] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [agregado, setAgregado] = useState(false)
    const { token } = useAuth()

    const handleAumentarCantidad = () => {
        setCantidad(prev => prev + 1);
    }

    const handleDisminuirCantidad = () => {
        if (cantidad > 1) {
            setCantidad(prev => prev - 1)
        }
    }

    const handleAgregarAlCarrito = async () => {
        if (!token) {
            setError('Debes iniciar sesión para agregar productos al carrito.')
            return
        }
        
        setLoading(true)
        setError(null)
        setAgregado(false)

        try {
            await agregarProductoAlCarrito({productoId: producto.id, cantidad: cantidad}, token)
            setAgregado(true)
            setTimeout(() => setAgregado(false), 2000)
        } catch (err) {
            setError('Error al agregar al carrito. Inténtalo de nuevo.')
            console.error('Error al agregar al carrito:', err)
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="producto-card">
            <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />
            <h3 className="producto-nombre">{producto.nombre}</h3>
            <p className="producto-descripcion">{producto.descripcion}</p>
            <p className="producto-precio">${producto.precio}</p>

            <div className="contenedor-botones-cantidad">
                <button 
                    className="boton-cantidad" 
                    onClick={handleDisminuirCantidad} 
                    disabled={loading || cantidad <= 1}>-</button>
                <span className="cantidad-display">{cantidad}</span>
                <button 
                    className="boton-cantidad" 
                    onClick={handleAumentarCantidad} 
                    disabled={loading}>+</button>
            </div>
            
            <button 
                onClick={handleAgregarAlCarrito}
                disabled={loading}
                className="boton-agregar">
                {loading ? 'Agregando...' : 'Agregar al carrito'}
            </button>
            
            {agregado && <p className="mensaje-exito">¡Agregado!</p>}
            {error && <p className="mensaje-error">{error}</p>}
        </div>
    );
};

export default CardProductoIndividual