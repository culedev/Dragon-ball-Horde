// --> DRAGON BALL HORDE <--

// CANVAS CONF
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// GLOBAL VARIABLES
let game;
let deltaX;
let deltaY;
let frameRate = 0;
let scorePoints;
const storage = window.localStorage;

// AUDIOS
const startScreenAudio = new Audio("./sounds/introAudio.webm");
const combatAudio = new Audio("./sounds/combatsound.webm");
const gameOverAudio = new Audio("./sounds/gameover.webm");
const finalAudio = new Audio("./sounds/musicafinal.webm");
const saiyanAudio = new Audio(
  "./sounds/SAIYAN AURA - Sound effect [TubeRipper.com].webm"
);
const kiAudio = new Audio(
  "./sounds/Dragon Ball Z Huge Ki Blast Sound Effect [TubeRipper.com].webm"
);
const evilLaugh = new Audio("./sounds/evillaugh.webm");
const destructionAudio = new Audio("./sounds/destructionsound.webm");
const brolyKi = new Audio("./sounds/kiblast2.mp3");
const deathBroly = new Audio("./sounds/deathbroly.webm")
startScreenAudio.volume = 0.1;
combatAudio.volume = 0.1;
gameOverAudio.volume = 0.1;
finalAudio.volume = 0.1;
saiyanAudio.volume = 0.1;
kiAudio.volume = 0.1;
evilLaugh.volume = 0.1;
destructionAudio.volume = 0.1;
brolyKi.volume = 0.1;
deathBroly.volume = 0.1;
startScreenAudio.play();

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
const gameOverScreen = document.querySelector("#gameover-screen");
const playAgain = document.querySelector("#playagain");
const timerAnimation = document.querySelector("#timer");
const olDOM = document.querySelector("#score-ranking");
const optionBtn = document.querySelector("#options-btn");
const optionScreen = document.querySelector("#options-screen");
const muteBtn = document.querySelector("#mute-btn");
const campaignBtn = document.querySelector("#start-btn");
const interludeScreen = document.querySelector("#interlude");
const continueBtn = document.querySelector("#interlude-btn");
const winnerScreen = document.querySelector("#winner-screen");
const brolyHpBar = document.querySelector("#broly-hp-bar");
const brolyHp = document.querySelector("#broly-hp");

// STATE MANAGEMENT FUNCTIONS
const startGameHorde = () => {
  restartGame();
  startScreen.style.display = "none";
  canvas.style.display = "block";
  UI.style.display = "block";
  gameOverScreen.style.display = "none";
  startScreenAudio.pause();
  loadScore();
  countdownTimer();

  game = new Game(0);
  game.gameLoop();
};

const startCampaign = () => {
  restartGame();
  startScreen.style.display = "none";
  canvas.style.display = "block";
  UI.style.display = "block";
  gameOverScreen.style.display = "none";
  startScreenAudio.pause();
  loadScore();
  countdownTimer();

  game = new Game(1);
  game.gameLoop();
};
// Restart DOM + AUDIOS
const restartGame = () => {
  timerAnimation.style.animation = "none";
  timerAnimation.offsetHeight;
  timerAnimation.style.animation = null;
  timerAnimation.style.animation = "move 7s ease-in-out"; // las lineas anteriores resetean animacion
  score.innerHTML = 0;
  gokuHp.style.width = 100 + "%";
  gokuKi.style.width = 0 + "%";
  brolyHpBar.style.width = 100 + "%";
  combatAudio.load();
  setTimeout(() => {
    combatAudio.play();
  }, 4300);
  finalAudio.load();
  finalAudio.pause();
  startScreenAudio.load();
};

const continueInterlude = () => {
  restartGame();
  canvas.style.display = "block";
  UI.style.display = "block";
  gameOverScreen.style.display = "none";
  interludeScreen.style.display = "none";
  brolyHp.style.display = "block";
  game = new Game(2);
  game.gameLoop();
};
// Backmenu btn
const backMenu = () => {
  startScreen.style.display = "flex";
  instructionScreen.style.display = "none";
  canvas.style.display = "none";
  UI.style.display = "none";
  brolyHp.style.display = "none";
  gameOverScreen.style.display = "none";
  optionScreen.style.display = "none";
  winnerScreen.style.display = "none";
  startScreenAudio.play();
  finalAudio.load();
  finalAudio.pause();
};
// Instruction Windows
const instructions = () => {
  instructionScreen.style.display = "flex";
};
// Options window
const options = () => {
  optionScreen.style.display = "flex";
};
// Mute all audios
const muteAll = (event) => {
  if (startScreenAudio.muted) {
    startScreenAudio.muted = false;
    combatAudio.muted = false;
    finalAudio.muted = false;
    event.target.innerHTML = "DONT PUSH IT";
  } else {
    combatAudio.muted = true;
    startScreenAudio.muted = true;
    finalAudio.muted = true;
    event.target.innerHTML = "UNMUTE ME NOW!";
  }
};
// Cuenta atras combate
const countdownTimer = () => {
  timerCombat.innerHTML = 5;
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

const sortStorage = () => {
  const sortedStorage = [];

  Object.keys(storage).forEach((key) => {
    const storageObj = JSON.parse(storage.getItem(key));
    sortedStorage.push(storageObj);
  });

  sortedStorage.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    } else if (a.score > b.score) {
      return -1;
    } else {
      return 0;
    }
  });

  return sortedStorage.splice(0, 5);
};

// load ol cada vez que se inicia el juego
const loadScore = () => {
  olDOM.innerHTML = "";
  const sortedStorage = sortStorage();

  sortedStorage.forEach((scoreItem) => {
    const li = document.createElement("li");
    li.innerHTML = `${scoreItem.name}: ${scoreItem.score} Pts`;
    olDOM.append(li);
  });
};

// Ranking score
const printScore = () => {
  finalAudio.play();
  if (game.isGameOn === false) {
    const name = prompt("Enter your name") || "Yamcha";
    const score = Number(scorePoints);
    localStorage.setItem(
      localStorage.length + 1,
      JSON.stringify({ name: name, score: score })
    );
    loadScore();
  }
};

const playagainSelect = () => {
  if (game.level === 0) {
    startGameHorde();
  }
  if (game.level === 1) {
    startCampaign();
  }
  if (game.level === 2) {
    continueInterlude();
  }
};

// ADDEVENTLISTENER
campaignBtn.addEventListener("click", startCampaign);
continueBtn.addEventListener("click", continueInterlude);
hordeBtn.addEventListener("click", startGameHorde);
instructionBtn.addEventListener("click", instructions);
optionBtn.addEventListener("click", options);
muteBtn.addEventListener("click", muteAll);
backBtn.forEach((btn) => {
  btn.addEventListener("click", backMenu);
});
playAgain.addEventListener("click", playagainSelect);

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
    saiyanAudio.play();
    game.goku.vy = 0;
    game.goku.vx = 0;

    game.goku.ki = game.goku.ki + 2;
    gokuKi.style.width = game.goku.ki + "%";
  }
});

window.addEventListener("keyup", ({ keyCode }) => {
  if (keyCode === 81) {
    game.goku.image.src = "./images/gokuIddle.png";
    saiyanAudio.load();
    saiyanAudio.pause();
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
    kiAudio.play();
    game.gokuKiProjectile.push(newProjectile);
    game.goku.ki = 0;
    gokuKi.style.width = 0 + "%";
  }
});
