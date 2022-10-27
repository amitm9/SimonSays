var buttonColors = new Array("red", "blue", "yellow", "green");
var gamePattern = new Array();
var userClickedPattern = new Array();
var level = 0;

$(document).keydown(function() {
  if (level == 0) {
    nextSequence();
  }
});

function startOver(){
  level=0;
  gamePattern= [];
  userClickedPattern = [];
}
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {

    if (gamePattern.length == userClickedPattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    var soundEffect = new Audio("sounds/wrong.mp3"); //sound effect gameover
    soundEffect.play();
    $("body").addClass("game-over")
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor); //push new value to player

  playSound(userChosenColor);

  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = (Math.random() * 4);
  randomNumber = Math.floor(randomNumber);

  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor); //push new value to array

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100); //blink effect
  playSound(randomChosenColor);

}

function playSound(name) {
  var soundEffect = new Audio("sounds/" + name + ".mp3"); //sound effect
  soundEffect.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
