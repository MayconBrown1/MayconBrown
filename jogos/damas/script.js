const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const gameOverDiv = document.getElementById('gameOver');
const winnerMessage = document.getElementById('winnerMessage');
const winnerLink = document.getElementById('winnerLink');
const scoreBoard = document.createElement('div');
scoreBoard.id = 'scoreBoard';
document.body.appendChild(scoreBoard);

// Configurações do jogo
const paddleWidth = 10;
let paddleHeight = 100; // Ajuste conforme necessário
const ballSize = 20;
const initialBallSpeed = 4;
let ballSpeed = initialBallSpeed;
let ballSpeedX = ballSpeed;
let ballSpeedY = ballSpeed;

// Pontuação
let leftScore = 0;
let rightScore = 0;

// Paddles e bola
const leftPaddle = { x: 10, y: canvas.height / 2 - paddleHeight / 2 };
const rightPaddle = { x: canvas.width - paddleWidth - 10, y: canvas.height / 2 - paddleHeight / 2 };
const ball = { x: canvas.width / 2, y: canvas.height / 2 };

// Carregar a imagem da bola
const ballImage = new Image();
ballImage.src = 'icone.ico'; // Caminho para a imagem

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
    resizeCanvas(); // Redimensiona o canvas ao iniciar o jogo
    gameLoop();
}

startButton.addEventListener('click', startGame);

// Controle dos paddles
document.addEventListener('keydown', (e) => {
    if (e.key === 'w') leftPaddle.y -= ballSpeed;
    if (e.key === 's') leftPaddle.y += ballSpeed;
});

// Atualiza a posição dos paddles e da bola
function update() {
    // Atualiza a posição da bola
    ball.x += ballSpeedX;
    ball.y += ballSpeedY;

    // Colisão com o topo e a base
    if (ball.y <= 0 || ball.y >= canvas.height - ballSize) ballSpeedY = -ballSpeedY;

    // IA para o paddle direito
    const aiSpeed = ballSpeed;
    const aiMargin = 0.1;

    if (ball.y < rightPaddle.y + paddleHeight / 2 - aiMargin) {
        rightPaddle.y -= aiSpeed;
    } else if (ball.y > rightPaddle.y + paddleHeight / 2 + aiMargin) {
        rightPaddle.y += aiSpeed;
    }

    // Colisão com os paddles
    if (ball.x <= leftPaddle.x + paddleWidth && ball.y >= leftPaddle.y && ball.y <= leftPaddle.y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    if (ball.x >= rightPaddle.x - ballSize && ball.y >= rightPaddle.y && ball.y <= rightPaddle.y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Pontuação
    if (ball.x <= 0) {
        rightScore++;
        updateScoreBoard();
        increaseBallSpeed();
        resetBall();
        checkWinner();
    } else if (ball.x >= canvas.width) {
        leftScore++;
        updateScoreBoard();
        increaseBallSpeed();
        resetBall();
        checkWinner();
    }

    // Previne paddles de saírem da tela
    leftPaddle.y = Math.max(0, Math.min(canvas.height - paddleHeight, leftPaddle.y));
    rightPaddle.y = Math.max(0, Math.min(canvas.height - paddleHeight, rightPaddle.y));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha paddles
    ctx.fillStyle = 'white';
    ctx.fillRect(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight);
    ctx.fillRect(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight);

    // Desenha a bola como uma imagem
    ctx.drawImage(ballImage, ball.x - ballSize / 2, ball.y - ballSize / 2, ballSize, ballSize);
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ballSpeedX = -ballSpeedX; // Faz a bola ir para o lado oposto
}

function increaseBallSpeed() {
    ballSpeed += 0.5;
    ballSpeedX = (ballSpeedX > 0 ? 1 : -1) * ballSpeed;
    ballSpeedY = (ballSpeedY > 0 ? 1 : -1) * ballSpeed;
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
        winnerLink.href = 'https://www.example.com';
        winnerLink.style.display = 'block';
    } else {
        winnerLink.style.display = 'none';
    }

    canvas.style.display = 'none';
    // Não é necessário cancelar a animação se usar requestAnimationFrame adequadamente
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function resizeCanvas() {
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.7;

    leftPaddle.x = 10;
    leftPaddle.y = canvas.height / 2 - paddleHeight / 2;
    rightPaddle.x = canvas.width - paddleWidth - 10;
    rightPaddle.y = canvas.height / 2 - paddleHeight / 2;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Inicializa o tamanho do canvas

initializeGame();