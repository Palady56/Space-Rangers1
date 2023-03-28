

export default class Background {
    constructor(game) {
        this.game = game

        this.image = document.getElementById('bg')

        this.velocity = 10

        this.dy = this.image.height - this.game.canvas.height
        this.start = this.image.height - this.game.canvas.height
    }

    update(dt) {
        this.dy -= this.velocity 

        if (this.dy + this.game.canvas.height <= 0) {
            this.dy = this.start
        }
    }

    render(dt, ctx, canvas) {
        ctx.drawImage(this.image, 0, 10, this.image.width, this.image.height, -10, -this.dy, canvas.width, this.image.height)
        ctx.drawImage(this.image, 0, 10, this.image.width, this.image.height, -10, -this.dy - this.image.height, canvas.width, this.image.height)
    }
}

 