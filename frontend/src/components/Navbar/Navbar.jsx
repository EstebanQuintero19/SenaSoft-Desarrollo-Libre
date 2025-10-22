import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>AirSkill</h1>
        </div>
        <div className="navbar-links">
          <a href="#reservas" className="navbar-link">Mis Reservas</a>
          <a href="#ayuda" className="navbar-link">Ayuda</a>
          <button className="navbar-button">Iniciar Sesión</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
