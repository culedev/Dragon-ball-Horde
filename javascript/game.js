// ELEMENTOS QUE AFECTAN AL JUEGO

class Game {
  constructor() {
    this.goku = new Goku();
    this.bg = new Image();
    this.bg.src = "./images/Scene1.jpg";
    this.enemyArr = [];
    this.gokuProjectile = [];
    this.isGameOn = true;
  }

  gameLoop = () => {
    //* 1. Limpiamos el CANVAS
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log(this.enemyArr.length)
    //* 2. MOVIMIENTO Y ACCIONES
    this.removeProjectile();
    this.addNewEnemiesLeft();
    this.removeEnemyArr()
    // * 3. DIBUJAR ELEMENTOS
    ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
    this.goku.updatePlayer();
    // forEach PROJECTILE
    this.gokuProjectile.forEach((projectile) => {
      projectile.updateProjectile();
    });
    // forEach enemy
    this.enemyArr.forEach((enemy) => {
      enemy.updateEnemy();
    });

    //* 4. EFECTO RECURSION
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };

  removeProjectile = () => {
    if (this.gokuProjectile.length > 15) {
      this.gokuProjectile.shift();
    }
  };

  removeEnemyArr = () => {
    if (this.enemyArr.length > 20) {
      this.enemyArr.shift();
    }
  }

  addNewEnemiesLeft = () => {
    let randomPosY = Math.random() * 600;
    let newEnemieLeft = new Enemy(2, randomPosY, 2, "../images/freezer.png");

    if (
      this.enemyArr.length < 5 ||
      this.enemyArr[this.enemyArr.length - 5].x > canvas.width * 0.5
    ) {
      this.enemyArr.push(newEnemieLeft);
    }
  };
}
