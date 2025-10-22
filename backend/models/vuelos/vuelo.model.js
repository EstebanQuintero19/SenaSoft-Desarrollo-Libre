const mongoose = require('mongoose');

const schemaVuelo = new mongoose.Schema({
    numeroVuelo: { type: String, required: true, unique: true, uppercase: true }, // Ej: AV123
    ruta: { type: mongoose.Schema.Types.ObjectId, ref: 'Ruta', required: true },
    avion: { type: mongoose.Schema.Types.ObjectId, ref: 'Avion', required: true },
    
    // Horarios
    fechaSalida: { type: Date, required: true },
    fechaLlegada: { type: Date, required: true },
    
    // Precio estandar
    precioEstandar: { type: Number, required: true, min: 0 },
    
    // Estado del vuelo
    estado: { 
        type: String, 
        enum: ['Programado', 'En Vuelo', 'Aterrizado', 'Cancelado', 'Retrasado'], 
        default: 'Programado' 
    },
    
    puertaEmbarque: { type: String }, // Ej: A12
    observaciones: { type: String }
}, { timestamps: true });

// Índice para búsquedas por fecha
schemaVuelo.index({ fechaSalida: 1, estado: 1 });

module.exports = mongoose.model('Vuelo', schemaVuelo);