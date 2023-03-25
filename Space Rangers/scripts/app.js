import IntroScene from "./intro.js"



class Game{
    constructor() {
        this.canvas = document.getElementById('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.setScene(IntroScene)
        this.initInput()
        this.start()
    }

    initInput(){
        this.keys = {}
        document.addEventListener('keydown', (e) => {this.keys[e.code] = true}) 
        document.addEventListener('keyup', (e) => {this.keys[e.code] = false})
    }

    checkKeyPress(keyCode) {
        let isKeyPressed = this.keys[keyCode] || false
        this.lastKeyState = this.lastKeyState || {}

        if (typeof this.lastKeyState[keyCode] === 'undefined') {
            this.lastKeyState[keyCode] = isKeyPressed;
            return false
        }

        if (this.lastKeyState[keyCode] !== isKeyPressed) {
            this.lastKeyState[keyCode] = isKeyPressed;
            return isKeyPressed
        }

        return false
    }

    setScene(Scene) {
    this.activeScene = new Scene(this)
    }

    update(dt) {
        this.activeScene.update(dt)
    }

    render(dt) {
        this.ctx.save();
        this.activeScene.render(dt, this.ctx, this.canvas)
        this.ctx.restore();
        
    }

    start() {

        let fps = 30,
            interval = 1000 / fps,
            delta = 0,
            dt = 0;

        let frame = (timestamp) => {
            requestAnimationFrame(frame)
            dt = timestamp - dt
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            if (delta > interval) {
                this.update(dt)
                delta = 0
            }
            this.render(dt)

            delta = delta + dt

            dt = timestamp
        }

        requestAnimationFrame(frame)

    }

    
}

let game = new Game();