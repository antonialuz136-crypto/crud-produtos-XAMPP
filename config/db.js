
const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "LojaDB"
});

conexao.connect((erro) => {
    if (erro) {
        console.log("Erro ao conectar:", erro.message);
        return;
    }

    console.log("Conectado ao Banco de Dados!");
});

module.exports = conexao;
