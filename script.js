console.log("js is loaded");
document.addEventListener("DOMContentLoaded", () => {
    const gameArena = document.getElementById("game-arena");
    const arenaSize = 600;
    const cellSize = 20;
    let score = 0;
    let gameStart = false;
    let food = {x: 300, y: 200};
    let snake = [{x: 160, y: 200}, {x: 140, y: 200}, {x: 120, y: 200}];
    let dx = cellSize; // desplacement in x-axis
    let dy = 0; // desplacemen in y-axis
    function startGame() {
        const scoreBoard = document.createElement("div");
        scoreBoard.id = "score-board";
        document.body.insertBefore(scoreBoard, gameArena);


        const startButton = document.createElement("button");
        startButton.textContent = "Start Game";
        startButton.classList.add('start-button');
        document.body.appendChild(startButton);

    }

    startGame();

});