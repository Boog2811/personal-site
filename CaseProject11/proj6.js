function validateSignUp(event) {
    event.preventDefault();
    document.getElementById("incorrectSubmission").innerHTML = ""; //resets the incorrect submission information so it does not persist between multiple attempted submissions
    
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
    let lowercaseCheck = /[a-z]/; //checks for lowercase letters
    let uppercaseCheck = /[A-Z]/; //checks for uppercase letters
    let passwordSpecialCharactersCheck = /[!@#$%^&*]/; //checks for the given eligible special characters for passwords

    //Phone Number
    let phoneNumberCheck = /^\d{3}-\d{3}-\d{4}$/; //checks for a phone number in the format 123-456-7890


    let incorrectFields = 0; //variable to track how many fields are incorrect


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
        incorrectFields++;

        //showing the user their mistake
        let fullNameMistake = document.createElement("p");
        fullNameMistake.textContent = error;
        document.getElementById("incorrectSubmission").appendChild(fullNameMistake);

        //putting the error in the console
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
        incorrectFields++;

        //showing the user their mistake
        let usernameMistake = document.createElement("p");
        usernameMistake.textContent = error;
        document.getElementById("incorrectSubmission").appendChild(usernameMistake);

        //putting the error in the console
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
        incorrectFields++;

        //showing the user their mistake
        let emailMistake = document.createElement("p");
        emailMistake.textContent = error;
        document.getElementById("incorrectSubmission").appendChild(emailMistake);

        //putting the error in the console
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
        incorrectFields++;

        //showing the user their mistake
        let passwordMistake = document.createElement("p");
        passwordMistake.textContent = error;
        document.getElementById("incorrectSubmission").appendChild(passwordMistake);

        //putting the error in the console
        console.error(error);
    }

    //Confirm Password Validation
    //Must match the password exactly.
    let confirmPassword = document.forms["signUpForm"].elements["confirmPassword"].value;
    let confirmPasswordErrorStart = "Your passwords ";
    let confirmPasswordErrorMessages = [];
    try {
        if (confirmPassword !== password) confirmPasswordErrorMessages.push("do not match"); //checks if the passwords do not match
        if (confirmPasswordErrorMessages.length > 0) throw confirmPasswordErrorStart + confirmPasswordErrorMessages.join() + ".";
    }
    catch (error) {
        incorrectFields++;

        //showing the user their mistake
        let passwordConfirmMistake = document.createElement("p");
        passwordConfirmMistake.textContent = error;
        document.getElementById("incorrectSubmission").appendChild(passwordConfirmMistake);

        //putting the error in the console
        console.error(error);
    }

    //Phone Number Validation
    //Must match the password exactly.
    let phoneNumber = document.forms["signUpForm"].elements["phoneNumber"].value;
    let phoneNumberErrorStart = "Your phone number ";
    let phoneNumberErrorMessages = [];
    try {
        if (phoneNumber.trim() == "") phoneNumberErrorMessages.push("is empty"); //checking for non-empty string
        if (!phoneNumberCheck.test(phoneNumber)) phoneNumberErrorMessages.push("is not valid");
        if (phoneNumberErrorMessages.length > 0) throw phoneNumberErrorStart + phoneNumberErrorMessages.join(" + ") + ".";
    }
    catch (error) {
        incorrectFields++;

        //showing the user their mistake
        let phoneNumberMistake = document.createElement("p");
        phoneNumberMistake.textContent = error;
        document.getElementById("incorrectSubmission").appendChild(phoneNumberMistake);

        //putting the error in the console
        console.error(error);
    }

    //Date of Birth Validation
    let dateOfBirthInput = document.forms["signUpForm"].elements["dateOfBirth"].value; //initially storing the input as is to check for an empty string later
    let dateOfBirth = new Date(dateOfBirthInput); //converting the input from the user into a Date object
    const today = new Date(); //creating a variable of today's date
    const ageDifference = today - dateOfBirth;
    console.log(ageDifference);
    const age = Math.floor(ageDifference / (1000 * 60 * 60 * 24 * 365.25)); //properly checks if the user is over 18 even if their birthday hasn't happened in the current year
    //the numbers in this math is milliseconds * seconds * minutes * hours * days in a year since when doing today - dateOfBirth, it gives you the number of milliseconds of difference
    let dateOfBirthErrorStart = "Your age ";
    let dateOfBirthErrorMessages = [];

    try {
        if (dateOfBirthInput.trim() == "") dateOfBirthErrorMessages.push("is empty"); //checking for non-empty string
        if (age < 18 ) dateOfBirthErrorMessages.push("is under 18 years old");
        if (dateOfBirthErrorMessages.length > 0) throw dateOfBirthErrorStart + dateOfBirthErrorMessages.join(" + ") + ".";
    }
    catch (error) {
        incorrectFields++;

        //showing the user their mistake
        let dateOfBirthMistake = document.createElement("p");
        dateOfBirthMistake.textContent = error;
        document.getElementById("incorrectSubmission").appendChild(dateOfBirthMistake);

        //putting the error in the console
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
        incorrectFields++;

        //showing the user their mistake
        let checkboxMistake = document.createElement("p");
        checkboxMistake.textContent = error;
        document.getElementById("incorrectSubmission").appendChild(checkboxMistake);

        //putting the error in the console
        console.error(error);
    }

    //showing the user the number of incorrect fields they had, or telling them their submission was correct
    if (incorrectFields > 0) document.getElementById("incorrectFields").innerText = "You had " + incorrectFields + " incorrect fields, as listed below:";
    else document.getElementById("correctSubmission").innerText = "Your submission was correct. Your account has been created (not really though, there's no database connected)."

}




document.forms["signUpForm"].addEventListener("submit", validateSignUp);