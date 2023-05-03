class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.spritesheet('Menualienshipanim', './assets/Menualienshipanim.png',{frameWidth: 83, frameHeight: 45, startFrame: 0, endFrame: 3});
        this.load.image('Menualienship', './assets/Menualienship.png');
        this.load.audio("music_psykick", "./assets/psykick-112469.mp3");
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_explosion2', './assets/explosion2.wav');
        this.load.audio('sfx_explosion3', './assets/explosion3.wav');
        this.load.audio('sfx_explosion4', './assets/explosion4.wav');
        this.load.audio('sfx_explosion5', './assets/explosion5.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('starfield2', './assets/starfield2.png')
        this.load.image('starfield3', './assets/starfield3.png')
        this.load.image('starfield5', './assets/starfield5.png')
        
        
    }
    create() {
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.starfield2 = this.add.tileSprite(0, 0, 640, 480, 'starfield2').setOrigin(0, 0);
        
        // menu text configuration
        let menuConfig = {
            fontFamily: 'space mission',
            fontSize: '32px',
            backgroundColor: '#0001',
                color: '#00FF00',
                align: 'right',
                padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding+ borderPadding, 'Rocket Patrol II: Alien Invasion', menuConfig).setOrigin(0.5);
        menuConfig.color = "#FFFB00";
        
        menuConfig.fontSize = '24px';
        this.add.text(game.config.width/2, game.config.height/4, 'Highest Score: ' + highest_score, menuConfig).setOrigin(0.5);
        menuConfig.color = "#FFFFFF";
        let score = 0;
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + borderPadding, 'Mouse to move & click or F to fire', menuConfig).setOrigin(0.5);
        //menuConfig.backgroundColor = "#00FF00";
        //menuConfig.color = '#000';

        this.add.text(game.config.width/2, game.config.height/1.5 , 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        //this.ship04 = new MenuAlien(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Menualienship', 0, 40).setOrigin(0,0);
        var alien = this.add.sprite(game.config.width/2,game.config.height/2 - borderUISize - borderPadding + borderPadding, 'Menualienship');

          alien.anims.create(
              {
                  key: "alienshipanim", 
                  frames: this.anims.generateFrameNumbers("Menualienshipanim", 
                  {
                      start: 0,
                      end: 3,
                      nextAnim: "alienshipanim",
                  }),
                  frameRate: 5,
              });
          
          
        
          alien.anims.play("alienshipanim");
          
          alien.anims.setRepeat(-1);
  
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        

    }
    update(time,delta) {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 2,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene'); 
          console.log("new High score: " + game.config.score); 
            
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
      }
}