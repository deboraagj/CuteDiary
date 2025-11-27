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

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CONFIGURAÇÃO DO PATH
const path = require("path")

app.use(express.static(path.join(__dirname, "public")));

// =====
// ROTAS
// =====

// TESTANDO SERVIDOR

// MOSTRAR PÁGINA INICIAL
app.get("/", function(req, res){
    res.render("home")
})

// MOSTRAR PÁGINA DO DIA
app.get('/day', (req, res) => {
    
    const dataSelecionada = req.query.data;

    const dataExibicao = new Date(dataSelecionada).toLocaleDateString('pt-BR'); 

    res.render('day', {

        dataExibicao: dataExibicao, 
        dataSalvar: dataSelecionada 
    });
});

app.listen(PORT, () => console.log(`Servidor rodando na url http://localhost:${PORT}`))
