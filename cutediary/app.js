// PORTA
const PORT = 8080

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
app.get("/", function(req, res) {
    res.render("home")
})

// MOSTRAR PÁGINA DO DIA
app.get("/day",(req, res) => {

    let dateSelected = req.query.date;

    const dateObj =  new Date()

    const [year, month, day] = dateSelected.split("-");
    const dateShow = `${day}/${month}/${year}`;

    Diary.findAll().then(function(diaries){
        res.render('day', {
            dateShow: dateShow,
            dateSave: dateSelected,
            diaries: diaries
        });
    })
});

// MOSTRAR PÁGINA DE CRIAÇÃO DE REGISTROS
app.get("/create", function(req, res){
    const dateSelected = req.query.date;

    const [year, month, day] = dateSelected.split("-");
    const dateShow = `${day}/${month}/${year}`;

    res.render("create", {
        dateShow: dateShow,
        dateSave: dateSelected,
    });
})

// CRIAR REGISTROS NO BANCO DE DADOS
app.post("/add", function(req, res){
    const date = req.body.date;

    Diary.create({
            title: req.body.title,
            text: req.body.text,
            date: req.body.date
    }).then(function(){
        console.log("REGISTRO FEITO COM SUCESSO")
        res.redirect(`day?date=${date}`)
    }).catch(function(erro){
        console.log("ERRO AO CRIAR REGISTRO"+erro)
        res.redirect(`day?date=${date}`)
    });
});

// MOSTRAR PÁGINA DE EDIÇÃO COM A ANOTAÇÃO SELECIONADA
app.get("/edit/:id", function(req, res){
    Diary.findOne({where: {"id": req.params.id}}).then(function(diaries){
        res.render("edit", {
            diaries: diaries.dataValues
        })
    }).catch(function(erro){
        console.log("ERRO AO BUSCAR REGISTRO PARA EDIÇÃO: "+erro);
    })
})

// ATUALIZAR REGISTRPOS NO BANCO DE DADOS
app.patch("/edit/:id", function(req, res){
     const date = req.body.date;

    Diary.update({where: {"id": req.params.id}},
    {
        title: req.body.title,
        text: req.body.text,
        date: req.body.date
    }).then(function(){
        console.log("ATULIZADO COM SUCESSO")
        res.redirect(`/day?date=${date}`)
    }).catch(function(erro){
        console.log("ERRO AO ATUALIZAR REGISTRO: " + erro)
        res.redirect(`/day?date=${date}`)
    })
})

// DELETAR REGISTROS DO BANCO DE DADOS
app.delete("/delete/:id/:date", function(req, res){
    const date = req.params.date;

    console.log("data captura:",date);

    Diary.destroy({where: {"id": req.params.id}}).then(function(){
        console.log("DELETADO COM SUCESSO!")
        res.redirect(`/day?date=${date}`)
    }).catch(function(erro){
        console.log("ERRO AO DELETAR"+erro)
        res.redirect(`/day?date=${date}`)
    })
})


app.listen(PORT, () => console.log(`Servidor rodando na url http://localhost:${PORT}`));
