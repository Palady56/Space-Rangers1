import MenuScene from "./menu.js";
export default class IntroScene {
    constructor(game) {
        this.logoRevealTime = 200
        this.textTypingTime = 2500
        this.sceneDisplayTime = 3000

        this.elapsedTime = 0; 
        this.bigText = 'INTRO'
        this.infoText = 'This is intro scene of Space Rangers...'

        this.game = game
    }

    update(dt) {
        this.elapsedTime += dt 

        if (this.elapsedTime > this.sceneDisplayTime || this.game.checkKeyPress('Escape')) {
            this.game.setScene(MenuScene)
        }
    }

    render(dt, ctx, canvas) {
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.globalAlpha = Math.min(1, this.elapseTime / this.logoRevealTime)
        ctx.font = '100px Impact'
        ctx.fillStyle = '#ffffff'
        ctx.fillText(this.bigText, (canvas.width - ctx.measureText(this.bigText).width) / 2, canvas.height / 2)

        if (this.elapsedTime >= this.logoRevealTime) {
            let textProgress = Math.min(1, (this.elapsedTime - this.logoRevealTime) / this.textTypingTime)
            ctx.font = '40px Impact'
            ctx.fillStyle = '#00ff00'
            
            ctx.fillText(this.infoText.substr(0, Math.floor(this.infoText.length * textProgress)), (canvas.width - ctx.measureText(this.infoText).width) / 2, canvas.height / 2 + 100)
        }
    }
}