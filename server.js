const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Configuração do banco de dados SQLite
const db = new sqlite3.Database(':memory:'); // Banco de dados na memória

// Configuração do servidor
app.use(express.json());

// Criar tabela para usuários
db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, matricula TEXT)');

// Criar tabela para perguntas do quiz
db.run('CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY AUTOINCREMENT, question TEXT, options TEXT, correct_option INTEGER)');

// Inserir perguntas no banco de dados
const questionsData = [
    ['Qual é a capital do Brasil?', 'A) Rio de Janeiro, B) São Paulo, C) Brasília', 3],
    ['Quem foi o primeiro presidente do Brasil?', 'A) Getúlio Vargas, B) Juscelino Kubitschek, C) Marechal Deodoro da Fonseca', 3],
    ['Quantos planetas existem em nosso sistema solar?', 'A) 8, B) 9, C) 10', 1],
];

questionsData.forEach(data => {
    db.run('INSERT INTO questions (question, options, correct_option) VALUES (?, ?, ?)', data);
});

// Rota para obter três perguntas aleatórias
app.get('/getRandomQuestions', (req, res) => {
    const sql = 'SELECT * FROM questions ORDER BY RANDOM() LIMIT 3';
    db.all(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
