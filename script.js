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
    let gameSpeed = 200;
    let intervalId;

    function drawScoreBoard() {
        const scoreBoard = document.getElementById("score-board");
        scoreBoard.textContent = `Score: ${score}`;
    }

    function drawDiv(x, y, className) {
        const div = document.createElement("div");
        div.classList.add(className);
        div.style.top = `${y}px`;
        div.style.left = `${x}px`;
        return div;
    }

    function drawFoodAndSnake() {
        gameArena.innerHTML = '' // if previously something is drawn remove it

        snake.forEach((snakeCell) => {
            const element = drawDiv(snakeCell.x, snakeCell.y, 'snake');
            gameArena.appendChild(element);
        });

        const foodElement = drawDiv(food.x, food.y, 'food');
        gameArena.appendChild(foodElement);
    }

    function moveFood() {
        let newX, newY;
        do {
            newX = Math.floor(Math.random() * ((arenaSize - cellSize)/cellSize))* cellSize;
            newY = Math.floor(Math.random() * ((arenaSize - cellSize)/cellSize))* cellSize;
        } while(snake.some(snakeCell => snakeCell.x == snakeCell.newX && snake.y == snake.newY));
        food = {x: newX, y: newY};
    }

    function updateGame() {
        //1. calculate new coordinate the snake head will go to
        const newHead = {x: snake[0].x + dx, y: snake[0].y + dy}
        snake.unshift(newHead); // add the new head
        if(newHead.x == food.x && newHead.y == food.y) {
            // collision
            score += 5;
            if(gameSpeed > 30) {
                clearInterval(intervalId);

                gameSpeed -= 10;
                
                gameLoop();
            }
            // don't pop the tail
            moveFood();
            // move the food
        } else {
            snake.pop(); // remove the last cell
        }
        
    }

    function isGameOver() {
        // check snake body hit
        for(i = 1; i < snake.length; i++) {
            if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) return; // game over
        }

        // check wall collision

        let isHittingLeftWall = snake[0].x < 0;
        let isHittingTopWall = snake[0].y < 0;
        let isHittingRightWall = snake[0].x >= arenaSize;
        let isHittingDownWall = snake[0].y >= arenaSize;

        return isHittingLeftWall || isHittingTopWall || isHittingRightWall || isHittingDownWall; // game over
    }

    function gameLoop() {
       intervalId = setInterval(() => {
            if(!gameStart) return;
            // check game over
            if(isGameOver()) {
                gameStart = false;
                alert(`Game over, score: ${score}`);
                window.location.reload();
                return;
            }

            updateGame();
            drawScoreBoard();
            drawFoodAndSnake();
        },gameSpeed);
    }

    function changeDirection(e) {
        const Left_Key = 37;
        const Right_Key = 39;
        const Up_Key = 38;
        const Down_Key = 40;
        const keyPressed = e.keyCode;

        const isGoingUp = dy == -cellSize;
        const isGoingDown = dy == cellSize;
        const isGoingLeft = dx == -cellSize;
        const isGoingRight = dx == cellSize;
        
        if(keyPressed == Left_Key && !isGoingRight) {dy = 0, dx = -cellSize};
        if(keyPressed == Right_Key && !isGoingLeft) {dy = 0, dx = cellSize};
        if(keyPressed == Up_Key && !isGoingDown) {dy = -cellSize, dx = 0};
        if(keyPressed == Down_Key && !isGoingUp) {dy = cellSize, dx = 0};
    }
    function runGame() {
        if(!gameStart) {
            gameStart = true;
            gameLoop();
            document.addEventListener("keydown", changeDirection);
        }
        
        
    }

    function initiateGame() {
        const scoreBoard = document.createElement("div");
        scoreBoard.id = "score-board";
        document.body.insertBefore(scoreBoard, gameArena);


        const startButton = document.createElement("button");
        startButton.textContent = "Start Game";
        startButton.classList.add('start-button');
        document.body.appendChild(startButton);

        startButton.addEventListener('click', () => {
            startButton.style.display = 'none';
            runGame();
        });

    }

    initiateGame(); // this is the first function to be executed so that we prepare  the ui

});