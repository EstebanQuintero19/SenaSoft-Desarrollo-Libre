// Helper functions
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

const toISODateTime = (date, hours) => {
  const d = new Date(date);
  d.setHours(hours, 0, 0, 0);
  return d.toISOString();
};

export const mockFlights = [
  // Vuelos para hoy
  {
    id: 1001,
    airline: 'Avianca',
    flightNumber: 'AV501',
    origin: 'Bogotá (COL)',
    destination: 'Medellín (COL)',
    departure: toISODateTime(today, 8),
    arrival: toISODateTime(today, 9),
    duration: '1h',
    price: 280000,
    stops: 0,
    seatsAvailable: 45,
    roundTrip: false
  },
  {
    id: 1002,
    airline: 'LATAM',
    flightNumber: 'LA702',
    origin: 'Bogotá (COL)',
    destination: 'Cali (COL)',
    departure: toISODateTime(today, 14),
    arrival: toISODateTime(today, 15),
    duration: '1h',
    price: 265000,
    stops: 0,
    seatsAvailable: 32,
    roundTrip: false
  },
  
  // Vuelos para mañana
  {
    id: 1003,
    airline: 'Wingo',
    flightNumber: 'P5803',
    origin: 'Medellín (COL)',
    destination: 'Cartagena (COL)',
    departure: toISODateTime(tomorrow, 7),
    arrival: toISODateTime(tomorrow, 8),
    duration: '1h',
    price: 195000,
    stops: 0,
    seatsAvailable: 28,
    roundTrip: false
  },
  {
    id: 1004,
    airline: 'SATENA',
    flightNumber: 'ST804',
    origin: 'Bogotá (COL)',
    destination: 'Santa Marta (COL)',
    departure: toISODateTime(tomorrow, 11),
    arrival: toISODateTime(tomorrow, 12),
    duration: '1h',
    price: 310000,
    stops: 0,
    seatsAvailable: 18,
    roundTrip: false
  },
  
  // Vuelos para pasado mañana
  {
    id: 1005,
    airline: 'EasyFly',
    flightNumber: 'EF905',
    origin: 'Cali (COL)',
    destination: 'Pereira (COL)',
    departure: toISODateTime(dayAfterTomorrow, 9),
    arrival: toISODateTime(dayAfterTomorrow, 10),
    duration: '1h',
    price: 175000,
    stops: 0,
    seatsAvailable: 22,
    roundTrip: false
  },
  {
    id: 1006,
    airline: 'Avianca',
    flightNumber: 'AV906',
    origin: 'Cartagena (COL)',
    destination: 'San Andrés (COL)',
    departure: toISODateTime(dayAfterTomorrow, 16),
    arrival: toISODateTime(dayAfterTomorrow, 18),
    duration: '2h',
    price: 420000,
    stops: 0,
    seatsAvailable: 15,
    roundTrip: false
  },
  
  // Vuelos directos (ida)
  {
    id: 1,
    airline: 'Avianca',
    flightNumber: 'AV123',
    origin: 'Bogotá (COL)',
    destination: 'Medellín (COL)',
    departure: '2023-11-15T08:00:00',
    arrival: '2023-11-15T09:15:00',
    duration: '1h 15m',
    price: 250000,
    stops: 0,
    seatsAvailable: 120,
    roundTrip: false
  },
  {
    id: 2,
    airline: 'LATAM',
    flightNumber: 'LA456',
    origin: 'Bogotá (COL)',
    destination: 'Cali (COL)',
    departure: '2023-11-15T10:30:00',
    arrival: '2023-11-15T11:45:00',
    duration: '1h 15m',
    price: 270000,
    stops: 0,
    seatsAvailable: 150,
    roundTrip: false
  },
  {
    id: 3,
    airline: 'Wingo',
    flightNumber: 'P5789',
    origin: 'Bogotá (COL)',
    destination: 'Cartagena (COL)',
    departure: '2023-11-16T07:20:00',
    arrival: '2023-11-16T08:45:00',
    duration: '1h 25m',
    price: 210000,
    stops: 0,
    seatsAvailable: 95,
    roundTrip: false
  },
  
  // Vuelos con escalas
  {
    id: 4,
    airline: 'Avianca',
    flightNumber: 'AV789',
    origin: 'Bogotá (COL)',
    destination: 'Santa Marta (COL)',
    departure: '2023-11-17T14:00:00',
    arrival: '2023-11-17T16:30:00',
    duration: '2h 30m',
    price: 320000,
    stops: 1,
    stopDetails: ['Medellín (COL)'],
    seatsAvailable: 80,
    roundTrip: false
  },
  
  // Paquetes de ida y vuelta (roundTrip)
  {
    id: 101,
    airline: 'Avianca',
    flightNumber: 'AV101/AV102',
    origin: 'Bogotá (COL)',
    destination: 'Medellín (COL)',
    departure: '2023-11-20T08:00:00',
    arrival: '2023-11-20T09:15:00',
    returnDate: '2023-11-27T18:00:00',
    returnArrival: '2023-11-27T19:15:00',
    duration: '1h 15m',
    price: 480000, // Precio especial por paquete
    stops: 0,
    seatsAvailable: 60,
    roundTrip: true
  },
  {
    id: 102,
    airline: 'LATAM',
    flightNumber: 'LA201/LA202',
    origin: 'Bogotá (COL)',
    destination: 'Cartagena (COL)',
    departure: '2023-11-21T11:00:00',
    arrival: '2023-11-21T12:30:00',
    returnDate: '2023-11-28T15:00:00',
    returnArrival: '2023-11-28T16:30:00',
    duration: '1h 30m',
    price: 520000,
    stops: 0,
    seatsAvailable: 45,
    roundTrip: true
  },
  // Más vuelos redondos...
  {
    id: 103,
    airline: 'Wingo',
    flightNumber: 'P5103/P5104',
    origin: 'Medellín (COL)',
    destination: 'Santa Marta (COL)',
    departure: '2023-11-22T09:00:00',
    arrival: '2023-11-22T10:30:00',
    returnDate: '2023-11-29T17:00:00',
    returnArrival: '2023-11-29T18:30:00',
    duration: '1h 30m',
    price: 410000,
    stops: 0,
    seatsAvailable: 75,
    roundTrip: true
  },
  
  // Nuevas ciudades y rutas
  // Región Caribe
  {
    id: 201,
    airline: 'SATENA',
    flightNumber: 'ST701',
    origin: 'Barranquilla (COL)',
    destination: 'San Andrés (COL)',
    departure: '2023-11-18T06:30:00',
    arrival: '2023-11-18T08:15:00',
    duration: '1h 45m',
    price: 290000,
    stops: 0,
    seatsAvailable: 60,
    roundTrip: false
  },
  {
    id: 202,
    airline: 'EasyFly',
    flightNumber: 'EF202',
    origin: 'Santa Marta (COL)',
    destination: 'Valledupar (COL)',
    departure: '2023-11-19T12:00:00',
    arrival: '2023-11-19T12:45:00',
    duration: '45m',
    price: 180000,
    stops: 0,
    seatsAvailable: 30,
    roundTrip: false
  },
  
  // Región Andina
  {
    id: 203,
    airline: 'Avianca',
    flightNumber: 'AV204',
    origin: 'Bucaramanga (COL)',
    destination: 'Pereira (COL)',
    departure: '2023-11-20T09:30:00',
    arrival: '2023-11-20T10:20:00',
    duration: '50m',
    price: 220000,
    stops: 0,
    seatsAvailable: 90,
    roundTrip: false
  },
  {
    id: 204,
    airline: 'LATAM',
    flightNumber: 'LA205',
    origin: 'Manizales (COL)',
    destination: 'Cúcuta (COL)',
    departure: '2023-11-21T14:15:00',
    arrival: '2023-11-21T15:30:00',
    duration: '1h 15m',
    price: 240000,
    stops: 0,
    seatsAvailable: 75,
    roundTrip: false
  },
  
  // Región Pacífico
  {
    id: 205,
    airline: 'SATENA',
    flightNumber: 'ST706',
    origin: 'Cali (COL)',
    destination: 'Quibdó (COL)',
    departure: '2023-11-22T07:00:00',
    arrival: '2023-11-22T08:10:00',
    duration: '1h 10m',
    price: 210000,
    stops: 0,
    seatsAvailable: 40,
    roundTrip: false
  },
  
  // Vuelos redondos nuevos
  {
    id: 301,
    airline: 'Avianca',
    flightNumber: 'AV301/AV302',
    origin: 'Bogotá (COL)',
    destination: 'San Andrés (COL)',
    departure: '2023-11-23T10:00:00',
    arrival: '2023-11-23T11:45:00',
    returnDate: '2023-11-30T16:00:00',
    returnArrival: '2023-11-30T17:45:00',
    duration: '1h 45m',
    price: 650000,
    stops: 0,
    seatsAvailable: 50,
    roundTrip: true
  }
];
