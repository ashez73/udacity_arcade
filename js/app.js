// Enemies our player must avoid



var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.hitbox = [this.x, this.x +101, this.y +75, this.y +145];
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

/*
Enemy.prototype.checkCollision(){
if (player.y >=48 && player.y <=214){
  if ((this.x+ 91)> player.x && this.x < (player.x +91) && (this.y === player.y +12)){
  console.log ("ouch");
  player.x = 202;
  player.y = 380;}

}
*/
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += 120 * dt * this.speed;
  //console.log(dt);
  //check board limits
  if (this.x > 510) {
    this.spawnEnemy();
    //console.log('chuj');
    //spawnEneemy();
  }


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
function Player() {
  this.update = function() {
    //console.log("UPDATE");
    /*checkcollision -initial condition defines safe zone
    no need to check */
    if (this.y >=48 && this.y <=214){

      allEnemies.forEach(function(enemy) {
      //10 pixels are cut from PNG to make player hitbox lower
      if ((enemy.x+ 91)> player.x && enemy.x < (player.x +91) && (enemy.y === player.y +12))
      {
      console.log ("ouch");
      player.x = 202;
      player.y = 380;
    }

      });
    }

  };
  this.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  this.handleInput = function(movementDirect) {
    //console.log(movementDirect);
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

  };
  this.sprite = 'images/char-boy.png';
  //define hitbox so it ignores PNG.'s whitespace
  this.hitbox = [this.x+15, this.x +86, this.y +50, this.y +151];
};

// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
let enemy1 = new Enemy();
enemy1.spawnEnemy();
let enemy2 = new Enemy();
enemy2.spawnEnemy();
let enemy3 = new Enemy();
enemy3.spawnEnemy();


// Place all enemy objects in an array called allEnemies

var allEnemies = [enemy1, enemy2, enemy3];
// Place the player object in a variable called player

var player = new Player();
player.x = 202;
player.y = 380;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
