const fs = require('fs')

/*CRIAR / ATUALIZAR ARQUIVOS*/

//fs.writeFile() //Criar arquivo e substitui o arquivo se já existe.
//fs.appendFile() //adiciona conteúdo num arquivo. Se o arquivo não existir ele cria vazio
//fs.open() //abre arquivo para leitura. Se o arquivo não existir ele cria vazio
//fs.readFile() //carrega o arquivo

/*if(!fs.existsSync('teste.txt')){
fs.writeFile('teste.txt', 'teste de conteúdo!', (err)=>{
    if(err){
        throw err
    }
    console.log('Arquivo criado com sucesso!')
})
}*/

/*fs.appendFile('teste.txt', 'teste de conteúdo?!', (err)=>{
    if(err){
        throw err
    }
        console.log('Arquivo criado com sucesso!')
    })*/

/*fs.open('arquivo.txt','w',(err, file)=>{
    if(err){
        throw err
    }
        console.log('Salvo')
})*/

/*fs.rename('w','arquivo2.txt',(err)=>{
    if(err){
        throw err
    }
        console.log('Renomeado!')
})*/

/*fs.unlink('arquivo2.txt',(err)=>{
    if(err){
        throw err
    }
        console.log('Renomeado!')
})*/