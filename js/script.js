// Constants for player symbols
const PLAYER_X = 'X';
const PLAYER_O = 'O';

// Initial player is X
let currentPlayer = PLAYER_X;

// Initialize the game board
const board = ["", "", "", "", "", "", "", "", ""];

// Get HTML elements
const gameBoard = document.getElementById("game-board");
const statusMessage = document.getElementById("status");
const resetButton = document.getElementById("reset-button");
const modal = document.getElementById("modal");
const winnerMessage = document.getElementById("winner-message");
const modalResetButton = document.getElementById("modal-reset-button");
const closeModalButton = document.getElementById("close-modal-button");

// Function to check for a win
function checkWin(player) {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winCombinations.some(combination =>
        combination.every(index => board[index] === player)
    );
}

// Function to handle player win
function handleWin(player) {
    let message = "";

    if (player === PLAYER_X || player === PLAYER_O) {
        message = `😍 ${player} wins! 😍`;
    } else {
        const replacementElement = document.getElementById("congratulatory-message");
        if (replacementElement) {
            replacementElement.textContent = "🙊 Oops! 🙊";
        }
        message = "😕 It's a draw. 😔";
    }

    statusMessage.textContent = message;
    showModal(message);
}

// Function to handle player move
function handleMove(index) {
    if (board[index] === "" && !checkWin(currentPlayer)) {
        board[index] = currentPlayer;
        renderBoard();
        if (checkWin(currentPlayer)) {
            handleWin(currentPlayer);
        } else if (!board.includes("")) {
            handleWin("draw");
        } else {
            currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
            statusMessage.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Function to render the game board
function renderBoard() {
    gameBoard.innerHTML = "";
    board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add(
            "border-2", 
            "border-gray-500", 
            "text-4xl",
            "text-center",
            "p-2",
            "cursor-pointer",
            "w-16",
            "h-16",
            "transition-all",
            "transform",
            "hover:shadow-xl"
        );
        

        // Set background color based on player
        if (cell === PLAYER_X) {
            cellElement.classList.add("bg-green-500", "hover:bg-green-600"); // Green for Player X
        } else if (cell === PLAYER_O) {
            cellElement.classList.add("bg-red-500", "hover:bg-red-600"); // Red for Player O
        } else {
            cellElement.classList.add("bg-white"); // White for empty cells
        }

        cellElement.textContent = cell;
        cellElement.addEventListener("click", () => handleMove(index));
        gameBoard.appendChild(cellElement);
    });
}

// Function to reset the game
function resetGame() {
    board.fill("");
    currentPlayer = PLAYER_X;
    renderBoard();
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    hideModal();

    // Reset the congratulatory message
    const replacementElement = document.getElementById("congratulatory-message");
    if (replacementElement) {
        replacementElement.textContent = "🎉 Congratulations! 🎉";
    }
}

// Function to show the modal with a message
function showModal(message) {
    modal.style.display = "block";
    winnerMessage.textContent = message;
}

// Function to hide the modal
function hideModal() {
    modal.style.display = "none";
}

// Event listener for the reset button
resetButton.addEventListener("click", resetGame);

// Event listener for the modal reset button
modalResetButton.addEventListener("click", () => {
    hideModal();
    resetGame();
});

// Event listener to close the modal
closeModalButton.addEventListener("click", hideModal);

// Initialize the game
resetGame(); 
