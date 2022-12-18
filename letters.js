console.log('Starting numbers.js');

// We first need to listen for when the start button is pressed, then start the game
// Get the button element first
const startButton = document.querySelector('#startBtn');
const startBtnDiv = document.querySelector('.start-button-container');
const titleDiv = document.querySelector('.title-container');
const gameDiv = document.querySelector('.game-container');


// An array to hold all the different letters that will be shown as flash cards
const allLetters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
]


// A generic function to remove all the elements inside the game container. This will be useful for
// transitioning between different game states (start screen, mode select, actual gameplay, etc.)
function clearGameArea() {
    while(gameDiv.firstChild) {
        gameDiv.removeChild(gameDiv.firstChild);
    }

    // Need to reset the currentIndex so things still work if we play the game again
    currentIndex = 0;
}

function removeElem(elem) {
    elem.parentElement.removeChild(elem);
};

function fadeInElem(elem, delay) {
    elem.classList.add('fade-in');
}

function changeDisplayedLetter(mode) {
    if(mode === "ordered") {

    }
}


// We need to keep track of what letter we are currently on which will use the index 
// of the array of all letters
let currentIndex = 0;

// A function to clean up everything after the round ends, either through completing all
// the letters or just quitting early
function endGameRound() {
    console.log('Reached end');
    currentIndex = 0;
    // Don't need an event listener for the click because the event is attached to the element
    // itself and the element gets deleted, so the event listener does too
    document.removeEventListener('keydown', keydownCallback);

    // Re-hide the quit game icon until we start a new round
    document.querySelector('span.quit-icon').classList.toggle('no-display');

    startMenuTransition();
}

function handleGameUserInput(event, letterDiv, gameMode) {
        
    // Going to check if the animation is still happening by checking if the element still has
    // the 'flip' class. If it does, then don't do anything with the input
    if (letterDiv.classList.contains('flip')) {
        return;
    } 
    
    // Checks for any specific keys we want to disable like the windows button, etc
    // This currently doesn't work
    if (event.type == 'keydown' && event.keyCode == 91) {
        console.log('win key');
        window.focus();
        event.preventDefault();
    }

    // Checking to see if we made it through all the letters. If we have, then go back to the
    // game main menu
    if (currentIndex + 1 >= allLetters.length) {
        endGameRound();
        return;
    }

    
    // Move to the next letter in the array
    currentIndex++;

    // Add the flip class to add animation when card is clicked
    letterDiv.classList.add('flip'); 

    // Set a timeout equal to half of the transition duration so the displayed letter changes
    // during the animation
    setTimeout(() => {
        // Change the letter being displayed on the card to be the new one
        letterDiv.textContent = allLetters[currentIndex];
    }, 250);

    // Set a timeout equal to the transition duration before removing the class
    setTimeout(() => {
        event.preventDefault();
        // Once the letter has changed to the new one, remove the flip class so we can apply
        // it again once the card is clicked again
        letterDiv.classList.remove('flip');

    }, 500);
}

// I think I need to make this a function so we can actually reference it later when
// we want to remove the event listener. I think because I'm using an arrow function,
// I can't actually reference it to remove it later
function keydownCallback(evt) {
    const gameType = evt.target.id;
    const letterDiv = document.querySelector('.letter.no-select');
    return handleGameUserInput(evt, letterDiv, gameType);
}


function startOrderedMode() {
    console.log('Starting ordered mode...');

    // Start by clearing the screen
    clearGameArea();

    // Add back in the quit icon X in the top right corner so you can quit out of the game early
    document.querySelector('span.quit-icon').classList.toggle('no-display');

    // Need to load in a div that will hold the current letter that's centered in game area
    const letterDiv = newElem('div', {classList: 'letter no-select', textContent: '', id:'orderedLetters'});
    gameDiv.appendChild(letterDiv);

    // To start, we'll just display the first letter in the array
    letterDiv.textContent = allLetters[currentIndex];
    
    // Since we will have different event listeners for different inputs, we'll just
    // pass a function for all the code when an input is received, since we'll need it
    // multiple times for multiple event listener callbacks
    // Function is defined above ^^

    // Going to add some code so the right click context menu can't be opened
    document.addEventListener('contextmenu', (evt) => evt.preventDefault());

    // Then, each time the card is clicked, we transition to the next letter
    letterDiv.addEventListener('click', (evt) => handleGameUserInput(evt, letterDiv, 'ordered'));

    

    // If a key is pressed, we transition to the next letter
    document.addEventListener('keydown', keydownCallback);

}

function startRandomMode() {
    console.log('Starting random mode...');

    // Start by clearing the screen
    clearGameArea();

    // Need to loop through the array of letters and pop them out as they are completed
    // Start by making a copy of the array so we can remove items without messing up the
    // original array
    const tempLetters = allLetters;

}

function startMenuTransition() {
    // Going to start by getting rid of the title screen content
    clearGameArea();
    
    // Create a container div to hold the game mode buttons
    const gameModeButtonContainer = newElem('div', {classList: "game-mode-button-container"});

    // Start by showing 2 buttons for different game modes, ordered and random order
    const orderedModeBtn = newElem('button', {classList: "menu-button", textContent: "Ordered Mode"});
    const randomModeBtn = newElem('button', {classList: "menu-button", textContent: "Random Mode"});

    // Add our game mode buttons to the container div
    gameModeButtonContainer.appendChild(orderedModeBtn);
    gameModeButtonContainer.appendChild(randomModeBtn);

    // Then add the container into the play area
    gameDiv.appendChild(gameModeButtonContainer);

    // Listening for when a game mode button is pressed and determine which game mode to start
    orderedModeBtn.addEventListener('click', startOrderedMode);
    randomModeBtn.addEventListener('click', startRandomMode);
    
};


function startGame() {
    console.log('Game started');

    // Do all the transition magic for removing the start screen and adding the game mode buttons
    startMenuTransition();

    // Add in some event listeners for buttons that are static and already exist
    const closeGameIcon = document.querySelector('span.quit-icon').addEventListener('click', endGameRound);
    
}

// Listening for when the Start Game button is pressed, then start the game
startButton.addEventListener('click', startGame);


