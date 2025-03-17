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

    //Password
    let lowercaseCheck = /[a-z]/;
    let uppercaseCheck = /[A-Z]/;
    let passwordSpecialCharactersCheck = /[!@#$%^&*]/;

    //Phone Number
    let phoneNumberCheck = /^\d{3}-\d{3}-\d{4}$/;


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
        console.error(error);
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
        console.error(error);
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
        console.error(error);
    }

    //Password Validation
    //Must be between 8 and 20 characters
    //containing at least:
        //one uppercase letter
        //one lowercase letter
        //one digit
        //and one special character (!@#$%^&*).
    let password = document.forms["signUpForm"].elements["password"].value;
    let passwordErrorStart = "Your password ";
    let passwordErrorMessages = [];
    try {
        if (password.trim() == "") passwordErrorMessages.push("is empty"); //checking for non-empty string
        if (password.length < 8) passwordErrorMessages.push("is too short"); //checking for less than 8 characters
        if (password.length > 20) passwordErrorMessages.push("is too long"); //checking for more than 20 characters
        if (!uppercaseCheck.test(password)) passwordErrorMessages.push("does not contain an uppercase letter"); //checking for an uppercase character
        if (!lowercaseCheck.test(password)) passwordErrorMessages.push("does not contain an lowercase letter"); //checking for an lowercase character
        if (!numbersCheck.test(password)) passwordErrorMessages.push("does not contain a number"); //checking for a number
        if (!passwordSpecialCharactersCheck.test(password)) passwordErrorMessages.push("does not contain a special character"); //checking for a special character
        if (passwordErrorMessages.length > 0) throw passwordErrorStart + passwordErrorMessages.join(" + ") + ".";
    }
    catch (error) {
        console.error(error);
    }

    //Confirm Password Validation
    //Must match the password exactly.
    let confirmPassword = document.forms["signUpForm"].elements["confirmPassword"].value;
    let confirmPasswordErrorStart = "Your passwords ";
    let confirmPasswordErrorMessages = [];
    try {
        if (confirmPassword != password) confirmPasswordErrorMessages.push("do not match"); //checks if the passwords do not match
        if (confirmPasswordErrorMessages.length > 0) throw confirmPasswordErrorStart + confirmPasswordErrorMessages.join() + ".";
    }
    catch (error) {
        console.error(error);
    }

    //Phone Number Validation
    //Must match the password exactly.
    let phoneNumber = document.forms["signUpForm"].elements["phoneNumber"].value;
    let phoneNumberErrorStart = "Your passwords ";
    let phoneNumberErrorMessages = [];
    try {
        if (phoneNumber.trim() == "") phoneNumberErrorMessages.push("is empty"); //checking for non-empty string
        if (!phoneNumberCheck.test(phoneNumber)) phoneNumberErrorMessages.push("is not valid");
        if (phoneNumberErrorMessages.length > 0) throw phoneNumberErrorStart + phoneNumberErrorMessages.join(" + ") + ".";
    }
    catch (error) {
        console.error(error);
    }

    //Date of Birth Validation
    let dateOfBirthInput = document.forms["signUpForm"].elements["dateOfBirth"].value; //initially storing the input as is to check for an empty string later
    let dateOfBirth = new Date(dateOfBirthInput); //converting the input from the user into a Date object
    const today = new Date(); //creating a variable of today's date
    const age = today.getFullYear() - dateOfBirth.getFullYear();
    let dateOfBirthErrorStart = "Your age ";
    let dateOfBirthErrorMessages = [];

    try {
        if (dateOfBirthInput.trim() == "") dateOfBirthErrorMessages.push("is empty"); //checking for non-empty string
        if (age < 18 ) dateOfBirthErrorMessages.push("is under 18");
        if (dateOfBirthErrorMessages.length > 0) throw dateOfBirthErrorStart + dateOfBirthErrorMessages.join(" + ") + ".";
    }
    catch (error) {
        console.error(error);
    }

    //Checkbox Validation
    let checkbox = document.forms["signUpForm"].elements["termsAndConditions"];
    let checkboxErrorStart = "You ";
    let checkboxErrorMessages = [];

    try {
        if (!checkbox.checked) { //checks if the user did not agree to the terms and conditions
            checkboxErrorMessages.push("did not agree to the terms and conditions");
            throw checkboxErrorStart + checkboxErrorMessages.join() + ".";
        }
    }
    catch (error) {
        console.error(error);
    }

}




document.forms["signUpForm"].addEventListener("submit", validateSignUp);