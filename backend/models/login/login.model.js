const mongoose = require('mongoose');

const schemaUsuario = new mongoose.Schema({
    cedula: { type: String, required: true, unique: true },
    tipoDocumento: { type: String, enum: ['CC', 'TI', 'CE'], required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now },
    genero: { type: String, enum: ['Masculino', 'Femenino', 'Otro'], default: 'Otro' },
    password: { type: String, required: true }
});

module.exports = mongoose.model('Usuario', schemaUsuario);