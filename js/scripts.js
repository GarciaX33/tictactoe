// Backend Code
function Player(name, mark) {
  this.name = name;
  this.mark = mark;
}
Player.prototype.mark = function(){
  return this.mark;
}
function Space(mark) {
  this.mark = mark;
}
// PASS IN THE player.mark function it will return their mark
Space.prototype.mark = function(playerMark){
  // Mark the space on the board
  return playerMark;
}
function Board() {
  this.boardmatrix = [[ 0, 1, 2 ], [ 0, 1, 2 ], [ 0, 1, 2 ]]
}
function Game(board, player1, player2) {
  this.board = board;
  this.player1 = player1;
  this.player2 = player2;
  this.turnTracker = 1; //Tracks turn using even or odds
}


$(document).ready(function() {
  var player1 = new Player("Daniel", "X");
  var player2 = new Player("Dawson", "O");
  var gameBoard = new Board();
  var theGame = new Game(gameBoard, player1, player2)

  $(".spots").click(function() {
    if(theGame.turnTracker % 2 != 0){
      $(this).find(".mark-text").text("X");
    } else {
      $(this).find(".mark-text").text("O");
    }
    // $(this).val("player1");
    // console.log($(this).val());
    theGame.turnTracker += 1;
  });
});
