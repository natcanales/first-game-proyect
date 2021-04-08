class Time {

    constructor() {
        this.currentTime = 0

    }
    increaseTime() {
        this.currentTime++;
    }
    getMinutes() {
        return Math.floor(this.currentTime / 60);
    }
    getSeconds() {
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



