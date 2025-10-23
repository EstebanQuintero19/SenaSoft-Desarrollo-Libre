import React, { useState } from 'react';
import { MdAlternateEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import './main.css';

const DEFAULT_USERS = [
  {
    nombre: 'Administrador AirSkill',
    email: 'admin@airskill.com',
    password: 'Admin1234'
  }
];

function Login({ onNavigate, navigate }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const usersJSON = localStorage.getItem('users');
      let users = [];

      if (usersJSON) {
        try {
          const parsedUsers = JSON.parse(usersJSON);
          if (Array.isArray(parsedUsers) && parsedUsers.length > 0) {
            users = parsedUsers;
          }
        } catch (parseError) {
          console.error('Error parsing users from localStorage', parseError);
        }
      }

      if (users.length === 0) {
        users = DEFAULT_USERS;
        localStorage.setItem('users', JSON.stringify(DEFAULT_USERS));
      }

      const user = users.find(u => 
        u.email === formData.email && u.password === formData.password
      );

      if (user) {
        const { password, ...userWithoutPassword } = user;
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        localStorage.setItem('authToken', 'mock-token-' + Date.now());
        
        // Redirección inteligente
        const { state } = location;
        if (state?.from === '/flights' && state?.flightData) {
          // Viene de selección de vuelo
          navigate('/passenger', { state: { flight: state.flightData } });
        } else {
          // Viene de otra parte (vista principal)
          navigate(state?.from || '/discover');
        }
      } else {
        setError('Credenciales inválidas. Email o contraseña incorrectos.');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <div className="login-card">
        <div className="logo">
          <h1>AirSkill</h1>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electronico</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <MdAlternateEmail />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Fcardenas"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <FaLock />
              </span>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {error && (
            <div className="error-message" style={{ display: 'block' }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Iniciando...' : 'Iniciar Sesion'}
          </button>

          <div className="register-link">
            <span>No tienes Cuenta?</span>
            <a onClick={onNavigate}>Registrate</a>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
