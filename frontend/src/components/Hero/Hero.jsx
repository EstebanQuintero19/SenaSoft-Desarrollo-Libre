import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">ENCUENTRA TU PRÓXIMO DESTINO</h1>
          <p className="hero-subtitle">
            Tu comodidad es nuestra prioridad, no pierdas la oportunidad de viajar
          </p>
          <SearchForm />
        </div>
      </div>
    </section>
  );
};

export default Hero;
