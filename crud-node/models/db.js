const Sequelize = require('sequelize')
const sequelize = new Sequelize('node_exemplo','root','MySQL135131+',{ //MySQL135131+
    host:"127.0.0.1",
    dialect: 'mysql',
    define: {
        charset:'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    },
    logging: false
})

//const db = require('./models/');  // Ajuste se o caminho é relativo

/*teste de conexão

sequelize.authenticate().then(function(){
    console.log('Conectado no banco de dados com sucesso!')
}).catch(function(err){
    console.log('Falha ao se conectar: '+err)
})*/

module.exports = {Sequelize, sequelize}