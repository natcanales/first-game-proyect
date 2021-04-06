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
    characterArr: [],
    bullets: [],
    frames: 0,

    init() {
        this.canvasDom = document.getElementById("canvas");
        this.ctx = this.canvasDom.getContext('2d');
        this.setDimensions();
        this.setEventListeners();
        this.createPlayer();
        this.start();
    },

    start() {
        setInterval(() => {
            this.frames++;
            this.clearAll()
            this.frames % 30 === 0 ? this.createCharacter() : null;
            this.drawAll()
            this.moveChars()
            this.isCollision()
            this.reset()
        }, 50)
    },

    drawAll() {
        this.player.drawPlayer()
        this.characterArr.forEach(elm => elm.drawCharacter())
        this.bullets.forEach(elm => elm.drawBullet())
    },

    reset() {
        for (let i = 0; i < this.characterArr.length; i++) {
            let char = this.characterArr[i]
            if ((char.position.x >= this.canvasSize.w) || (char.position.x < 0)) {
                this.characterArr.splice(i, 1);
            }

            if (char.toDelete === true) {
                char.imageInstance = new Image();
                char.imageInstance.src = "img/explosion08.png";
                char.vel = 0;
                if (char.exploding === undefined) {
                    char.exploding = true
                    setTimeout(() => {
                        this.characterArr.splice(i, 1);
                    }, 350);
                }
            }
        }

        for (let i = 0; i < this.bullets.length; i++) {
            let bullet = this.bullets[i];
            if ((bullet.bulletPos.y < 0) || (bullet.toDelete === true)) {
                this.bullets.splice(i, 1);
            }
        }
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
        let result = Math.floor(Math.random() * arr.length);
        return arr[result];
    },

    createCharacter() {
        const initPosY = this.randomize([this.canvasSize.h * .05, this.canvasSize.h * .25]);
        const initPosX = this.randomize([this.canvasSize.w, 0]);
        const character = new Characters(this.ctx, this.canvasSize, initPosY, initPosX);

        this.characterArr.push(character);

    },

    moveChars() {
        this.characterArr.forEach(elem => {
            if (elem.position0 === 0) {
                elem.move(1);
            } else {
                elem.move(-1);
            }
        })
    },

    createBullets() {
        this.bullets.push(new Bullet(this.ctx, this.canvasSize, this.player.playerSize, this.player.playerPos));
    },




    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    isCollision() {
        for (let i = 0; i < this.characterArr.length; i++) {
            let character = this.characterArr[i];
            for (let j = 0; j < this.bullets.length; j++) {
                let bullet = this.bullets[j];
                if (character.position.x < bullet.bulletPos.x + bullet.bulletSize.w &&
                    character.position.x + character.characterSize.w > bullet.bulletPos.x &&
                    character.position.y < bullet.bulletPos.y + bullet.bulletSize.h &&
                    character.characterSize.h + character.position.y > bullet.bulletPos.y) {

                    character.toDelete = true;
                    bullet.toDelete = true;
                }
            }
        }
    }
    /*if () {
                        
                    }*/
    /* bullet.bulletPos.x + bullet.bulletSize.w >= character.position.x &&
    bullet.bulletPos.y + bullet.bulletSize.h >= character.position.y &&
    bullet.bulletPos.x <= character.position.x + character.characterSize.w */

}