class MenuAlien extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame); 
        scene.add.existing(this);
        this.points = pointValue;
        
        //this.moveSpeed = game.settings.spaceshipSpeed;
        //if (frame = 'alienship'){
        //    this.moveSpeed = 6;
        //}
        /*
        this.anims.create(
            {
                key: "Menualienshipanim", 
                frames: this.anims.generateFrameNumbers("Menualienshipanim", 
                {
                    start: 0,
                    end: 3,
                    nextAnim: "Menualienshipanim",
                }),
                frameRate: 30,
            });
        */

            //this.anims.play("spaceshipanim");

            //this.anims.setRepeat(-1);
    }

    update() {
        //this.x -= this.moveSpeed;

        //if(this.x <= 0 - this.width) {
            //this.reset();
        //}
    }
    increaseSpeed(multiplier)
    {
        this.moveSpeed *= multiplier;
    }
    
    reset() {
        this.x = game.config.width;
    }

    
}