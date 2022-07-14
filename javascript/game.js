// ELEMENTOS QUE AFECTAN AL JUEGO

class Game {
  constructor(level) {
    this.goku = new Goku();
    this.bg = new Image();
    if (level === 0 || level === 1) {
      this.bg.src = "./images/Scene1.jpg";
    } else {
      this.bg.src = "./images/Scene2.jpg";
    }
    this.broly = new Broly(700, 0);

    this.enemyArr = [];
    this.enemyArr2 = [];
    this.enemyPlusArr = [];

    this.gokuProjectile = [];
    this.gokuKiProjectile = [];
    this.brolyProjectile = [];

    this.particles = [];

    this.isGameOn = true;
    this.level = level;
    this.time = 0;

    this.frames = 0;
    this.startTime = performance.now();
    this.FPSNormal = 1;
  }

  calculateFPSNormal = () => {
    let t = performance.now();
    let dt = t - this.startTime;

    // if elapsed time is greater than 1s
    if (dt > 1000) {
      // calculate the frames drawn over the period of time
      this.FPSNormal = (this.frames * 1000) / dt;

      // and restart the values
      this.frames = 0;
      this.startTime = t;
    }
    this.frames++;

    if (this.FPSNormal > 130 && this.FPSNormal < 160) {
      this.FPSNormal = 143;
    }
    if (this.FPSNormal > 50 && this.FPSNormal < 70) {
      this.FPSNormal = 60;
    }
    if (this.FPSNormal > 100 && this.FPSNormal < 129) {
      this.FPSNormal = 120;
    }
    frameRate = 143 / this.FPSNormal;
  };

  gameLoop = () => {
    if (this.FPSNormal > 1) {
      this.time += 1 / this.FPSNormal;
    }
    //* 1. Limpiamos el CANVAS
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //* 2. MOVIMIENTO Y ACCIONES
    this.removeProjectile();
    this.removeKiProjectile();
    // Add Enemies
    if (this.level === 0) {
      if (this.time > 4) {
        this.addNewEnemiesLeft();
        this.addNewEnemiesRight();
        this.addNewEnemiesPlus();
      }
      // Remove Enemies
      this.removeEnemyArr();
      this.removeEnemyArr2();
      this.removeEnemyPlusArr();
      // Projectile collision enemies
      this.projectileCollisionEnemyLeft();
      this.projectileCollisionEnemyRight();
      this.projectileCollisionEnemyPlus();
      // Projectile KI collision enemies
      this.KiCollisionEnemyLeft();
      this.KiCollisionEnemyRight();
      this.KiCollisionEnemyPlus();
      // Character collision enemies
      this.gokuEnemyLeftCollision();
      this.gokuEnemyRightCollision();
      this.gokuEnemyPlusCollision();
    }
    //* LEVEL 1
    if (this.level === 1) {
      if (this.time > 4) {
        this.addNewEnemiesRight();
        this.addNewEnemiesPlus();
      }
      this.removeEnemyArr2();
      this.removeEnemyPlusArr();
      this.projectileCollisionEnemyRight();
      this.projectileCollisionEnemyPlus();
      this.KiCollisionEnemyRight();
      this.KiCollisionEnemyPlus();
      this.gokuEnemyRightCollision();
      this.gokuEnemyPlusCollision();
      this.interludeTransition();
      
    }
    //* LEVEL 2
    if (this.level === 2) {
      this.removeBrolyProjectile();
      this.addNewBrolyProjectiles();
      this.brolyProjectileCollisionGoku();
      this.gokuProjectileCollisionBroly();
      this.KiCollisionBroly();
    }

    // Recover HP
    this.recoverHp();
    // GAME OVER!!!
    this.gameOver();
    scorePoints = score.innerHTML;
    // * 3. DIBUJAR ELEMENTOS
    ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
    this.goku.updatePlayer();
    // LEVEL 2
    if (this.level === 2) {
      this.broly.updateEnemy();
      this.brolyProjectile.forEach((projectile) => {
        projectile.updateProjectile();
      });
      this.winner();
    }
    // forEach PROJECTILE
    this.gokuProjectile.forEach((projectile) => {
      projectile.updateProjectile();
    });
    // KI PROJECTILE
    this.gokuKiProjectile.forEach((projectile) => {
      projectile.updateProjectile();
    });
    // forEach enemyLeft
    this.enemyArr.forEach((enemy) => {
      enemy.updateEnemy();
    });
    // forEach enemyRight
    this.enemyArr2.forEach((enemy) => {
      enemy.updateEnemy();
    });
    // forEach enemyPlus
    this.enemyPlusArr.forEach((enemy) => {
      enemy.updateEnemyPlus();
    });
    // forEach particles
    this.particles.forEach((particle, i) => {
      if (particle.opacity <= 0) {
        this.particles.splice(i, 1);
      }
      particle.updateParticle();
    });

    this.calculateFPSNormal();

    //* 4. EFECTO RECURSION
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };

