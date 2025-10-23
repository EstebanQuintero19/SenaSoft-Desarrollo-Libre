const express = require('express');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;
require('./config/connection.js')

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes/login/login.routes.js'))
app.use('/api', require('./routes/reservas/reserva.routes.js'))
app.use('/api', require('./routes/aviones/avion.routes.js'))
app.use('/api', require('./routes/vuelos/vuelos.routes.js'))
app.use('/api', require('./routes/ciudades.js'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
