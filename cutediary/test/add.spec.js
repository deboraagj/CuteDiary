const request = require("supertest");
const express = require("express");
// Ajuste o caminho abaixo conforme a sua estrutura real se necessário
const diaryRoutes = require("../routes/diaryRoutes");
const Diary = require("../models/Diary");

// 1. Simula (Mock) o banco de dados
jest.mock("../models/Diary");

// 2. Cria um app Express fake para rodar os testes
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 3. Simula o res.render para ele não dar erro procurando arquivos de tela (EJS/Handlebars)
app.response.render = jest.fn(function (view, options) {
    this.status(200).send({ view, options });
});

app.use("/", diaryRoutes);

describe("Testes das Rotas do Diário (diaryRoutes.js)", () => {

    beforeEach(() => {
        jest.clearAllMocks(); // Limpa os dados antes de cada teste
    });

    // Teste 1
    it("CT-01: Deve renderizar a página inicial (GET /)", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
        expect(app.response.render).toHaveBeenCalledWith("home");
    });

    // Teste 2
    it("CT-02: Deve renderizar a página do dia com os diários (GET /day)", async () => {
        Diary.findAll.mockResolvedValue([{ id: 1, title: "Meu dia" }]); // Mock do retorno do DB

        const res = await request(app).get("/day?date=2026-04-20");

        expect(res.statusCode).toBe(200);
        expect(Diary.findAll).toHaveBeenCalled();
        expect(app.response.render).toHaveBeenCalledWith("day", expect.objectContaining({
            dateShow: "20/04/2026",
            dateSave: "2026-04-20"
        }));
    });

    // Teste 3
    it("CT-03: Deve lidar com erro ao buscar diários (GET /day)", async () => {
        Diary.findAll.mockRejectedValue(new Error("Erro no DB"));
        const res = await request(app).get("/day?date=2026-04-20");
        // Como o catch no seu código só dá console.log e não retorna erro HTTP, a requisição fica "pendurada".
        // O ideal no seu código seria colocar um res.status(500).send() no catch. 
        // Mas assumindo o comportamento atual, verificamos se o mock foi chamado.
        expect(Diary.findAll).toHaveBeenCalled();
    });

    // Teste 4
    it("CT-04: Deve renderizar a página de anotação específica (GET /open/:id/:date)", async () => {
        Diary.findOne.mockResolvedValue({ dataValues: { id: 1, title: "Anotação 1" } });

        const res = await request(app).get("/open/1/2026-04-20");

        expect(res.statusCode).toBe(200);
        expect(Diary.findOne).toHaveBeenCalledWith({ where: { id: "1" } });
        expect(app.response.render).toHaveBeenCalledWith("open", expect.anything());
    });

    // Teste 5
    it("CT-05: Deve redirecionar se der erro ao abrir anotação (GET /open/:id/:date)", async () => {
        Diary.findOne.mockRejectedValue(new Error("Não encontrado"));

        const res = await request(app).get("/open/99/2026-04-20");

        expect(res.statusCode).toBe(302); // 302 é o status de redirect
        expect(res.header.location).toBe("/day?date=2026-04-20");
    });

    // Teste 6
    it("CT-06: Deve renderizar a página de criação formatando a data (GET /create)", async () => {
        const res = await request(app).get("/create?date=2026-04-20");

        expect(res.statusCode).toBe(200);
        expect(app.response.render).toHaveBeenCalledWith("create", {
            dateShow: "20/04/2026",
            dateSave: "2026-04-20"
        });
    });

    // Teste 7
    it("CT-07: Deve renderizar a página de edição de anotação (GET /edit/:id/:date)", async () => {
        Diary.findOne.mockResolvedValue({ dataValues: { id: 1, title: "A editar" } });

        const res = await request(app).get("/edit/1/2026-04-20");

        expect(res.statusCode).toBe(200);
        expect(app.response.render).toHaveBeenCalledWith("edit", expect.anything());
    });

    // Teste 8
    it("CT-08: Deve criar um novo registro e redirecionar (POST /add)", async () => {
        Diary.create.mockResolvedValue(true);

        const res = await request(app)
            .post("/add")
            .send({ title: "Novo", text: "Texto", date: "2026-04-20" });

        expect(Diary.create).toHaveBeenCalled();
        expect(res.statusCode).toBe(302);
        expect(res.header.location).toBe("day?date=2026-04-20");
    });

    // Teste 9
    it("CT-09: Deve atualizar um registro e redirecionar (PATCH /edit/:id/:date)", async () => {
        Diary.update.mockResolvedValue(true);

        const res = await request(app)
            .patch("/edit/1/2026-04-20")
            .send({ title: "Atualizado", text: "Texto atualizado", date: "2026-04-20" });

        expect(Diary.update).toHaveBeenCalled();
        expect(res.statusCode).toBe(302);
        expect(res.header.location).toBe("/day?date=2026-04-20");
    });

    // Teste 10
    it("CT-10: Deve deletar um registro e redirecionar (DELETE /delete/:id/:date)", async () => {
        Diary.destroy.mockResolvedValue(true);

        const res = await request(app).delete("/delete/1/2026-04-20");

        expect(Diary.destroy).toHaveBeenCalledWith({ where: { id: "1" } });
        expect(res.statusCode).toBe(302);
        expect(res.header.location).toBe("/day?date=2026-04-20");
    });
});