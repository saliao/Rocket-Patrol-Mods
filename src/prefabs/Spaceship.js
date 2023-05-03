class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame); 
        scene.add.existing(this);
        this.points = pointValue;
        
        this.moveSpeed = game.settings.spaceshipSpeed;
        //if (frame = 'alienship'){
        //    this.moveSpeed = 6;
        //}
        this.anims.create(
            {
                key: "alienshipanim", 
                frames: this.anims.generateFrameNumbers("alienshipanim", 
                {
                    start: 0,
                    end: 3,
                    nextAnim: "alienshipanim",
                }),
                frameRate: 30,
            });
            this.anims.create(
                {
                    key: "spaceshipanim", 
                    frames: this.anims.generateFrameNumbers("spaceshipanim", 
                    {
                        start: 0,
                        end: 1,
                        nextAnim: "spaceshipanim",
                    }),
                    frameRate: 30,
                });
            if (this.y == borderUISize*4) {
                this.anims.play("alienshipanim");
            }
            else {
                this.anims.play("spaceshipanim");
            }
            this.anims.setRepeat(-1);
    }
    
    update() {
        this.x -= this.moveSpeed;

        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }
    increaseSpeed(multiplier)
    {
        this.moveSpeed *= multiplier;
    }
    
    reset() {
        this.x = game.config.width;
    }

    alienupdate() {
        this.moveSpeed = game.settings.spaceshipSpeed*2;
        this.x -= this.moveSpeed;

        if(this.x <= 0) {
            this.reset();
        }
    }
}