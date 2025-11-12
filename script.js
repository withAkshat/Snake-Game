
const board = document.querySelector(".board");
const blockHeight = 30;
const blockWidht = 30;

const blocksWidht = Math.floor(board.clientWidth/blockWidht);
const blocksHeight = Math.floor(board.clientHeight/blockHeight);

const blocks = [];

for( let i = 0; i<blocksHeight; i++){
    for( let j = 0; j<blocksWidht; j++){
        const block = document.createElement("div");
        block.classList.add("block");
        // block.innerText = `${i}-${j}`;
        blocks[`${i}-${j}`] = block;
        board.appendChild(block);
    }
}

const snake = [
    {x:1, y:3},
    {x:1, y:4},
    {x:1, y:5}
]



function render(){
   snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add("red");
})
}

