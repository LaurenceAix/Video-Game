// Enemies our player must avoid
'use strict';

var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random()*5000) + 20;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    var mySprite = ['images/enemy-pacman.png', 'images/enemy-bug.png'];
    this.sprite = mySprite[Math.floor(Math.random() * mySprite.length)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // If enemy outbound send to reset function
	if (this.x > 480) {
		this.reset();
	}

    // Check collision between player/bug
    this.checkCollision();

};

Enemy.prototype.checkCollision = function () {
    //Check for collision between enemy and player and if collision,
    //send to player reset function & remove 1 to score if > 0
        if (player.x <= this.x + 50 &&
            this.x <= player.x + 20 &&
            player.y <= this.y + 20 &&
            this.y <= player.y + 20) {
                player.reset();
            if(score > 0){
                this.score--;
            }
        }
};

// Reset bug to random row starting point
Enemy.prototype.reset = function() {
	var lane = [50, 150, 220];
	this.x = 1;
	this.y = lane[Math.floor(Math.random() * lane.length)];
	this.speed = Math.floor(Math.random()*500) + 20;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    // Change original player picture
    this.sprite = 'images/char-pink-girl.png';
    this.score = 0;
};

Player.prototype.update = function() {
    // Check for player touching the river and scoring
    if (this.y <= 1) {        
        this.x = 202;
        this.y = 400;
        score += 1;
    }

    // Check if player outbound & stop him
    if (this.x < 0) {
        this.x = 2;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.y > 400) {
        this.y = 400;
    }

    
};

var checkCollision = function(enemy) {
    //Check for collision between enemy and player and if collision,
    //send to player reset function & remove 1 to score if > 0
        if (player.x <= enemy.x + 50 &&
            enemy.x <= player.x + 20 &&
            player.y <= enemy.y + 20 &&
            enemy.y <= player.y + 20) {
                player.reset();
            if(score > 0){
                this.score--;
            }
        }
    }
// Reset function to put player back to starting point
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 400;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayScore(score);
};

// Keyboard arrows to determine player moves
Player.prototype.handleInput = function(keyB) {
    if (keyB == 'left') {
        this.x -= 100;
    }
    if (keyB == 'down') {
        this.y += 85;
    }
    if (keyB == 'right') {
        this.x += 100;
    }
    if (keyB == 'up') {
        this.y -= 85;
    }
};


// Display score
// If score = 5 the game is won
var displayScore = function(score){
    if(score >= 0 && 
       score < 5){
        ctx.font = 'bold 30pt Calibri';
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'white';
        ctx.strokeText('Score: ' + score, 190, 580);
        ctx.fillStyle = 'black';
        ctx.fillText('Score: ' + score, 190, 580);
    } else if(score >= 5){
        // Display win screen
        ctx.fillStyle = 'lightblue';
        ctx.fillRect(0,50,550,600);
        ctx.font = 'bold 70pt Calibri';
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'white';
        ctx.strokeText('You win!', 80, 320);
        ctx.fillStyle = 'black';
        ctx.fillText('You win!', 80, 320); 
        // Set time to display win screen
        setTimeout(function(){
            location.reload(1); 
        }, 2000); 
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// Enemies will appear on three rows
var row = [50, 150, 220];
var x = 1;

// Random row for enemies
var y = row[Math.floor(Math.random() * row.length)];

// Put 4 enemies in the allEnemies array
var enemy1 = new Enemy(x, y);
allEnemies.push(enemy1);
var enemy2 = new Enemy(x, y);
allEnemies.push(enemy2);
var enemy3 = new Enemy(x, y);
allEnemies.push(enemy3);
var enemy4 = new Enemy(x, y);
allEnemies.push(enemy4);

// Place the player object in a variable called player
var player = new Player(202, 400, 100);

// Set starting score
var score = 0;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});