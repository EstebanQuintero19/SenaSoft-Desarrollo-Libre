const Avion = require('../../models/aviones/avion.model.js');
const crearAvion = async(req,res)=>{
    try {
        const avionData= {
            matricula,
            modelo,
            aerolinea, 
            capacidadTotal,
            añoFabricacion,
            activo
        } = req.body;
        const nuevoAvion = new Avion(avionData);
        await nuevoAvion.save()
        return res.status(201).json({message: 'Avion registrado con exito.', data: nuevoAvion})
    }catch{
        console.error('Error al intentar registrar el avion.',error.message)
    }
}

const obtenerAvinones = async(req,res)=>{
    try {
        const aviones = await Avion.find()
        if(!aviones)return res.status(404).json('No se pudieron obtener los Aviones.')
        res.status(201).json({message: 'Aviones obtenidos con extio.', data: aviones})
    } catch (error) {
        console.error('Error interno al tratar de hacer la solicitud de otencion de aviones', error.message)
    }
}

module.exports= {crearAvion,obtenerAvinones}