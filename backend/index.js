const express = require('express')

const app = express()

const PORT = process.env.PORT || 3000

app.listen(prompt, ()=>{
    console.log('Hey estoy funcionando en e puerto backend :',PORT)
})