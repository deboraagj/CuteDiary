const db = require("../db/db")
const Diary = db.sequelize.define("Diary",{
    // COLUNA TÍTULO
    title: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    // COLUNA DE TEXTO
    text: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    date: {
        type: db.Sequelize.DATE,
        allowNull: false
    }
})

Diary.sync({force: false})

module.exports = Diary