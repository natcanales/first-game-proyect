let minDec = document.getElementById('minDec')
let minUni = document.getElementById('minUni')
let secDec = document.getElementById('secDec')
let secUni = document.getElementById('secUni')
let score = document.getElementById('score')
let lifes = document.getElementById('lifes');
let bullets = document.getElementById('bullets');

let bgaudio = new Audio("sounds/bgmusic.mp3");
let meow = new Audio("sounds/meow.mp3");
let reload = new Audio("sounds/reload.mp3");
let gameover = new Audio("sounds/gameover.mp3");
let explosion = new Audio("sounds/explosion.mp3");

function startGame() {
    game.init("canvas");
    playBGMusic();
    document.querySelector("#button").removeEventListener("click", startGame, false);
    document.querySelector("#button").classList.add("erase");
}


function playBGMusic() {
    bgaudio.play();
}

function pauseBGMusic() {
    bgaudio.pause();
}

function playGameOver() {
    gameover.play();
}

function playMeow() {
    meow.play();
}

function playReload() {
    reload.play();
}

function playExplosion() {
    explosion.play();
}

function printTime() {
    printMinutes();
    printSeconds();
}

function printMinutes() {
    let minutes = game.time.getMinutes();
    minutes = game.time.twoDigitsNumber(minutes);
    minDec.innerHTML = minutes[0];
    minUni.innerHTML = minutes[1];
}

function printSeconds() {
    let seconds = game.time.getSeconds();
    seconds = game.time.twoDigitsNumber(seconds);
    secDec.innerHTML = seconds[0];
    secUni.innerHTML = seconds[1];
}

function printBullets() {
    bullets.innerHTML = game.remainingBullets
    if (bullets.innerHTML > 0) {
        if (game.player.lifes > 0) {
            bullets.innerHTML--;
        }

    } else {
        bullets.innerHTML = 50;
        game.player.lifes--;
        printLifes();
    }

}

function printLifes() {
    lifes.innerHTML = "";
    for (let i = 0; i < game.player.lifes; i++) {
        lifes.innerHTML += '<img src="./img/heart.png" alt="heart"></img>';
    }
}

function sumScore() {
    score.innerHTML = parseInt(score.innerHTML) + 10;
}

document.querySelector("#button").addEventListener("click", startGame);