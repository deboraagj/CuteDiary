// CONFIGURAÇÃO COM O SERVIDOR MYSQL

const Sequelize = require("sequelize")
const sequelize = new Sequelize(
    "cutediary",
    "admin",
    "admin",
    {
        host: "localhost",
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