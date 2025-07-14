import HeroSection from "../components/HeroSection/HeroSection"
import InfoSection from "../components/InfoSection/InfoSection"
import aboutUsImage from '../assets/imagen3.jpeg'
import weddingsImage from '../assets/boda.jpg'

function Home() {
  return (
    <div>
        <HeroSection/>

      <InfoSection
        imageSrc={aboutUsImage}
        title="Sobre Nosotros"
        description="En Delicakes, cada postre es una obra de arte. Nos dedicamos a crear pasteles y dulces artesanales con ingredientes de la más alta calidad, pasión por el detalle y un toque de elegancia. Nuestra misión es endulzar tus momentos especiales con creaciones únicas y memorables."
        buttonText="Conoce Más"
        buttonLink="/nosotros"
        imageOnRight={true}
      />


      <InfoSection
        imageSrc={weddingsImage}
        title="Bodas: El Pastel de Tus Sueños"
        description="Haz de tu día especial un momento inolvidable con un pastel de bodas de Delicakes. Desde diseños clásicos hasta creaciones modernas y personalizadas, trabajamos contigo para que tu pastel sea tan único y hermoso como tu amor. Descubre nuestras opciones para ese gran día."
        buttonText="Ver Pasteles de Boda"
        buttonLink="/productos/bodas" 
        imageOnRight={false}
      />
    </div>
  )
}

export default Home