window.onload = () => game.init("canvas");

const time = new Time();
let minDec = document.getElementById('minDec')
let minUni = document.getElementById('minUni')
let secDec = document.getElementById('secDec')
let secUni = document.getElementById('secUni')
let score = document.getElementById('score')
let lifes = document.getElementById('lifes')


function printTime() {
    printMinutes();
    printSeconds();
}
function printMinutes() {
    let minutes = time.getMinutes();
    minutes = time.twoDigitsNumber(minutes);
    minDec.innerHTML = minutes[0];
    minUni.innerHTML = minutes[1];
}
function printSeconds() {
    let seconds = time.getSeconds();
    seconds = time.twoDigitsNumber(seconds);
    secDec.innerHTML = seconds[0];
    secUni.innerHTML = seconds[1];
}