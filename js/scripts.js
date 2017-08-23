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
  $("#roll").attr('disabled',true);
  $("#hold").attr('disabled',true);
  $("#start").click(function() {
    $(this).attr('disabled',true);
    $("#roll").attr('disabled', false);
    var player1 = new Player(0);
    var comp1 = new Player(0);
    var playerTurn = new GameTurn();

    // Initializes Scores
    $("#p1Score").text(player1.score);
    $("#c1Score").text(comp1.score);
    $("#turnScore").text(playerTurn.turnScore);

    $("#roll").click(function() {
      $("#hold").attr('disabled',false);
      var turnRoll = player1.rollDice();
      if(playerTurn.endTurn(turnRoll)){
        $("#turnScore").text("You Rolled a 1 :(");
      } else {
        playerTurn.updateTurnScore(turnRoll);
        $("#turnScore").text(playerTurn.turnScore);
      }
    });
    $("#hold").click(function() {
      $(this).attr('disabled','disabled');
      player1.score += playerTurn.turnScore;

      // Check for a player win
      if(player1.score >= 100){
        alert("You win!");
      };

      $("#p1Score").text(player1.score);
      for(var i=0; i < 2; i++){
        var computerRoll = comp1.rollDice();
        if(computerRoll === 1){
          comp1.score += 0;
          i = 2;
        } else {
          comp1.score += computerRoll;
        }
      }
      // Check for computer win
      if(comp1.score >= 100){
       alert("You lose....");
      }
      $("#c1Score").text(comp1.score);
    });
  });

});
