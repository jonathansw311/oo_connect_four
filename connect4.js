/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
class Game{
constructor(h,w,plyr1){
  this.HEIGHT = h;
  this.WIDTH= w;
  this.currPlayer=plyr1 ;
  this.board = [];
  this.gameOver = false;
  
}
makeBoard() {
  
  for (let y = 0; y < this.HEIGHT; y++) {
    this.board.push(Array.from({ length: this.WIDTH }));
  }
}

makeHtmlBoard() {
  const board = document.getElementById('board');
  
  // make column tops (clickable area for adding a piece to that column)
  const top = document.createElement('tr');
  top.setAttribute('id', 'column-top');
  top.addEventListener('click', this.handleClick.bind(this));

  for (let x = 0; x < this.WIDTH; x++) {
    const headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    top.append(headCell);
  }

  board.append(top);

  // make main part of board
  for (let y = 0; y < this.HEIGHT; y++) {
    const row = document.createElement('tr');

    for (let x = 0; x < this.WIDTH; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }

    board.append(row);
  }
}

findSpotForCol(x) {
  for (let y = this.HEIGHT - 1; y >= 0; y--) {
    if (!this.board[y][x]) {
      return y;
    }
  }
  return null;
}

placeInTable(y, x) {

  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.style.backgroundColor=this.currPlayer.color;//piece is added with the color the player has selected.  currPlayer is now an object
  piece.style.top = -50 * (y + 2);
  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}
endGame(msg) {
  alert(msg);
this.gameOver = true;
}
/** endGame: announce game end */
handleClick(evt) {
  // get x from ID of clicked cell
  if(this.gameOver === true){
    alert('game is over, please reset game!')
    return;//this return pauses the game and is no longer able to be played
  }
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  console.log(this)
  const y = this.findSpotForCol(x);
  
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  this.board[y][x] = this.currPlayer;
  this.placeInTable(y, x);
  
  // check for win
  if (this.checkForWin()) {
    return this.endGame(`The ${this.currPlayer.color} player won!`);
  }
  
  // check for tie
  if (this.board.every(row => row.every(cell => cell))) {
    return this.endGame('Tie!');
  }
    
  // switch players
  this.currPlayer = this.currPlayer === plyr1 ? plyr2 : plyr1;
}
checkForWin(){
    

  for (let y = 0; y < this.HEIGHT; y++) {
    for (let x = 0; x < this.WIDTH; x++) {
      // get "check list" of 4 cells (starting here) for each of the different
      // ways to win
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // find winner (only checking each win-possibility as needed)
      if (this._win(horiz) || this._win(vert) || this._win(diagDR) || this._win(diagDL)) {
        return true;
      }
    }
  }
}
_win(cells){
  
  // Check four cells to see if they're all color of current player
  //  - cells: list of four (y, x) cells
  //  - returns true if all are legal coordinates & all match currPlayer
  console.log(this);
  return cells.every(
   
    ([y, x]) =>
      y >= 0 &&
      y < this.HEIGHT &&
      x >= 0 &&
      x < this.WIDTH &&
      this.board[y][x] === this.currPlayer
      
  );
}

}
const startGame = document.querySelector('#start')//for the start / reset button
startGame.addEventListener('click', function(){
 if(startGame.innerHTML==='Reset')
{
  location.reload();
}
if (startGame.innerHTML === 'Start Game!')
{
  getPlayerColors();
  build();
  
  startGame.innerHTML = 'Reset';
}  
});

function getPlayerColors(){
const p1Colors = document.getElementById('p1Color').value;
const p2Colors = document.getElementById('p2Color').value;
createPlayer(p1Colors, p2Colors);//calls for creatation  of two player objects with the color they selected
}


class Player{//player class
  constructor(c,n){
    this.color= c;
    this.playerNumber =n;//player number was added for future use
  }
  
}
function createPlayer(color, color2){//creates the two players

plyr1 = new Player(color,1);
plyr2 = new Player(color2,2) }

function build(){//buids new game
  newGame = new Game(6,7,plyr1);
  newGame.makeBoard();
  newGame.makeHtmlBoard();
}