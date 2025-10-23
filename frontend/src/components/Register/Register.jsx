import React, { useState } from 'react';
import { MdAlternateEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';

const DEFAULT_USERS = [
  {
    id: 1,
    cedula: '1000000000',
    nombre: 'Administrador',
    apellido: 'AirSkill',
    email: 'admin@airskill.com',
    telefono: '3000000000',
    tipoDocumento: 'CC',
    genero: 'Otro',
    password: 'Admin1234',
    fechaCreacion: new Date('2024-01-01T00:00:00.000Z').toISOString()
  }
];

function Register({ onNavigate }) {
  const [formData, setFormData] = useState({
    cedula: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    tipoDocumento: '',
    genero: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    setSuccess('');
    setLoading(true);

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      // Validaciones básicas
      if (formData.password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        setLoading(false);
        return;
      }

      // Obtener usuarios existentes del localStorage
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

      // Verificar si ya existe un usuario con ese email o cédula
      const existingUser = users.find(u => 
        u.email === formData.email || u.cedula === formData.cedula
      );

      if (existingUser) {
        setError('Ya existe un usuario con esa cédula o email');
        setLoading(false);
        return;
      }

      // Crear nuevo usuario
      const newUser = {
        id: Date.now(), // ID único basado en timestamp
        ...formData,
        fechaCreacion: new Date().toISOString()
      };

      // Agregar usuario al arreglo
      users.push(newUser);

      // Guardar en localStorage
      localStorage.setItem('users', JSON.stringify(users));

      setSuccess('¡Usuario registrado exitosamente! Redirigiendo al login...');
      setFormData({
        cedula: '',
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        tipoDocumento: '',
        genero: '',
        password: ''
      });
      
      setTimeout(() => {
        onNavigate();
      }, 2000);
    } catch (err) {
      setError('Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <div className="login-card register-card">
          <div className="logo">
            <h1>AirSkill</h1>
            <p className="subtitle">Crear Cuenta</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tipoDocumento">Tipo Documento</label>
              <select
                id="tipoDocumento"
                name="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar</option>
                <option value="CC">CC</option>
                <option value="TI">TI</option>
                <option value="CE">CE</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="cedula">Cédula</label>
              <input
                type="text"
                id="cedula"
                name="cedula"
                placeholder="123456789"
                value={formData.cedula}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Juan"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                placeholder="Pérez"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <MdAlternateEmail />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                placeholder="3001234567"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="genero">Género</label>
              <select
                id="genero"
                name="genero"
                value={formData.genero}
                onChange={handleChange}
              >
                <option value="">Seleccionar</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
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
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>
          </div>

          {error && (
            <div className="error-message" style={{ display: 'block' }}>
              {error}
            </div>
          )}

          {success && (
            <div className="success-message" style={{ display: 'block' }}>
              {success}
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>

            <div className="register-link">
              <span>¿Ya tienes cuenta?</span>
              <a onClick={onNavigate}>Iniciar Sesión</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
