var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0; 

function playSoundForButton(chosenColor){
    var soundPath = "assets/sounds/"+ chosenColor+".mp3";
    var audio = new Audio(soundPath); 
    audio.play();   
}
function flashAnimation(chosenColor){
    // Use jQuery to select the button with the same id as the randomChosenColour
    // animate a flash to the button selected 
    $("#"+chosenColor).fadeOut(100).fadeIn(100);
}
function animatePress(chosenColor){
    //we have made a ".pressed" class in css file 
    // Using jQuery to add this pressed class to the button that gets clicked inside animatePress().
    var buttonId = "#"+chosenColor;
    $(buttonId).addClass("pressed");
    //now we need to remove this "pressed" class after a delay of 100 ms.
    setTimeout(function(){
        $(buttonId).removeClass("pressed");
    }, 100);
    
}
function nextSequence(){
    //generate random num from 0 to 3 
    level += 1;
    //change the h1 tag to current level 
    $("h1").text("Level "+level);

    var randomNum = Math.floor((Math.random()*4));
    var randomChosenColour = buttonColours[randomNum];

    //add to gamePattern array
    gamePattern.push(randomChosenColour);

    //play sound for the button selected
    playSoundForButton(randomChosenColour);

    //flash animation 
    flashAnimation(randomChosenColour);

    //reset the user answer
    userClickedPattern = [];
}
function gameOver(){
    //play game over sound
    $("h1").text("Game Over, Press any key to Restart");
    var audio = new Audio("assets/sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    //now remove the game-over class aster 200ms
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    gamePattern = [];
    userClickedPattern = [];
    level = 0; 
}
function checkAnswer(currenLevel){
    if(userClickedPattern[currenLevel] === gamePattern[currenLevel]){
        // return true;
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            //go to next level 
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        gameOver();
    }
}

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    //add to userClickPattern array 
    userClickedPattern.push(userChosenColour);
    //play sound for this button-color
    playSoundForButton(userChosenColour);
    //give animation for this button-color
    flashAnimation(userChosenColour);
    animatePress(userChosenColour); 

    checkAnswer(userClickedPattern.length-1);
});

if(level == 0){
    $(document).keydown(function(event) {
        nextSequence();
    });
}

