// IMPORTAÇÃO DO DOTENV
require('dotenv').config()

// IMPORTAÇÃO DO MÓDULO EXPRESS
const express = require("express")
const app = express()

// IMPORTAÇÃO DO METHOD-OVERRIDE
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// IMPORTANDO BANCO DE DADOS
const Diary = require("./models/Diary")

// CONFIGURAÇÃO DO HANDLEBARS
const handlebars = require("express-handlebars")
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('view engine', 'handlebars');

// CONFIGURAÇÃO DO BODY PARSER
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CONFIGURAÇÃO DO PATH
const path = require("path")
const { where } = require("sequelize")
app.use(express.static(path.join(__dirname, "public")));

// ===== //
// ROTAS //
// ===== //

// Importa as rotas externas (arquivo: routes/diaryRoutes.js)
const diaryRoutes = require("./routes/diaryRoutes")
app.use("/", diaryRoutes)

// ===== FIM DAS ROTAS IMPORTADAS ===== //

app.listen(process.env.PORT, () => console.log(`Servidor rodando na url http://localhost:${process.env.PORT}`));
