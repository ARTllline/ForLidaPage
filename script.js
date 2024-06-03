function checkPassword() {
    var passwordInput = document.getElementById('password').value;
    var correctPassword = '123'; // Замените на ваш пароль

    if (passwordInput === correctPassword) {
        document.getElementById('login').style.display = 'none';
        var video = document.getElementById('birthdayVideo');
        video.style.display = 'block';
        video.play();
    } else {
        alert('Неверный пароль!');
    }
}