  // REMOVE PROJECTILES
  removeProjectile = () => {
    if (this.gokuProjectile.length > 15) {
      this.gokuProjectile.shift();
    }
  };

  removeKiProjectile = () => {
    if (this.gokuKiProjectile.length > 1) {
      this.gokuKiProjectile.shift();
    }
  };
  // REMOVE ENEMIES
  removeEnemyArr = () => {
    if (this.enemyArr.length > 20) {
      this.enemyArr.shift();
    }
  };

  removeEnemyArr2 = () => {
    if (this.enemyArr2.length > 20) {
      this.enemyArr2.shift();
    }
  };

  removeEnemyPlusArr = () => {
    if (this.enemyPlusArr.length > 20) {
      this.enemyPlusArr.shift();
    }
  };

  // ADD NEW ENEMIES
  addNewEnemiesLeft = () => {
    let randomPosY = Math.random() * 600;
    let newEnemieLeft = new Enemy(0, randomPosY, 2, "./images/freezer.png");

    if (
      this.enemyArr.length < 3 ||
      this.enemyArr[this.enemyArr.length - 3].x > canvas.width * 0.3
    ) {
      this.enemyArr.push(newEnemieLeft);
    }
  };

  addNewEnemiesRight = () => {
    let newRandomPosY = Math.random() * 600;
    let newEnemieRight;
    if (this.level === 0) {
      newEnemieRight = new Enemy(
        canvas.width,
        newRandomPosY,
        -2,
        "./images/freezervolt.png"
      );
    }
    if (this.level === 1) {
      newEnemieRight = new Enemy(
        canvas.width,
        newRandomPosY,
        -1.4,
        "./images/freezervolt.png"
      );
    }

    if (
      this.enemyArr2.length < 3 ||
      this.enemyArr2[this.enemyArr2.length - 3].x < canvas.width * 0.7
    ) {
      this.enemyArr2.push(newEnemieRight);
    }
  };

  addNewEnemiesPlus = () => {
    let newRandomPosX = Math.random() * 600;
    let newEnemiePlus;

    if (this.level === 0) {
      newEnemiePlus = new EnemyPlus(newRandomPosX, 0, 2, "./images/cooler.png");
    }
    if (this.level === 1) {
      newEnemiePlus = new EnemyPlus(
        newRandomPosX,
        0,
        1.4,
        "./images/cooler.png"
      );
    }

    if (this.time > 10) {
      if (
        this.enemyPlusArr.length < 2 ||
        this.enemyPlusArr[this.enemyPlusArr.length - 2].y > canvas.height
      ) {
        this.enemyPlusArr.push(newEnemiePlus);
      }
    }
  };
  // PROJECTILE COLLISION
  projectileCollisionEnemyLeft = () => {
    this.gokuProjectile.forEach((projectile, i) => {
      this.enemyArr.forEach((enemy, j) => {
        if (
          enemy.x < projectile.x + projectile.w &&
          enemy.x + enemy.w > projectile.x &&
          enemy.y < projectile.y + projectile.h &&
          enemy.h + enemy.y > projectile.y
        ) {
          this.popParticles(enemy, "#730797");
          this.gokuProjectile.splice(i, 1);
          this.enemyArr.splice(j, 1);
          score.innerHTML++;
        }
      });
    });
  };

  projectileCollisionEnemyRight = () => {
    this.gokuProjectile.forEach((projectile, i) => {
      this.enemyArr2.forEach((enemy, j) => {
        if (
          enemy.x < projectile.x + projectile.w &&
          enemy.x + enemy.w > projectile.x &&
          enemy.y < projectile.y + projectile.h &&
          enemy.h + enemy.y > projectile.y
        ) {
          this.popParticles(enemy, "#730797");
          this.gokuProjectile.splice(i, 1);
          this.enemyArr2.splice(j, 1);
          score.innerHTML++;
        }
      });
    });
  };

