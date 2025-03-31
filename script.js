//your JS code here. If required.
document.getElementById("submit").addEventListener("click", startGame);

let player1, player2, currentPlayer, board, isGameOver;

function startGame() {
    player1 = document.getElementById("player-1").value || "Player 1";
    player2 = document.getElementById("player-2").value || "Player 2";
    currentPlayer = player1;
    board = ["", "", "", "", "", "", "", "", ""];
    isGameOver = false;

    document.getElementById("setup").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.querySelector(".message").textContent = `${currentPlayer}, you're up`;

    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winning");
        cell.addEventListener("click", handleMove);
    });
}

function handleMove(event) {
    const cell = event.target;
    const index = cell.id - 1;

    if (board[index] || isGameOver) return;

    board[index] = currentPlayer === player1 ? "X" : "O";
    cell.textContent = board[index];

    if (checkWinner()) {
        document.querySelector(".message").textContent = `${currentPlayer}, congratulations you won!`;
        isGameOver = true;
        return;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
    document.querySelector(".message").textContent = `${currentPlayer}, you're up`;
}

function checkWinner() {
    const winningPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winningPatterns) {
        let [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById(a + 1).classList.add("winning");
            document.getElementById(b + 1).classList.add("winning");
            document.getElementById(c + 1).classList.add("winning");
            return true;
        }
    }

    return board.every(cell => cell) ? (document.querySelector(".message").textContent = "It's a draw!", true) : false;
}
