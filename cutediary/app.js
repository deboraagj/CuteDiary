// PORTA
const PORT = 8080

// IMPORTAÇÃO DO MÓDULO EXPRESS
const express = require("express")
const app = express()

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

//READ
app.get("/", function(req, res){
    res.render("home")
})


app.listen(PORT, () => console.log(`Servidor rodando na url http://localhost:${PORT}`))
