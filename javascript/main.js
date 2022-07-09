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
// const score = document.querySelector("#score span")
// score.innerText = 0;
// ELEMENTOS DEL DOM

// STATE MANAGEMENT FUNCTIONS
const startGame = () => {
  startScreen.style.display = "none";
  canvas.style.display = "block";

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
      game.goku.image.src = "../images/gokuIddle.png";
      game.goku.vy = 0;
      break;
    case 68:
      game.goku.image.src = "../images/gokuIddle.png";
      game.goku.vx = 0;
      break;
    case 83:
      game.goku.image.src = "../images/gokuIddle.png";
      game.goku.vy = 0;
      break;
    case 65:
      game.goku.image.src = "../images/gokuIddle.png";
      game.goku.vx = 0;
      break;
  }
});
// Projectile goes to cursor!! WOW!
canvas.addEventListener("click", (event) => {
  deltaX = event.offsetX - game.goku.x;
  deltaY = event.offsetY - game.goku.y;

  let rotation = Math.atan2(deltaX, deltaY);

  let ProjectileVx = Math.sin(rotation) * 6;
  let ProjectileVy = Math.cos(rotation) * 6;
  let newProjectile = new GokuProjectile(ProjectileVx, ProjectileVy);
  let random = Math.floor(Math.random() * 2);

  if (random === 1) {
    game.goku.image.src = "./images/gokuposeattack1right.png";
  } else if (random === 0) {
    game.goku.image.src = "./images/gokuposseattack1right2.png";
  }

  // if (random === 1 && deltaX < 0) {
  //   game.goku.image.src = "../images/gokuposseattack1left.png"
  // } else if (random === 0 && deltax < 0) {
  //   game.goku.image.src = "../images/gokuposseattack2left.png"
  // }

  game.gokuProjectile.push(newProjectile);
});
// swapping imgs
canvas.addEventListener("mousemove", ({ offsetX }) => {
  let gokuX = game.goku.x;

  if (offsetX > gokuX) {
    game.goku.image.src = "../images/gokuright.png";
  } else {
    game.goku.image.src = "../images/gokuleft.png";
  }
});
