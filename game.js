var buttonColors = ["red", "blue", "green", "yellow"]; // Array of button colors
var userClickedPattern = []; // Array to store the user's clicked pattern
var gamePattern = []; // Array to store the game pattern
var level = 0; // Variable to keep track of the game level
var started = false; // Variable to check if the game has started

$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});
$(".btn").click(function() { // Add a click event listener to the buttons   
    var userChosenColor = $(this).attr("id"); // Get the ID of the clicked button
    userClickedPattern.push(userChosenColor); // Add the clicked color to the user's pattern
    playSound(userChosenColor); // Play the sound associated with the clicked color
    
    animatePress(userChosenColor); // Animate the button press
    checkAnswer(userClickedPattern.length - 1); // Check the user's answer by passing the last index of the clicked pattern
});

function nextSequence(){
    userClickedPattern = []; // Reset the user's clicked pattern for the new level
    level++; // Increment the level variable
    $("#level-title").text("Level " + level); // Update the level title on the page 

    var randomNumber = Math.floor(Math.random() * 4) ; 
var randomChosenColor = buttonColors[randomNumber]; // Randomly choose a color from the array
gamePattern.push(randomChosenColor); // Add the chosen color to the game pattern

playSound(randomChosenColor); // Play the sound associated with the chosen color
$("#" + randomChosenColor).fadeOut(100).fadeIn(100);
}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3"); // Create a new audio object for the clicked color
    audio.play(); // Play the sound associated with the clicked color

} // Play the sound associated with the clicked color
// 

function animatePress(currentColor) { // Function to animate the button press

    $("#" + currentColor).addClass("pressed"); // Add the "pressed" class to the clicked button
    setTimeout(function() { // Set a timeout to remove the "pressed" class after 100ms
        $("#" + currentColor).removeClass("pressed"); // Remove the "pressed" class from the clicked button
    }, 100); // Delay of 100ms before removing the class
}
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}