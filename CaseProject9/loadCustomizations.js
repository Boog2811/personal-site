//get the value of the cookie for name
function getCookie(name) {
    // console.log("getting " + name + " from cookie")
    //loads all cookies
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        let [key, value] = cookie.split('=');
        if (key === name) return value;
    }

    //returns an empty string if no cookie was found
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

//apply stored settings on page load
window.onload = function() {

    //otherwise look for cookies
    let bgColor = getCookie('bgColor');
    let textColor = getCookie('textColor');
    let fontSize = getCookie('fontSize');

    //apply the customizations
    applyCustomizations(bgColor, textColor, fontSize);
};