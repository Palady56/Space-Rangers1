
export default class Explosion {
    constructor(x,y) {
        this.position = {
            x: x,
            y: y
        }

        this.delay = 0

        this.image = document.getElementById('exp')

        this.Xindex = 0
        this.Yindex = 0

        this.delete = false

        this.frameWidth = 64
        this.frameHeight = 64
        
        this.audio = new Audio('../sounds/explosion2.wav')

        this.playSound()
    }

    playSound() {
        this.audio.volume = 0.5
        this.audio.play()
    }

    update(dt) {

        if (this.delay > 30) {
            this.Xindex++
            if (this.Xindex > 3) {
                this.Xindex = 0
                this.Yindex++
                if (this.Yindex > 3) {
                    this.delete = true
            }
        }

        this.delay = 0
        }

        this.delay += dt

    }

    render(dt, ctx, canvas) {
        ctx.drawImage(this.image, this.Xindex * this.frameWidth, this.Yindex * this.frameHeight, this.frameWidth, this.frameHeight, this.position.x, this.position.y, this.frameWidth, this.frameHeight)
    }
}