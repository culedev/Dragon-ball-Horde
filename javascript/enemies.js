class Enemy {
  constructor(x, y, vx, src) {
    this.x = x;
    this.y = y;
    this.w = 30;
    this.h = 30;
    this.vx = vx * frameRate;
    this.vy = 0;
    this.hp = 1;
    this.direction = 1; // 1 hacia derecha, -1 hacia izquierda
    this.image = new Image();
    this.image.src = src;

  }

  drawEnemy = () => {
    ctx.drawImage(this.image, this.x, this.y);
  };

  updateEnemy = () => {
    this.drawEnemy();
    this.x = this.x + this.vx;
  };
}

class EnemyPlus {
  constructor(x, y, vy, src) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.vx = 0;
    this.vy = vy * frameRate;
    this.hp = 4;
    this.image = new Image();
    this.image.src = src;
  }

  drawEnemy = () => {
    ctx.drawImage(this.image, this.x, this.y, 50, 50);
  };

  updateEnemyPlus = () => {
    this.drawEnemy();
    this.y = this.y + this.vy;
  };
}
