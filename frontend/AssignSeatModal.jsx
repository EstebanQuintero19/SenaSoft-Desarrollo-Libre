import React, { useState } from "react";
import { FaChair } from "react-icons/fa";
import "./AssignSeatModal.css";

const AssignSeatModal = ({ show, onClose, handleAssignSeat, asientos }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  if (!show) return null;

  const handleSelectSeat = (seat) => {
    setSelectedSeat(seat);
  };

  const seats = Array.from({ length: 48 }, (_, i) => i + 1);
  const leftSeats = seats.slice(0, 24);
  const rightSeats = seats.slice(24);

  const handleSave = () => {
    if (selectedSeat === null) {
      alert("Por favor selecciona un asiento antes de guardar.");
      return;
    }

    handleAssignSeat(selectedSeat);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 style={{ textAlign: "center" }}>Asignar Asientos</h2>

        <div className="modal-content">
          <p>Selecciona un asiento disponible para asignar al pasajero.</p>

          <div className="bus-layout">
            {/* COLUMNA IZQUIERDA */}
            <div className="side left-side">
              {Array.from({ length: 8 }).map((_, rowIndex) => {
                const fila = leftSeats.slice(rowIndex * 3, rowIndex * 3 + 3);
                return (
                  <div className="seat-row" key={`left-${rowIndex}`}>
                    <span className="ventanilla">V</span>
                    {fila.map((seat) => {
                      const ocupado = asientos.includes(seat);
                      return (
                        <div
                          key={seat}
                          className={`seat ${ocupado ? "ocupado" : ""} ${
                            selectedSeat === seat ? "selected" : ""
                          }`}
                          onClick={() => !ocupado && handleSelectSeat(seat)}
                        >
                          {seat}
                        </div>
                      );
                    })}
                    <FaChair className="chair-icon" />
                  </div>
                );
              })}
            </div>

            {/* COLUMNA DERECHA */}
            <div className="side right-side">
              {Array.from({ length: 8 }).map((_, rowIndex) => {
                const fila = rightSeats.slice(rowIndex * 3, rowIndex * 3 + 3);
                return (
                  <div className="seat-row" key={`right-${rowIndex}`}>
                    <FaChair className="chair-icon" />
                    {fila.map((seat) => {
                      const ocupado = asientos.includes(seat);
                      return (
                        <div
                          key={seat}
                          className={`seat ${ocupado ? "ocupado" : ""} ${
                            selectedSeat === seat ? "selected" : ""
                          }`}
                          onClick={() => !ocupado && handleSelectSeat(seat)}
                        >
                          {seat}
                        </div>
                      );
                    })}
                    <span className="ventanilla">V</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="modal-buttons">
          <button className="btn-cerrar" onClick={onClose}>
            Cerrar
          </button>
          <button className="btn-guardar" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignSeatModal;
