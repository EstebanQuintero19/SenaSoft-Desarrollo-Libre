const router = require('express').Router()
const controladorAvion = require('../../controller/avion/avion.controller.js')

router.get('/obtenerAviones', controladorAvion.obtenerAvinones);
router.post('/registrarAvion', controladorAvion.crearAvion);

module.exports= router;