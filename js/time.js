class Time {

    constructor(frame) {
        this.currentTime = 0
        this.frame = frame

    }
    getTime() {
        this.frames % 20 === 0 ? this.currentTime++ : null;
    }
    getMinutes() {
        this.getTime();
        return Math.floor(this.currentTime / 60);
    }
    getSeconds() {
        this.getTime();
        if (this.currentTime === 0) {
            return 0;
        }
        return Math.floor(this.currentTime % 60);
    }
    twoDigitsNumber(number) {
        if (number < 10) {
            return "0" + number;
        } else {
            return `${number}`;
        }
    }
}



