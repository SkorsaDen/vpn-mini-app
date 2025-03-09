const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Загрузка данных пользователя
app.get('/api/user/:userId', (req, res) => {
    const userId = req.params.userId;
    const users = require('./users.json'); // Загрузите ваш файл users.json
    const user = users[userId] || { key: null, subscription: 'Не активна', balance: 0 };

    res.json(user);
});

// Обработка команды "get_key"
app.post('/api/get_key', (req, res) => {
    const { userId } = req.body;
    // Логика создания ключа (например, через Outline VPN API)
    const key = "ss://your_generated_key";
    res.json({ key });
});

// Обработка команды "topup"
app.post('/api/topup', (req, res) => {
    const { userId } = req.body;
    // Логика пополнения баланса
    res.json({ balance: 190 }); // Пример ответа
});

// Обработка команды "profile"
app.post('/api/profile', (req, res) => {
    const { userId } = req.body;
    // Логика получения данных профиля
    res.json({ subscription: "Активна до 01.01.2024", balance: 190 });
});

// Обработка команды "support"
app.post('/api/support', (req, res) => {
    const { userId } = req.body;
    // Логика обращения в поддержку
    res.json({ message: "Свяжитесь с @vpnka_Boss" });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});