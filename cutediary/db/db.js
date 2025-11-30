// CONFIGURAÇÃO COM O SERVIDOR MYSQL

const Sequelize = require("sequelize")
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        timezone: "-03:00"
    }
)

sequelize.authenticate().then(function(){
    console.log("BANCO DE DADOS CONECTADO COM SUCESSO! :)")
}).catch(function(erro){
    console.log("ERRO AO CONECTAR BANCO DE DADOS! :(")
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}