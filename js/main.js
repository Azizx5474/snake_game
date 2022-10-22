const canvas = document.getElementById("snake_game");
const ctx = canvas.getContext("2d");
const new_game=document.getElementById("new_game")
const change_color=document.getElementById("change_color")
const change_field=document.getElementById("change_field")
let count_color=0

let apple = {
  x: 400,
  y: 400,
};

const size_block = 16;

let temp_speed = 0;

let snake = {
  x: 160,
  y: 160,
  dx: size_block,
  dy: 0,
  cells: [],
  minCells: 3,
};

function get_random_apple(min, max) {
  const number = Math.floor(Math.random() * (max - min)) + min;
  return number;
}

function animation_game() {
  requestAnimationFrame(animation_game);

  if (++temp_speed < 4) {
    return;
  }
  temp_speed = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) {
    newgame()
  }
  if (snake.x >= canvas.width) {
    newgame()
  }

  if (snake.y < 0) {
    newgame()
  }
  if (snake.y >= canvas.height) {
    newgame()
  }

  snake.cells.unshift({ x: snake.x, y: snake.y });
  if (snake.cells.length > snake.minCells) {
    snake.cells.pop();
  }

  ctx.fillStyle = "green";
  ctx.fillRect(apple.x, apple.y, size_block - 1, size_block - 1);

  ctx.fillStyle = colors[count_color];


  snake.cells.forEach(function (cell, index) {
    ctx.fillRect(cell.x, cell.y, size_block - 1, size_block - 1);
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.minCells++;
      apple.x = get_random_apple(0, 50) * size_block;
      apple.y = get_random_apple(0, 50) * size_block;
    }

    for (let i = index + 1; i < snake.cells.length; i++) 
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        newgame()
      }
  
  });
}

document.addEventListener("keydown", (event) => {
  if (event.which === 65 && snake.dx === 0) {
    snake.dx = -size_block;
    snake.dy = 0;
  }
  if (event.which === 68 && snake.dx === 0) {
    snake.dx = size_block;
    snake.dy = 0;
  }

  if (event.which === 87 && snake.dy === 0) {
    snake.dx = 0;
    snake.dy = -size_block;
  }

  if (event.which === 83 && snake.dy === 0) {
    snake.dx = 0;
    snake.dy = size_block;
  }
});

requestAnimationFrame(animation_game);

function newgame() {
  snake.x = 160;
  snake.y = 160;
  snake.cells = [];
  snake.minCells = 3;
  snake.dx = size_block;
  snake.dy = 0;

  apple.x = get_random_apple(0, 50) * size_block;
  apple.y = get_random_apple(0, 50) * size_block;
}


new_game.addEventListener("click",()=>{
  newgame()
})


const colors=["white","purple","gold"]
change_color.addEventListener("click",()=>{
  count_color++
  if (count_color==3) {
    count_color=0
  }
})

let j=0
const color_field=["black","brown","grey"]
change_field.addEventListener("click",()=>{
  canvas.style.background=color_field[j]
  j++
  if (j==3) {
    j=0
  }
});