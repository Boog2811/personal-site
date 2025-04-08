//getting references to various elements by ID
const board = document.getElementById("puzzle-board");
const timerDisplay = document.getElementById("timer");
const bestTimeDisplay = document.getElementById("bestTime");
const message = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");

//creating initial variables
let pieces = [];
let timer = 0;
let timerInterval;
//this gets the user's best time from local storage, or sets it to null if they don't have one saved
let bestTime = localStorage.getItem("bestTime") || null;

//the entry point to the game, sets everything up for the game to begin, whether on first run or a reset
function initGame() {
    //clears the board to prep for pieces to be added
    board.innerHTML = "";
    pieces = [];

    //loop responsible for creating all 9 pieces
    for (let i = 0; i < 9; i++) {
        const div = document.createElement("div"); //each piece is placed in its own div
        div.classList.add("piece");
        div.setAttribute("draggable", "true"); //allows drag and drop
        div.dataset.index = i;
        div.style.backgroundImage = "url('gameBoard.png')"; //where the image for the game board is stored, can point to outside images or 
        //math to separate the board into 9 equal pieces
        const x = (i % 3) * -100; //gets the column & multiplies by -100 to shift the image
        const y = Math.floor(i / 3) * -100; //gets the row & multiplies by -100 to shift the image
        div.style.backgroundPosition = `${x}px ${y}px`;
        pieces.push(div); //adds the piece to the pieces array
    }

    //continues shuffling until no pieces start in the correct locations
    do {
        shuffle(pieces);
    } while (hasAnyPieceInCorrectPosition(pieces));  

    //creates the "drop zones" for each piece so that we can better style each drop zone and move the pieces around later
    pieces.forEach((piece, idx) => {
        const dropZone = document.createElement("div");
        dropZone.classList.add("drop-zone");
        dropZone.dataset.target = idx;
        dropZone.appendChild(piece);
        board.appendChild(dropZone);
    });

    addDragAndDropHandlers();
    startTimer();
    //re-adds hidden to the completion message
    message.classList.add("hidden");
}

//shuffles the pieces around
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//checks if any pieces are in the right location, and if so, returns true so that the pieces can be reshuffled
function hasAnyPieceInCorrectPosition(shuffledPieces) {
    return shuffledPieces.some((piece, index) => {
    return parseInt(piece.dataset.index) === index;
    });
}

//starts the timer
function startTimer() {
    clearInterval(timerInterval);
    timer = 0;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timer++;
        updateTimerDisplay();
    }, 1000);
}

//updates the timer display & displays the best time
function updateTimerDisplay() {
    timerDisplay.textContent = `Time Taken: ${timer}s`;
    if (bestTime) {
        bestTimeDisplay.textContent = `Best Time: ${bestTime}s`;
    }
}


//attaches event listeners to the necessary elements so that the drag and drop functions
function addDragAndDropHandlers() {
    const draggables = document.querySelectorAll(".piece");
    const dropZones = document.querySelectorAll(".drop-zone");

    draggables.forEach((piece) => {
        piece.addEventListener("dragstart", dragStart);
    });

    dropZones.forEach((zone) => {
        zone.addEventListener("dragover", dragOver);
        zone.addEventListener("drop", dropPiece);
        //handles the styling for when a zone is being hovered over
        zone.addEventListener("dragenter", () => zone.classList.add("hovered"));
        zone.addEventListener("dragleave", () => zone.classList.remove("hovered"));
    });
}

//saves the data about the piece that is being dragged around so that it can be referred to later when swapping the pieces
function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.dataset.index);
}

//helper function to ensure pieces can be placed
function dragOver(e) {
    e.preventDefault();
}

function dropPiece(e) {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData("text/plain");
    const draggedPiece = document.querySelector(`.piece[data-index='${draggedIndex}']`);
    const targetZone = e.currentTarget;

    const existingPiece = targetZone.firstElementChild;

    //stores the original drop zone of the piece that is moving so that the other piece can be swapped
    const originalZone = draggedPiece.parentElement;

    //swaps the two pieces with a bit of safeguards in case something goes wrong
    if (existingPiece) {
        //swaps the location of the two pieces
        originalZone.appendChild(existingPiece);
    }

    //moves the dragged piece to the new drop zone
    targetZone.appendChild(draggedPiece);

    //checks both modified drop zones to check if they are correct
    [originalZone, targetZone].forEach(zone => {
        const piece = zone.firstElementChild;
        if (piece.dataset.index === zone.dataset.target) { //if they are correct this happens:
            piece.classList.add("correct");
            piece.setAttribute("draggable", "false"); //set to not be draggable
            piece.style.cursor = "default";
            piece.style.transform = "scale(1.05)"; //scales slightly larger
        } else {
            piece.classList.remove("correct");
            piece.setAttribute("draggable", "true");
            piece.style.cursor = "grab";
            piece.style.transform = "scale(1)";
        }
    });

    targetZone.classList.remove("hovered");

    //checks if the board is in a completed state after dropping a piece
    checkCompletion();
}


//checks if all pieces are in the correct location
function checkCompletion() {
    const allZones = document.querySelectorAll(".drop-zone");
    let complete = true;

    //actually does the check if the pieces are in a wrong position, if they are, complete is set to false
    allZones.forEach((zone) => {
        const piece = zone.firstElementChild;
        if (!piece || piece.dataset.index !== zone.dataset.target) {
            complete = false;
        }
    });

    if (complete) {
        clearInterval(timerInterval);
        //displays the victory message
        message.classList.remove("hidden");

        //if time is less than best time, save new best time
        if (!bestTime || timer < bestTime) {
            bestTime = timer;
            localStorage.setItem("bestTime", bestTime);
            updateTimerDisplay();
        }
    }
}

resetBtn.addEventListener("click", initGame);
//initializes the game on page load
window.addEventListener("DOMContentLoaded", initGame);