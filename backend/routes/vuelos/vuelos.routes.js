const router = require('express').Router()

const controladorVuelos = require('../../controller/vuelos/vuelos.controller.js');

//router.get('/obtenerVuelos', controladorVuelos.obtenerVuelos);
router.post('/crearVuelo', controladorVuelos.crearVuelo);

module.exports=router;