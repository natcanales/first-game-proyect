class Characters {
    constructor(ctx, canvasSize, posY, posX) {
        this.ctx = ctx;
        this.canvasSize = {
            w: canvasSize.w,
            h: canvasSize.h
        }
        this.characterSize = { w: 50, h: 50 }
        this.position = { x: posX, y: posY }
        this.vel = 10
        this.position0 = posX
        this.imageInstance = new Image()
        this.imageInstance.src = ''
        this.toDelete = false
        this.charType
    }

    drawCharacter() {
        this.ctx.drawImage(this.imageInstance, this.position.x, this.position.y, this.characterSize.w, this.characterSize.h);
    }

    move(num) {
        this.position.x += (this.vel * num);
    }

    characterType() {
        let num = Math.random();

        if (num < .45) {
            this.imageInstance.src = 'img/fox.png'
            this.charType = 1;

        } else if (num < .90) {
            this.imageInstance.src = 'img/ufo.png'
            this.charType = 2;

        } else {
            this.imageInstance.src = 'img/charger.png'
            this.charType = 3;
        }
    }
}