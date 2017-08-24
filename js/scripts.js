// Backend Code
function Player(name, mark) {
  this.name = name;
  this.mark = mark;
  this.score = 0;
}
Player.prototype.mark = function(){
  return this.mark;
}
// function Space(mark) {
//   this.mark = mark;
// }
// // PASS IN THE player.mark function it will return their mark
// // Space.prototype.mark = function(playerMark){
//   // Mark the space on the board
//   // return playerMark;
// }
function Board() {
  this.boardWin = [7, 56, 73, 84, 448, 146, 273, 292];
  this.board = [1, 2, 4, 8, 16, 32 , 64, 128, 256];
};
function Game(board, player1, player2, spot) {
  this.board = board;
  this.players = [player1, player2];
  this.turnTracker = 1; //Tracks turn using even or odds
};
Game.prototype.turn = function (spot) {
  if (this.turnTracker % 2 != 0){
    player = this.players[0];
  } else {
    player = this.players[1];
  }
  player.score += this.board.board[spot - 1];
  this.turnTracker += 1;

  this.win(player);

  return player.mark;
};
Game.prototype.win = function (currentPlayer) {
  for(var i = 0; i < this.board.boardWin.length; i++){
    if((this.board.boardWin[i] & currentPlayer.score) === this.board.boardWin[i]){
      alert(currentPlayer.mark + " has won!");
    }
  }
};


$(document).ready(function() {
  var player1 = new Player("Daniel", "X");
  var player2 = new Player("Dawson", "O");
  var gameBoard = new Board();
  var theGame = new Game(gameBoard, player1, player2)

  $(".spots").click(function(event) {
    if ($(this).find(".mark-text").text() === ""){
      $(this).find(".mark-text").text(theGame.turn(event.target.id));
    } else {
      alert("That space has already been marked!");
    }
    // $(this).val("player1");
    // console.log($(this).val());

  });
});
