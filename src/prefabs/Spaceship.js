class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame); 
        scene.add.existing(this);
        this.points = pointValue;
        
        this.moveSpeed = game.settings.spaceshipSpeed;
        //if (frame = 'alienship'){
        //    this.moveSpeed = 6;
        //}
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
        this.moveSpeed = game.settings.spaceshipSpeed*1.5;
        this.x -= this.moveSpeed;

        if(this.x <= 0) {
            this.reset();
        }
    }
}