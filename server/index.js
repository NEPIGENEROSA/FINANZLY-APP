const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let transactions = []; // Base de datos temporal

app.get('/api/transactions', (req, res) => res.json(transactions));

app.post('/api/transactions', (req, res) => {
    const newTransaction = { id: Date.now().toString(), ...req.body };
    transactions.push(newTransaction);
    res.status(201).json(newTransaction);
});

app.listen(3000, () => console.log('🚀 Server en http://localhost:3000'));