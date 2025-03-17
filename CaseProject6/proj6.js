function validateSignUp(event) {
    event.preventDefault();
    
    //Regex
    //All of the Regular Expressions needed for the validation of inputs, they will be categprized based on the first validation that uses them
    //Full Name
    let numbersCheck = /\d/; //checks if the string contains a number
    let specialCharactersCheck = /[!@#$%^&*(),.?":{}|<>\/\\]/; //checks if the string contains a special character

    //Password
    //Password must be between 6 and 15 characters long
    //only contain letters and numbers (no special characters)
    //and cannot start with a number.
    let password = document.forms["signUpForm"].elements["password"].value;
    let passwordError = "Your password ";
    let initialNumbersCheck = /^\d/; //checks if the string begins with a number
    let errorMessages = [];
    try {
        if (password.length < 8) errorMessages.push("is too short"); //checking for less than 6 characters
        if (password.length > 20) errorMessages.push("is too long"); //checking for more than 15 characters
        if (specialCharactersCheck.test(password)) errorMessages.push("has a special character"); //checking for special characters using regex
        if (initialNumbersCheck.test(password)) errorMessages.push("starts with a number"); //checking if the password starts with a number through .charCodeAt & UTF-16 character codes
        if (errorMessages.length > 0) throw passwordError + errorMessages.join(" + ") + ".";
    }
    catch (error) {
        console.log(error);
        return;
    }
}




document.forms["signUpForm"].addEventListener("submit", validateSignUp);