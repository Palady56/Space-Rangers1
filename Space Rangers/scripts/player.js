import Bullet from "./bullets.js"

export default class Player {
    constructor(game) {
        this.game = game
        this.width = 100
        this.height = 100

        this.position = {
            x: game.canvas.width / 2 - this.width / 2,
            y: game.canvas.height - (this.height + 50),
        }

        this.velocity = {
            x: 15,
            y: 10,
        }


        this.hitbox = {
            x: this.position.x + 10,
            y: this.position.y + 10,
            w: this.width - 20,
            h: this.height - 20
        }

        this.image = document.getElementById('player')

        this.bullets = []

        this.delay_shoot = 0

    }

    update(dt) {
        if (this.game.keys['KeyW'] || this.game.keys['ArrowUp']) {
            if (this.position.y > 75) {
                this.position.y -= this.velocity.y
                this.hitbox.y -= this.velocity.y
            }
        }

        if (this.game.keys['KeyS'] || this.game.keys['ArrowDown']) {
            if (this.position.y + this.height < this.game.canvas.height - 25) {
                this.position.y += this.velocity.y
                this.hitbox.y += this.velocity.y
            }
        }

        if (this.game.keys['KeyD'] || this.game.keys['ArrowRight']) {
            if (this.position.x + this.width < this.game.canvas.width) {
                this.position.x += this.velocity.x
                this.hitbox.x += this.velocity.x
            }
        }

        if (this.game.keys['KeyA'] || this.game.keys['ArrowLeft']) {
            if (this.position.x + this.width > 100) {
                this.position.x -= this.velocity.x
                this.hitbox.x -= this.velocity.x
            }

        }

        if (this.game.keys['Space']) {
            if (this.delay_shoot < 0) {
                this.bullets.push(new Bullet(this.position.x + this.width / 2, this.position.y))
                this.delay_shoot = 80
            }

            this.delay_shoot -= dt
            
        }

        if (!this.game.keys['Space']) {
            this.delay_shoot = 0
        }


        this.bullets.forEach((bullet, index) => {
            if (bullet.position.y + bullet.height < 0) {
                this.bullets.splice(index, 1)
            }

            bullet.update(dt)
        })


    }

    render(dt, ctx, canvas) {
        // ctx.fillStyle = 'red'
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        this.bullets.forEach((bullet, index) => {
            bullet.render(dt, ctx, canvas)
        })

        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.position.x, this.position.y, this.width, this.height)

        // ctx.lineWidth = 2
        // ctx.strokeStyle = "red";
        // ctx.strokeRect(this.hitbox.x, this.hitbox.y, this.hitbox.w, this.hitbox.h);
    }
}