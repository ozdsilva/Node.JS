const express = require('express')
const app = express()

usuarioLogado = true

const PORT = process.env.PORT || 3000

app.get('/restrita',(req, res, next)=>{
    if(!usuarioLogado) {
    res.redirect('/')
    }
     next()
 })

 app.get('/restrita/usuarios',(req, res, next)=>{
    if(!usuarioLogado) {
    res.redirect('/')
    }
     next()
 })

app.get('/',(req, res, next)=>{
   res.send('<h1>Página inicial</h1>')
    next()
})

app.get('/restrita',(req, res, next)=>{
    res.send('<h1>Página restrita</h1>')
     next()
 })

 app.get('/restrita/usuarios',(req, res)=>{
    res.send('<h1>Listar usuários</h1>')
 })

app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})