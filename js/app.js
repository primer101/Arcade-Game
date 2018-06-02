const rowHeight = 75;
const colWidth = 100;

// Enemies our player must avoid
var Enemy = function (row) {
    this.x = 0;
    this.y = row * rowHeight;
    this.speed = Math.random();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x += dt * 100 * this.speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.col = 3;
    this.row = 4;
    this.x = colWidth * this.col;
    this.y = rowHeight * this.row;
    this.sprite = 'images/char-cat-girl.png';
};

// Update the player's position
// Parameter: dt, a time delta between ticks
Player.prototype.update = function (dt) {
    this.x = colWidth * this.col;
    this.y = rowHeight * this.row;

};

// Draw the player on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle the key to move the player's cols and rows
Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'left':
            this.col -= 1
            break;
        case 'right':
            this.col += 1;
            break;
        case 'up':
            this.row -= 1;
            break;
        case 'down':
            this.row += 1;
            break;
    }
};



var player = new Player();

var allEnemies = [
    new Enemy(1),
    new Enemy(2),
    new Enemy(3),
    new Enemy(3),
    new Enemy(1)
];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
