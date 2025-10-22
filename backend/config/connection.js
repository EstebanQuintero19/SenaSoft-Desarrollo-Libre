const mongoose = require('mongoose')
require('dotenv').config()
const URI = `mongodb+srv://JuanEstebanAdso:${process.env.PASS_DB}@cluster0.xfphf.mongodb.net/${process.env.DB_NAME}`

console.log('Conectando a la base de datos en:', URI);

mongoose.connect(URI);

module.exports = mongoose;

