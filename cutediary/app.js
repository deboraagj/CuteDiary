// IMPORTAÇÃO DO MÓDULO EXPRESS
const express = require("express")

// DECLARAÇÃO DO OBJETO PRINCIPAL
const app = express()
const PORT = 8080

//ROTAS

// TESTANDO SERVIDOR
app.get("/", function(req, res){
    res.write("Hello Wolrd!")
    res.end()
})

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
