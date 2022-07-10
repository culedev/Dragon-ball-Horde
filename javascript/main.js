// --> DRAGON BALL HORDE <--

// CANVAS CONF
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// GLOBAL VARIABLES
let game;
let deltaX;
let deltaY;
let frameRate = 1;
const combatAudio = new Audio("./sounds/combatsound.webm")
const gameOverAudio = new Audio("./sounds/gameover.webm")

// ELEMENTOS DEL DOM
const startScreen = document.querySelector("#start-screen");
const startBtn = document.querySelector("#start-btn");
const UI = document.querySelector(".canvas-score-health");
const gokuHp = document.querySelector(".healthbar");
const gokuKi = document.querySelector(".kibar");
const score = document.querySelector(".score span")
score.innerHTML = 0;

// STATE MANAGEMENT FUNCTIONS
const startGame = () => {
  startScreen.style.display = "none";
  canvas.style.display = "block";
  UI.style.display = "block";

  game = new Game();
  game.gameLoop();
};

// ADDEVENTLISTENER
startBtn.addEventListener("click", startGame);
// Move on keydown
window.addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 87:
      game.goku.image.src = "./images/gokuup.png";
      game.goku.vy = -2.5 * frameRate;
      break;
    case 68:
      game.goku.image.src = "./images/gokuright.png";
      game.goku.vx = 2.5 * frameRate;
      break;
    case 83:
      game.goku.image.src = "./images/gokudown.png";
      game.goku.vy = 2.5 * frameRate;
      break;
    case 65:
      game.goku.image.src = "./images/gokuleft.png";
      game.goku.vx = -2.5 * frameRate;
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

  if (deltaX > 0) {
    game.goku.image.src = "./images/gokuposeattack1right.png";
  } else if (deltaX < 0) {
    game.goku.image.src = "./images/gokuposseattack2left.png";
  }

  // if (random === 1 && deltaX < 0) {
  //   game.goku.image.src = "./images/gokuposseattack1left.png"
  // } else if (random === 0 && deltax < 0) {
  //   game.goku.image.src = "./images/gokuposseattack2left.png"
  // }
  game.gokuProjectile.push(newProjectile);
});
// charges KI
window.addEventListener("keydown", ({ keyCode }) => {
  if (keyCode === 81 && game.goku.ki < 100) {
    game.goku.image.src = "./images/gokuKI.png";
    game.goku.vy = 0;
    game.goku.vx = 0;

    game.goku.ki = game.goku.ki + 2;
    gokuKi.style.width = game.goku.ki + "%";
    console.log(game.goku.ki);
  }
});
//EVENT RIGHT CLICK -> KI ATTACK!
canvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  deltaX = event.offsetX - game.goku.x;
  deltaY = event.offsetY - game.goku.y;

  let rotation = Math.atan2(deltaX, deltaY);

  let ProjectileVx = Math.sin(rotation) * 6;
  let ProjectileVy = Math.cos(rotation) * 6;
  let newProjectile = new GokuKiProjectile(ProjectileVx, ProjectileVy);

  if (game.goku.ki >= 100) {
    game.goku.image.src = "./images/gokuposeattack2.png";
    game.gokuKiProjectile.push(newProjectile);
    game.goku.ki = 0;
    gokuKi.style.width = 0 + "%";
  }
});

// swapping imgs
// canvas.addEventListener("mousemove", ({ offsetX }) => {
//   let gokuX = game.goku.x;

//   if (offsetX > gokuX) {
//     game.goku.image.src = "./images/gokuright.png";
//   } else {
//     game.goku.image.src = "./images/gokuleft.png";
//   }
// });
