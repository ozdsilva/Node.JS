const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
   res.send('Rota Carros')
})

router.get('/:marca',(req, res)=>{
    const marcas = ['fiat','volks','bmw']
    if(marcas.includes(req.params.marca)){
    res.send('A rota ' +req.params.marca)
    }else{
        res.status(404).send('MARCA NÃO ENCONTRADA')
}
})

router.get('/:marca/:modelo',(req,res)=>{
    res.send('A rota é Fiat')
})

module.exports = router