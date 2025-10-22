const Ciudad = require('../../models/ciudades/ciudad.model.js');
const Ruta = require('../../models/rutas/ruta.model.js');

async function generarRutasDesdeCiudades() {
    const ciudades = await Ciudad.find();
    const creadas = [];
    for (let i = 0; i < ciudades.length; i++) {
        for (let j = 0; j < ciudades.length; j++) {
            if (i === j) continue;
            const origen = ciudades[i]._id;
            const destino = ciudades[j]._id;
            const codigo = `${ciudades[i]._id.toString()}_${ciudades[j]._id.toString()}`;
            const exists = await Ruta.findOne({ origen, destino });
            if (!exists) {
                const r = new Ruta({ origen, destino, codigo });
                await r.save();
                creadas.push(r);
            }
        }
    }
    return { creadas: creadas.length };
}

module.exports = { generarRutasDesdeCiudades };