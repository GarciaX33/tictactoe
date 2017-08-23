// Business Logic
function Player (initialScore, ) {
  this.score = initialScore;

};
function GameTurn() {
  this.turnScore = 0;
  this.continueTurn = true;
};
GameTurn.prototype.endTurn = function(diceRoll){
  if(diceRoll === 1){
    this.turnScore = 0;
    this.continueTurn = false;
    return true;
  };
  return false;
};
GameTurn.prototype.updateTurnScore = function(diceRoll) {
  this.turnScore += diceRoll;
};


Player.prototype.rollDice = function() {
  return Math.floor((Math.random() * 6) + 1);
};


// Jquery Logic
$(document).ready(function() {
  $("#start").click(function() {
    var player1 = new Player(0);
    var comp1 = new Player(0);
    $("#p1Score").text(player1.score);
    $("#c1Score").text(comp1.score);
    var playerTurn = new GameTurn();
    $("#turnScore").text(playerTurn.turnScore);
    $("#roll").click(function() {
      var turnRoll = player1.rollDice();
      alert(turnRoll);
      if(playerTurn.endTurn(turnRoll)){
        $("#turnScore").text("You Rolled a 1 :(");
        //$("#turnScore").text(playerTurn.turnScore);
      } else {
        playerTurn.updateTurnScore(turnRoll);
        $("#turnScore").text(playerTurn.turnScore);
      }
    });
    $("#hold").click(function() {
      player1.score += playerTurn.turnScore;
      $("#p1Score").text(player1.score);
    });

  });

});
