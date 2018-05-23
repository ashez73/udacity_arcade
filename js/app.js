/*Poo seems to be more age-neutral than blood therefore I decided
to use poo instead of blood stains in places where player collided
with bugs*/

const Poo = function() {
  this.sprite = 'images/poo.png';
  this.x = 0;
  this.y = 0;
};
//spawn poo where bug collided with player
function spawnNewpoo(a, b) {
  pooinstance = new Poo();
  pooinstance.x = a;
  pooinstance.y = b;
  allPoo.push(pooinstance);
  //communicate 'OH NO' to the player
  document.getElementsByTagName("p")[2].innerHTML = "OH NO!";
  setTimeout(function() {
    document.getElementsByTagName("p")[2].innerHTML = "";
  }, 800);
}

function restartGame() {
  player.x = 202;
  player.y = 380;
  player.courage = 4;
  player.updateCourage();
  player.keyinputOn = true;
  player.victory = false;
  player.defeat = false;
  allPoo = [];
  allEnemies.forEach(function(enemy) {
    enemy.spawnEnemy();
  });
  document.getElementsByTagName("p")[3].innerHTML = "";
  document.getElementsByTagName("p")[2].innerHTML = "";
}

Poo.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies
const Enemy = function() {
  this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.spawnEnemy = function() {
  this.random = function(number) {
    return (Math.floor(Math.random() * number)) + 1;
  };
  this.randomSpawn = this.random(100);
  this.line = this.random(3);
  this.speed = this.random(4);
  this.x = -240 + this.randomSpawn * 2;
  this.y = 60 + (this.line - 1) * 83;
}

Enemy.prototype.update = function(dt) {
  this.x += 120 * dt * this.speed;
  //if enemy out of the board spawn it again
  if (this.x > 510) {
    this.spawnEnemy();
  };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
function Player() {
  this.update = function() {
    if (this.y == -35) {
      player.victory = true;
    } else if (this.y >= 48 && this.y <= 214) {

      allEnemies.forEach((enemy)=>{
        //adjusting hit boxes
        if ((enemy.x + 91) > this.x && enemy.x < (this.x + 91) && (enemy.y === this.y + 12)) {
          //PLAYER COLLISION DETECTED!
          spawnNewpoo(this.x, this.y + 20);
          this.updateCourage();
          this.x = 202;
          this.y = 380;
        }
      });
    }
  };
  this.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  this.handleInput = function(movementDirect) {
    if (player.keyinputOn) {
      switch (movementDirect) {
        case "left":
          if (this.x - 101 >= -51) {
            this.x += -101;
          }
          break;
        case "up":
          if (this.y - 83 >= -42) {
            this.y += -83;
          }
          break;
        case "right":
          if (this.x + 101 <= 404) {
            this.x += 101;
          }
          break;
        case "down":
          if (this.y + 83 <= 412) {
            this.y += 83;
          }
          break;
      }
    }
  };
  this.sprite = 'images/char-boy.png';
  //player's life
  this.courage = 3;
  this.victory = false;
  this.defeat = false;
  //false keyintputOn blocks player movement after the game
  this.keyinputOn = true;
  this.x = 202;
  this.y = 380;
  this.updateCourage = function() {
    this.courage -= 1;
    document.getElementsByTagName("span")[0].innerHTML = this.courage;
    if (!this.courage) {
      this.defeat = true;
    }
  }
};

// 3 bugs should be enough
let allEnemies = [];
while (allEnemies.length <3){
let enemybug = new Enemy();
enemybug.spawnEnemy();
allEnemies.push(enemybug);
}

let allPoo = [];
// Place the player object in a variable called player
let player = new Player();

//addition: enter key is listened for so a new game can start
document.addEventListener('keyup', function(e) {
  let allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    13: 'enter',
    40: 'down'
  };
  if (allowedKeys[e.keyCode] == "enter" && (player.victory || player.defeat)) {
    restartGame();
  }
  player.handleInput(allowedKeys[e.keyCode]);
});
