import MenuScene from "./menu.js"

export default class GameOver {
    constructor(game) {

        this.game = game
        this.over = 'GAME OVER'
        this.opacity = 1
        this.opacityDirection = -500
    }

    update(dt) {
        if (this.game.checkKeyPress('Escape')) {
            this.game.setScene(MenuScene)
        }

        this.opacity = this.opacity + dt / this.opacityDirection

        if (this.opacity <= 0 || this.opacity > 1) {
            this.opacityDirection = this.opacityDirection * -1
        } 

    }

    render(dt, ctx, canvas) {

        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.font = '80px Impact'
        ctx.fillStyle = '#ff0000'
        ctx.fillText(this.over, (canvas.width - ctx.measureText(this.over).width) / 2, canvas.height / 2 - 10)

        ctx.font = '30px Impact';
        ctx.fillStyle = '#fff'
        ctx.globalAlpha = this.opacity
        ctx.fillText('Press Escape return to menu', (canvas.width - ctx.measureText(this.over).width - 400), canvas.height - 100 )
    }
}