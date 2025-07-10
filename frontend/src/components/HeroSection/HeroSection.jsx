import './HeroSection.css';
import {Link} from 'react-router-dom'

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2>Bienvenid@ a Delicakes</h2>
        <p>Pastelería artesanal con un toque elegante y dulce</p>
        <Link className="btn-catalogo" to="/catalogo">Catálogo</Link>
      </div>
    </section>
  );
};

export default HeroSection;
