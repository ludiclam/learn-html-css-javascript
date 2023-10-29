"use strict";

// Starting conditions
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

// Function to change selector text content
function changSelectorTextContent(selector, value) {
    document.querySelector(selector).textContent = value;
}

// Function to guess the number
function guess(inputValue) {
    // Save the inputValue to the guessedValue
    const guessedValue = inputValue;

    console.log(guessedValue, typeof guessedValue);

    // Update elements and conditions based on the guessed value
    if (!guessedValue) {
        // Update the message element
        changSelectorTextContent(".message", "Not a number!");
    } else if (guessedValue === secretNumber) {
        // Update the message element
        changSelectorTextContent(".message", "Correct Number!");

        // Update the number element
        changSelectorTextContent(".number", secretNumber);

        // Update the highscore
        if (highscore < score) {
            highscore = score;
        }

        // Update the highscore element
        changSelectorTextContent(".highscore", highscore);

        // Change styles
        document.querySelector(".check").disabled = true;
        document.querySelector(".guess").disabled = true;
        document.querySelector("body").style.backgroundColor = "#60b347";
        document.querySelector(".number").style.width = "30rem";
    } else {
        // Update elements based on the guessed value
        if (score > 1) {
            changSelectorTextContent(
                ".message",
                guessedValue > secretNumber
                    ? "The guessed number is too high!"
                    : "The guessed number is too low!"
            );

            // Decrease the score
            score >= 1 ? score-- : score;

            // Update the score element
            changSelectorTextContent(".score", score);
        } else if (score === 1) {
            // Decrease the score
            score--;

            // Update the score element
            changSelectorTextContent(".score", score);

            // Update the message element
            changSelectorTextContent(".message", "YOU LOST!");

            // Change styles
            document.querySelector(".check").disabled = true;
            document.querySelector(".guess").disabled = true;
        } else {
            // Update the message element
            changSelectorTextContent(".message", "YOU LOST!");

            // Change styles
            document.querySelector(".check").disabled = true;
            document.querySelector(".guess").disabled = true;
        }
    }

    return guessedValue;
}

// Function to  try again
function again() {
    // Reset elements and conditions
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    document.querySelector(".check").disabled = false;
    document.querySelector(".guess").disabled = false;
    changSelectorTextContent(".score", 20);
    changSelectorTextContent(".message", "Start guessing...");
    changSelectorTextContent(".number", "?");
    document.querySelector(".guess").value = "";
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".number").style.width = "15rem";
}

// Event listener for the "Check" button
document.querySelector(".check").addEventListener("click", () => {
    guess(Number(document.querySelector(".guess").value));
});

// Event listener for the "Again" button
document.querySelector(".again").addEventListener("click", () => {
    again();
});
