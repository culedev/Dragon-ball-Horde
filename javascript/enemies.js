class Enemy {
  constructor(x, y, vx, src) {
    this.x = x;
    this.y = y;
    this.w = 30;
    this.h = 30;
    this.vx = vx;
    this.vy = 0;
    this.hp = 1;
    this.direction = 1; // 1 hacia derecha, -1 hacia izquierda
    this.image = new Image();
    this.image.src = src;
    this.alive = true;
  }

  drawEnemy = () => {
    // ctx.fillStyle = "blue";
    // ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.drawImage(this.image, this.x, this.y)
  };

  updateEnemy = () => {
    this.drawEnemy()
    this.x = this.x + this.vx
  }
  
}
