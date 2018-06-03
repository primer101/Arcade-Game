/* Initialization */

// Delta X Delta Y
const rowHeight = 83;
const colWidth = 101;
const gridWidth = 505;

var score;

// Array of Enemies (bugs)
var allEnemies;

// Modal
const modalDialog = document.getElementById('myModal');

// Score element
const scoreElement = document.querySelector('.score-text')

// Heart elements
const hearts = [
    document.querySelector('#heart-one'),
    document.querySelector('#heart-two'),
    document.querySelector('#heart-three')
];

var win = new Audio('sounds/320672__rhodesmas__win-01.mp3');
var lost = new Audio('sounds/162465__kastenfrosch__lostitem.mp3');
var bounds = new Audio('sounds/28223__herbertboland__clap10.mp3');

function initEventListener(playAgain) {
    document.querySelector('.close').addEventListener('click', () => closeModal());
    document.querySelector('#play-again').addEventListener('click', () => playAgain());
    document.querySelector('.button-restart').addEventListener('click', () => playAgain());
    document.querySelector('.option-player').addEventListener('click', () => changePlayer());
}


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
    this.x += dt * 300 * this.speed;

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

// Player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.col = 0;
        this.row = 0;
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
            score += 10;
            this.col = 2;
            this.row = 5;
            win.play();
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
                if (this.col == 0) {
                    bounds.play();
                } else {
                    this.col -= 1
                }
                break;
            case 'right':
                if (this.col == 4) {
                    bounds.play();
                } else {
                    this.col += 1;
                }
                break;
            case 'up':
                this.row -= 1;
                break;
            case 'down':
                if (this.row == 5) {
                    bounds.play();
                } else {
                    this.row += 1;
                }
                break;
        }
    };

    lostLive() {
        this.lives -= 1;
        lost.play();
        if (this.lives < 0) {
            // Game Over
            showGameOver();
            return;
        }
        this.col = 2;
        this.row = 5;
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

// Remove a heart from the scoreboard
const removeHeart = () => {
    // 3 initial amount of hearts (lives)
    hearts[3 - player.lives - 1].style.visibility = 'hidden';
}

// Update the score
const updateScore = () => scoreElement.textContent = `${score}`;

const changePlayer = () => {
    const playerName = document.querySelector('input[name="player"]:checked').value;
    player.sprite = `images/${playerName}.png`;
    document.querySelector('.button-restart').focus();
}


const showGameOver = () => {
    // Get the move span
    const movesSpan = document.getElementById('final-score');
    movesSpan.textContent = `${score}`;

    let modal = document.getElementById('myModal');
    modal.style.display = 'block';
}

const closeModal = () => modalDialog.style.display = 'none';

var player = new Player();

function makeEnemies() {
    return [
        new Enemy(1),
        new Enemy(1),
        new Enemy(2),
        new Enemy(3),
        new Enemy(2),
        new Enemy(3)
    ]
};


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
