import './InfoSection.css'; 

const InfoSection = ({ imageSrc, title, description, buttonText, buttonLink, imageOnRight }) => {
  return (
    <section className={`info-section ${imageOnRight ? 'image-right' : 'image-left'}`}>
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
