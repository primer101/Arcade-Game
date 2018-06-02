const rowHeight = 83;
const colWidth = 101;

// Enemies our player must avoid
var Enemy = function (row) {
    this.x = 0;
    this.y = row * rowHeight - 20;
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
    this.col = 2;
    this.row = 5;
    this.x = colWidth * this.col - 40;
    this.y = rowHeight * this.row - 10;
    this.sprite = 'images/char-cat-girl.png';
};

// Update the player's position
// Parameter: dt, a time delta between ticks
Player.prototype.update = function (dt) {
    this.x = colWidth * this.col;
    this.y = rowHeight * this.row - 10;

};

// Draw the player on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle the key to move the player's cols and rows
Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'left':
            if (this.col > 0) {
                this.col -= 1
            }
            break;
        case 'right':
            if (this.col < 4) {
                this.col += 1;
            }
            break;
        case 'up':
            if (this.row > 0) {
                this.row -= 1;
            }
            break;
        case 'down':
            if (this.row < 5)
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
