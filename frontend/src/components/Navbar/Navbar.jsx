import {Link} from 'react-router-dom'
import './Navbar.css'

function Navbar () {

    return (
         <nav className="navbar">
        <h1 className="logo">Delicakes</h1>
        <ul className="nav-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/catalogo">Catálogo</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/carrito">🛒</Link></li>
        </ul>
        </nav>
    )
        
}

export default Navbar
