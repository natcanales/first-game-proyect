class Characters {
    constructor(ctx, canvasSize, posY) {
        this.ctx = ctx;
        this.canvasSize = {
            w: canvasSize.w,
            h: canvasSize.h
        }
        this.characterSize = { w: 50, h: 50 }
        this.position = { x: 10, y: posY }
        this.vel = 10

        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/ufo.png'
    }

    drawCharacter() {

        this.ctx.drawImage(this.imageInstance, this.position.x, this.position.y, this.characterSize.w, this.characterSize.h);

    }

    move() {
        this.position.x += this.vel
    }

    moveBack() {
        this.position.x -= this.vel
    }

}