document.addEventListener("DOMContentLoaded", function () {
    console.log("Page Loaded");

    let currentPlayer = 'x';
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameOver = false;
    const player1NameInput = document.getElementById("player1");
    const player2NameInput = document.getElementById("player2");
    const submitButton = document.getElementById("submit");
    const messageDiv = document.querySelector(".message");

    // Start Game
    submitButton.addEventListener("click", () => {
        if (player1NameInput.value.trim() === "" || player2NameInput.value.trim() === "") {
            alert("Please enter both player names!");
            return;
        }
        
        messageDiv.textContent = `${player1NameInput.value}, you're up`;
        document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", handleCellClick));
    });

    // Handle Cell Click
    function handleCellClick(event) {
        if (gameOver) return;

        const cell = event.target;
        const cellIndex = parseInt(cell.id) - 1;

        if (board[cellIndex] !== "") return; // Ignore clicks on already filled cells

        board[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            gameOver = true;
            messageDiv.textContent = (currentPlayer === 'x' ? player1NameInput.value : player2NameInput.value) + " congratulations you won!";
            return;
        }

        // Switch Player
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        messageDiv.textContent = (currentPlayer === 'x' ? player1NameInput.value : player2NameInput.value) + ", you're up";
    }

    // Check Winning Conditions
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]  // Diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }
});
