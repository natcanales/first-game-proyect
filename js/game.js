const Game = {
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

    init() {
        this.canvasDom = document.getElementById("canvas")
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.setEventListeners()
        this.clearAll()
    },

    setDimensions() {
        this.canvasSize.w = window.innerWidth
        this.canvasSize.h = window.innerHeight
        this.canvasDom.setAttribute('width', this.canvasSize.w)
        this.canvasDom.setAttribute('height', this.canvasSize.h)
    },

    setEventListeners() {
        document.onkeyup = e => {
            e.key === "ArrowLeft" ? this.player.moveLeft() : null;
            e.key === "ArrowRight" ? this.player.moveRight() : null;
            e.key === "Spacebar" ? this.createBullet() : null;
        }
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },


}