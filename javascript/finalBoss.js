class Broly {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.w = 25;
      this.h = 40;
      this.vx = 0;
      this.vy = 0.4 * frameRate;
      this.hp = 50;
      this.image = new Image();
      this.image.src = "./images/brolybajando.png";
    }
  
    drawEnemy = () => {
      ctx.drawImage(this.image, this.x, this.y);
    };
  
    updateEnemy = () => {
      this.drawEnemy();
      this.y += this.vy;

      if (this.y >= canvas.height/2 - this.w/2) {
        this.vy = 0
        this.image.src = "./images/brolyatacando.png"
       } 
    }
    };
  

  class BrolyProjectile {
    constructor(vx, vy) {
      this.x = game.broly.x - game.broly.w;
      this.y = game.broly.y + game.broly.h / 2;
      this.vx = vx * frameRate;
      this.vy = vy * frameRate;
      this.w = 60;
      this.h = 60;
      this.image = new Image();
      this.image.src = "./images/brolyattack.png";
    }
  
    drawProjectile = () => {
      ctx.drawImage(this.image, this.x, this.y, 60, 60);
    };
  
    updateProjectile = () => {
      this.drawProjectile();
      this.x += this.vx;
      this.y += this.vy;
    };
  }