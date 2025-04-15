//Part 1 of Requirements
let selections = [];


function addSelections(event) {
    event.preventDefault();
    selections = []; //clear any previously displayed selections
    const checkboxes = document.querySelectorAll('#selectionForm input[type="checkbox"]:checked');

    checkboxes.forEach(checkbox => {
        //adds the value to the array
        selections.push(checkbox.value);
    });

    displaySelections();
}

function displaySelections() {
    const list = document.getElementById('selectedItems');
    list.innerHTML = ''; //clear any previously displayed selections

    selections.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => removeSelection(index);

        li.appendChild(removeBtn);
        list.appendChild(li);
    });
}

function removeSelection(index) {
    selections.splice(index, 1); //removes the item that had remove clicked on it
    displaySelections();
}

//Part 2 of Requirements
function validatePhoneNumber(event) {
    event.preventDefault();

    const phoneInput = document.forms["phoneValidation"].elements["phone"].value.trim();
    const message = document.getElementById("phoneMessage");
    const phoneRegex = /^(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/; //improved phone number regex to allow for many formats

    if (phoneRegex.test(phoneInput)) {
        message.textContent = "Valid phone number!";
    } else {
        message.textContent = "Invalid phone number.";
    }
}

//Part 3 of Requirements
function displayFileContents(event) {
    event.preventDefault();
    const fileInput = document.getElementById("fileInput");
    const fileContents = document.getElementById("fileContents");

    if (fileInput.files.length === 0) { //if no files are selected
        fileContents.textContent = "Please select a file.";
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        fileContents.textContent = event.target.result; //displays the content of the files
    };

    reader.onerror = function () {
        fileContents.textContent = "Error reading file.";
    };

    reader.readAsText(file); //reads the file as text

}

//function calls
document.getElementById("addSelectionButton").addEventListener("click", addSelections);
document.forms["phoneValidation"].addEventListener("submit", validatePhoneNumber);
document.forms["fileUploadForm"].addEventListener("submit", displayFileContents);