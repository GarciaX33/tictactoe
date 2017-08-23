// Business Logic
function Player (initialScore, ) {
  this.score = initialScore;

};
function GameTurn() {
  this.turnScore = 0;
};
GameTurn.prototype.endTurn = function(diceRoll){
  if(diceRoll === 1){
    this.turnScore = 0;
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

GameTurn.prototype.compEasyTurn = function(diceRoll) {
  if(diceRoll === 1){
    this.turnScore = 0;
    i = 2;
  } else {
    this.turnScore += diceRoll;
  }
}


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
    var compTurn = new GameTurn();

    // Initializes Scores
    $("#p1Score").text(player1.score);
    $("#c1Score").text(comp1.score);
    $("#turnScore").text(playerTurn.turnScore);

    $("#roll").click(function() {
      $("#hold").attr('disabled',false);
      var turnRoll = player1.rollDice();
      if(playerTurn.endTurn(turnRoll)){
        $("#hold").attr('disabled',true);
        $("#turnScore").text("You Rolled a 1 :(");
        for(var i=0; i < 2; i++){
          var turnRoll = comp1.rollDice();
          compTurn.compEasyTurn(turnRoll);
        }
        comp1.score += compTurn.turnScore;
        compTurn.turnScore = 0;
        $("#c1Score").text(comp1.score);
        if(comp1.score >= 100){
         alert("You lose....");
        }
      } else {
        playerTurn.updateTurnScore(turnRoll);
        $("#turnScore").text(playerTurn.turnScore);
      }
    });
    $("#hold").click(function() {
      $(this).attr('disabled','disabled');
      player1.score += playerTurn.turnScore;
      playerTurn.turnScore = 0;
      $("#turnScore").text(playerTurn.turnScore);

      // Check for a player win
      if(player1.score >= 100){
        alert("You win!");
      };

      $("#p1Score").text(player1.score);

      // CHECKS TO SEE IF DIFFICULTY IS SET TO EASY OR HARD
      // if(comp1.difficulty === "0"){
      for(var i=0; i < 2; i++){
        var turnRoll = comp1.rollDice();
        compTurn.compEasyTurn(turnRoll);
      }
      comp1.score += compTurn.turnScore;
      compTurn.turnScore = 0;
      $("#c1Score").text(comp1.score);
      // }
      // Check for computer win
      if(comp1.score >= 100){
       alert("You lose....");
      }

    });
  });

});
