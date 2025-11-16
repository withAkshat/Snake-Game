
const board = document.querySelector(".board");
const blockHeight = 30;
const blockWidht = 30;
const blocksWidht = Math.floor(board.clientWidth / blockWidht);
const blocksHeight = Math.floor(board.clientHeight / blockHeight);
const modal = document.querySelector(".modal");
const startGame = document.querySelector(".start-game");
const endGame = document.querySelector(".end-game");
const startBtn = document.querySelector(".btn-start");
const restartBtn = document.querySelector(".btn-restart");
let score = document.querySelector("#score");
let highScoreElement = document.querySelector("#highScore");
let highScore = 0;
let finalScore = document.querySelector("#final-score");
let points = 0;
let intervalId = null;
let time = `0-0`;
let timer = document.querySelector("#time");

const blocks = [];
let food = {
    x: Math.floor(Math.random() * blocksHeight),
    y: Math.floor(Math.random() * blocksWidht)
};

for (let i = 0; i < blocksHeight; i++) {
    for (let j = 0; j < blocksWidht; j++) {
        const block = document.createElement("div");
        block.classList.add("block");
        // block.innerText = `${i}-${j}`;
        blocks[`${i}-${j}`] = block;
        board.appendChild(block);
    }
}

let snake = [
    { x: 1, y: 3 },
    { x: 1, y: 4 },
    { x: 1, y: 5 }
]

let direction = "ArrowRight";

addEventListener("keydown", (e) => {
    direction = e.key;
})




function render() {

    (function () {
        blocks[`${food.x}-${food.y}`].classList.add("food");
    }
    )()

    highScore = Number(localStorage.getItem("highscore") || 0);
    highScoreElement.innerHTML = highScore;

    let head = null;
    if (direction === "ArrowLeft") {
        head = { x: snake[0].x, y: snake[0].y - 1 };
    } else if (direction === "ArrowRight") {
        head = { x: snake[0].x, y: snake[0].y + 1 };
    } else if (direction === "ArrowDown") {
        head = { x: snake[0].x + 1, y: snake[0].y };

    } else if (direction === "ArrowUp") {
        head = { x: snake[0].x - 1, y: snake[0].y };
    }

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("red");
    })

    snake.unshift(head);
    snake.pop();

    // Game Over Window
    if (head.x < 0 || head.x > blocksHeight - 1 || head.y < 0 || head.y > blocksWidht - 1) {

        // alert("gameOver")
        startGame.style.display = "none";
        modal.style.display = "block";
        endGame.style.display = "flex";
        clearInterval(intervalId);
        finalScore.innerHTML = points;

          if(points > highScore){
            localStorage.setItem("highscore", points.toString());
        }
        return;
    }

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add("red");
    })


    if(head.x == food.x && head.y == food.y) {
        blocks[`${food.x}-${food.y}`].classList.remove("food");

        food = {
            x: Math.floor(Math.random() * blocksHeight),
            y: Math.floor(Math.random() * blocksWidht)
        }
        blocks[`${food.x}-${food.y}`].classList.add("food");
        
        // score updation
        points += 10;
        score.innerHTML = points;
      


        snake.unshift(head);
    }

}


function restartGame() {

    blocks[`${food.x}-${food.y}`].classList.remove("food");
    
    snake = [
        { x: 1, y: 3 },
    ]
    
    points = 0;
    score.innerHTML = 0;
    time = `00-00`;

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("red");
    })

    direction = "ArrowDown";

    food = {
        x: Math.floor(Math.random() * blocksHeight),
        y: Math.floor(Math.random() * blocksWidht)
    }

    modal.style.display = "none";
    intervalId = setInterval(function(){
        render();
    }, 100)
}

restartBtn.addEventListener("click", restartGame);

let timeIntervalId = null;

startBtn.addEventListener("click", () => {
    modal.style.display = "none";
    intervalId = setInterval(function () {
        render();
    }, 100)

    timeIntervalId = setInterval(function(){
        let [min, sec] = time.split("-").map(Number);

        if( sec == 59) {
            min +=1;
            sec = 0;
        }else{
            sec += 1;
        }
        time = `${min}-${sec}`;
        timer.innerHTML = time;
    }, 1000)
})


