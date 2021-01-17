var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];
var level=0;
function nextSequence(){
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  playSound(randomChosenColor);
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  level++;
  $("h1").text("Level"+" "+level);
  return randomNumber;
}
// for user clicks
$(".btn").click(function(){
userChosenColor=this.id;
userClickedPattern.push(userChosenColor);
playSound(userChosenColor);
animatePress(userChosenColor);
checkAnswer(userClickedPattern.length-1);
});
// for playing sound
function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
// highlighting buttons
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}
// keypress
$(document).keypress(function(){
  nextSequence();
});
// satrting game
function checkAnswer(currentLevel){
if( userClickedPattern[currentLevel]!==gamePattern[currentLevel]){
  var audio=new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function(){
      $("body").removeClass("game-over");
  },200);
  restart();
  }
else if(currentLevel===gamePattern.length-1) {
  setTimeout(function () {
    nextSequence();
  }, 1000);
  userClickedPattern=[];
}


}
function restart(){
  $("h1").text("Press A Key To Start")
  gamePattern=[];
  userClickedPattern=[];
  level=0;
}
