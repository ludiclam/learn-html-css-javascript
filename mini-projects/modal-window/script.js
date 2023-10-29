"use strict";

// Selecting elements
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnShowModal = document.querySelectorAll(".show-modal");

// Function to open modal
function openModal() {
    // Remove "hidden" class to the modal element
    modal.classList.remove("hidden");

    // Remove "hidden" class from the overlay element
    overlay.classList.remove("hidden");

    console.log("Button clicked!");
}

// Function to close modal
function closeModal() {
    // Add "hidden" class to the modal element
    modal.classList.add("hidden");

    // Add "hidden" class from the overlay element
    overlay.classList.add("hidden");

    console.log("Close!");
}

// Event listeners for show-modal elements
for (let i = 0; i < btnShowModal.length; i++) {
    btnShowModal[i].addEventListener("click", (event) => {
        console.log(event);
        openModal();
    });
}

// Event listeners for close-modal element
btnCloseModal.addEventListener("click", (event) => {
    console.log(event);
    closeModal();
});

// Event listeners for overlay element
overlay.addEventListener("click", (event) => {
    console.log(event);
    closeModal();
});

// Event listeners for Escape key
document.addEventListener("keyup", (event) => {
    console.log(event);
    if (!modal.classList.contains("hidden") && event.key === "Escape") {
        closeModal();
    }
});
