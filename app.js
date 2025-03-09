// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Элементы интерфейса
const keyElement = document.getElementById('key');
const subscriptionElement = document.getElementById('subscription');
const balanceElement = document.getElementById('balance');

// Функция для отправки команд на сервер
async function sendCommand(command) {
    const userId = tg.initDataUnsafe.user.id; // Получаем ID пользователя
    const response = await fetch(`/api/${command}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    });
    const data = await response.json();

    // Обновляем интерфейс
    if (data.key) keyElement.textContent = data.key;
    if (data.subscription) subscriptionElement.textContent = data.subscription;
    if (data.balance) balanceElement.textContent = `${data.balance} руб`;
}

// Функция для загрузки данных пользователя
async function loadUserData() {
    const userId = tg.initDataUnsafe.user.id;
    const response = await fetch(`/api/user/${userId}`);
    const data = await response.json();

    // Обновляем интерфейс
    if (data.key) keyElement.textContent = data.key;
    if (data.subscription) subscriptionElement.textContent = data.subscription;
    if (data.balance) balanceElement.textContent = `${data.balance} руб`;
}

// Инициализация Mini App
tg.ready(); // Говорим Telegram, что Mini App готов к работе
loadUserData(); // Загружаем данные пользователя