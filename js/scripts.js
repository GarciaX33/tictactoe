// Business Logic CODE TO REFRESH: location.reload();
/*************************************************************************
The Human Player Object
**************************************************************************/
function HumanPlayer() {
  this.score = 0;
};

HumanPlayer.prototype.updateScore = function(score){
  this.score += score;
  $("#p1Score").text(this.score);
}
/*************************************************************************
The Computer Player Object
**************************************************************************/
function ComputerPlayer(diff) {
  this.score = 0;
  this.diff = diff; // 0 or 1
};

// "computerTurn" is a PigGameTurn object
ComputerPlayer.prototype.compEasyMode = function(computerTurn){
  for(var i = 0; i < 2; i++){
    if(computerTurn.turn(this.score)){
      $("#turnRoll").text("The computer got a 1!");
      break;
    }
  }

  this.score += (computerTurn.turnScore);
  $("#turnScore").text("Computer Rolled: " + computerTurn.turnScore);
};
ComputerPlayer.prototype.compHardMode = function(computerTurn){
  // alert("Hard Mode");
  // alert("turn score initial: " + computerTurn.turnScore);
  // var exit = false;
  // computerTurn.turnScore = 0;
  // while(computerTurn.turnScore <= 16 || exit === false){
  //   alert("turn score: " + computerTurn.turnScore);
  //   if(computerTurn.turn(this.score)){
  //     alert('The computer got a 1');
  //     computerTurn.turnScore = 0;
  //     exit = true;
  //   }
  // };
  // this.score += (computerTurn.turnScore);
  // $("#c1Score").text(this.score);
}
/**************************************************************************
The Game Turn Object
**************************************************************************/
function PigGameTurn(score) {
  this.turnScore = 0;
}

PigGameTurn.prototype.turn = function(aPlayersScore) {
  // Roll A Dice
  var turnRoll = this.rollDice();
  // Check for a #1
  if(this.oneCheck(turnRoll)){
    return true;
  };
  // Update the aPTG
  this.updateTurnScore(turnRoll);
  // Check for a win
  this.checkForWin(aPlayersScore);

  return false;
}

PigGameTurn.prototype.rollDice = function() {
  return Math.floor((Math.random() * 6) + 1);
};
PigGameTurn.prototype.oneCheck = function(roll) {
  if(roll === 1){
    // Turn is over and you get no points
    this.turnScore = 0;
    return true;
  }
  return false;
};
PigGameTurn.prototype.updateTurnScore = function(roll) {
  this.turnScore += roll;
  $("#turnRoll").text(roll);
  $("#turnScore").text(this.turnScore);
};
PigGameTurn.prototype.checkForWin = function(aPlayersScore) {
  if((aPlayersScore + this.turnScore) >= 100){
    // Preform win condition
    $("#start").attr('disabled',false);
    // Disables roll and hold buttons until game is REstarted
    $("#roll").attr('disabled',true);
    $("#hold").attr('disabled',true);

    alert("You win!");
  }
  // Otherwise keep playing
};

// Frontend Logic
$(document).ready(function() {
  // Disables roll and hold buttons until game is started
  $("#roll").attr('disabled',true);
  $("#hold").attr('disabled',true);

  // Waits to start a game until the start button is clicked
  /**************************************************************************/
  $("#start").click(function() {
  /**************************************************************************/
    $("#turn").text("Player's Turn");
    // Disables the start button once the game has already been "started"
    $(this).attr('disabled',true);

    // Enables the roll button so that the player may "roll"
    $("#roll").attr('disabled', false);

    // Figure out what difficulty the player wants to play at
    var compDifficulty = parseInt($("#difficulty option:selected").val());
    var comp1 = new ComputerPlayer(compDifficulty);
    var player1 = new HumanPlayer();

    // Initializes Scores
    $("#p1Score").text(player1.score);
    $("#c1Score").text(comp1.score);
    $("#turnRoll").text("0");
    $("#turnScore").text("0");

    var playerTurn = new PigGameTurn();
    var compTurn = new PigGameTurn();


    /**************************************************************************/
    $("#roll").click(function() {
    /**************************************************************************/
      // Enables the hold button
      $("#hold").attr('disabled',false);

      // Returns true if a "1" is rolled and false if it runs as expected
      if(playerTurn.turn(player1.score)){
        alert("You got a 1 :(");
        $("#turn").text("Computer's Turn");
        // Disables hold button
        $("#hold").attr('disabled',true);
        if(comp1.diff === 1){
          comp1.compEasyMode(compTurn);
        } else if(comp.diff === 2) {
          comp1.compHardMode(compTurn);
        }
        $("#c1Score").text(comp1.score);
        compTurn.turnScore = 0;
      };
    });
    /**************************************************************************/
    $("#hold").click(function() {
    /**************************************************************************/
      $("#turn").text("Computer's Turn");
      // The hold button disables itself
      $(this).attr('disabled','disabled');

      // Update the player score and the player's turn score
      player1.updateScore(playerTurn.turnScore);
      playerTurn.turnScore = 0;

      if(comp1.diff === 1){
        comp1.compEasyMode(compTurn);
      } else if(comp.diff === 2) {
        comp1.compHardMode(compTurn);
      }
      // Update scores
      $("#c1Score").text(comp1.score);
      compTurn.turnScore = 0;
    });
      $("#turn").text("Player's Turn");
  });
});
