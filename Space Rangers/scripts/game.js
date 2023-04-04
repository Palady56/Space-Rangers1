import Stars from "./stars.js"
import MenuScene from "./menu.js"
import Background from "./background.js"
import Player from "./player.js"
import Asteroid from "./asteroids.js"
import Explosion from "./explosion.js"
import GameOver from "./over.js"

export default class GameScene {
    constructor(game) {
        this.game = game
        this.stars = []
        this.asteroids = []
        this.explosions = []
        this.count = 0
        this.Init()
    }

    Init() {
        for (let i = 0; i < 100; i++) {
            this.stars.push(new Stars(Math.random() * this.game.canvas.width, Math.random() * this.game.canvas.height))
        }
        
        this.background = new Background(this.game)

        this.player = new Player(this.game)

        this.sound = document.getElementById('bg_sound')
        this.playSound()
    }
    
    playSound() {
        this.sound.volume = 0.2
        this.sound.loop = true
        this.sound.play()
    }

    stopSound() {
        this.sound.pause()
        this.sound.currentTime = 0
    }


    update(dt) {
        this.stars.forEach(
            (star, index) => {

                if (star.position.y > this.game.canvas.height) {
                    setTimeout(() => {
                        this.stars.splice(index, 1, new Stars(Math.random() * this.game.canvas.width, -10))
                    }, 0);
                }
                star.update(dt)
            }
        )

        this.background.update(dt)

        this.player.update(dt)

        if (this.count > 10) {
            this.asteroids.push(new Asteroid(this.game))
            this.count = 0
        }


        this.asteroids.forEach((asteroid, index)=>{
            if (asteroid.position.y > this.game.canvas.height) {
                setTimeout(() => {
                    this.asteroids.splice(index, 1)
                }, 0);
            } else {
                asteroid.update(dt)
                this.player.bullets.forEach((bullet, i)=>{
                    if (
                        asteroid.hitbox.x < bullet.hitbox.x + bullet.hitbox.w &&
                        asteroid.hitbox.x + asteroid.hitbox.w > bullet.hitbox.x &&
                        asteroid.hitbox.y < bullet.hitbox.y + bullet.hitbox.h &&
                        asteroid.hitbox.y + asteroid.hitbox.h > bullet.hitbox.y
                    ) {
                        this.explosions.push(new Explosion(asteroid.position.x, asteroid.position.y))
                        this.player.bullets.splice(i, 1)
                        this.asteroids.splice(index, 1)
                    }
                })

                if (
                    asteroid.hitbox.x < this.player.hitbox.x + this.player.hitbox.w &&
                    asteroid.hitbox.x + asteroid.hitbox.w > this.player.hitbox.x &&
                    asteroid.hitbox.y < this.player.hitbox.y + this.player.hitbox.h &&
                    asteroid.hitbox.y + asteroid.hitbox.h > this.player.hitbox.y
                ) {
                    this.stopSound()
                    this.game.setScene(GameOver);
    
                }
            }

            
        
        })

        this.explosions.forEach((explosion, index)=>{
            if (explosion.delete) {
                this.explosions.splice(index, 1)
            }else{
                explosion.update(dt)
            }
        })

        if (this.game.checkKeyPress('Escape')) {
            this.game.setScene(MenuScene)
        }

        this.count++


    }

    render(dt, ctx, canvas) {
        ctx.fillStyle = '#000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        this.background.render(dt, ctx, canvas)

        this.stars.forEach(
            (star, index) => {
                star.render(dt, ctx, canvas)
            }
        )

        this.asteroids.forEach(
            (asteroid, index) => {
                asteroid.render(dt, ctx, canvas)
            }
        )

        this.explosions.forEach((explosion, index)=>{
            explosion.render(dt, ctx, canvas)
        })

        this.player.render(dt, ctx, canvas)

    }
}