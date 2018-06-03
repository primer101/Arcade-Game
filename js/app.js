// Delta X Delta Y
const rowHeight = 83;
const colWidth = 101;
const gridWidth = 505;

let score = 0;

// Score element
const scoreElement = document.querySelector('.score-text')

// Heart elements
const heartOne = document.querySelector('#heart-one');
const heartTwo = document.querySelector('#heart-two');
const heartThree = document.querySelector('#heart-three');

// Enemies our player must avoid
// Parameter: row - it is the row for the bug, 1..3
var Enemy = function (row = 1) {
    this.row = row;
    this.x = -101;
    this.y = row * rowHeight - 20;
    this.speed = Math.random();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x += dt * 200 * this.speed;

    // Loop the bug again when it is off the grid
    if (this.x > gridWidth) {
        this.x = -101;
        this.speed = Math.random();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        this.col = 2;
        this.row = 5;
        this.x = 0;
        this.y = 0;
        this.sprite = 'images/char-cat-girl.png';
        this.lives = 3;
    }

    // Update the player's position
    // Parameter: dt, a time delta between ticks
    update() {
        this.x = colWidth * this.col;
        this.y = rowHeight * this.row - 10;
        if (this.row == 0) {
            // WATER!!
            score += 20;
            this.col = 2;
            this.row = 5;
        }
    };

    // Draw the player on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // Handle the key to move the player's cols and rows
    handleInput(key) {
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

    lostLive() {
        this.col = 2;
        this.row = 5;
        this.lives -= 1;
        removeHeart();
    };
};

// Object.defineProperty(Player.prototype, 'col', {
//     get: () => this.col,
//     set: col => {
//         this.col = col;
//         this.x = colWidth * this.col - 40;
//     }
// });

// Object.defineProperty(Player.prototype, 'row', {
//     get: () => this.row,
//     set: row => {
//         this.row = row;
//         this.x = colWidth * row - 40;
//     }
// });

//remove a heart from the scoreboard
const removeHeart = () => {
    if (player.lives === 2) {
        heartOne.style.visibility = 'hidden';
    } else if (player.lives === 1) {
        heartTwo.style.visibility = 'hidden';
    } else if (player.lives === 0) {
        heartThree.style.visibility = 'hidden';
    }
}

const updateScore = () => scoreElement.textContent = score;

var player = new Player();

var allEnemies = [
    new Enemy(1),
    new Enemy(1),
    new Enemy(2),
    new Enemy(3),
    new Enemy(2),
    new Enemy(3)
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
