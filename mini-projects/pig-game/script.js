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
let scores = [0, 0];
let activePlayer = Math.trunc(Math.random() * 2);
let currentScore = 0;
let winningScore = 100;
let rollCount = 0;
let isFinished = false;

// Function to set a new game
function newGame() {
    // Make first turn player randomly
    activePlayer = Math.trunc(Math.random() * 2);

    // Reset scores
    scores = [0, 0];

    // Reset elements' default conditions
    [current0El, current1El].forEach((element) => {
        element.textContent = 0;
    });
    [score0El, score1El].forEach((element, index) => {
        element.textContent = scores[index];
    });

    // Hide dice
    diceEl.classList.add("hidden");

    // Reset active player and player winner class
    [player0El, player1El].forEach((element) => {
        element.classList.remove("player--active", "player--winner");
    });

    // Add "player--active" class to the active player
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--active");

    // Reset isFinished condition
    isFinished = false;

    console.log(
        `New game has started. First player to turn is Player ${
            activePlayer + 1
        }.`
    );
    console.log(scores);
}

// Rolling dice functionality
function rollingDice() {
    // Setting a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Increment roll count
    rollCount++;

    // Display dice
    diceEl.src = `assets/dice-${dice}.png`;
    if (diceEl.classList.contains("hidden")) {
        diceEl.classList.remove("hidden");
    }

    console.log(`Player ${activePlayer + 1} rolled a ${dice}.`);

    // Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
        // Add dice to current score
        currentScore += dice;

        // Update current score element on active player
        document.getElementById(`current--${activePlayer}`).textContent =
            currentScore;

        console.log(`Roll count: ${rollCount}.`);
    } else {
        // Reset current score
        currentScore = 0;

        // Update current score element
        document.getElementById(`current--${activePlayer}`).textContent =
            currentScore;

        if (rollCount === 1)
            console.log(
                `Unfortunately Player ${
                    activePlayer + 1
                } failed on the first try.`
            );
        else
            console.log(
                `Player ${activePlayer + 1} fails to retain the points.`
            );

        // Reset roll count
        rollCount = 0;

        // Invoke switch player function
        switchPlayer();

        console.log(scores);
    }
}

// Function to hold
function hold() {
    // Add current player's score to scores
    scores[activePlayer] += currentScore;

    // Update player score element
    document.querySelector(`#score--${activePlayer}`).textContent =
        scores[activePlayer];

    console.log(
        `Player 1 saved ${currentScore} points by rolling ${rollCount} times. Total Player ${
            activePlayer + 1
        }'s score: ${
            document.querySelector(`#score--${activePlayer}`).textContent
        }.`
    );

    // Reset current score
    currentScore = 0;

    // Update current score element
    document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

    // Reset roll count
    rollCount = 0;

    // Check for winning score
    if (scores[activePlayer] >= winningScore) {
        playerWin();
    } else {
        switchPlayer();
        console.log(scores);
    }
}

// Function to switch player
function switchPlayer() {
    // Remove "player--active" class from both players
    [player0El, player1El].forEach((el) =>
        el.classList.remove("player--active")
    );

    // Change active player
    activePlayer = activePlayer === 0 ? 1 : 0;

    // Add "player--active" class to the active player
    [player0El, player1El].forEach((el, index) => {
        if (index === activePlayer) {
            el.classList.add("player--active");
        }
    });
}

// Function for winning player
function playerWin() {
    // Set isFinished to true
    isFinished = true;

    // Hide dice
    diceEl.classList.add("hidden");

    // Add winner class
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

    console.log(`Player ${activePlayer + 1} wins the game.`);

    // Remove player active class
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

    console.log(isFinished);
}

// Invoke new game
newGame();

// Event listeners on "New Game" button
btnNew.addEventListener("click", newGame);

// Event listeners on "Roll Dice" button
btnRoll.addEventListener("click", () => {
    if (!isFinished) rollingDice();
});

// Event listeners on "Hold" button
btnHold.addEventListener("click", () => {
    if (!isFinished) hold();
});
