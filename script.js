var board;
const human_player ='O';
const computer_player = 'X';
const winCombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell');

startGame();

function startGame(){
  document.querySelector(".endgame").style.display = "none";
  board = Array.from(Array(9).keys());
  console.log(board);
  for(var i=0;i<cells.length;i++){
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
  }
}

function turnClick(square){
  if(typeof board[square.target.id] == 'number') {
    turn(square.target.id, human_player)
    if (!checkTie()) turn(bestSpot(), computer_player);
	}
  }

  function turn(squareId, player){
    board[squareId] = player;
    document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(board, player)
	if (gameWon) gameOver(gameWon)
  }

  function checkWin(board,player){
    let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombinations.entries()) {
  //  console.log(index,win)
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
  }

  function gameOver(gameWon) {
    for (let index of winCombinations[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == human_player ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == human_player ? "You win!" : "You lose.");
  }

  function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
	return board.filter(s => typeof s == 'number');
}

function bestSpot() {
	return emptySquares()[0];
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!")
		return true;
	}
	return false;
}
