//gets the parameters from the URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    // console.log("getting params from url");
    return {
        bgColor: params.get('bgColor') || '',
        textColor: params.get('textColor') || '',
        fontSize: params.get('fontSize') || ''
    };
}

//creates cookies with a 7 day expiration date
function createCookie(name, value) {
    let expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 7 * 24 * 60 * 60 * 1000); //sets the expiration time to 7 days from creation
    document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
}

//get the value of the cookie for name
function getCookie(name) {
    // console.log("getting " + name + " from cookie")
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        let [key, value] = cookie.split('=');
        if (key === name) return value;
    }
    return '';
}

//applies the customization settings
function applyCustomizations(bgColor, textColor, fontSize) {
    if (bgColor) document.body.style.backgroundColor = bgColor;
    if (textColor) document.body.style.color = textColor;
    if (fontSize) document.body.style.fontSize = fontSize + 'px';

    //displays the user's current settings
    document.getElementById('user-preferences').textContent = 
        `Current Settings: Background = ${bgColor || 'default'}, Text = ${textColor || 'default'}, Font Size = ${fontSize || 'default'}px`;
}

//handles the form input
document.getElementById('customization-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values from form inputs
    const bgColor = document.getElementById('bg-color').value;
    const textColor = document.getElementById('text-color').value;
    const fontSize = document.getElementById('font-size').value;

    // Store values in cookies
    createCookie('bgColor', bgColor);
    createCookie('textColor', textColor);
    createCookie('fontSize', fontSize);

    // Update the URL with query parameters
    const queryParams = `?bgColor=${encodeURIComponent(bgColor)}&textColor=${encodeURIComponent(textColor)}&fontSize=${encodeURIComponent(fontSize)}`;
    window.location.href = window.location.pathname + queryParams;
});

//apply stored settings on page load
window.onload = function() {
    //check for new settings in the URL
    let { bgColor, textColor, fontSize } = getQueryParams();

    //otherwise look for cookies
    if (!bgColor) bgColor = getCookie('bgColor');
    if (!textColor) textColor = getCookie('textColor');
    if (!fontSize) fontSize = getCookie('fontSize');

    //apply the customizations
    applyCustomizations(bgColor, textColor, fontSize);

    //load the set customizations into the editor
    document.getElementById('bg-color').value = bgColor || '#ffffff';
    document.getElementById('text-color').value = textColor || '#000000';
    document.getElementById('font-size').value = fontSize || 18;
};