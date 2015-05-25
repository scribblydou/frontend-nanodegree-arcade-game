
//==============================================
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// =============================================

// Sound effects and background music
var collidingEffect = new Audio('sounds/ding2.wav');
var backgroundMusic = new Audio('sounds/stepping_pebbles_copy.ogg');
var madeItSound = new Audio('sounds/win_sound_1.wav');

var Player = function() {
//add image
    this.sprite = 'images/char-horn-girl.png';
    this.x = 202;
    this.y = 491;

// Counter for number of wins (reaching the other side)
    var countWin = 0;

// Determine exact position of sprite for collision detection
// Adjust number of pixels to char within the bounding box
// of image file
    this.xAdjust = this.x + 17;
    this.yAdjust = this.y + 70;
    this.posWidth = this.x + 63;
    this.posHeight = this.y + 53;
    backgroundMusic.loop = true;
    backgroundMusic.play();

// Collision detection, check intersection of char borders
    this.checkCollisions = function () {
        var playerCollision = false;

        allEnemies.forEach(function(enemy) {
            if (!(player.posWidth < enemy.xAdjust ||
                enemy.rectEnemyWidth < player.xAdjust ||
                player.posHeight < enemy.yAdjust ||
                enemy.rectEnemyHeight < player.yAdjust)) {

                playerCollision = true;

                }

            if (playerCollision) {
                collidingEffect.play();
                player.reset();
            }
        });
    }

// Check if char reaches other side then change sprite 
    this.checkWin = function () {
        if (player.y <= 101) {
            countWin = countWin + 1; 
            madeItSound.play();
                
            var delay = 300;

            setTimeout(function(){
                player.reset();
                }, delay);
        }                
    }

// Reset after collision or after reaaching other side
    this.reset = function () { 

            if (countWin%2) {            
                this.sprite = 'images/char-horn-girl.png';
            } else {
                this.sprite = 'images/char-cat-girl.png';
            }
              
            player.x = 202;
            player.y = 574;          
    }   
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key === 'up' && this.y > 0) {
        this.y = this.y - 83;
    } else if (key === 'down' && this.y < 488) {
        this.y = this.y + 83;
    } else if (key === 'right' && this.x < 505) {
        this.x = this.x + 101;
    } else if (key === 'left' && this.x > 0) {
        this.x = this.x - 101;
    }
    this.xAdjust = this.x + 63;
    this.yAdjust = this.y + 17;
    this.posWidth = this.xAdjust + 67;
    this.posHeight = this.yAdjust + 83;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var player = new Player();

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

// =============================================================
// Function to generate a random number rounded to lower integer
// =============================================================

function pickRandomNumber(range) {

    var randomised = Math.floor((Math.random()*range));
    return randomised;
}
