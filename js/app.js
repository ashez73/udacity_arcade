// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
function Player(){
this.update = function () {
   //console.log("UPDATE");
 };
this.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
this.handleInput = function (movementDirect) {
   //console.log(movementDirect);
   switch(movementDirect) {
    case "left":
        if (this.x - 100 >=0){
        this.x += -100;}
        break;
    case "up":
        if (this.y - 80 >=-40){
        this.y += -85;}
        break;
    case "right":
        if (this.x + 100 <=400){
        this.x += 100;}
        break;
    case "down":
        if (this.y + 80 <=380){
        this.y += 85;}
        break;

}

 };
this.sprite = 'images/char-boy.png';
};

// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
var enemy1 = new Enemy();
enemy1.x = 100;
enemy1.y = 100;
enemy1.speed =1.2;
var enemy2 = new Enemy();
var enemy3 = new Enemy ();
// Place all enemy objects in an array called allEnemies

var allEnemies = [enemy1, enemy2, enemy3];
// Place the player object in a variable called player

var player = new Player();
player.x = 200;
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
