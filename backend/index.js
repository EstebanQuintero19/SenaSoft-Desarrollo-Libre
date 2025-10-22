const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('./config/connection.js')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes/login/login.routes.js'))

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});