function revealFavoriteGames(event) {
    const favoriteGames = ["Old School Runescape", "Prey (2017)", "Splatoon 2/3", "Kirby Squeak Squad", "Hollow Knight", "Stardew Valley", "Super Mario Odyssey", "Anti-Idle: The Game", "Toontown (any server/variant)"];

    let newGame = document.createElement("p");
    if (favGamesIndex < 9) {
        newGame.textContent = favoriteGames[favGamesIndex];
        favGamesIndex++;
    } else if (favGamesIndex > 15) {
        newGame.textContent = "Okay...you can stop pushing the buttton now"
    } else {
        newGame.textContent = "That's all of them!"
        favGamesIndex++;
    }
    newGame.classList.add("favorite-game");

    document.getElementById("favGames").appendChild(newGame);
}

let favGamesIndex = 0;
document.getElementById("favGamesButton").addEventListener("click", revealFavoriteGames);