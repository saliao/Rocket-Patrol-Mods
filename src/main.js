/*
Name: Samuel Liao
mode title: Rocket Patrol II: Alien Invasion
Project time: 10 hours
Mods used:
-Allow the player to control the Rocket after it's fired (5)
-Implement the speed increase that happens after 30 seconds in the original game (5)
-Implement parallax scrolling for the background (10)
-Display the time remaining (in seconds) on the screen (10)
-Implement mouse control for player movement and mouse click to fire (15)
-Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
-Create 4 new explosion sound effects and randomize which one plays on impact (10)
*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
let mouse;
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
