import React, { useState } from 'react';
import './AssignSeatModal.css';

const AssignSeatModal = ({ isOpen, onClose, passengers, onSeatAssign }) => {
  const [selectedSeats, setSelectedSeats] = useState({});
  
  // Ejemplo de disposición de asientos (ajustar según necesidad)
  const seatLayout = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
    ['25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36'],
    ['37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48']
  ];

  const handleSeatSelect = (passengerIndex, seat) => {
    setSelectedSeats(prev => ({
      ...prev,
      [passengerIndex]: seat
    }));
  };

  const handleConfirm = () => {
    // Guardar reserva completa
    const reservation = {
      passengers: passengers.map((p, i) => ({
        ...p,
        seat: selectedSeats[i]
      })),
      fecha: new Date().toISOString()
    };
    
    // Guardar en localStorage
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(reservations));
    
    // Cerrar modal y mostrar feedback
    onClose();
    alert('¡Asientos asignados y reserva guardada exitosamente!');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Asignación de Asientos Completada</h2>
        
        <div className="reservation-summary">
          <h3>Resumen de Reserva:</h3>
          {passengers.map((p, i) => (
            <p key={i}>
              {p.nombre} {p.apellido} - Asiento: {selectedSeats[i] || 'No asignado'}
            </p>
          ))}
        </div>

        <div className="modal-actions">
          <button 
            className="confirm-btn" 
            onClick={handleConfirm}
            disabled={Object.keys(selectedSeats).length !== passengers.length}
          >
            Confirmar Reserva
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignSeatModal;
