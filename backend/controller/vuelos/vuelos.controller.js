const mongoose = require('mongoose');
const Vuelo = require('../../models/vuelos/vuelo.model');
const Ruta = require('../../models/rutas/ruta.model');
const { generarRutasDesdeCiudades } = require('../rutas/ruta.controller');

const crearVuelo = async(req,res) => {
    const session = await mongoose.startSession();
    try {
        const {
            numeroVuelo,
            avion,
            fechaSalida,
            fechaLlegada,
            precioEstandar,
            estado = 'Programado',
            puertaEmbarque,
            observaciones
        } = req.body;

        // Validar campos requeridos
        if (!numeroVuelo || !avion || !fechaSalida || !fechaLlegada || !precioEstandar) {
            return res.status(400).json({ 
                message: 'Faltan campos requeridos' 
            });
        }

        // Obtener ruta aleatoria no usada para la fecha
        const fecha = new Date(fechaSalida);
        const inicio = new Date(fecha.setHours(0,0,0,0));
        const fin = new Date(fecha.setHours(23,59,59,999));

        // Encontrar rutas ya usadas ese día
        const rutasUsadas = await Vuelo.distinct('ruta', {
            fechaSalida: { $gte: inicio, $lte: fin }
        });

        // Obtener una ruta aleatoria no usada
        const rutaDisponible = await Ruta.aggregate([
            { $match: { _id: { $nin: rutasUsadas } } },
            { $sample: { size: 1 } }
        ]);

        if (!rutaDisponible.length) {
            return res.status(409).json({
                message: 'No hay rutas disponibles para esta fecha'
            });
        }

        session.startTransaction();

        const nuevoVuelo = new Vuelo({
            numeroVuelo,
            ruta: rutaDisponible[0]._id,
            avion,
            fechaSalida,
            fechaLlegada,
            precioEstandar,
            estado,
            puertaEmbarque,
            observaciones
        });

        await nuevoVuelo.save({ session });
        await session.commitTransaction();

        return res.status(201).json({
            message: 'Vuelo creado con éxito',
            data: nuevoVuelo
        });

    } catch (error) {
        await session.abortTransaction().catch(() => {});
        console.error('Error al crear vuelo:', error.message);
        return res.status(500).json({
            message: 'Error interno al crear el vuelo',
            error: error.message
        });
    } finally {
        session.endSession();
    }
}
module.exports={crearVuelo}