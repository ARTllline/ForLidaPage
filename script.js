function showNext(id) {
    const current = document.querySelector('.question:not([style*="display: none"])');
    if (current) {
        current.style.display = 'none';
    }
    document.getElementById(id).style.display = 'block';
}

function checkPassword() {
    var passwordInput = document.getElementById('password').value;
    var correctPassword = '1'; // Замените на ваш пароль

    if (passwordInput === correctPassword) {
        document.getElementById('passwordEntry').style.display = 'none';
        var video = document.getElementById('birthdayVideo');
        video.style.display = 'block';
        video.play();
    } else {
        alert('Неверный пароль!');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const noButton = document.getElementById('noButton');

    if (noButton) {
        noButton.onmouseover = function (event) {
            // Вычисляем максимально возможные значения для X и Y
            const maxX = window.innerWidth - this.offsetWidth;
            const maxY = window.innerHeight - this.offsetHeight;

            // Генерируем случайные координаты внутри допустимых границ
            let newX = Math.random() * maxX;
            let newY = Math.random() * maxY;

            // Конвертируем координаты в проценты относительно размера окна
            newX = 50 + (newX - window.innerWidth / 2) / window.innerWidth * 100;
            newY = 50 + (newY - window.innerHeight / 2) / window.innerHeight * 100;

            // Применяем новые координаты к стилю кнопки в процентах
            this.style.left = `${newX}%`;
            this.style.top = `${newY}%`;
        };
    }
});


///////////////////


let progress = 0;
let pumping; // Таймер для уменьшения прогресса

function pump() {
    if (progress === 0 && !pumping) {
        // Запускаем уменьшение прогресса, если это первое нажатие
        pumping = setInterval(decreaseProgress, 100);
    }

    progress += 10; // Увеличиваем прогресс на 10 при каждом нажатии
    updateProgress();

    if (progress >= 100) {
        clearInterval(pumping); // Останавливаем уменьшение прогресса
        document.getElementById('nextButton').style.display = 'block'; // Показываем кнопку "Дальше"
    }
}

function decreaseProgress() {
    progress -= 2; // Уменьшаем прогресс на 2 каждые 100 мс
    if (progress <= 0) {
        progress = 0; // Гарантируем, что значение не уйдет в отрицательное
        clearInterval(pumping); // Останавливаем таймер, если прогресс исчерпан
    }
    updateProgress();
}

function updateProgress() {
    document.getElementById('progressBar').value = progress; // Обновляем прогресс-бар
}

///////////////////////////////////


let dealerScore = 0, playerScore = 0;
let dealerHand = [], playerHand = [];

function startGame() {
    resetGame();
    playerDrawsCard();
    playerDrawsCard();
    dealerDrawsCard();
}

function resetGame() {
    dealerHand = [];
    playerHand = [];
    dealerScore = 0;
    playerScore = 0;
    updateScores();
}

function playerDrawsCard() {
    let card = drawCard();
    playerHand.push(card);
    playerScore += card;
    updateScores();
    if (playerScore > 21) {
        alert('Перебор! Вы проиграли.');
        startGame(); // Restart the game
    }
}

function dealerDrawsCard() {
    let card = drawCard();
    dealerHand.push(card);
    dealerScore += card;
    updateScores();
}
function drawCard() {
    return Math.floor(Math.random() * 11) + 1; // Рандомная карта от 1 до 11
}

function updateScores() {
    document.getElementById('dealerCards').textContent = dealerHand.join(', ');
    document.getElementById('playerCards').textContent = playerHand.join(', ');
    document.getElementById('dealerScore').textContent = dealerScore;
    document.getElementById('playerScore').textContent = playerScore;
}

function playerStands() {
    while (dealerScore < 17) {
        dealerDrawsCard();
    }
    // Обновляем DOM перед показом alert
    updateScores();

    // Добавляем небольшую задержку перед показом результатов
    setTimeout(() => {
        if (dealerScore > 21 || playerScore > dealerScore) {
            alert('Вы выиграли!');
            document.getElementById('nextLevel').style.display = 'block';
        } else if (playerScore === dealerScore) {
            alert('Ничья!');
            startGame(); // Restart the game if it's a draw
        } else {
            alert('Вы проиграли!');
            startGame(); // Restart the game if player loses
        }
    }, 100); // Задержка в 100 мс
}


window.onload = startGame; // Start the game when the window loads
