// I have understood the idea of Player.handlInput() & Enemy.update() functions from https://www.youtube.com/watch?v=oz7pHJ65TEk&feature=youtu.be 
'use strict';

// Counter that needed to change the number of herats
let heartCounter = 0;
// Counter is a variable that need to change the character
let counter = 0;

// Variables that controls the popups
const modalWin = document.getElementById("modalWin");
const modal = document.getElementById("modal");
const tryAgain = document.getElementById("tryAgain");
const playAgainWin = document.getElementById("playAgainWin");
const score = document.getElementById("score");
let totalScore = 500;

// Enemies our player must avoid
var Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.height = 55;
    this.width = 95;
    this.collision = false;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    let enemies = allEnemies;
    // To get different speed for each enemy
    if (this.x === enemies[0].x) {
        this.x += 150 * dt;
    } else if (this.x === enemies[1].x) {
        this.x += 200 * dt;
    } else if (this.x === enemies[2].x) {
        this.x += 300 * dt;
    } else if (this.x === enemies[3].x) {
        this.x += 370 * dt;
    } else if (this.x === enemies[4].x) {
        this.x += 400 * dt;
    } else if (this.x === enemies[5].x) {
        this.x += 180 * dt;
    }
    //To get enemies back after they cross the canvas 
    if (this.x > ctx.canvas.width + 101) {
        this.x = -250;
    }
    //Call check Collisions function 
    if (collision(player.x, player.y, player.width, player.height, this.x, this.y, this.width, this.height)) {
        this.collision = true;
        heartCounter += 1;
        checkHearts(heartCounter);
        gameOver(heartCounter);
        if (player) {
            player.x = 202;
            player.y = 405;
        }
    } else {
        this.collision = false;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.height = 75;
    this.width = 65;
};

Player.prototype.update = function () {
    playerWin(player.x, player.y);
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyCode) {
    if (keyCode === 'left' && this.x !== 0) {
        this.x -= 101;
    } else if (keyCode === 'right' && this.x !== 404) {
        this.x += 101;
    } else if (keyCode === 'up' && this.y !== -10) {
        this.y -= 83;
    }
    else if (keyCode === 'down' && this.y !== 405) {
        this.y += 83;
    }

    //The function which check the player position then change the character
    changeChar(this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player(202, 405, 'images/char-horn-girl.png');
const enemyPosition = [57, 140, 223, 57, 140, 223];
const allEnemies = enemyPosition.map(function (y, index) {
    return new Enemy(-100 + index, y);
});

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

/*
 *  Check collision function
 */

function collision(playerX, playerY, playerWeidth, playerHeight, enemyX, enemyY, enemyWeidth, enemyHeight) {
    return (Math.abs(playerX - enemyX) * 2 < playerWeidth + enemyWeidth) && (Math.abs(playerY - enemyY) * 2 < playerHeight + enemyHeight);
}

/*
 *  Create selector constructor function which change the character  
 */

const Selector = function (x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}

Selector.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 101, 171);
};

const selector = new Selector(0, 375, 'images/Selector.png');


/*
 *  Check player position If it on the selector then change character 
 */

function changeChar(playerX, playerY) {
    if (playerX === 0 && playerY === 405) {
        //If statement which check the counter to change the character
        if (counter < 4) {
            const charArray = ['images/char-princess-girl.png', 'images/char-boy.png', 'images/char-cat-girl.png', 'images/char-pink-girl.png', 'images/char-horn-girl.png'];
            player.sprite = charArray[counter];
            counter++;
        } else if (counter >= 4) {
            counter = 0;
            player.sprite = 'images/char-horn-girl.png';
        }
        setTimeout(function () {
            player.x = 202;
            player.y = 405;

        }, 300);
    }
}

/*
 *  Create the heart function which less one each time the player have a collission  
 */

const Heart = function (x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}

Heart.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 38, 55);
};

// Create instances from the heart constructor function  
const heart1 = new Heart(450, 535, 'images/Heart.png');
const heart2 = new Heart(410, 535, 'images/Heart.png');
const heart3 = new Heart(370, 535, 'images/Heart.png');
const heart4 = new Heart(330, 535, 'images/Heart.png');
const heart5 = new Heart(290, 535, 'images/Heart.png');
const allHearts = [heart1, heart2, heart3, heart4, heart5];

/*
 *  Check the heart counter then according to it change the number of heart & total score  
 */

function checkHearts(heartCounter) {
    switch (heartCounter) {
        case 1:
            heart5.x = -100;
            totalScore -= 100;
            break;
        case 2:
            heart4.x = -100;
            totalScore -= 100;
            break;
        case 3:
            heart3.x = -100;
            totalScore -= 100;
            break;
        case 4:
            heart2.x = -100;
            totalScore -= 100;
            break;
        case 5:
            heart1.x = -100;
            totalScore -= 100;
            break;
    }
}

/*
 *  Check if the player win 
 */

function playerWin(playerX, playerY) {
    if ((playerY === -10) && (playerX === 0 || playerX === 101 || playerX === 202 || playerX === 303 || playerX === 404)) {
        modalWin.style.display = "block";
        score.textContent = totalScore;
        playAgainWin.onclick = function () {
            modalWin.style.display = "none";
            resetGame();
        }
    }
}

/*
 *  Check if the game is over 
 */

function gameOver(heartCounter) {
    if (heartCounter === 5) {
        modal.style.display = "block";
        tryAgain.onclick = function () {
            modal.style.display = "none";
            resetGame();
        }
    }
}

/*
 *  Function that reset the game  
 */

function resetGame() {
    heartCounter = 0;
    player.x = 202;
    player.y = 405;
    totalScore = 500;
    //To get hearts back 
    let x = 450;
    for (let i = 0; i < allHearts.length; i++) {
        let heart = allHearts[i];
        heart.x = x;
        x -= 40;
    }
}