class Goku {
  constructor(src) {
    this.x = 400;
    this.y = 480;
    this.w = 50;
    this.h = 50;
    this.vx = 0;
    this.vy = 0;
    this.hp = 3;
    this.image = new Image();
    this.image.src;
  }

  drawGoku = () => {
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.drawImage(this.image, this.x, this.y);
  };

  updatePlayer = () => {
    this.drawGoku();
    this.x += this.vx;
    this.y += this.vy;

    if (this.x + this.w + this.vx > canvas.width) {
      this.vx = 0;
    } else if (this.x < 0) {
      this.vx = 0;
    }
    if (this.y + this.h > 550) {
      this.vy = 0;
    } else if (this.y < 10) {
      this.vy = 0;
    }
  };
}



class GokuProjectile {
    constructor(vx,vy) {
        this.x = game.goku.x + game.goku.w/2;
        this.y = game.goku.y + game.goku.h/2;
        this.vx = vx;
        this.vy = vy;
        this.radius = 10;

    }

    drawProjectile = () => {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2)
      ctx.fillStyle = "green"
      ctx.fill()
      ctx.closePath()
    }

    updateProjectile = () => {
      this.drawProjectile();
      this.x += this.vx
      this.y += this.vy
    }

}
