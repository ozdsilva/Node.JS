const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const Usuario = require('./models/Usuario')
const PORT = process.env.PORT || 3000

//Config do Handlebars (colocar toda vez)

app.engine('hbs',hbs.engine({
    extname: 'hbs', // ao invés de ./handlebars
    defaultLayout: 'main'
}))

app.set('view engine', 'hbs')
//config até aqui

//app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

//Importar model usuarios


//Configuração das Sessions

app.use(session({
    secret: 'CriarUmaChave',
    resave: false,
    saveUninitialized: true
}))

app.get('/', (req, res)=>{
    if(req.session.errors) {
        let arrayErros = req.session.errors;
        req.session.errors = ""
        return res.render('index', {NavActiveCad:true, error:arrayErros})
    }

    if(req.session.success) {
        req.session.success = false
        return res.render('index', {NavActiveCad:true, MsgSuccess:true})
    }
    res.render('index', {NavActiveCad:true})
})

app.get('/users', (req, res)=>{
    Usuario.findAll().then((valores)=>{
        //console.log(valores.map(valores => valores.toJSON()))
        if(valores.length > 0){
            return res.render('users',{NavActiveUsers:true, table: true, usuarios: valores.map(valores => valores.toJSON())})
        } else {
            res.render('users',{NavActiveUsers:true, table: false})
        }
    }).catch((err)=>{
        console.log(`Houve um problema: ${err}`)
    })
    //res.render('users',{NavActiveUsers:true})
})

app.post('/cad', (req, res)=>{ //valores vindos do formulário
    
    let nome = req.body.nome;
    let email = req.body.email;

    //console.log(req.body)
    //array com os erros

    const erros = []

    // remover os espaços em branco

    nome = nome.trim()
    email = email.trim()

    // Limpar o nome de caracteres especiais (apenas letras)

    nome = nome.replace(/[^A-zÀ-ú\s]/gi,'')
    nome = nome.trim()
    //console.log(nome)

    //Verificar se está vazio ou não definido o campo

    if (nome == '' || typeof nome == undefined || nome == null){
        erros.push({mensagem: "Campo nome não pode ser vazio!"})
    }

    //Verificar se o campo nome é válido

    if(!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/.test(nome)) {
        erros.push({mensagem:"Nome inválido"})
    }

    //Validar e-mail

    if(email == '' || typeof email == undefined || email == null) {
        erros.push({mensagem: "Campo email não pode ser vazio"})
    }

    // Verificar se o e-mail é válido

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
        erros.push({mensagem: "Campo email inválido!"})
    }

    if(erros.length > 0) {
        console.log(erros)
        req.session.errors = erros;
        req.session.success = false;
        return res.redirect('/')
    }

    //Sucesso nenhum erro
    //Salvar no Banco de Dados

    Usuario.create({
        nome: nome,
        email: email.toLowerCase()
    }).then(function(){
        console.log('Cadastrado com sucesso!')
        req.session.success = true
        return res.redirect('/')
    }).catch(function(erro){
        console.log(`Ops, houve um erro: ${erro}`)
    })

})

app.post('/editar', (req, res)=>{
    let id = req.body.id
    Usuario.findByPk(id).then((dados)=>{
        return res.render('editar', {error:false, id: dados.id, nome: dados.nome, email: dados.email})
    }).catch((err)=>{
        console.log(err)
        return res.render('editar', {error: true, problema: 'Não é possível editar este registro'})
    })
    //res.render('editar')
})

app.post('/update', (req, res)=>{

    let nome = req.body.nome
    let email = req.body.email

    //console.log(nome)

    
    //array com os erros

    const erros = []

    // remover os espaços em branco

    //nome = nome.trim()
    //email = email.trim()

    // Limpar o nome de caracteres especiais (apenas letras)

    //nome = nome.replace(/[^A-zÀ-ú\s]/gi,'')
    //nome = nome.trim()
    //console.log(nome)

    //Verificar se está vazio ou não definido o campo

    if (nome == '' || typeof nome == undefined || nome == null){
        erros.push({mensagem: "Campo nome não pode ser vazio!"})
    }

    //Verificar se o campo nome é válido

    if(!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/.test(nome)) {
        erros.push({mensagem:"Nome inválido"})
    }

    //Validar e-mail

    if(email == '' || typeof email == undefined || email == null) {
        erros.push({mensagem: "Campo email não pode ser vazio"})
    }

    // Verificar se o e-mail é válido

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
        erros.push({mensagem: "Campo email inválido!"})
    }

    if(erros.length > 0) {
        console.log(erros)
        return res.status(400).send({status: 400, erro: erros})
    }

    //Sucesso nenhum erro
    //Atualizar registro no Banco de Dados

    Usuario.update(
        {
        name: nome,
        email: email.toLowerCase()
        },
        {
        where: {
            id: req.body.id
        }
        }).then((resultado)=>{
            console.log(resultado)
            return res. redirect('/users')
        }).catch((err)=>{
            console.log(err)
        
    })
})

app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})