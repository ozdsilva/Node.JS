const express = require('express')
const app = express()

const carros = require('./routes/carro')

const PORT = process.env.PORT || 3000

app.get('/',(req, res)=>{
   res.send('<h1>Hello</h1>')
  //res.sendFile(__dirname + './public/index.html')
})

app.get('/sobre',(req, res)=>{
   res.send('<h1>Hello</h1>')
})

app.use('/carros',carros)



app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})