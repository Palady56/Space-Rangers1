import Stars from "./stars.js"

export default class GameScene {
    constructor(game) {
        this.game = game
        this.stars = []
        this.Init()

    }

    Init() {
        for (let i = 0; i < 250; i++) {
            this.stars.push(new Stars(Math.random() * this.game.canvas.width, Math.random() * this.game.canvas.height))
            
        }
    }

    update(dt) {
        this.stars.forEach(
            (star, index) => {

                if (star.position.y > this.game.canvas.height) {
                    this.stars.splice(index, 1, new Stars(Math.random() * this.game.canvas.width, -10))
                }

                star.update(dt)
            }
        )


    }

    render(dt, ctx, canvas) {
        ctx.fillStyle = '#060607'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        this.stars.forEach(
            (star, index) => {
                star.render(dt, ctx, canvas)
            }
        )

        
    }
}