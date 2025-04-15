//Returns true if the number is prime, returns false if it is composite
function isPrime(num) {
    if (num < 2 || !Number.isInteger(num)) return false; //returns false instantly if the number is less than 2 or not an integer
    let maxCheck = Math.floor(Math.sqrt(num))
    //loops through every number up until the square root of the number (the biggest possible factor), returning false if any of them are factors
    for (let i = 2; i <= maxCheck; i++) {
        if (num % i === 0) return false;
    }
    //if it gets through the for loop, it returns true, meaning the number is prime
    return true;
}

const primeNumbers = [];
const compositeNumbers = [];

function calcPrimes(event) {
    event.preventDefault(); //prevents the page from refreshing

    //Stores the input from the user into a variable
    let numberInput = document.getElementById("maxNum").value;
    
    //Makes sure the text box isn't empty
    if (numberInput.trim() == "") {
        document.getElementById("errorTextBox").innerText = "Please enter something in text box.";
        console.log("Error: User did not enter something into the text box.")
        return;
    }

    //Ensures that the age variable is a number and not a string of a number so that we can do math on it
    let number = parseInt(numberInput, 10);

    //Ensures that the number is actually a number and a number that makes sense for a number with factors (can't be negative)
    if (isNaN(number) || number <= 0) {
        document.getElementById("errorTextBox").innerText = "Please enter a valid number.";
        console.log("Error: Provided number could not be parsed as a number.")
        return;
    }

    //Resetting the arrays if the button is clicked a second time
    primeNumbers.length = 0;
    compositeNumbers.length = 0;
    for (let i = 0; i < number; i++) {
        //Adding to the primeNumbers array if the number is prime
        if (isPrime(i)) primeNumbers.push(i);
        //Adding to the compositeNumbers array if the number is composite
        else if (Number.isInteger(i)) compositeNumbers.push(i);
        else console.log("non-number received")
    }
    //Displaying both arrays to the screen
    document.getElementById("printPrimes").innerText = primeNumbers.join(", ");
    document.getElementById("printComposites").innerText = compositeNumbers.join(", ");
}


document.getElementById("primeButton").addEventListener("click", calcPrimes);