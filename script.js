const longPressButton = document.getElementById('longPressButton');
const message = document.getElementById('message');

let pressTimer;

longPressButton.addEventListener('mousedown', () => {
    pressTimer = setTimeout(() => {
        // Ação que acontece após o long-press
        message.textContent = "achei!";
    }, 1000); // 1000 milissegundos = 1 segundo
});

longPressButton.addEventListener('mouseup', () => {
    clearTimeout(pressTimer);
    message.textContent = "";
});
