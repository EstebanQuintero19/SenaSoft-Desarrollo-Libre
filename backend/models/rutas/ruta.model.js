const mongoose = require('mongoose');

const schemaRuta = new mongoose.Schema({
    origen: { type: mongoose.Schema.Types.ObjectId, ref: 'Ciudad', required: true },
    destino: { type: mongoose.Schema.Types.ObjectId, ref: 'Ciudad', required: true },
    codigo: { type: String, required: true, unique: true } // p.ej. ORG_DEST
}, { timestamps: true });

schemaRuta.index({ origen: 1, destino: 1 }, { unique: true });

module.exports = mongoose.model('Ruta', schemaRuta);