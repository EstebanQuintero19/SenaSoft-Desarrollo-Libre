const Reserva = require('../../models/reserva/reserva.model.js')

const crearReserva = async(req,res)=>{

    try {
    const{
        codigoReserva,
        usuario,
        vuelo,
        cedula,
        tipoDocumento,
        nombre,
        apellido,
        fechaNacimiento,
        genero,
        clase,
        cantidadAsientos,
        asientosAsignados,
        precioUnitario,
        precioTotal,
        impuestos,
        estado,
        equipajeFacturado,
        observaciones

    } = req.body;

    const reservaCompleta = {
        codigoReserva,
        usuario,
        vuelo,
        pasajeros:[{
            cedula,
            tipoDocumento,
            nombre,
            apellido,
            fechaNacimiento,
            genero
        }],
        genero,
        clase,
        cantidadAsientos,
        asientosAsignados,
        precioUnitario,
        precioTotal,
        impuestos,
        estado,
        equipajeFacturado,
        observaciones
    }

    const nuevaReserva = new Reserva(reservaCompleta)
    await nuevaReserva.save()

    return res.status(201).json({message:'Reserva creada exitosamente', data: nuevaReserva})
    } catch (error) {
        console.error(`Error al crear la reserva ${error}`);
        return res.status(500).json({message:'Error al crear la reserva'})
    }

}

module.exports = {crearReserva}