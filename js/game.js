const game = {
    title: "",
    author: "Jose y Nat",
    license: undefined,
    version: '1.0.0',
    canvasDom: undefined,
    ctx: undefined,
    canvasSize: {
        w: undefined,
        h: undefined
    },
    player: undefined,
    character: [],
    bullets: [],

    init() {
        this.canvasDom = document.getElementById("canvas");
        this.ctx = this.canvasDom.getContext('2d');
        this.setDimensions();
        this.setEventListeners();
        this.createPlayer();
        this.createCharacter();
        this.start();
    },
    start() {

        setInterval(() => {
            this.clearAll()
            this.drawAll()

            this.character.forEach(elm => elm.drawCharacter())
            // if (this.character.position.x >= this.canvasSize.w) {
            //     this.character.splice(i, 1);
            // }
        }, 50)


    },

    drawAll() {
        this.player.drawPlayer()
        this.character.forEach(elm => elm.drawCharacter())
        this.bullets.forEach(elm => elm.drawBullet())
    },



    setDimensions() {
        this.canvasSize.w = window.innerWidth / 2
        this.canvasSize.h = window.innerHeight
        this.canvasDom.setAttribute('width', this.canvasSize.w)
        this.canvasDom.setAttribute('height', this.canvasSize.h)
    },

    setEventListeners() {
        document.onkeydown = e => {
            e.key === "ArrowLeft" ? this.player.moveLeft() : null;
            e.key === "ArrowRight" ? this.player.moveRight() : null;
            e.code === "Space" ? this.createBullets() : null;
        }
    },

    createPlayer() {
        this.player = new Player(this.ctx, this.canvasSize);
    },

    randomize(arr) {
        let result = Math.floor(Math.random(arr.length));
        return arr[result];
    },

    createCharacter() {
        const initPos = this.randomize([this.canvasSize.h * .05, this.canvasSize.h * .25, this.canvasSize.w, this.canvasSize.w = 0]);
        const character = new Characters(this.ctx, this.canvasSize, initPos);
        if (initPos === (this.canvasSize.w = 0)) {
            this.character.moveBack();
        } else if (initPos === this.canvasSize.w) {
            this.character.move();
        }
        this.character.push(character);
    },

    createBullets() {
        this.bullets.push(new Bullet(this.ctx, this.canvasSize, this.player.playerSize, this.player.playerPos));
    },




    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },


}