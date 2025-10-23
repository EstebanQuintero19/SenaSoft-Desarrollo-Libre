import React, { useState } from 'react';
import { MdAlternateEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import PaymentModal from '../ModalPayments/PaymentModal.jsx';
import './main.css';

const DEFAULT_USERS = [
  {
    nombre: 'Administrador AirSkill',
    email: 'admin@airskill.com',
    password: 'Admin1234'
  }
];

function Login({ onNavigate }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

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

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      // Obtener usuarios del localStorage
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

      // Buscar usuario por email y password
      const user = users.find(u => 
        u.email === formData.email && u.password === formData.password
      );

      if (user) {
        // Login exitoso
        const { password, ...userWithoutPassword } = user;
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        alert(`¡Bienvenido ${user.nombre}!`);
        setFormData({ email: '', password: '' });
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

          {/* Botón para abrir modal de pago (demo) */}
          <button 
            type="button" 
            onClick={() => setShowPaymentModal(true)}
            style={{
              marginTop: '20px',
              padding: '12px',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            💳 Probar Pago de Tickets
          </button>
        </form>
        </div>

        {/* Modal de Pago */}
        <PaymentModal 
          isOpen={showPaymentModal} 
          onClose={() => setShowPaymentModal(false)} 
        />
      </div>
    </div>
  );
}

export default Login;
