// CREATE A PROGRAM TO CHECK WHETHER THE INPUT NUMBER IS PRIME OR NOT

// Take input from the user and assign it to the "number" variable
const number = parseInt(prompt("Enter a positive number:"));

// Create a function to check whether "number" is a prime number or not
function primeNumberCheck(inputValue) {
    // Create a variable "isPrime" to store whether "number" is a prime number
    let isPrime;

    // Check if "number" is 1, if yes, then "number" is not a prime number, it's a composite number
    if (number === 1) {
        isPrime = false;
    }

    // Check if "number" is 2, if yes, then "number" is the lowest prime number
    else if (number === 2) {
        isPrime = true;
    }

    // Check if "number" is greater than 2
    else if (number > 2) {
        /* This logic applies when "number" is greater than 2.
        To determine whether the number is a prime number (which can only be divided by 1 and itself),
        loop the modulus operation of "number" with the "divisor" (which starts at 2, with the condition
	    that "divisor" is less than "number," and "divisor" will increase by 1 in each iteration).
        If there is an iteration where the remainder of the division is 0, the loop will stop,
	    and "number" is not a prime number. If there are no remainders in all iterations,
	    then the number is prime. */
        for (let divisor = 2; divisor < number; divisor++) {
            if (number % divisor == 0) {
                isPrime = false;
                break;
            } else {
                isPrime = true;
            }
        }
    }

    // For all other conditions, "number" is not a prime number
    else {
        isPrime = false;
    }

    if (isPrime) {
        alert(`${number} is a prime number.`);
        console.log(`${number} is a prime number.`);
    } else {
        alert(`${number} is not a prime number.`);
        console.log(`${number} is not a prime number.`);
    }

    return isPrime;
}

// Invoke the function
primeNumberCheck(number);