  projectileCollisionEnemyPlus = () => {
    this.gokuProjectile.forEach((projectile, i) => {
      this.enemyPlusArr.forEach((enemy, j) => {
        if (
          enemy.x < projectile.x + projectile.w &&
          enemy.x + enemy.w > projectile.x &&
          enemy.y < projectile.y + projectile.h &&
          enemy.h + enemy.y > projectile.y
        ) {
          this.popParticles(enemy, "#730797");
          enemy.hp--;
          this.gokuProjectile.splice(i, 1);
          if (enemy.hp === 0) {
            this.enemyPlusArr.splice(j, 1);
          }
        }
      });
    });
  };
  // KI PROJECTILE COLLISION
  KiCollisionEnemyLeft = () => {
    this.gokuKiProjectile.forEach((projectile) => {
      this.enemyArr.forEach((enemy, j) => {
        if (
          enemy.x < projectile.x + projectile.w &&
          enemy.x + enemy.w > projectile.x &&
          enemy.y < projectile.y + projectile.h &&
          enemy.h + enemy.y > projectile.y
        ) {
          this.popParticles(enemy, "#730797");
          this.enemyArr.splice(j, 1);
          score.innerHTML++;
        }
      });
    });
  };

  KiCollisionEnemyRight = () => {
    this.gokuKiProjectile.forEach((projectile) => {
      this.enemyArr2.forEach((enemy, j) => {
        if (
          enemy.x < projectile.x + projectile.w &&
          enemy.x + enemy.w > projectile.x &&
          enemy.y < projectile.y + projectile.h &&
          enemy.h + enemy.y > projectile.y
        ) {
          this.popParticles(enemy, "#730797");
          this.enemyArr2.splice(j, 1);
          score.innerHTML++;
        }
      });
    });
  };

  KiCollisionEnemyPlus = () => {
    this.gokuKiProjectile.forEach((projectile) => {
      this.enemyPlusArr.forEach((enemy, j) => {
        if (
          enemy.x < projectile.x + projectile.w &&
          enemy.x + enemy.w > projectile.x &&
          enemy.y < projectile.y + projectile.h &&
          enemy.h + enemy.y > projectile.y
        ) {
          this.popParticles(enemy, "#730797");
          enemy.hp--;
          if (enemy.hp === 0) {
            this.enemyPlusArr.splice(j, 1);
            score.innerHTML = Number(score.innerHTML) + 10;
          }
        }
      });
    });
  };
  // Goku enemy collisions
  gokuEnemyLeftCollision = () => {
    this.enemyArr.forEach((enemy, i) => {
      if (
        enemy.x < this.goku.x + this.goku.w &&
        enemy.x + enemy.w > this.goku.x &&
        enemy.y < this.goku.y + this.goku.h &&
        enemy.h + enemy.y > this.goku.y
      ) {
        this.popParticles(this.goku, "#830707");
        this.goku.hp -= 34;
        gokuHp.style.width = this.goku.hp + "%";
        this.goku.image.src = "./images/gokureceivedmg.png";
        this.enemyArr.splice(i, 1);
      }
    });
  };

  gokuEnemyRightCollision = () => {
    this.enemyArr2.forEach((enemy, i) => {
      if (
        enemy.x < this.goku.x + this.goku.w &&
        enemy.x + enemy.w > this.goku.x &&
        enemy.y < this.goku.y + this.goku.h &&
        enemy.h + enemy.y > this.goku.y
      ) {
        this.popParticles(this.goku, "#830707");
        this.goku.hp -= 34;
        gokuHp.style.width = this.goku.hp + "%";
        this.goku.image.src = "./images/gokureceivedmg.png";
        this.enemyArr2.splice(i, 1);
      }
    });
  };

  gokuEnemyPlusCollision = () => {
    this.enemyPlusArr.forEach((enemy, i) => {
      if (
        enemy.x < this.goku.x + this.goku.w &&
        enemy.x + enemy.w > this.goku.x &&
        enemy.y < this.goku.y + this.goku.h &&
        enemy.h + enemy.y > this.goku.y
      ) {
        this.popParticles(this.goku, "#830707");
        this.goku.hp -= 34;
        gokuHp.style.width = this.goku.hp + "%";
        this.goku.image.src = "./images/gokureceivedmg.png";
        this.enemyPlusArr.splice(i, 1);
      }
    });
  };
  // RECOVER HP
  recoverHp = () => {
    if (
      this.goku.hp < 85 &&
      Number(score.innerHTML) % 50 === 0 &&
      Number(score.innerHTML) > 0
    ) {
      this.goku.hp += 10;
      gokuHp.style.width = this.goku.hp + "%";
    }
  };
  // GAMEOVER
  gameOver = () => {
    if (this.goku.hp < 0) {
      gokuHp.style.width = 0 + "%";
      this.goku.vx = 0;
      this.goku.vy = 0;
      this.goku.image.src = "./images/gokudeath.png";
      setInterval(() => {
        this.goku.image.src = "./images/gokudeath.png";
        this.isGameOn = false;
      }, 500);
      combatAudio.pause();
      gameOverAudio.play();
      gameOverScreen.style.display = "flex";
      printScore();
    }
  };
  // Bucle particulas
  popParticles = (character, color) => {
    for (let i = 0; i < 15; i++) {
      this.particles.push(
        new Particle(
          character.x + character.w / 2,
          character.y + character.h / 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          Math.random() * 5,
          color
        )
      );
    }
  };

