class Goku {
  constructor(src) {
    this.x = 400;
    this.y = 480;
    this.w = 30;
    this.h = 30;
    this.vx = 0;
    this.vy = 0;
    this.hp = 100;
    this.ki = 0;
    this.image = new Image();
    this.image.src;
    this.alive = true;
  }

  drawGoku = () => {
    ctx.drawImage(this.image, this.x, this.y);
  };

  updatePlayer = () => {
    this.drawGoku();
    this.x += this.vx;
    this.y += this.vy;

    if (this.x + this.w > canvas.width) {
      this.x = canvas.width - 30;
    } else if (this.x < 0) {
      this.x = 1;
    }
    if (this.y + this.h > canvas.height) {
      this.y = canvas.height - 40;
    } else if (this.y < 0) {
      this.y = 1;
    }
  };
}

class GokuProjectile {
  constructor(vx, vy) {
    this.x = game.goku.x + game.goku.w / 2;
    this.y = game.goku.y + game.goku.h / 2;
    this.vx = vx * frameRate;
    this.vy = vy * frameRate;
    this.w = 30;
    this.h = 30;
    this.image = new Image();
    this.image.src = "./images/gokuattack1.png";
  }

  drawProjectile = () => {
    ctx.drawImage(this.image, this.x, this.y, 22, 22);
  };

  updateProjectile = () => {
    this.drawProjectile();
    this.x += this.vx;
    this.y += this.vy;
  };
}

class GokuKiProjectile {
  constructor(vx, vy) {
    this.x = game.goku.x;
    this.y = game.goku.y - 20;
    this.vx = vx * frameRate;
    this.vy = vy * frameRate;
    this.w = 150;
    this.h = 150;
    this.image = new Image();
    this.image.src = "./images/gokuattack2.png";
  }

  drawProjectile = () => {
    ctx.drawImage(this.image, this.x, this.y, 100, 100);
  };

  updateProjectile = () => {
    this.drawProjectile();
    this.x += this.vx;
    this.y += this.vy;
  };
}

class Particle {
  constructor(x, y, vx, vy, radius, color) {
    this.x = x;
    this.y = y;
    this.vx = vx * frameRate;
    this.vy = vy * frameRate;
    this.w = 30;
    this.h = 30;
    this.radius = radius;
    this.color = color;
    this.opacity = 1;
  }

  drawParticle = () => {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  };

  updateParticle = () => {
    this.drawParticle();
    this.x += this.vx;
    this.y += this.vy;
    this.opacity -= 0.01;
  };
}
