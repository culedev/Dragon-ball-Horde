// --> DRAGON BALL HORDE <--

// CANVAS CONF
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// GLOBAL VARIABLES
let game;
let deltaX;
let deltaY;
let frameRate = 1;
const combatAudio = new Audio("./sounds/combatsound.webm");
const gameOverAudio = new Audio("./sounds/gameover.webm");

// ELEMENTOS DEL DOM
const startScreen = document.querySelector("#start-screen");
const hordeBtn = document.querySelector("#horde-btn");
const UI = document.querySelector(".characterUI");
const gokuHp = document.querySelector(".healthbar");
const gokuKi = document.querySelector(".kibar");
const score = document.querySelector(".score span");
score.innerHTML = 0;
const instructionScreen = document.querySelector("#instructions-screen");
const instructionBtn = document.querySelector("#instructions-btn");
const backBtn = document.querySelectorAll(".back-btn");
const timerCombat = document.querySelector("#timer h1");
const gameOverScreen = document.querySelector("#gameover-screen")
const playAgain = document.querySelector("#playagain")
const timerAnimation = document.querySelector("#timer")

// STATE MANAGEMENT FUNCTIONS
const startGameHorde = () => {
  startScreen.style.display = "none";
  canvas.style.display = "block";
  UI.style.display = "block";
  gameOverScreen.style.display = "none"
  timerAnimation.style.animation = "move 7s ease-in-out"

  countdownTimer();

  game = new Game();
  game.gameLoop();
};

const backMenu = () => {
  startScreen.style.display = "flex";
  instructionScreen.style.display = "none";
  canvas.style.display = "none"
  UI.style.display = "none"
  gameOverScreen.style.display = "none"
  
};

const instructions = () => {
  instructionScreen.style.display = "flex";
};

const countdownTimer = () => {
  let firstInterval = setInterval(() => {
    if (Number(timerCombat.innerHTML) > 1) {
      timerCombat.innerHTML--;
    } else {
      timerCombat.innerHTML = "FIGHT";
    }
  }, 1000);
  setTimeout(() => {
    clearInterval(firstInterval);
  }, 6000);
};

// ADDEVENTLISTENER
hordeBtn.addEventListener("click", startGameHorde);
instructionBtn.addEventListener("click", instructions);
backBtn.forEach( btn => {
  btn.addEventListener("click", backMenu);
})
playAgain.addEventListener("click", startGameHorde)
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
      game.goku.image.src = "./images/gokuIddle.png";
      game.goku.vy = 0;
      break;
    case 68:
      game.goku.image.src = "./images/gokuIddle.png";
      game.goku.vx = 0;
      break;
    case 83:
      game.goku.image.src = "./images/gokuIddle.png";
      game.goku.vy = 0;
      break;
    case 65:
      game.goku.image.src = "./images/gokuIddle.png";
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
