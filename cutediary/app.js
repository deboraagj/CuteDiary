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

// CONFIGURAÇÃO DO HANDLEBARS


app.set('view engine', 'handlebars');

// CONFIGURAÇÃO DO 
//ROTAS

// TESTANDO SERVIDOR
app.get("/", function(req, res){
    res.write("Hello Wolrd!")
    res.end()
})

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
