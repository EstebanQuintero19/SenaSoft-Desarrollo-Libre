const mongoose = require('mongoose');
const axios = require('axios');
const Ciudad = require('../../models/ciudades/ciudad.model.js');
const Ruta = require('../../models/rutas/ruta.model.js');

const DEPARTMENTS_URL = 'https://api-colombia.com/api/v1/Department';

const generarCodigoIATA = (nombreCiudad) => {
    try {
        return nombreCiudad
            .replace(/\s+/g, '')
            .substring(0, 3)
            .toUpperCase()
            .replace(/[AEIOU]/g, '')
            .padEnd(3, 'X');
    } catch {
        return 'XXX';
    }
};

const generarRutasOptimizado = async (ciudades) => {
    try {
        if (!Array.isArray(ciudades) || ciudades.length < 2) return 0;

        const existingRoutes = await Ruta.find({}, { origen: 1, destino: 1 }).lean();
        const routeSet = new Set(existingRoutes.map(r => `${r.origen.toString()}|${r.destino.toString()}`));

        const rutasACrear = [];
        for (let i = 0; i < ciudades.length; i++) {
            for (let j = i + 1; j < ciudades.length; j++) {
                const idA = ciudades[i]._id.toString();
                const idB = ciudades[j]._id.toString();
                const keyAB = `${idA}|${idB}`;
                const keyBA = `${idB}|${idA}`;

                if (!routeSet.has(keyAB)) {
                    rutasACrear.push({
                        origen: ciudades[i]._id,
                        destino: ciudades[j]._id,
                        distanciaKM: Math.floor(Math.random() * (2000 - 200 + 1) + 200),
                        duracionMinutos: Math.floor(Math.random() * (240 - 30 + 1) + 30),
                        activo: true
                    });
                    routeSet.add(keyAB);
                }

                if (!routeSet.has(keyBA)) {
                    rutasACrear.push({
                        origen: ciudades[j]._id,
                        destino: ciudades[i]._id,
                        distanciaKM: Math.floor(Math.random() * (2000 - 200 + 1) + 200),
                        duracionMinutos: Math.floor(Math.random() * (240 - 30 + 1) + 30),
                        activo: true
                    });
                    routeSet.add(keyBA);
                }
            }
        }

        if (rutasACrear.length === 0) return 0;
        const inserted = await Ruta.insertMany(rutasACrear);
        return inserted.length;
    } catch (err) {
        console.error('Error generarRutasOptimizado:', err);
        throw err;
    }
};



module.exports = {
    obtenerCiudad,
    generarRutas: generarRutasOptimizado
};