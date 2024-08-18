document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const message = document.getElementById('message');
    const playButton = document.getElementById('playButton');
    const SIZE = 8;
    let boardState = Array(SIZE).fill(null).map(() => Array(SIZE).fill(null));
    let selectedPiece = null;
    let gameStarted = false;
    let currentPlayer = 'coral'; // 'coral' inicia o jogo
    let moveCount = 0;
    let lastMove = null;

    playButton.addEventListener('click', () => {
        if (!gameStarted) {
            gameStarted = true;
            playButton.style.display = 'none';
            createBoard();
            message.textContent = 'Sua vez!';
        }
    });

    function createBoard() {
        board.innerHTML = '';
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.dataset.row = i;
                square.dataset.col = j;
                if ((i + j) % 2 === 1) {
                    square.classList.add('black');
                    if (i < 3) {
                        const piece = document.createElement('div');
                        piece.classList.add('piece', 'white');
                        piece.dataset.row = i;
                        piece.dataset.col = j;
                        piece.addEventListener('click', selectPiece);
                        square.appendChild(piece);
                        boardState[i][j] = 'white';
                    } else if (i > 4) {
                        const piece = document.createElement('div');
                        piece.classList.add('piece', 'coral');
                        piece.dataset.row = i;
                        piece.dataset.col = j;
                        piece.addEventListener('click', selectPiece);
                        square.appendChild(piece);
                        boardState[i][j] = 'coral';
                    }
                }
                square.addEventListener('click', movePieceToSquare);
                board.appendChild(square);
            }
        }
    }

    function selectPiece(event) {
        if (!gameStarted || currentPlayer !== (event.target.classList.contains('coral') ? 'coral' : 'white')) return;

        if (selectedPiece) {
            selectedPiece.classList.remove('selected');
        }

        selectedPiece = event.target;
        selectedPiece.classList.add('selected');
    }

    function movePieceToSquare(event) {
        if (selectedPiece) {
            const targetSquare = event.target;
            if (targetSquare.classList.contains('square')) {
                const targetRow = parseInt(targetSquare.dataset.row);
                const targetCol = parseInt(targetSquare.dataset.col);
                const startRow = parseInt(selectedPiece.dataset.row);
                const startCol = parseInt(selectedPiece.dataset.col);

                if (isValidMove(startRow, startCol, targetRow, targetCol)) {
                    movePiece(startRow, startCol, targetRow, targetCol);
                    updateBoard();
                    lastMove = { from: [startRow, startCol], to: [targetRow, targetCol] };
                    moveCount++;
                    if (checkForWin('coral')) {
                        message.innerHTML = `<p>Parabéns! Você venceu!</p><a href="https://exemplo.com/premio" target="_blank">Clique aqui para seu prêmio!</a>`;
                        gameStarted = false;
                        return;
                    }
                    currentPlayer = 'white';
                    message.textContent = 'Agora é a vez da IA!';

                    // Adiciona um atraso de 1 segundo antes da jogada da IA
                    setTimeout(makeAIMove, 1000);

                    if (moveCount >= 20 && !hasCaptureMoved()) {
                        message.textContent = 'Empate por falta de captura!';
                        gameStarted = false;
                        return;
                    }
                }

                selectedPiece.classList.remove('selected');
                selectedPiece = null;
            }
        }
    }

    function isValidMove(startRow, startCol, endRow, endCol) {
        const pieceColor = boardState[startRow][startCol];
        const targetColor = boardState[endRow][endCol];
        if (targetColor) {
            return false;
        }

        const rowDiff = Math.abs(endRow - startRow);
        const colDiff = Math.abs(endCol - startCol);

        if ((rowDiff === 1 && colDiff === 1) || (rowDiff === 2 && colDiff === 2)) {
            if (rowDiff === 2 && colDiff === 2) {
                const midRow = (startRow + endRow) / 2;
                const midCol = (startCol + endCol) / 2;
                const midColor = boardState[midRow][midCol];
                if (midColor === null || midColor === pieceColor) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    function movePiece(startRow, startCol, endRow, endCol) {
        boardState[endRow][endCol] = boardState[startRow][startCol];
        boardState[startRow][startCol] = null;

        // Check if piece needs to be promoted to king
        if (endRow === 0 && boardState[endRow][endCol] === 'coral') {
            boardState[endRow][endCol] = 'coralKing';
        } else if (endRow === SIZE - 1 && boardState[endRow][endCol] === 'white') {
            boardState[endRow][endCol] = 'whiteKing';
        }

        // Check if a capture was made
        if (Math.abs(endRow - startRow) === 2) {
            const midRow = (startRow + endRow) / 2;
            const midCol = (startCol + endCol) / 2;
            boardState[midRow][midCol] = null;
        }
    }

    function updateBoard() {
        const squares = board.querySelectorAll('.square');
        squares.forEach(square => {
            const row = parseInt(square.dataset.row);
            const col = parseInt(square.dataset.col);
            square.innerHTML = ''; // Limpa o conteúdo da célula
            if (boardState[row][col]) {
                const piece = document.createElement('div');
                piece.classList.add('piece', boardState[row][col]);
                piece.dataset.row = row;
                piece.dataset.col = col;
                piece.addEventListener('click', selectPiece);
                square.appendChild(piece);
            }
        });
    }

    function checkForWin(color) {
        const opponentColor = color === 'coral' ? 'white' : 'coral';
        return !boardState.flat().includes(opponentColor);
    }

    function makeAIMove() {
        const possibleMoves = getPossibleMoves('white');
        if (possibleMoves.length > 0) {
            const bestMove = minimaxWithAlphaBeta(boardState, 4, -Infinity, Infinity, true).move;
            const [startRow, startCol] = bestMove.from;
            const [endRow, endCol] = bestMove.to;
            movePiece(startRow, startCol, endRow, endCol);
            updateBoard();
            lastMove = { from: [startRow, startCol], to: [endRow, endCol] };
            moveCount++;
            if (checkForWin('white')) {
                message.innerHTML = `<p>Você perdeu! Tente novamente.</p>`;
                gameStarted = false;
                return;
            }
            currentPlayer = 'coral';
            message.textContent = 'Sua vez!';
        }
    }

    function getPossibleMoves(color) {
        const moves = [];
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                if (boardState[i][j] === color || boardState[i][j] === `${color}King`) {
                    getValidMoves(i, j).forEach(move => {
                        moves.push({ from: [i, j], to: move });
                    });
                }
            }
        }
        return moves;
    }

    function getValidMoves(row, col) {
        const moves = [];
        const directions = [-1, 1];
        const pieceType = boardState[row][col];

        directions.forEach(direction => {
            directions.forEach(directionCol => {
                const newRow = row + direction;
                const newCol = col + directionCol;

                if (isValidMove(row, col, newRow, newCol)) {
                    moves.push([newRow, newCol]);

                    const captureRow = row + direction * 2;
                    const captureCol = col + directionCol * 2;
                    if (captureRow >= 0 && captureRow < SIZE && captureCol >= 0 && captureCol < SIZE) {
                        if (boardState[captureRow][captureCol] === null) {
                            if (boardState[newRow][newCol] && boardState[newRow][newCol] !== pieceType) {
                                moves.push([captureRow, captureCol]);
                            }
                        }
                    }
                }
            });
        });

        return moves;
    }

    function minimaxWithAlphaBeta(board, depth, alpha, beta, isMaximizing) {
        if (depth === 0 || checkForWin('white') || checkForWin('coral')) {
            return { score: evaluateBoard(board) };
        }

        const possibleMoves = getPossibleMoves(isMaximizing ? 'white' : 'coral');
        let bestMove = null;

        if (isMaximizing) {
            let maxEval = -Infinity;
            possibleMoves.forEach(move => {
                const tempBoard = JSON.parse(JSON.stringify(board));
                movePiece(tempBoard, move.from[0], move.from[1], move.to[0], move.to[1]);
                const eval = minimaxWithAlphaBeta(tempBoard, depth - 1, alpha, beta, false).score;
                if (eval > maxEval) {
                    maxEval = eval;
                    bestMove = move;
                }
                alpha = Math.max(alpha, eval);
                if (beta <= alpha) return;
            });
            return { score: maxEval, move: bestMove };
        } else {
            let minEval = Infinity;
            possibleMoves.forEach(move => {
                const tempBoard = JSON.parse(JSON.stringify(board));
                movePiece(tempBoard, move.from[0], move.from[1], move.to[0], move.to[1]);
                const eval = minimaxWithAlphaBeta(tempBoard, depth - 1, alpha, beta, true).score;
                if (eval < minEval) {
                    minEval = eval;
                    bestMove = move;
                }
                beta = Math.min(beta, eval);
                if (beta <= alpha) return;
            });
            return { score: minEval, move: bestMove };
        }
    }

    function evaluateBoard(board) {
        // Implement a function to evaluate the board score
        // Higher values for better positions for white and lower for coral
        let score = 0;
        board.forEach(row => {
            row.forEach(cell => {
                if (cell === 'white') score += 1;
                if (cell === 'whiteKing') score += 5;
                if (cell === 'coral') score -= 1;
                if (cell === 'coralKing') score -= 5;
            });
        });
        return score;
    }

    function hasCaptureMoved() {
        // Check if there was any capture move in the last 20 moves
        return moveCount - (lastMove ? 1 : 0) >= 20;
    }
});
