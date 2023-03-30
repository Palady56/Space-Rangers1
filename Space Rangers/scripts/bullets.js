
export default class Bullet {
    constructor(ship_x, ship_y) {
        this.width = 5
        this.height = 15

        this.velocity = {
            y: 25
        }

        this.image = document.getElementById('bullet')

        this.position = {
            x: ship_x - this.image.width / 2,
            y: ship_y  //!!!!!!
        }

    }

    update(dt) {
        this.position.y -= this.velocity.y
    }

    render(dt, ctx, canvas) {
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.position.x, this.position.y, this.image.width, this.image.height)
    }
}