function revealFavoriteGames(event) {
    //Requirement 3 [JS Portion]
    //Array holding all of my favorite games
    const favoriteGames = ["Old School Runescape", "Prey (2017)", "Splatoon 2/3", "Kirby Squeak Squad", "Hollow Knight", "Stardew Valley", "Super Mario Odyssey", "Anti-Idle: The Game", "Toontown (any server/variant)"];

    //createElement requirement
    let newGame = document.createElement("p");
    if (favGamesIndex < 9) { //checks to ensure the array does not go out of bounds
        newGame.textContent = favoriteGames[favGamesIndex];
        favGamesIndex++;
    } else if (favGamesIndex > 15) { //funny check for if the user keeps pushing the button
        newGame.textContent = "Okay...you can stop pushing the buttton now"
    } else {
        newGame.textContent = "That's all of them!"
        favGamesIndex++;
    }
    //adds CSS to new element
    newGame.classList.add("favorite-game");

    //appendChild requirement - actually adds the created element to the page
    document.getElementById("favGames").appendChild(newGame);
}

//Requirement 3 [JS Portion]
let favGamesIndex = 0;
document.getElementById("favGamesButton").addEventListener("click", revealFavoriteGames);