// PORTA
const PORT = 8080

// IMPORTAÇÃO DO MÓDULO EXPRESS
const express = require("express")
const app = express()

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

// TESTANDO SERVIDOR

// MOSTRAR PÁGINA INICIAL
app.get("/", function (req, res) {
    res.render("home")
})

// MOSTRAR PÁGINA DO DIA
app.get('/day', (req, res) => {

    let dateSelected = req.query.date;

    const dateObj = new Date(dateSelected);
    const dateShow = dateObj.getDate().toString().padStart(2, '0') + '/' + (dateObj.getMonth() + 1).toString().padStart(2, '0') + '/' + dateObj.getFullYear();

    res.render('day', {
        dateShow: dateShow,
        dateSave: dateSelected
    });
});

// CRIAR REGISTROS NO SERVIDOR
app.post("/add", function(req, res){

   const dateForm =  req.body.date;

    Diary.create({
            title: req.body.title,
            text: req.body.text,
            date: new Date(dateForm)
    }).then(function(){
        console.log("REGISTRO FEITO COM SUCESSO")
    }).catch(function(erro){
        console.log("ERRO AO CRIAR REGISTRO"+erro)
    });
});   

app.listen(PORT, () => console.log(`Servidor rodando na url http://localhost:${PORT}`));
