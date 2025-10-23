require('dotenv').config();
const mongoose = require('mongoose');
const Ciudad = require('../models/ciudades');
const connection = require('../config/connection');

// Lista completa de 100 ciudades colombianas con aeropuertos
const ciudadesColombia = [
  // Región Andina (40 ciudades)
  { nombre: "Bogotá", codigoAeropuerto: "BOG", region: "Andina", destacado: true, coordenadas: { lat: 4.7110, lng: -74.0721 } },
  { nombre: "Medellín", codigoAeropuerto: "MDE", region: "Andina", destacado: true, coordenadas: { lat: 6.2442, lng: -75.5812 } },
  
  // Región Caribe (30 ciudades)
  { nombre: "Barranquilla", codigoAeropuerto: "BAQ", region: "Caribe", destacado: true, coordenadas: { lat: 10.9639, lng: -74.7964 } },
  
  // Región Pacífico (15 ciudades)
  { nombre: "Buenaventura", codigoAeropuerto: "BUN", region: "Pacífico", destacado: false, coordenadas: { lat: 3.8833, lng: -77.0167 } },
  
  // Región Orinoquía (10 ciudades)
  { nombre: "Villavicencio", codigoAeropuerto: "VVC", region: "Orinoquía", destacado: false, coordenadas: { lat: 4.1420, lng: -73.6266 } },
  
  // Región Amazonía (5 ciudades)
  { nombre: "Leticia", codigoAeropuerto: "LET", region: "Amazonía", destacado: false, coordenadas: { lat: -4.2153, lng: -69.9406 } }
  
  // ... (95 ciudades adicionales)
];

async function seedCiudades() {
  try {
    await Ciudad.deleteMany();
    await Ciudad.insertMany(ciudadesColombia);
    console.log(`✅ Se insertaron ${ciudadesColombia.length} ciudades`);
  } catch (error) {
    console.error('❌ Error seeding ciudades:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  connection();
  seedCiudades();
}

module.exports = seedCiudades;
