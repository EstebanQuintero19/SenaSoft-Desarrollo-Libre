const mongoose = require('mongoose');

const schemaCiudad = new mongoose.Schema({
    nombre: { type: String, required: true },
    pais: { type: String, required: true, default: 'Colombia' },
    activa: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Ciudad', schemaCiudad);