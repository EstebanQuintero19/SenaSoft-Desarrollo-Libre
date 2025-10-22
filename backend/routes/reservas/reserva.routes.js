const controladorReserva = require('../../controller/reservas/reserva.controller.js')
const router = require('express').Router()

router.post('/crearReserva',controladorReserva.crearReserva)

module.exports = router;