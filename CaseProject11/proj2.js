function calculateBirthYear(event) {
    event.preventDefault(); //prevents the page from refreshing
    //Stores the three inputs from the user into variables
    let nameInput = document.getElementById("name").value;
    let ageInput = document.getElementById("age").value;
    let gameInput = document.getElementById("game").value;
    
    //Outputs the three inputs the user game directly to the console
    console.log("Inputs by user:" +
                "\nName: " + nameInput +
                "\nAge: " + ageInput +
                "\nFav Game: " + gameInput);
    
    if (nameInput.trim() == "" || ageInput.trim() == "" || gameInput.trim() == "") {
        document.getElementById("results").innerText = "Please enter something in every text box.";
        console.log("Error: User did not enter something into every text box.")
        return;
    }

    //Ensures that the age variable is a number and not a string of a number so that we can do math on it
    let age = parseInt(ageInput, 10);
    
    //Ensures that the age is actually a number and a number that makes sense for an age (can't be negative)
    if (isNaN(age) || age <= 0) {
        document.getElementById("results").innerText = "Please enter a valid age.";
        console.log("Error: Age could not be parsed as a number.")
        return;
    }

    

    //Gets the current year using a Date object
    let currentYear = new Date().getFullYear();
    //Subtracts age from current year, giving the user's birth year (or one off, which is accounted for in the response)
    let birthYear = currentYear - age;
    console.log(currentYear + " - " + age + " = " + birthYear);

    document.getElementById("results").innerText = "Hello " + nameInput + ", You were born in " + birthYear + " (or " + (birthYear - 1) + " if your birthday has not happened this year yet), and your favorite game is " + gameInput + ".";
}

function giveInspirationalMessage(event) {
    document.getElementById("inspirationalMessage").innerText = "You can do it!"
}

document.getElementById("inputForm").addEventListener("submit", calculateBirthYear);
document.getElementById("inspirationalButton").addEventListener("click", giveInspirationalMessage);