class Bullet {
    constructor(ctx, canvasSize, playerSize, playerPos) {
        this.ctx = ctx;
        this.bulletPos = {
            x: playerPos.x + playerSize.w * .66,
            y: canvasSize.h - playerSize.h
        }
        this.bulletSize = {
            w: 10,
            h: 10
        }
        this.velY = 20;
        this.toDelete = false;
    }

    drawBullet() {
        this.imageInstance = new Image();
        this.imageInstance.src = 'img/bullet.png';
        this.ctx.drawImage(this.imageInstance, this.bulletPos.x, this.bulletPos.y, this.bulletSize.w, this.bulletSize.h);
        this.move();
    }

    move() {
        this.bulletPos.y -= this.velY;
    }
}