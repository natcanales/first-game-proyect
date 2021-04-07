class Explosion {
    constructor(ctx, pos) {
        this.ctx = ctx;
        this.pos = {
            x: pos.x,
            y: pos.y
        };
        this.explosionSize = { w: 50, h: 50 };
        this.autodestroy()
    }

    drawExplosion() {
        this.imageInstance = new Image();
        this.imageInstance.src = 'img/explosion08.png';
        this.ctx.drawImage(this.imageInstance, this.pos.x, this.pos.y, this.explosionSize.w, this.explosionSize.h);
    }

    autodestroy() {
        setTimeout(() => {
            this.finished = true
        }, 300)
    }
}