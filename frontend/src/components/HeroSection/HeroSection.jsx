import './HeroSection.css';
import {Link} from 'react-router-dom'

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2>Sabor auténtico. Momentos inolvidables.</h2>
        <p>En cada creación, ponemos el corazón y los ingredientes más frescos para que cada bocado sea una experiencia única.</p>
        <Link className="btn-catalogo" to="/catalogo">Ver catálogo</Link>
      </div>
    </section>
  );
};

export default HeroSection;
