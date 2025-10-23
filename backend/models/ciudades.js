const mongoose = require('mongoose');

const ciudadSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  codigoAeropuerto: { type: String, required: true, unique: true, uppercase: true },
  pais: { type: String, default: 'Colombia' },
  region: { type: String, 
    enum: ['Caribe', 'Andina', 'Pacífico', 'Orinoquía', 'Amazonía'],
    required: true 
  },
  destacado: { type: Boolean, default: false },
  coordenadas: {
    lat: Number,
    lng: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Ciudad', ciudadSchema);
