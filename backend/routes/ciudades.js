const express = require('express');
const Ciudad = require('../models/ciudades');
const router = express.Router();

// Obtener todas las ciudades (filtrables)
router.get('/', async (req, res) => {
  try {
    const { region, destacado } = req.query;
    const query = {};
    
    if (region) query.region = region;
    if (destacado) query.destacado = destacado === 'true';
    
    const ciudades = await Ciudad.find(query)
      .sort({ destacado: -1, nombre: 1 })
      .select('nombre codigoAeropuerto region');
      
    res.json(ciudades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar ciudades por término (para autocompletado)
router.get('/buscar', async (req, res) => {
  try {
    const { termino } = req.query;
    const ciudades = await Ciudad.find({
      $or: [
        { nombre: new RegExp(termino, 'i') },
        { codigoAeropuerto: new RegExp(termino, 'i') }
      ]
    }).limit(10);
    
    res.json(ciudades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
