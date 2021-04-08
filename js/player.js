class Player {
    constructor(ctx, canvasSize) {
        this.ctx = ctx;
        this.canvasSize = canvasSize;
        this.playerSize = { w: 50, h: 60 };
        this.playerPos = { x: (this.canvasSize.w / 2) - (this.playerSize.w / 2), y: this.canvasSize.h - this.playerSize.h }
        this.lifes = 3;
    }


    drawPlayer() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/shooter.png'
        this.ctx.drawImage(this.imageInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h);
    }


    moveLeft() {
        if (this.playerPos.x >= this.playerSize.w) {
            this.playerPos.x -= 15
        }


    }

    moveRight() {
        if (this.playerPos.x <= this.canvasSize.w - (this.playerSize.w * 2)) {
            this.playerPos.x += 15
        }


    }




}