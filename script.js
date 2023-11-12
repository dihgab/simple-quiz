const longPressButton = document.getElementById('longPressButton');
const message = document.getElementById('message');

let pressTimer;

longPressButton.addEventListener('mousedown', () => {
    pressTimer = setTimeout(() => {
        // Ação que acontece após o long-press
        message.textContent = "achei!";
    }, 3000); // 1000 milissegundos = 1 segundo

    // Adiciona a classe "active" ao botão durante o pressionamento do mouse
    longPressButton.classList.add('active');
});

longPressButton.addEventListener('mouseup', () => {
    clearTimeout(pressTimer);
    message.textContent = "";
    // Remove a classe "active" quando o botão for liberado
    longPressButton.classList.remove('active');
});
