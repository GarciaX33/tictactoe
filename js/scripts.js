// Business Logic
function HumanPlayer() {
  this.score = 0;
};

HumanPlayer.prototype.updateScore = function(score){
  this.score += score;
  $("#p1Score").text(this.score);
}

function ComputerPlayer(diff) {
  this.score = 0;
  this.diff = diff; // 0 or 1
};

// "computerTurn" is a PigGameTurn object
ComputerPlayer.prototype.compEasyMode = function(computerTurn){
  for(var i = 0; i < 2; i++){
    if(computerTurn.turn(this.score)){
      alert('The computer got a 1');
      break;
    } else {
      this.score += (computerTurn.turnScore);
      computerTurn.turnScore = 0;
      $("#c1Score").text(this.score);
    }
  }
};
// ComputerPlayer.prototype.compHardMode(computerTurn){
//   // if(diceRoll === 1){
//   //   this.turnScore = 0;
//   //   return false;
//   // } else {
//   //   this.turnScore += diceRoll;
//   //   return true;
//   // }
// }

function PigGameTurn(score) {
  this.turnScore = 0;
}

PigGameTurn.prototype.turn = function(aPlayersScore) {
  $("#turnScore").text(this.turnScore);
  // Roll A Dice
  var turnRoll = this.rollDice();
  // Check for a #1
  if(this.oneCheck(turnRoll)){
    $("#turnRoll").text("You got a 1 :(");
    return true;
  };
  // Update the aPTG
  this.updateTurnScore(turnRoll);
  // Check for a win
  this.checkForWin(aPlayersScore);

  $("#turnScore").text(this.turnScore);
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
};
PigGameTurn.prototype.checkForWin = function(aPlayersScore) {
  if((aPlayersScore + this.turnScore) >= 100){
    // Preform win condition
    $("#start").attr('disabled',false);
    // Disables roll and hold buttons until game is REstarted
    $("#roll").attr('disabled',true);
    $("#hold").attr('disabled',true);

    alert("You win!");
  } else {
    // Otherwise keep playing
  }
};

// Frontend Logic
$(document).ready(function() {
  // Disables roll and hold buttons until game is started
  $("#roll").attr('disabled',true);
  $("#hold").attr('disabled',true);

  // Waits to start a game until the start button is clicked
  $("#start").click(function() {
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
    $("#roll").click(function() {
      // Enables the hold button
      $("#hold").attr('disabled',false);
      if(playerTurn.turn(player1.score)){
        // Disables hold button
        $("#hold").attr('disabled',true);
        alert("Computers Turn bc you got a 1.")
        if(comp1.diff === 1){
          comp1.compEasyMode(compTurn);
        }
      };
    });

    $("#hold").click(function() {
      // The hold button disables itself
      $(this).attr('disabled','disabled');

      // Update the player score and the player's turn score
      player1.updateScore(playerTurn.turnScore);
      playerTurn.turnScore = 0;

      if(comp1.diff === 1){
        alert("Computers Turn bc you pressed hold.")
        comp1.compEasyMode(compTurn);
      }
    });
  });
});
