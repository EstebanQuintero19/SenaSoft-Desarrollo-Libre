import React, { useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './FlightResults.css';
import axios from 'axios';
import { mockFlights } from '../../data/mockFlights';

const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0
});

const formatDateLabel = (isoString) => {
  if (!isoString) {
    return null;
  }

  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
};

export default function FlightResults() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const searchData = state ?? {};
  const {
    origin = 'Bogotá (COL)',
    destination = 'Medellín (COL)',
    passengers = 1,
    selectedDates = [],
    tripType = 'oneway'
  } = searchData;

  const [searchTerm, setSearchTerm] = useState('');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    setFlights(mockFlights);
    setLoading(false);
  }, []);

  const filteredFlights = useMemo(() => {
    if (!flights.length) return [];
    
    return flights.filter(flight => {
      // Filter by origin/destination
      const matchesRoute = 
        flight.origin.includes(origin.split(' (')[0]) && 
        flight.destination.includes(destination.split(' (')[0]);
      
      // Filter by date if available
      const matchesDate = !selectedDates.length || 
        selectedDates.some(date => {
          const flightDate = new Date(flight.departure).toDateString();
          return flightDate === new Date(date).toDateString();
        });
      
      // Filter by search term
      const matchesSearch = `${flight.airline} ${flight.flightNumber} ${flight.origin} ${flight.destination}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      
      return matchesRoute && matchesDate && matchesSearch;
    });
  }, [flights, origin, destination, selectedDates, searchTerm]);

  const passengerLabel = useMemo(
    () => (passengers === 1 ? '1 pasajero' : `${passengers} pasajeros`),
    [passengers]
  );

  const departureLabel = useMemo(
    () => formatDateLabel(selectedDates[0]),
    [selectedDates]
  );

  const returnLabel = useMemo(
    () => formatDateLabel(selectedDates[1]),
    [selectedDates]
  );

  const handleSelect = (flight) => {
    const isAuthenticated = localStorage.getItem('authToken');
    
    if (!isAuthenticated) {
      localStorage.setItem('pendingFlight', JSON.stringify(flight));
      navigate('/login', { 
        state: { 
          from: '/flights',
          message: 'Por favor inicia sesión para reservar este vuelo'
        }
      });
      return;
    }
    
    setSelectedFlight(flight);
    setShowConfirmationModal(true);
  };

  return (
    <div className="flight-results-page">
      <Navbar />
      <div className="flight-container">
        <header className="header-content">
          <div>
            <h2>
              {origin} → {destination}
            </h2>
            <p>
              {departureLabel || 'Fecha por definir'}
              {tripType === 'roundtrip' && returnLabel ? ` · Regreso ${returnLabel}` : ''}
              {` · ${passengerLabel}`}
            </p>
          </div>
          <button
            type="button"
            className="modify-search-btn"
            onClick={() => navigate('/discover')}
          >
            Modificar búsqueda
          </button>
        </header>

        <main className="flight-content">
          <aside className="filters">
            <h3>Buscar Vuelos</h3>
            <input
              type="text"
              placeholder="Buscar por ciudad u hora..."
              className="search-input"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <p>Ej: “Med” o “08:30”</p>
          </aside>

          <section className="results">
            <h2>Resultados de tu búsqueda</h2>
            <p>Vuelos disponibles:</p>

            {loading ? (
              <p>Cargando vuelos...</p>
            ) : filteredFlights.length === 0 ? (
              <p style={{ color: 'gray' }}>No se encontraron vuelos.</p>
            ) : (
              filteredFlights.map((flight) => (
                <div key={flight.id} className="flight-card">
                  <div className="flight-info">
                    <div className="route">
                      <div className="city">{flight.origin}</div>
                      <div className="city">{flight.destination}</div>
                    </div>
                    <div className="hours">
                      <div>{new Date(flight.departure).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                      <div>{new Date(flight.arrival).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    </div>
                    <div className="details">
                      <p>{flight.airline} - {flight.flightNumber}</p>
                      <span>{flight.duration} • {flight.stops === 0 ? 'Vuelo directo' : `${flight.stops} escala(s)`}</span>
                    </div>
                  </div>
                  <div className="flight-price">
                    <h3>{currencyFormatter.format(flight.price)}</h3>
                    <button className="select-btn" onClick={() => handleSelect(flight)}>
                      Seleccionar
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>
        </main>
      </div>
      <Footer />
      {showConfirmationModal && selectedFlight && (
        <div className="confirmation-modal-overlay">
          <div className="confirmation-modal">
            <h3>Confirmar selección de vuelo</h3>
            
            <div className="flight-details">
              <p><strong>Aerolínea:</strong> {selectedFlight.airline} {selectedFlight.flightNumber}</p>
              <p><strong>Ruta:</strong> {selectedFlight.origin} → {selectedFlight.destination}</p>
              <p><strong>Fecha:</strong> {new Date(selectedFlight.departure).toLocaleDateString('es-ES')}</p>
              <p><strong>Hora:</strong> {new Date(selectedFlight.departure).toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})}</p>
              <p><strong>Duración:</strong> {selectedFlight.duration}</p>
              <p><strong>Precio:</strong> {currencyFormatter.format(selectedFlight.price)}</p>
            </div>
            
            <div className="modal-actions">
              <button 
                className="cancel-btn" 
                onClick={() => setShowConfirmationModal(false)}
              >
                Cancelar
              </button>
              <button 
                className="confirm-btn" 
                onClick={() => {
                  navigate('/passenger', { state: { flight: selectedFlight } });
                  setShowConfirmationModal(false);
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
