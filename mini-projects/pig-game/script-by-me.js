"use strict";

// Selecting elements
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
current0El.textContent = 0;
current1El.textContent = 0;
diceEl.classList.add("hidden");

// Variables
let scores = [0, 0];
let activePlayer = Math.trunc(Math.random() * 2);
let currentScore = 0;
let winningScore = 10;
let rollCount = 0;
let isFinished = false;

// New game functionality
function newGame() {
    // Make first turn player randomly
    activePlayer = Math.trunc(Math.random() * 2);

    // Reset scores
    scores = [0, 0];

    // Reset elements' default conditions
    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add("hidden");

    // Set active player class
    switch (activePlayer) {
        case 0:
            if (!player0El.classList.contains("player--active")) {
                player0El.classList.add("player--active");
            }
            if (player1El.classList.contains("player--active")) {
                player1El.classList.remove("player--active");
            }
            break;
        case 1:
            if (!player1El.classList.contains("player--active")) {
                player1El.classList.add("player--active");
            }
            if (player0El.classList.contains("player--active")) {
                player0El.classList.remove("player--active");
            }
            break;
        default:
            break;
    }

    // Remove winner class
    switch (isFinished) {
        case true:
            if (player0El.classList.contains("player--winner")) {
                player0El.classList.remove("player--winner");
            }
            if (player1El.classList.contains("player--winner")) {
                player1El.classList.remove("player--winner");
            }

            // Set isFinished to false
            isFinished = false;
            break;
        default:
            break;
    }

    // Log first turn player
    console.log(
        `New game has started. First player to turn is Player ${
            activePlayer + 1
        }.`
    );

    // Log starting scores
    console.log(scores);
}

// Rolling dice functionality
function rollingDice() {
    // Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Increment roll count
    rollCount++;

    // Display dice
    diceEl.src = `assets/dice-${dice}.png`;
    if (diceEl.classList.contains("hidden")) {
        diceEl.classList.remove("hidden");
    }

    // Log rolled dice
    console.log(`Player ${activePlayer + 1} rolled a ${dice}.`);

    // Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
        // Add dice to current score
        currentScore += dice;

        // Update current score element on active player
        document.getElementById(`current--${activePlayer}`).textContent =
            currentScore;

        // Log roll count
        console.log(`Roll count: ${rollCount}.`);
    } else {
        // Reset current score
        currentScore = 0;

        // Update current score element
        document.getElementById(`current--${activePlayer}`).textContent =
            currentScore;

        // Check for rolled 1: if true, log different text
        if (rollCount === 1) {
            // Log the last saved scores
            console.log(
                `Unfortunately Player ${
                    activePlayer + 1
                } failed on the first try.`
            );
        } else {
            // Log the last saved score
            console.log(
                `Player ${activePlayer + 1} fails to retain the points.`
            );
        }

        // Reset roll count
        rollCount = 0;

        // Switch to next player
        switchPlayer();

        // Log provisional scores
        console.log(scores);
    }
}

// Hold functionality
function hold() {
    // Add current player's score to scores
    scores[activePlayer] += currentScore;

    // Update player score element by taking value from scores
    document.querySelector(`#score--${activePlayer}`).textContent =
        scores[activePlayer];

    // Log the last saved score
    console.log(
        `Player 1 saved ${currentScore} points by rolling ${rollCount} times. Total Player ${
            activePlayer + 1
        }'s score: ${
            document.querySelector(`#score--${activePlayer}`).textContent
        }.`
    );

    // Reset current score
    currentScore = 0;

    // Update current score element on active player by taking value from currentScore
    document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

    // Reset roll count
    rollCount = 0;

    // Check for winning score
    if (scores[activePlayer] >= winningScore) {
        // Invoke playerWin function
        playerWin();
    } else {
        // Switch to next player
        switchPlayer();
    }

    // Log provisional scores
    console.log(scores);
}

// Switching players
function switchPlayer() {
    // Remove active class
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle("player--active");

    // Change active player
    activePlayer = activePlayer === 0 ? 1 : 0;

    // Add active class
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle("player--active");
}

// Player winning functionality
function playerWin() {
    // Set isFinished to true
    isFinished = true;

    // Hide dice
    diceEl.classList.add("hidden");

    // Add winner class
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

    // Log winning player
    console.log(`Player ${activePlayer + 1} wins the game.`);

    // Remove player active class
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

    // Log isFinished
    console.log(isFinished);
}

// To invoke newGame() to start turn randomly
newGame();

// Event listener on click on new game
btnNew.addEventListener("click", function () {
    newGame();
});

// Event listener on click on rolling dice
btnRoll.addEventListener("click", function () {
    if (!isFinished) {
        rollingDice();
    }
});

// Event listener on click on hold
btnHold.addEventListener("click", function () {
    if (!isFinished) {
        hold();
    }
});
