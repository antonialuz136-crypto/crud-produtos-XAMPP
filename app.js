
const express = require("express");
const conexao = require("./config/db");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API de produtos funcionando!");
});

app.post("/produtos", (req, res) => {
    const { nome, preco, quantidade } = req.body;

    const sql = `
        INSERT INTO Produtos (Nome, Preco, Quantidade)
        VALUES (?, ?, ?)
    `;

    conexao.query(
        sql,
        [nome, preco, quantidade],
        (erro, resultado) => {
            if (erro) {
                console.log(erro);
                return res.status(500).json({
                    mensagem: "Erro ao cadastrar produto"
                });
            }

            res.status(201).json({
                mensagem: "Produto cadastrado com sucesso!",
                id: resultado.insertId
            });
        }
    );
});

app.get("/produtos", (req, res) => {
    const sql = "SELECT * FROM Produtos";

    conexao.query(sql, (erro, resultados) => {
        if (erro) {
            console.log(erro);
            return res.status(500).json({
                mensagem: "Erro ao buscar produtos"
            });
        }

        res.json(resultados);
    });
});

app.put("/produtos/:id", (req, res) => {
    const id = req.params.id;
    const { nome, preco, quantidade } = req.body;

    const sql = `
        UPDATE Produtos
        SET Nome = ?, Preco = ?, Quantidade = ?
        WHERE Id = ?
    `;

    conexao.query(
        sql,
        [nome, preco, quantidade, id],
        (erro, resultado) => {
            if (erro) {
                console.log(erro);
                return res.status(500).json({
                    mensagem: "Erro ao atualizar produto"
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensagem: "Produto não encontrado"
                });
            }

            res.json({
                mensagem: "Produto atualizado com sucesso!"
            });
        }
    );
});

app.delete("/produtos/:id", (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM Produtos WHERE Id = ?";

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            console.log(erro);
            return res.status(500).json({
                mensagem: "Erro ao excluir produto"
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Produto não encontrado"
            });
        }

        res.json({
            mensagem: "Produto excluído com sucesso!"
        });
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});

