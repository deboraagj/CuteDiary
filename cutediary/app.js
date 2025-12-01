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

// MOSTRAR PÁGINA INICIAL
app.get("/", async function(req, res) {
    res.render("home")
})

// MOSTRAR PÁGINA DO DIA
app.get("/day", async (req, res) => {

    let dateSelected = req.query.date

    const [year, month, day] = dateSelected.split("-")
    const dateShow = `${day}/${month}/${year}`

    try {
        const diaries = await Diary.findAll({
            where: { date: dateSelected },
            order: [["id", "DESC"]]
        })

        res.render('day', {
            dateShow: dateShow,
            dateSave: dateSelected,
            diaries: diaries
        })
    } catch (erro) {
        console.log("ERRO AO LISTAR DIÁRIOS " + erro)
    }
})

// MOSTRAR PÁGINA DE CRIAÇÃO DE REGISTROS
app.get("/create", async function(req, res){
    let dateSelected = req.query.date

    const [year, month, day] = dateSelected.split("-")
    const dateShow = `${day}/${month}/${year}`

    res.render("create", {
        dateShow: dateShow,
        dateSave: dateSelected
    })
})

// MOSTRAR PÁGINA DE EDIÇÃO COM A ANOTAÇÃO SELECIONADA
app.get("/edit/:id/:date", async function(req, res){
    let date = req.params.date

    console.log("data mostrar:", date)

    const [year, month, day] = date.split("-")
    const dateShow = `${day}/${month}/${year}`

    try {
        const diaries = await Diary.findOne({ where: { id: req.params.id } })
        res.render("edit", {
            diaries: diaries.dataValues,
            dateShow: dateShow,
            dateSave: date
        })
    } catch (erro) {
        console.log("ERRO AO BUSCAR REGISTRO PARA EDIÇÃO: " + erro)
    }
})

// CRIAR REGISTROS NO BANCO DE DADOS
app.post("/add", async function(req, res){
    const date = req.body.date

    try {
        await Diary.create({
            title: req.body.title,
            text: req.body.text,
            date: req.body.date
        })
        console.log("REGISTRO FEITO COM SUCESSO")
        res.redirect(`day?date=${date}`)
    } catch (erro) {
        console.log("ERRO AO CRIAR REGISTRO " + erro)
        res.redirect(`day?date=${date}`)
    }
})

// ATUALIZAR REGISTROS NO BANCO DE DADOS
app.patch("/edit/:id/:date", async function(req, res){
    let date = req.body.date

    console.log("data captura ATUALIZAR:", date)

    try {
        await Diary.update({
            title: req.body.title,
            text: req.body.text
            //date: date
        }, { where: { id: req.params.id } })

        console.log("ATUALIZADO COM SUCESSO")
        res.redirect(`/day?date=${date}`)
    } catch (erro) {
        console.log("ERRO AO ATUALIZAR REGISTRO: " + erro)
        res.redirect(`/day?date=${date}`)
    }
})

// DELETAR REGISTROS DO BANCO DE DADOS
app.delete("/delete/:id/:date", async function(req, res){
    const date = req.params.date

    console.log("data captura:", date)

    try {
        await Diary.destroy({ where: { id: req.params.id } })
        console.log("DELETADO COM SUCESSO!")
        res.redirect(`/day?date=${date}`)
    } catch (erro) {
        console.log("ERRO AO DELETAR " + erro)
        res.redirect(`/day?date=${date}`)
    }
})

app.listen(process.env.PORT, () => console.log(`Servidor rodando na url http://localhost:${process.env.PORT}`));
