// =============================
// Enemies our player must avoid
// =============================

var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = x;
    this.y = y;
};

// =====================================================
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// =====================================================

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var speed = 280;

    // Create a random speed for each frame for insect-like
    // movement
    this.x = this.x + (pickRandomNumber(speed)*dt);
    if (this.x>606) {
        this.x = -100;
    }
    // Determine boundaries of char for collision detection
    this.xAdjust = this.x + 55;
    this.yAdjust = this.y + 70;
    this.rectEnemyWidth = this.xAdjust + 88;
    this.rectEnemyHeight = this.yAdjust + 43;

};

// ======================================================
// Draw the enemy on the screen, required method for game
// ======================================================

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var allEnemies = [];

// ==============================================
// Function to create specified number of enemies
// number is the number of stone rows
// ==============================================

function createEnemies (number) {
    //count number of enemies created
    var counter = 0;

    //for 2nd and 4th time around, 2 enemies are created per round
    for (var i = 0; i <= number; i++) {
        counter += 1;
        var enemy = new Enemy(pickRandomNumber(202),i*83+140);
        allEnemies.push(enemy);
        //create a second batch of enemies in 2nd and 4th rows
        if (counter%2 == 0) {
            var enemytoo = new Enemy((pickRandomNumber(202)+303),i*83+140);
            allEnemies.push(enemytoo);
        }
    } 
};