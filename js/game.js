const game = {
    title: "UFO Hunter",
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
    remainingBullets: 100,
    explosions: [],
    frames: 0,
    time: undefined,
    score: 0,


    init() {
        this.canvasDom = document.getElementById("canvas");
        this.ctx = this.canvasDom.getContext('2d');
        this.setDimensions();
        this.setEventListeners();
        this.createPlayer();
        this.startTime();
        this.start();
        printLifes();
    },

    start() {
        this.intervalID = setInterval(() => {
            this.clearAll()
            this.frames++;
            this.frames % 20 === 0 ? this.createCharacter() : null;
            this.frames % 20 === 0 ? this.time.increaseTime() : null;
            this.drawAll()
            this.player.lifes === 0 ? this.gameOver() : null;
            this.explosions.forEach(exp => exp.drawExplosion())
            this.moveChars()
            this.isCollision()
            this.reset()
        }, 50)
    },

    startTime() {
        this.time = new Time();
    },

    drawAll() {
        this.player.drawPlayer()
        this.characterArr.forEach(elm => elm.drawCharacter());
        this.bullets.forEach(elm => elm.drawBullet());
        printTime();
    },

    reset() {
        this.characterArr = this.characterArr.filter((char, i) => {
            if (!char.exploding && (char.position.x <= this.canvasSize.w) && (char.position.x > 0)) {
                return true
            }
        })
        this.explosions = this.explosions.filter((elm) => elm.finished === undefined) //filter
        let char
        for (let i = 0; i < this.characterArr.length; i++) {
            char = this.characterArr[i];

            if (char.toDelete === true) {
                this.explosions.push(new Explosion(this.ctx, char.position));
                char.vel = 0;
                if (char.exploding === undefined) {
                    char.toDelete = false
                    char.exploding = true
                }
            }
        }

        this.bullets = this.bullets.filter((elem) => !elem.toDelete)
        // for (let i = 0; i < this.bullets.length; i++) {
        //     let bullet = this.bullets[i];
        //     if ((bullet.bulletPos.y < 0) || (bullet.toDelete === true)) {
        //         this.bullets.splice(i, 1);
        //     }
        // }
    },

    setDimensions() {
        this.canvasSize.w = window.innerWidth / 2
        this.canvasSize.h = window.innerHeight
        this.canvasDom.setAttribute('width', this.canvasSize.w)
        this.canvasDom.setAttribute('height', this.canvasSize.h)
    },

    setEventListeners() {
        document.onkeydown = e => {
            e.key === "ArrowLeft" ? this.player.moveLeft() : null
            e.key === "ArrowRight" ? this.player.moveRight() : null;
        }

        document.onkeyup = e => {
            if (e.code === "Space") {
                this.createBullets();
                this.remainingBullets--
                printBullets();
            }
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
        character.characterType();
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
        let character, bullet
        for (let i = 0; i < this.characterArr.length; i++) {
            character = this.characterArr[i];
            for (let j = 0; j < this.bullets.length; j++) {
                bullet = this.bullets[j];
                if (character.position.x < bullet.bulletPos.x + bullet.bulletSize.w &&
                    character.position.x + character.characterSize.w > bullet.bulletPos.x &&
                    character.position.y < bullet.bulletPos.y + bullet.bulletSize.h &&
                    character.characterSize.h + character.position.y > bullet.bulletPos.y) {

                    if (!bullet.toDelete && character.charType === 1) {
                        this.player.lifes--;
                        printLifes();
                        playMeow();
                    } else if (!bullet.toDelete && character.charType === 2) {
                        sumScore();
                        playExplosion();
                    } else {
                        this.remainingBullets += 25;
                        printBullets();
                        playReload();
                    }

                    character.toDelete = true;
                    bullet.toDelete = true;
                }
            }
        }
    },

    gameOver() {
        clearInterval(this.intervalID);
        this.clearAll();
        this.ctx.font = '90px "Press Start 2P"';
        this.ctx.fillText("GAME OVER", this.canvasSize.w / 12, this.canvasSize.h / 2);
        pauseBGMusic();
        playGameOver();
    }

}