import React from 'react';
import './Features.css';

import asientoImg from '../../assets/asiento.png'; 
import cinturonImg from '../../assets/cinturon-de-seguridad.png'; 
import avionImg from '../../assets/avion-volando.png';

const Features = () => {
  const features = [
    {
      // 2. USA LAS VARIABLES IMPORTADAS
      imageUrl: asientoImg, 
      title: 'Comodidad',
      description: 'Nos preocupamos por como te sientes mientras viajas con nosotros.'
    },
    {
      imageUrl: cinturonImg, 
      title: 'Seguridad',
      description: 'Disposición de protocolos de seguridad para cada acción que realices con nosotros.'
    },
    {
      imageUrl: avionImg, 
      title: 'Velocidad',
      description: 'Llevarte lo más rápido posible a tu destino es nuestra misión.'
    }
  ];

  return (
    <section className="features">
      <div className="features-container">
        <h2 className="features-title">¿Que ofrecemos?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon"><img src={feature.imageUrl} alt={feature.title} className="feature-image" /></div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
