const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const gameOverDiv = document.getElementById('gameOver');
const winnerMessage = document.getElementById('winnerMessage');
const winnerLink = document.getElementById('winnerLink');
const scoreBoard = document.createElement('div');
scoreBoard.id = 'scoreBoard';
document.body.appendChild(scoreBoard);

let canvasWidth, canvasHeight;
const paddleWidth = 0.03; // Proporção da largura do canvas
const paddleHeight = 0.3; // Proporção da altura do canvas
const ballSize = 0.02; // Proporção do tamanho do canvas
const initialBallSpeed = 4;
let ballSpeed = initialBallSpeed;
let ballSpeedX = ballSpeed, ballSpeedY = ballSpeed;

// Pontuação
let leftScore = 0;
let rightScore = 0;

// Paddles e bola
const leftPaddle = { x: 0, y: 0 };
const rightPaddle = { x: 0, y: 0 };
const ball = { x: 0, y: 0 };

// Carregar a imagem da bola
const ballImage = new Image();
ballImage.src = 'icone.ico'; // Caminho para a imagem

// Atualiza o tamanho do canvas e os objetos do jogo
function resizeCanvas() {
    canvasWidth = window.innerWidth * 0.8; // 80% da largura da tela
    canvasHeight = window.innerHeight * 0.8; // 80% da altura da tela
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Atualiza as dimensões dos paddles e da bola
    leftPaddle.width = canvasWidth * paddleWidth;
    leftPaddle.height = canvasHeight * paddleHeight;
    rightPaddle.width = leftPaddle.width;
    rightPaddle.height = leftPaddle.height;
    ball.size = canvasWidth * ballSize;

    // Inicializa as posições dos paddles e da bola
    leftPaddle.x = canvasWidth * 0.01;
    leftPaddle.y = (canvasHeight - leftPaddle.height) / 2;
    rightPaddle.x = canvasWidth - canvasWidth * 0.01 - rightPaddle.width;
    rightPaddle.y = (canvasHeight - rightPaddle.height) / 2;
    ball.x = canvasWidth / 2;
    ball.y = canvasHeight / 2;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Inicializa o tamanho correto

// Inicializa o estado do jogo
function initializeGame() {
    leftScore = 0;
    rightScore = 0;
    ballSpeed = initialBallSpeed;
    ballSpeedX = ballSpeed;
    ballSpeedY = ballSpeed;
    updateScoreBoard();
    gameOverDiv.style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    canvas.style.display = 'none';
}

function updateScoreBoard() {
    scoreBoard.textContent = `${leftScore} - ${rightScore}`;
}

// Inicia o jogo
function startGame() {
    document.getElementById('menu').style.display = 'none';
    canvas.style.display = 'block';
    gameLoop();
}

startButton.addEventListener('click', startGame);

// Controle dos paddles
document.addEventListener('keydown', (e) => {
    const paddleSpeed = ballSpeed;
    if (e.key === 'w') leftPaddle.y -= paddleSpeed;
    if (e.key === 's') leftPaddle.y += paddleSpeed;
});

function update() {
    // Atualiza a posição da bola
    ball.x += ballSpeedX;
    ball.y += ballSpeedY;

    // Colisão com o topo e a base
    if (ball.y <= 0 || ball.y >= canvasHeight - ball.size) ballSpeedY = -ballSpeedY;

    // IA para o paddle direito
    const aiSpeed = ballSpeed;
    const aiMargin = 0.05 * canvasHeight; // Margem de erro para a IA

    if (ball.y < rightPaddle.y + rightPaddle.height / 2 - aiMargin) {
        rightPaddle.y -= aiSpeed;
    } else if (ball.y > rightPaddle.y + rightPaddle.height / 2 + aiMargin) {
        rightPaddle.y += aiSpeed;
    }

    // Colisão com os paddles
    if (ball.x <= leftPaddle.x + leftPaddle.width && ball.y >= leftPaddle.y && ball.y <= leftPaddle.y + leftPaddle.height) {
        ballSpeedX = -ballSpeedX;
    }
    if (ball.x >= rightPaddle.x - ball.size && ball.y >= rightPaddle.y && ball.y <= rightPaddle.y + rightPaddle.height) {
        ballSpeedX = -ballSpeedX;
    }

    // Pontuação
    if (ball.x <= 0) {
        rightScore++;
        updateScoreBoard();
        increaseBallSpeed();
        resetBall();
        checkWinner();
    } else if (ball.x >= canvasWidth) {
        leftScore++;
        updateScoreBoard();
        increaseBallSpeed();
        resetBall();
        checkWinner();
    }

    // Previne paddles de saírem da tela
    leftPaddle.y = Math.max(0, Math.min(canvasHeight - leftPaddle.height, leftPaddle.y));
    rightPaddle.y = Math.max(0, Math.min(canvasHeight - rightPaddle.height, rightPaddle.y));
}

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Desenha paddles
    ctx.fillStyle = 'white';
    ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

    // Desenha a bola como uma imagem
    ctx.drawImage(ballImage, ball.x - ball.size / 2, ball.y - ball.size / 2, ball.size, ball.size);
}

function resetBall() {
    ball.x = canvasWidth / 2;
    ball.y = canvasHeight / 2;
    ballSpeedX = -ballSpeedX; // Faz a bola ir para o lado oposto
}

function increaseBallSpeed() {
    ballSpeed += 0.5;
    ballSpeedX = (ballSpeedX > 0 ? 1 : -1) * ballSpeed; // Ajusta a direção
    ballSpeedY = (ballSpeedY > 0 ? 1 : -1) * ballSpeed; // Ajusta a direção
}

function checkWinner() {
    if (leftScore >= 10) {
        endGame('Player 1 Wins!');
    } else if (rightScore >= 10) {
        endGame('SE FUD**');
    }
}

function endGame(message) {
    gameOverDiv.style.display = 'block';
    winnerMessage.textContent = message;

    if (leftScore >= 10) {
        winnerLink.href = 'https://www.example.com'; // Link para o vencedor
        winnerLink.style.display = 'block'; // Mostra o link
    } else {
        winnerLink.style.display = 'none'; // Esconde o link
    }

    canvas.style.display = 'none'; // Esconde o canvas
    cancelAnimationFrame(gameLoop); // Para o loop do jogo
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Começa o jogo
initializeGame();
