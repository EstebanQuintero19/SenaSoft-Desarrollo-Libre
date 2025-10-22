const mongoose = require('mongoose');

const schemaPasajero = new mongoose.Schema({
    cedula: { type: String, required: true },
    tipoDocumento: { type: String, enum: ['CC', 'TI', 'CE', 'Pasaporte'], required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    fechaNacimiento: { type: Date },
    genero: { type: String, enum: ['Masculino', 'Femenino', 'Otro'] }
}, { _id: false });

const schemaReserva = new mongoose.Schema({
    codigoReserva: { type: String, required: true, unique: true, uppercase: true }, // Ej: R3X7K9
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    vuelo: { type: mongoose.Schema.Types.ObjectId, ref: 'Vuelo', required: true },
    
    // Pasajeros (embedded)
    pasajeros: [schemaPasajero],
    
    // Detalles de la reserva
    clase: { type: String, enum: ['Estandar'], required: true },
    cantidadAsientos: { type: Number, required: true, min: 1 },
    asientosAsignados: [{ type: String }], 
    
    // Precios
    precioUnitario: { type: Number, required: true },
    precioTotal: { type: Number, required: true },
    impuestos: { type: Number, default: 0 },
    
    // Estado
    estado: { 
        type: String, 
        enum: ['Pendiente', 'Confirmada', 'Pagada', 'Cancelada', 'Completada'], 
        default: 'Pendiente' 
    },
    
    equipajeFacturado: { type: Number, default: 0 }, // Cantidad de maletas
    observaciones: { type: String }
}, { timestamps: true });

// Generar código de reserva antes de guardar
schemaReserva.pre('save', function(next) {
    if (!this.codigoReserva) {
        this.codigoReserva = Math.random().toString(36).substring(2, 8).toUpperCase();
    }
    next();
});

// Índices para búsquedas frecuentes
schemaReserva.index({ usuario: 1, estado: 1 });
schemaReserva.index({ vuelo: 1, estado: 1 });

module.exports = mongoose.model('Reserva', schemaReserva);