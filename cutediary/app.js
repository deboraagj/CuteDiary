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
app.use(express.static(path.join(__dirname, "public")));

// =====
// ROTAS
// =====

// MOSTRAR PÁGINA INICIAL
app.get("/", function(req, res) {
    res.render("home")
})

// MOSTRAR PÁGINA DO DIA
app.get('/day', (req, res) => {

    let dateSelected = req.query.date;

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
    const dateToRedirect = req.body.date;

    Diary.create({
            title: req.body.title,
            text: req.body.text,
            date: req.body.date
    }).then(function(){
        console.log("REGISTRO FEITO COM SUCESSO")
        res.redirect(`day?date=${dateToRedirect}`)
    }).catch(function(erro){
        console.log("ERRO AO CRIAR REGISTRO"+erro)
    });
});

// ATUALIZAR REGISTRPOS NO BANCO DE DADOS

// DELETAR REGISTROS DO BANCO DE DADOS
app.delete("/delete/:id", function(req, res){
    const dateToRedirect = req.body.dateRedirect;

    Diary.destroy({where: {"id": req.params.id}}).then(function(){
        console.log("DELETADO COM SUCESSO!")
        res.redirect(`/day?date=${dateToRedirect}`)
    }).catch(function(erro){
        console.log("ERRO AO DELETAR"+erro)
        res.redirect(`/day?date=${dateToRedirect}`)
    })
})


app.listen(PORT, () => console.log(`Servidor rodando na url http://localhost:${PORT}`));
