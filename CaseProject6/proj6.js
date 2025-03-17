function validateSignUp(event) {
    event.preventDefault();
    
    //Regex
    //All of the Regular Expressions needed for the validation of inputs, they will be categprized based on the first validation that uses them
    //Full Name
    let numbersCheck = /\d/; //checks if the string contains a number
    let specialCharactersCheck = /[!@#$%^&*(),.?":{}|<>\/\\]/; //checks if the string contains a special character

    //Username
    let initialNumbersCheck = /^\d/; //checks if the string begins with a number

    //Username
    //Username must be between 6 and 15 characters long
    //only contain letters and numbers (no special characters)
    //and cannot start with a number.
    let username = document.forms["signUpForm"].elements["username"].value;
    let usernameErrorStart = "Your username ";
    let usernameErrorMessages = [];
    try {
        if (username.length < 6) usernameErrorMessages.push("is too short"); //checking for less than 6 characters
        if (username.length > 15) usernameErrorMessages.push("is too long"); //checking for more than 15 characters
        if (specialCharactersCheck.test(username)) usernameErrorMessages.push("has a special character"); //checking for special characters using regex
        if (initialNumbersCheck.test(username)) usernameErrorMessages.push("starts with a number"); //checking if the username starts with a number using regex
        if (errorMessages.length > 0) throw usernameErrorStart + usernameErrorMessages.join(" + ") + ".";
    }
    catch (error) {
        console.log(error);
        return;
    }
}




document.forms["signUpForm"].addEventListener("submit", validateSignUp);