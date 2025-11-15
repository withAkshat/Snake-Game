
const board = document.querySelector(".board");
const blockHeight = 30;
const blockWidht = 30;

const blocksWidht = Math.floor(board.clientWidth / blockWidht);
const blocksHeight = Math.floor(board.clientHeight / blockHeight);

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

const snake = [
    { x: 1, y: 3 },
    { x: 1, y: 4 },
    { x: 1, y: 5 }
]

let direction = "ArrowRight";

addEventListener("keydown", (e) => {
    direction = e.key;

})


const startGame = document.querySelector(".start-game");
const endGame = document.querySelector(".end-game");

function render() {

    (function () {
        blocks[`${food.x}-${food.y}`].classList.add("food");
    }
    )()



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
        endGame.style.display = "flex";
        clearInterval(intervalId);
        return
    }

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add("red");
    })


    if (head.x == food.x && head.y == food.y) {
        blocks[`${food.x}-${food.y}`].classList.remove("food");

        food = {
            x: Math.floor(Math.random() * blocksHeight),
            y: Math.floor(Math.random() * blocksWidht)
        }
        blocks[`${food.x}-${food.y}`].classList.add("food");

        snake.unshift(head);
    }

}

let intervalId = null;



let startBtn = document.querySelector(".btn-start");
let modal = document.querySelector(".modal");

startBtn.addEventListener("click", () => {
    modal.style.display = "none";
    intervalId = setInterval(function () {
        render()
    }, 100)

})

