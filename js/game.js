const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image(); // Создание объекта
ground.src = "img/ground.png"; // Указываем нужное изображение

const foodImg = new Image(); // Создание объекта
foodImg.src = "img/food.png"; // Указываем нужное изображение

let box = 32; // Обьявление переменной - Ширина и высота 1го квадратика поля

let score = 0; // Обьявление переменной - счет игры

// Обьявление переменной - появление еды, (15 и 17 кол-во клеток по вертикали и горизонтали)
let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};
//Массив; Обьявление переменной, нулевое значение нахождения змейки, по центру
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

document.addEventListener("keydown", direction); // При нажатии на какую-либо кнопку

let dir;
// Вызывается метод (someMethod)
function direction(event) {
    if (event.keyCode == 37 && dir != "right")
        dir = "left";
    else if (event.keyCode == 38 && dir != "down")
        dir = "up";
    else if (event.keyCode == 39 && dir != "left")
        dir = "right";
    else if (event.keyCode == 40 && dir != "up")
        dir = "down";
}

function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y)
            clearInterval(game);
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0); //обращение к функции drawImage (картинка,координаты х и у)

    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "brown";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    } else
        snake.pop();

    if (snakeX < box || snakeX > box * 17
        || snakeY < 3 * box || snakeY > box * 17)
        clearInterval(game);

    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);
}

let game = setInterval(drawGame, 500); // Вызов функции из вне; Отображение самой картинки

