class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
          
        //load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('alienship', './assets/alienship.png');
        this.load.image('starfield2', './assets/starfield2.png')
        this.load.image('starfield3', './assets/starfield3.png')
        this.load.image('starfield5', './assets/starfield5.png')
        this.load.spritesheet('spaceshipanim', './assets/spaceshipanim.png',{frameWidth: 63, frameHeight: 32, startFrame: 0, endFrame: 1});
        this.load.spritesheet('alienshipanim', './assets/alienshipanim.png',{frameWidth: 31, frameHeight: 15, startFrame: 0, endFrame: 3});
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        
        
    }
    
    
    create() {
        this.music = this.sound.add("music_psykick", {volume:0.2}, 
        {
            loop:true
        });
        this.music.play()
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.starfield2 = this.add.tileSprite(0, 0, 640, 480, 'starfield2').setOrigin(0, 0);
        this.starfield3 = this.add.tileSprite(0, 0, 640, 480, 'starfield3').setOrigin(0, 0);
        this.starfield5 = this.add.tileSprite(0, 0, 640, 480, 'starfield5').setOrigin(0, 0);
        //green UI background
        // initialize score
        
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);


        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
          // add spaceships (x3)
        this.ship04 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'alienship', 0, 40).setOrigin(0, 0);
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*5, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*6 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*6, 'spaceship', 0, 10).setOrigin(0,0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);        
          // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        mouse = this.input.mousePointer;
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.p1Score = 0;
        // display score
      let scoreConfig = {
      fontFamily: 'Courier',
      fontSize: '28px',
      backgroundColor: '#F3B141',
          color: '#843605',
          align: 'right',
          padding: {
          top: 5,
          bottom: 5,
      },
      fixedWidth: 100
      }
      let timeConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 100
        }
        this.seconds = game.settings.gameTimer;
      
      this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
      this.scoreRight = this.add.text(borderUISize + borderPadding*43.5, borderUISize + borderPadding*2, game.settings.gameTimer/1000, timeConfig);
      // GAME OVER flag
      this.gameOver = false;
      // 60-second play clock
      scoreConfig.fixedWidth = 0;
      //setInterval(this.countdown,1000);
      
      this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
        this.gameOver = true;
      }, null, this);
      this.clock30 = this.time.delayedCall(game.settings.gameTimer/2, () => 
      {
          this.ship01.increaseSpeed(2);
          this.ship02.increaseSpeed(2);
          this.ship03.increaseSpeed(2);
          this.ship04.increaseSpeed(2);
      }, null, this);
    }   
    update(time, delta) {
          // check key input for restart
        let deltaMultiplier = (delta/16.66667);
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
            this.music.pause();
          }
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        } 
        this.starfield5.tilePositionX -= 0.5;
        this.starfield.tilePositionX -= 1;
        this.starfield2.tilePositionX -= 1.5;
        this.starfield3.tilePositionX -= 2;
        
        this.ship04.alienupdate();
        this.p1Rocket.update();
        this.ship01.update();               // update spaceships (x3)
        this.ship02.update();
        this.ship03.update();
        
        // check collisions
    if(this.checkCollision(this.p1Rocket, this.ship03)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship03);
    }
    if (this.checkCollision(this.p1Rocket, this.ship02)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship02);
    }
    if (this.checkCollision(this.p1Rocket, this.ship01)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship01);
    }
    if (this.checkCollision(this.p1Rocket, this.ship04)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship04);
    }
    //console.log("timeLeft: " + this.seconds);
    if(this.seconds - delta >= 0)
    {
        this.seconds -= delta;
    }
    else
    {
        this.seconds = 0.000;
    }
    this.scoreRight.text = Math.floor(this.seconds / 1000);
    
    }
    
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
            
          return true;
        } else {
          return false;
        }
      }
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });       
        // score add and repaint
        
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        //this.scoreRight.text = game.settings.gameTimer/1000;
        let randomSound = Phaser.Math.Between(0, 4);
        if (randomSound == 0) {
          this.sound.play('sfx_explosion');
        }
        if (randomSound == 1) {
          this.sound.play('sfx_explosion2');
        }
        if (randomSound == 2) {
          this.sound.play('sfx_explosion3');
        }
        if (randomSound == 3) {
          this.sound.play('sfx_explosion4');
        }
        if (randomSound == 4) {
          this.sound.play('sfx_explosion5');
        }
    }
    
}