 
 export default class Asteroid {
    constructor(game) {
        this.game = game

        this.Xindex = 0
        this.Yindex = 0

        this.frameWidth = 64
        this.frameHeight = 64

        this.position = {
            x: Math.random() * game.canvas.width,
            y: -this.frameHeight,
        }

        this.velocity = {
            y: Math.random() * 10 + 2
        }

        this.hitbox = {
            x: this.position.x + 10,
            y: this.position.y + 10,
            w: this.frameWidth - 20,
            h: this.frameHeight - 20
        }
        this.image = document.getElementById('asteroid_1')
        // this.image = document.getElementById('asteroid_2')
        // this.image = document.getElementById('asteroid_3')
    }

    update(dt) {
        this.Xindex++

        if (this.Xindex > 5) {
            this.Xindex = 0
            this.Yindex++
            if (this.Yindex > 5) {
                this.Yindex = 0

            }
        }

        this.hitbox.y += this.velocity.y

        this.position.y += this.velocity.y
    }

    render(dt, ctx, canvas) {
        ctx.drawImage(this.image, this.Xindex * this.frameWidth, this.Yindex * this.frameHeight, this.frameWidth, this.frameHeight, this.position.x, this.position.y, this.frameWidth, this.frameHeight)
        // Hitbox illustration
        // ctx.lineWidth = 2
        // ctx.strokeStyle = "red";
        // ctx.strokeRect(this.hitbox.x, this.hitbox.y, this.hitbox.w, this.hitbox.h);
    }


 }