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

    //* 2. MOVIMIENTO Y ACCIONES
    this.removeProjectile();
    
    // * 3. DIBUJAR ELEMENTOS
    ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
    this.goku.updatePlayer();
    // forEach PROJECTILE
    this.gokuProjectile.forEach((projectile) => {
      projectile.updateProjectile()
    })

    //* 4. EFECTO RECURSION
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
  
  removeProjectile = () => {
    if (this.gokuProjectile.length > 20) { 
      this.gokuProjectile.shift()
    }

  }
  
}
