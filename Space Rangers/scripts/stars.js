

export default class Stars {
    constructor(out_x, out_y) {

        this.position = {
            x: out_x,
            y: out_y
        }

        this.velocity = Math.random() * 10 + 1
        this.size = Math.random() * 3 + 1

        this.color = {
            r: Math.random() * 155 + 100,
            g: Math.random() * 155 + 100,
            b: 255,
            a: Math.random() * 0.8 + 0.4,
        }
    }

    update(dt) {
      this.position.y += this.velocity
      
    }

    render(dt, ctx, canvas) {
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size)

      
    }
}