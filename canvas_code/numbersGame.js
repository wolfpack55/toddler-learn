console.log('Starting numbersGame.js');

// Function to draw the intro screen and do any other initial setup stuff
function initializeGame() {
    ctx.font = '36px serif';
    ctx.textAlign = 'center';
    ctx.fillText('Numbers Game', midX, percentY * 20);
    drawStartButton(midX, percentY * 70, 220, 60);
    // roundedRect(ctx, midX, percentY * 70, 220, 60, 20);
}


function createHiPPICanvas(width, height) {
    const ratio = window.devicePixelRatio;
    const canvas = document.createElement("canvas");

    canvas.id = 'gameWindow';
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.getContext("2d").scale(ratio, ratio);

    return canvas;
}

// Need to create the canvas element with JS so we can create an 'HD' version that will work with different pixel ratios
// Otherwise the canvas stretches and things get blurry inside it
const canvasElem = createHiPPICanvas(760, 480);
document.querySelector('.game-window').appendChild(canvasElem);
const canvas = document.querySelector('#gameWindow');
const ctx = canvas.getContext('2d');


// Some variables to access different points in the canvas, just to make it easier
// to reference different areas
const width = canvas.width;
const height = canvas.height;
const midX = canvas.width / 2;
const midY = canvas.height / 2;
const percentX = canvas.width / 100;
const percentY = canvas.height / 100;

initializeGame();