// COMIENZA PROYECTO EN MAIN

// CANVAS CONF
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// GLOBAL VARIABLES
let game;
let deltaX;
let deltaY;

const startScreen = document.querySelector("#start-screen");
const startBtn = document.querySelector("#start-btn");

// ELEMENTOS DEL DOM

// STATE MANAGEMENT FUNCTIONS
const startGame = () => {
  startScreen.style.display = "none";

  game = new Game();
  game.gameLoop();
};

// ADDEVENTLISTENER
startBtn.addEventListener("click", startGame);
// Move on keydown
window.addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 87:
      game.goku.vy = -2;
      break;
    case 68:
      game.goku.vx = 2;
      break;
    case 83:
      game.goku.vy = 2;
      break;
    case 65:
      game.goku.vx = -2;
      break;
  }
});
// Stop on keyup
window.addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 87:
      game.goku.vy = 0;
      break;
    case 68:
      game.goku.vx = 0;
      break;
    case 83:
      game.goku.vy = 0;
      break;
    case 65:
      game.goku.vx = 0;
      break;
  }
});

canvas.addEventListener("click", ({offsetX, offsetY}) => {
  deltaX = offsetX - (game.goku.x);
  deltaY = offsetY - (game.goku.y);
  console.log(event)
  let rotation = Math.atan2(deltaX, deltaY, type);

  let ProjectileVx = Math.sin(rotation) * 4;
  let ProjectileVy = Math.cos(rotation) * 4; 
  let newProjectile = new GokuProjectile(ProjectileVx,ProjectileVy);

  game.gokuProjectile.push(newProjectile)
}
)

canvas.addEventListener("mousemove", ({offsetX}) => {
  let gokuX = game.goku.x;
 
  if (offsetX > gokuX) {
    game.goku.image.src = "../images/gokuright.png"
  } else {
    game.goku.image.src = "../images/gokuleft.png"
  }
  
}
)