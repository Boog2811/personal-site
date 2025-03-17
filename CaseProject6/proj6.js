function validateSignUp(event) {
    event.preventDefault();
    
    //Regex
    //All of the Regular Expressions needed for the validation of inputs, they will be categprized based on the first validation that uses them
    //Full Name
    let numbersCheck = /\d/; //checks if the string contains a number
    let specialCharactersCheck = /[!@#$%^&*(),.?":{}|<>\/\\]/; //checks if the string contains a special character

    //Username
    let initialNumbersCheck = /^\d/; //checks if the string begins with a number

    //Email
    let emailCheck = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; //checks if the string is an email (not fully compliant with RFC 5322)

    //  


    //Full Name Validation
    //Full name must be a non-empty string (no numbers or special characters).
    let fullName = document.forms["signUpForm"].elements["fullName"].value;
    let fullNameErrorStart = "Your full name ";
    let fullNameErrorMessages = [];
    try {
        if (fullName.trim() == "") fullNameErrorMessages.push("is empty"); //checking for non-empty string
        if (numbersCheck.test(fullName)) fullNameErrorMessages.push("contains a number"); //checking for a number
        if (specialCharactersCheck.test(fullName)) fullNameErrorMessages.push("contains a special character"); //checking for special characters
        if (fullNameErrorMessages.length > 0) throw fullNameErrorStart + fullNameErrorMessages.join(" + ") + ".";
    }
    catch (error) {
        console.log(error);
    }

    //Username Validation
    //Username must be between 6 and 15 characters long
    //only contain letters and numbers (no special characters)
    //and cannot start with a number.
    let username = document.forms["signUpForm"].elements["username"].value;
    let usernameErrorStart = "Your username ";
    let usernameErrorMessages = [];
    try {
        if (username.trim() == "") usernameErrorMessages.push("is empty"); //checking for non-empty string
        if (username.length < 6) usernameErrorMessages.push("is too short"); //checking for less than 6 characters
        if (username.length > 15) usernameErrorMessages.push("is too long"); //checking for more than 15 characters
        if (specialCharactersCheck.test(username)) usernameErrorMessages.push("contains a special character"); //checking for special characters
        if (initialNumbersCheck.test(username)) usernameErrorMessages.push("starts with a number"); //checking if the username starts with a number
        if (usernameErrorMessages.length > 0) throw usernameErrorStart + usernameErrorMessages.join(" + ") + ".";
    }
    catch (error) {
        console.log(error);
    }

    //Email Validation
    //Email must be a valid email format (e.g., user@example.com).
    //only contain letters and numbers (no special characters)
    //and cannot start with a number.
    let email = document.forms["signUpForm"].elements["email"].value;
    let emailErrorStart = "Your email ";
    let emailErrorMessages = [];
    try {
        if (email.trim() == "") emailErrorMessages.push("is empty"); //checking for non-empty string
        if (!emailCheck.test(email)) emailErrorMessages.push("is invalid"); //checking against email regex
        if (emailErrorMessages.length > 0) throw emailErrorStart + emailErrorMessages.join(" + ") + ".";
    }
    catch (error) {
        console.log(error);
    }
}




document.forms["signUpForm"].addEventListener("submit", validateSignUp);