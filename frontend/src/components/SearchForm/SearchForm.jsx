import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchForm.css';

const SearchForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    origen: '',
    destino: '',
    fechas: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Buscando vuelos:', formData);
    navigate('/discover');
  };

  return (
    <div className="search-form-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="origen">Origen</label>
          <input
            type="text"
            id="origen"
            name="origen"
            placeholder="Ciudad de Origen"
            value={formData.origen}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="destino">Destino</label>
          <input
            type="text"
            id="destino"
            name="destino"
            placeholder="Ciudad de Destino"
            value={formData.destino}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="fechas">Fechas</label>
          <input
            type="date"
            id="fechas"
            name="fechas"
            placeholder="Ida y Vuelta"
            value={formData.fechas}
            onChange={handleChange}
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
