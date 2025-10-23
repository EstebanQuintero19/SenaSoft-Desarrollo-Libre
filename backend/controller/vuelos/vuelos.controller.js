const mongoose = require('mongoose');
const Vuelo = require('../../models/vuelos/vuelo.model');
const Ruta = require('../../models/rutas/ruta.model');
const { generarRutasDesdeCiudades } = require('../rutas/ruta.controller');

// Create flight
const crearVuelo = async (req, res) => {
    
    try {
        const { numeroVuelo, avion, fechaSalida, fechaLlegada, precioEstandar, estado = 'Programado', puertaEmbarque, observaciones } = req.body;

        if (!numeroVuelo || !avion || !fechaSalida || !fechaLlegada || precioEstandar == null) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const hasRoutes = await Ruta.countDocuments() > 0;
        if (!hasRoutes) await generarRutasDesdeCiudades();

        const [availableRoute] = await Ruta.aggregate([
            {$sample: {size: 1}}
        ])


        const vuelo = await Vuelo.create([{
            numeroVuelo,
            ruta: availableRoute._id,
            avion,
            fechaSalida,
            fechaLlegada,
            precioEstandar,
            estado,
            puertaEmbarque,
            observaciones
        }]);
         console.log('contenido: ', vuelo)
        return res.status(201).json({ message: 'Flight created', data: vuelo[0] });

    } catch (error) {
        console.log('no llegó')
        return res.status(500).json({ message: 'Error interno del servidor: ', error: error.message });
    }
};

// Get all flights
const obtenerVuelos = async (req, res) => {
    try {
        const vuelos = await Vuelo.find()
        
        return res.status(200).json({ data: vuelos });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching flights', error: error.message });
    }
};


module.exports = { 
    crearVuelo, 
    obtenerVuelos, 
};