  //* Broly 
  addNewBrolyProjectiles = () => {
    let randomVX = (Math.random() - 1.5) * 2.2;
    let randomVY = (Math.random() - 0.5) * 2.2;
    if (this.time > 4.7) {
      let newBrolyProjectile = new BrolyProjectile(randomVX, randomVY);
      if (
        this.brolyProjectile.length < 4 ||
        this.brolyProjectile[this.brolyProjectile.length - 4].x <
          canvas.width * 0.4
      ) {
        brolyKi.play();
        this.brolyProjectile.push(newBrolyProjectile);
      }
    }
  };

  brolyProjectileCollisionGoku = () => {
    this.brolyProjectile.forEach((projectile, i) => {
      if (
        this.goku.x < projectile.x + projectile.w &&
        this.goku.x + this.goku.w > projectile.x &&
        this.goku.y < projectile.y + projectile.h &&
        this.goku.h + this.goku.y > projectile.y
      ) {
        this.popParticles(this.goku, "#830707");
        this.brolyProjectile.splice(i, 1);
        this.goku.hp -= 33;
        gokuHp.style.width = this.goku.hp + "%";
        this.goku.image.src = "./images/gokureceivedmg.png";
      }
    });
  };

  removeBrolyProjectile = () => {
    if (this.brolyProjectile.length > 15) {
      this.brolyProjectile.shift();
    }
  };

  gokuProjectileCollisionBroly = () => {
    this.gokuProjectile.forEach((projectile, i) => {
      if (
        this.broly.x < projectile.x + projectile.w &&
        this.broly.x + this.broly.w > projectile.x &&
        this.broly.y < projectile.y + projectile.h &&
        this.broly.h + this.broly.y > projectile.y
      ) {
        this.popParticles(this.broly, "#830707");
        this.broly.hp = this.broly.hp - 2;
        brolyHpBar.style.width = this.broly.hp + "%";
        this.gokuProjectile.splice(i, 1);
      }
    });
  };

  KiCollisionBroly = () => {
    this.gokuKiProjectile.forEach((projectile, i) => {
      if (
        this.broly.x < projectile.x + projectile.w &&
        this.broly.x + this.broly.w > projectile.x &&
        this.broly.y < projectile.y + projectile.h &&
        this.broly.h + this.broly.y > projectile.y
      ) {
        this.popParticles(this.broly, "#830707");
        this.gokuKiProjectile.splice(i, 1);
        this.broly.hp = this.broly.hp - 20;
        brolyHpBar.style.width = this.broly.hp + "%";
      }
    });
  };

  interludeTransition = () => {
    if (Number(score.innerHTML) >= 30) {
      this.isGameOn = false;
      setTimeout(() => {
        let fadeEffect = setInterval(() => {
          if (!canvas.style.opacity) {
            canvas.style.opacity = 1;
            UI.style.opacity = 1;
          }
          if (canvas.style.opacity > 0) {
            canvas.style.opacity -= 0.02;
            UI.style.opacity -= 0.02;
          } else {
            clearInterval(fadeEffect);            
          }
        }, 50);
      }, 0.5);
      setTimeout(() => {
        canvas.style.display = "none";
        UI.style.display = "none"
        interludeScreen.style.display = "flex";
        destructionAudio.play();
        canvas.style.opacity = 1;
        UI.style.opacity = 1;
      }, 5000);
      combatAudio.pause();
      evilLaugh.play();
    }
  }

  winner = () => {
    if (this.broly.hp <= 0) {
      this.goku.image.src = "./images/gokuwin.png";
      this.broly.image.src = "./images/Broly 42 (1).png";
      deathBroly.play();
      setTimeout(() => {
        let fadeEffect = setInterval(() => {
          if (!canvas.style.opacity) {
            canvas.style.opacity = 1;
            UI.style.opacity = 1;
          }
          if (canvas.style.opacity > 0) {
            canvas.style.opacity -= 0.02;
            UI.style.opacity -= 0.02;
          } else {
            clearInterval(fadeEffect);            
          }
        }, 500);
      }, 1000);
      setTimeout(() => {
        this.isGameOn = false;
      }, 500);
      setTimeout(() => {
        canvas.style.display = "none";    
        UI.style.display = "none"; 
        winnerScreen.style.display = "flex";
        canvas.style.opacity = 1;
        UI.style.opacity = 1
      }, 3000);
      combatAudio.pause();
      finalAudio.play();
    }
  };

  
}
