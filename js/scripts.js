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
ComputerPlayer.prototype.compHardMode = function(computerTurn, humanPlayer){
  var continueTurn = true;
  var turnCounter = 1;
  while(continueTurn) {
    if(computerTurn.turn(this)){
      $("#turnRoll").text("The computer got a 1!");
      continueTurn = false;
    } else if (this.score + computerTurn.turnScore >= 100){
      continueTurn = false;
    } else if (this.score === 0 && turnCounter >= 4){
      alert("It's my first turn. I am rolling no less than 4 times.");
      continueTurn = false;
    } else if(((humanPlayer.score - this.score) >= 25) && computerTurn.turnScore >= 20) {
      alert("Player ahead by >=25. I am rolling for >=20");
      continueTurn = false;
    } else if(((humanPlayer.score - this.score) >= 10) && computerTurn.turnScore >= 14) {
      alert("Player ahead by >=10. I am rolling for >=14");
      continueTurn = false;
    } else if((this.score >= 90) && computerTurn.turnScore >= 3) {
      alert("My score is above 90. I am rolling for >=3");
      continueTurn = false;
    } else if((this.score >= 75) && computerTurn.turnScore >= 6) {
      alert("My score is above 75. I am rolling for >=6");
      continueTurn = false;
    } else if(((this.score - humanPlayer.score) >= 14) && computerTurn.turnScore >= 9) {
      alert("Im ahead by >=14. I am rolling for >=9");
      continueTurn = false;
    } else if((this.score >=20) && computerTurn.turnScore >= 18) {
      alert("My score is above 20. I am rolling for >=18");
      continueTurn = false;
    }
    turnCounter += 1;
  }
  this.score += (computerTurn.turnScore);
  $("#turnScore").text("Computer Rolled: " + computerTurn.turnScore);
}
/**************************************************************************
The Game Turn Object
**************************************************************************/
function PigGameTurn(score) {
  this.turnScore = 0;
}

PigGameTurn.prototype.turn = function(player) {
  // Roll A Dice
  var turnRoll = this.rollDice();
  // Check for a #1
  if(this.oneCheck(turnRoll)){
    return true;
  };
  // Update the aPTG
  this.updateTurnScore(turnRoll);
  // Check for a win
  this.checkForWin(player);

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
PigGameTurn.prototype.checkForWin = function(player) {
  var winScore = player.score + this.turnScore;
  if((winScore) >= 100){
    if(player.diff){
      alert("I have bested you human. My Final Score: " + winScore);
    } else {
      alert("You win! " + "Final Score: " + winScore);
    }
    location.reload();
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
    // Disables the difficulty selector
    $("#difficulty").attr('disabled',true);
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

    if(comp1.diff === 2) {
      comp1.compHardMode(compTurn,player1);
    }
    $("#c1Score").text(comp1.score);
    compTurn.turnScore = 0;
    /**************************************************************************/
    $("#roll").click(function() {
    /**************************************************************************/
      // Enables the hold button
      $("#hold").attr('disabled',false);

      // Returns true if a "1" is rolled and false if it runs as expected
      if(playerTurn.turn(player1)){
        alert("You got a 1 :(");
        $("#turn").text("Computer's Turn");
        // Disables hold button
        $("#hold").attr('disabled',true);
        if(comp1.diff === 1){
          comp1.compEasyMode(compTurn,player1);
        } else if(comp1.diff === 2) {
          comp1.compHardMode(compTurn,player1);
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
        comp1.compEasyMode(compTurn,player1);
      } else if(comp1.diff === 2) {
        comp1.compHardMode(compTurn,player1);
      }
      // Update scores
      $("#c1Score").text(comp1.score);
      compTurn.turnScore = 0;
    });
      $("#turn").text("Player's Turn");
  });
});
