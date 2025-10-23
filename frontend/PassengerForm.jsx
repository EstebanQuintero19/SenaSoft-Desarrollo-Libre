import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AssignSeatModal from './AssignSeatModal';
import "./PassengerForm.css";

const PassengerForm = () => {
  const { state } = useLocation();
  const flight = state?.flight;
  const navigate = useNavigate();

  const [passengerData, setPassengerData] = useState({
    nombre: '',
    apellido: '',
    tipoDocumento: 'CC',
    cedula: '',
    email: '',
    telefono: '',
    genero: ''
  });

  const handleChange = (e) => {
    setPassengerData({
      ...passengerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Crear reserva completa
    const reservation = {
      ...flight,
      passenger: passengerData,
      fechaReserva: new Date().toISOString(),
      estado: 'pendiente'
    };
    
    // Guardar en localStorage (sin requerir login)
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(reservations));
    
    // Mostrar alerta de éxito en lugar de redirigir
    alert('Reserva completada exitosamente');
  };

  return (
    <div className="container">
      <h1>Información de Pasajero</h1>
      <p>Completa los campos requeridos.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={passengerData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Apellido</label>
            <input
              type="text"
              name="apellido"
              value={passengerData.apellido}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Tipo de Documento</label>
            <input
              type="text"
              name="tipoDocumento"
              value={passengerData.tipoDocumento}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Cédula</label>
            <input
              type="text"
              name="cedula"
              value={passengerData.cedula}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={passengerData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={passengerData.telefono}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Género</label>
            <select
              id="genero"
              name="genero"
              value={passengerData.genero}
              onChange={(e) => setPassengerData({...passengerData, genero: e.target.value})}
              className="form-select"
            >
              <option value="">Seleccionar</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
              <option value="Prefiero no decir">Prefiero no decir</option>
            </select>
          </div>
        </div>

        <div className="form-bton">
          <button type="submit" className="btn-agregar">
            Agregar Pasajero
          </button>
        </div>
      </form>
    </div>
  );
};

export default PassengerForm;
