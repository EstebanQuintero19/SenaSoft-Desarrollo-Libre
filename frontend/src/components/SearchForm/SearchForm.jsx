import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ciudadesColombia } from '../../data/ciudadesData';
import './SearchForm.css';

const SearchForm = () => {
  const navigate = useNavigate();

  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fecha, setFecha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/discover', { 
      state: { origen, destino, fecha }
    });
  };

  return (
    <div className="search-form-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="origen">Origen</label>
          <input
            value={origen}
            onChange={(e) => setOrigen(e.target.value)}
            list="origenes-lista"
            placeholder="Ciudad origen"
            required
          />
          <datalist id="origenes-lista">
            {ciudadesColombia.map(ciudad => (
              <option key={`origen-${ciudad.codigoAeropuerto}`} 
                      value={`${ciudad.nombre} (${ciudad.codigoAeropuerto})`} />
            ))}
          </datalist>
        </div>

        <div className="form-group">
          <label htmlFor="destino">Destino</label>
          <input
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            list="destinos-lista"
            placeholder="Ciudad destino"
            required
          />
          <datalist id="destinos-lista">
            {ciudadesColombia.map(ciudad => (
              <option key={`destino-${ciudad.codigoAeropuerto}`} 
                      value={`${ciudad.nombre} (${ciudad.codigoAeropuerto})`} />
            ))}
          </datalist>
        </div>

        <div className="form-group">
          <label htmlFor="fecha">Fecha</label>
          <input 
            type="date" 
            value={fecha} 
            onChange={(e) => setFecha(e.target.value)} 
            required 
          />
        </div>

        <button type="submit" className="search-button">
          Buscar Vuelos
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
