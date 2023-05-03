/*
Name: Samuel Liao
mode title: Rocket Patrol II: Alien Invasion
Project time: 10 hours
Mods used (100 points total):
- Allow the player to control the Rocket after it's fired (5)
- Implement the speed increase that happens after 30 seconds in the original game (5)
- Implement parallax scrolling for the background (10)
- Display the time remaining (in seconds) on the screen (10)
- Implement mouse control for player movement and mouse click to fire (15)
- Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
- Create 4 new explosion sound effects and randomize which one plays on impact (10)
- Using a texture atlas, create a new animated sprite for the Spaceship enemies (10)
- Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)
- Create a new title screen (e.g., new artwork, typography, layout) (10)
- Track a high score that persists across scenes and display it in the UI (5)
- Music Name & Source: Psykick by DSTechnician pixabay.com/music/search/8bit/

*/
var highest_score = 0;
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    score: 0,
    scene: [ Menu, Play ]
    
}

let game = new Phaser.Game(config);
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
let mouse;
// set UI sizes
//let highest_score = game.config.score;
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
