const controladorCiudad = require('../../controller/ciudades/ciudad.controller');
const router = require('express').Router();

router.get('/ciudad', controladorCiudad.obtenerCiudad);

module.exports = router;