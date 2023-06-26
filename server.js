const express = require('express');
const mysql = require('mysql');

// Configurações da conexão com o banco de dados
const dbConfig = {
    host: '',
    user: '',
    password: '',
    database: ''
};

// Criação da conexão com o banco de dados
const connection = mysql.createConnection(dbConfig);

// Criação do aplicativo Express
const app = express();

// Rota para recuperar todos os usuários
app.get('/usuario', (req, res) => {

    // Reconecta-se ao banco de dados antes de executar a consulta SQL
    connection.connect(function(err) {
        if (err) {
            console.error('Erro ao conectar-se ao banco de dados: ' + err.stack);
            return;
        }
        console.log('Conexão bem sucedida com o ID: ' + connection.threadId);
    });

    const query = 'SELECT * FROM usuario';

    // Executa a consulta SQL
    connection.query(query, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erro ao recuperar usuários');
        } else {
            res.json(results);
        }
    });
});

// Inicia o servidor
app.listen(4000, () => {
    console.log('Servidor iniciado na porta 4000');
});