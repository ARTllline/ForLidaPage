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
