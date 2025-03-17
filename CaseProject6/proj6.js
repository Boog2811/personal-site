function validateSignUp(event) {
    event.preventDefault();

    //Password
    //Password must be between 6 and 15 characters long
    //only contain letters and numbers (no special characters)
    //and cannot start with a number.
    let password = document.forms["signUpForm"].elements["password"].value;
    let passwordError = "Your password ";
    let specialCharactersCheck = /[!@#$%^&*(),.?":{}|<>\/\\]/;
    let numbersCheck = /^\d/;
    let errorMessages = [];
    try {
        if (password.length < 6) errorMessages.push("is too short"); //checking for less than 6 characters
        if (password.length > 15) errorMessages.push("is too long"); //checking for more than 15 characters
        if (specialCharactersCheck.test(password)) errorMessages.push("has a special character"); //checking for special characters using regex
        if (numbersCheck.test(password)) errorMessages.push("starts with a number"); //checking if the password starts with a number through .charCodeAt & UTF-16 character codes
        if (errorMessages.length > 0) throw passwordError + errorMessages.join(" + ") + ".";
    }
    catch (error) {
        console.log(error);
        return;
    }
}




document.forms["signUpForm"].addEventListener("submit", validateSignUp);