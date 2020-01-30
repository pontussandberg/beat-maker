let base1 = document.getElementById('base1');
let base2 = document.getElementById('base2');
let base3 = document.getElementById('base3');
let base4 = document.getElementById('base4');
let base5 = document.getElementById('base5');
let base6 = document.getElementById('base6');

let cymbal1 = document.getElementById('cymbal1');
let cymbal2 = document.getElementById('cymbal2');
let cymbal3 = document.getElementById('cymbal3');
let cymbal4 = document.getElementById('cymbal4');
let cymbal5 = document.getElementById('cymbal5');
let cymbal6 = document.getElementById('cymbal6');

let btn = document.getElementById('button');
let range = document.getElementById('speed');


let baseArr = [
    { elem: base1, sound: false },
    { elem: base2, sound: false },
    { elem: base3, sound: false },
    { elem: base4, sound: false },
    { elem: base5, sound: false },
    { elem: base6, sound: false }
];
let cymbalArr = [
    { elem: cymbal1, sound: false },
    { elem: cymbal2, sound: false },
    { elem: cymbal3, sound: false },
    { elem: cymbal4, sound: false },
    { elem: cymbal5, sound: false },
    { elem: cymbal6, sound: false }
];

// SOUNDS
let kick = new Audio('./sfx/kick.wav');
let closedCymbal = new Audio('./sfx/closed-cymbal.wav')


// GLOBALS
let currentCell = 0;
let interval;
let isRunning = false;
let cellColor = '#007bff';



function beatLoop() {
    reset();
    // trigger sound on the targeted cells
    base();
    cymbal();

    if (currentCell < baseArr.length - 1)
        currentCell++;
    else currentCell = 0;
}

function base() {
    kick.pause();
    kick.currentTime = 0;
    baseArr[currentCell].elem.style.filter = 'opacity(20%)';
    if (baseArr[currentCell].sound) {
        kick.play();
    }
}

function cymbal() {
    closedCymbal.pause();
    closedCymbal.currentTime = 0;
    cymbalArr[currentCell].elem.style.filter = 'opacity(20%)';
    if (cymbalArr[currentCell].sound) {
        closedCymbal.play();
    }
}

function reset() {
    baseArr.forEach(obj => { obj.elem.style.filter = 'opacity(100%)'; });
    cymbalArr.forEach(obj => { obj.elem.style.filter = 'opacity(100%)' });
}

// toggle cells on click
function toggleSound(elemID) {
    if (elemID.includes('base')) {
        baseArr.forEach(obj => {
            if (elemID === obj.elem.id) {
                if (obj.sound) {
                    obj.sound = false;
                    obj.elem.style.background = '#fff';
                }
                else {
                    obj.sound = true;
                    obj.elem.style.background = cellColor;
                }
            }
        });
    }
    if (elemID.includes('cymbal')) {
        cymbalArr.forEach(obj => {
            if (elemID === obj.elem.id) {
                if (obj.sound) {
                    obj.sound = false;
                    obj.elem.style.background = '#fff';
                }
                else {
                    obj.sound = true;
                    obj.elem.style.background = cellColor;
                }
            }
        });
    }
}


// button play/stop toggler
function togglePlay() {
    if (!isRunning) {
        isRunning = true;
        btn.innerHTML = 'STOP';

        // Random number 1100 to reverse the slider values
        interval = setInterval(beatLoop, 1000 - range.value);
    }
    else {
        currentCell = 0;
        reset();

        isRunning = false;
        btn.innerHTML = 'PLAY';
        clearInterval(interval);
    }
}