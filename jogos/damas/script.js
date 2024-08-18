// Adapte o tamanho do canvas ao tamanho da tela
function resizeCanvas() {
    canvas.width = window.innerWidth * 0.9; // 90% da largura da tela
    canvas.height = window.innerHeight * 0.7; // 70% da altura da tela

    // Reposicione paddles e bola após redimensionar o canvas
    leftPaddle.x = 10;
    leftPaddle.y = canvas.height / 2 - paddleHeight / 2;
    rightPaddle.x = canvas.width - paddleWidth - 10;
    rightPaddle.y = canvas.height / 2 - paddleHeight / 2;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Inicializa o tamanho do canvas

// Ajuste a velocidade do paddle e da bola para telas menores
const adjustForMobile = () => {
    const isMobile = window.innerWidth < 768; // Por exemplo, considera telas menores que 768px como móveis
    const speedMultiplier = isMobile ? 0.8 : 1; // Reduz a velocidade em dispositivos móveis

    ballSpeed = initialBallSpeed * speedMultiplier;
    ballSpeedX = ballSpeed;
    ballSpeedY = ballSpeed;
    paddleHeight = isMobile ? 80 : 100; // Ajusta o tamanho do paddle para telas menores
};

adjustForMobile();
window.addEventListener('resize', adjustForMobile);

// Controle dos paddles em telas sensíveis ao toque
let touchStartY = null;

canvas.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

canvas.addEventListener('touchmove', (e) => {
    if (touchStartY !== null) {
        const touchY = e.touches[0].clientY;
        leftPaddle.y += (touchY - touchStartY) * 0.5; // Ajusta a sensibilidade do controle
        touchStartY = touchY;
    }
});
