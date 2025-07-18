import { useRef, useEffect, useState } from 'react';
import './InfoSection.css'; 

const InfoSection = ({ imageSrc, title, description, buttonText, buttonLink, imageOnRight }) => {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(()=>{
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Si la sección está intersectando (visible)
          if (entry.isIntersecting){
            setVisible(true)
          } else {
            setVisible(false)
          }
        })
      },
      {
        root: null, // Observar con respecto al viewport (ventana del navegador)
        rootMargin: '0px',
        threshold: 0.2, // Activa la animación cuando el 30% del elemento es visible
      })
      // Si la referencia existe, empieza a observar el elemento
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Función de limpieza: desvincula el observador cuando el componente se desmonte
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [])

  return (
    <section ref={sectionRef} className={`info-section ${imageOnRight ? 'image-right' : 'image-left'} ${visible ? 'fade-in-up' : ''}`}>
      <div className="info-content">
        <h3>{title}</h3>
        <p>{description}</p>
        {buttonText && buttonLink && (
          <a href={buttonLink} className="info-btn">
            {buttonText}
          </a>
        )}
      </div>
      <div className="info-image-container">
        <img src={imageSrc} alt={title} className="info-image" />
      </div>
    </section>
  );
};

export default InfoSection;
