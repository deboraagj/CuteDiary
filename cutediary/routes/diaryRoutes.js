const express = require("express");
const router = express.Router();

// IMPORTANDO BANCO DE DADOS
const Diary = require("../models/Diary");

// MOSTRAR PÁGINA INICIAL
router.get("/", async function (req, res) {
    res.render("home")
});

// MOSTRAR PÁGINA DO DIA
router.get("/day", async (req, res) => {

    let dateSelected = req.query.date;

    const [year, month, day] = dateSelected.split("-");
    const dateShow = `${day}/${month}/${year}`;

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
        console.log("ERRO AO LISTAR DIÁRIOS" + erro);
    }
});

// MOSTRAR A PÁGINA OPEN (visualizar anotação)
router.get("/open/:id/:date", async (req, res) => {
    const id = req.params.id;
    const date = req.params.date;

    const [year, month, day] = date.split("-");
    const dateShow = `${day}/${month}/${year}`;

    try {
        const diary = await Diary.findOne({ where: { id: id } });

        res.render("open", {
            diaries: diary.dataValues,
            dateShow: dateShow,
            dateSave: date
        });

    } catch (erro) {
        console.log("ERRO AO CARREGAR OPEN: " + erro);
        res.redirect(`/day?date=${date}`);
    }
});

// MOSTRAR PÁGINA DE CRIAÇÃO
router.get("/create", async function (req, res) {
    let dateSelected = req.query.date;

    const [year, month, day] = dateSelected.split("-");
    const dateShow = `${day}/${month}/${year}`;

    res.render("create", {
        dateShow: dateShow,
        dateSave: dateSelected
    });
});

// MOSTRAR PÁGINA DE EDIÇÃO
router.get("/edit/:id/:date", async function (req, res) {
    let date = req.params.date;

    const [year, month, day] = date.split("-");
    const dateShow = `${day}/${month}/${year}`;

    try {
        const diaries = await Diary.findOne({ where: { id: req.params.id } });
        res.render("edit", {
            diaries: diaries.dataValues,
            dateShow: dateShow,
            dateSave: date
        });
    } catch (erro) {
        console.log("ERRO AO BUSCAR REGISTRO PARA EDIÇÃO: " + erro);
    }
});

// CRIAR REGISTROS
router.post("/add", async function (req, res) {
    const date = req.body.date;

    try {
        await Diary.create({
            title: req.body.title,
            text: req.body.text,
            date: req.body.date
        });
        res.redirect(`day?date=${date}`);
    } catch (erro) {
        console.log("ERRO AO CRIAR REGISTRO " + erro);
        res.redirect(`day?date=${date}`);
    }
});

// ATUALIZAR REGISTROS
router.patch("/edit/:id/:date", async function (req, res) {
    let date = req.body.date;

    try {
        await Diary.update({
            title: req.body.title,
            text: req.body.text
        }, { where: { id: req.params.id } });

        res.redirect(`/day?date=${date}`);
    } catch (erro) {
        console.log("ERRO AO ATUALIZAR REGISTRO: " + erro);
        res.redirect(`/day?date=${date}`);
    }
});

// DELETAR REGISTROS
router.delete("/delete/:id/:date", async function (req, res) {
    const date = req.params.date;

    try {
        await Diary.destroy({ where: { id: req.params.id } });
        res.redirect(`/day?date=${date}`);
    } catch (erro) {
        console.log("ERRO AO DELETAR " + erro);
        res.redirect(`/day?date=${date}`);
    }
});

module.exports = router;
