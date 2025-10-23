const mockFlights = [
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
    seatsAvailable: 120
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
    seatsAvailable: 150
  },
  // ... 98 more flights with different combinations
  {
    id: 100,
    airline: 'Wingo',
    flightNumber: 'P5100',
    origin: 'Cartagena (COL)',
    destination: 'Santa Marta (COL)',
    departure: '2023-11-20T18:00:00',
    arrival: '2023-11-20T19:30:00',
    duration: '1h 30m',
    price: 190000,
    stops: 0,
    seatsAvailable: 80
  }
];

module.exports = mockFlights;
