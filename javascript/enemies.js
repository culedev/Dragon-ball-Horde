class Enemy {
  constructor(x, y, src) {
    this.x = x;
    this.y = y;
    this.w = 30;
    this.h = 30;
    this.vx = 2;
    this.vy = 2;
    this.hp = 3;
    this.direction = 1; // 1 hacia derecha, -1 hacia izquierda
    this.image = new Image();
    this.image.src = src
  }

  drawEnemy = () => {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  };

  
}
