const mongoose = require('mongoose');

const schemaAvion = new mongoose.Schema({
    matricula: { type: String, required: true, unique: true, uppercase: true }, // Ej: HK-5050
    modelo: { type: String, required: true }, // Ej: Boeing 737-800
    aerolinea: { type: String, required: true }, // Ej: Avianca, LATAM
    capacidadTotal: { type: Number, required: true, min: 1 },
    añoFabricacion: { type: Number },
    activo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Avion', schemaAvion);