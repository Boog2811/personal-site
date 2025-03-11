function addLightbox(event) {
    const previewImage = document.getElementById("preview");
    const overlay = document.getElementById("imageOverlay");
    const overlayImage = document.getElementById("overlayImage");
    const closeOverlay = document.getElementById("closeOverlay")
    // Show overlay when the preview image is clicked
    previewImage.addEventListener("click", function () {
        overlay.style.display = "flex";
    })
    // Hide overlay when the close button is clicked
    closeOverlay.addEventListener("click", function () {
        overlay.style.display = "none";
    })
    // Hide overlay when clicking outside the image
    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            overlay.style.display = "none";
        }
    });
}

//Requirement 1 [JS Portion]
console.log("script loaded");
document.addEventListener("DOMContentLoaded", addLightbox());