import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>AirSkill</h1>
        </div>
        <div className="navbar-links">
          <a href="#reservas" className="navbar-link">Mis Reservas</a>
          <a href="#ayuda" className="navbar-link">Ayuda</a>
          <button className="navbar-button" type="button" onClick={() => navigate('/login')}>Iniciar Sesión</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
