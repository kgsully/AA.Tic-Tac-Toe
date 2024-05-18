const TTT = require("./ttt");

class ComputerPlayer {
  constructor(validMoves) {
    this.validMoves = [];
  }

  static getValidMoves(grid) {
    // Your code here
    let validMoves = [];
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === ' ') {
          validMoves.push({row: i, col: j});
        }
      }
    }
    this.validMoves = validMoves;
    return this.validMoves;
  }

  static randomMove(grid) {
    // Your code here
    this.getValidMoves(grid); // updates the this.validMove object array

    let randMove = Math.floor(Math.random() * (Math.floor(this.validMoves.length - 1) - 0 + 1) + 0); // 0 is 1st index of valid moves array
    return this.validMoves[randMove];
  }

  static checkWin(grid) {
    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended - This is accomplished by a default return value of false

    // Check horizontal wins:
    for(let i = 0; i < grid.length; i++) {
      let testVal = grid[i][0];
      if(grid[i][0] !== ' ' && grid[i][1] === testVal && grid[i][2] === testVal) {
        return testVal;
      }
    }

    // Check vertical wins:
    for(let i = 0; i < grid.length; i++) {
      let testVal = grid[0][i];
      if(grid[0][i] !== ' ' && grid[1][i] === testVal && grid[2][i] === testVal) {
        return testVal;
      }
    }

    // Check diagonal wins:
    let diagTestVal = grid[1][1];
    if (diagTestVal !== ' ') {
      if(diagTestVal === grid[0][0] && diagTestVal === grid[2][2]) {
        return diagTestVal;
      } else if (diagTestVal === grid[0][2] && diagTestVal === grid[2][0]) {
        return diagTestVal;
      }
    }

    // Check for Tie:
    let tieCheck = grid.map((el) => el.includes(' '));
    if(!tieCheck.includes(true)) {
      return 'T';
    }

    return false;
  }

  static getWinningMoves(grid, symbol) {
    // Your code here
    // check for horizontal winning moves:
    let testGrid = grid;
    this.getValidMoves(grid); // updates the this.validMove object array
    let winningMoves = [];
    for (let i = 0; i < this.validMoves.length; i++) {
      testGrid[this.validMoves[i].row][this.validMoves[i].col] = symbol;
      if(this.checkWin(testGrid) === symbol) {
        testGrid[this.validMoves[i].row][this.validMoves[i].col] = ' ';
        winningMoves.push(this.validMoves[i]);
      } else {
        testGrid[this.validMoves[i].row][this.validMoves[i].col] = ' ';
      }
    }
    return winningMoves;
  }

  static getSmartMove(grid, symbol) {
    // Your code here
    // check for winning moves and prioritize return of a winning move
    let winningMoves = this.getWinningMoves(grid, symbol)
    if(winningMoves.length > 0) {
      return winningMoves[0];
    }

    // check for blocking moves, return move to block if found
    let testSymbol = 'O';
    if(symbol === 'O') {
      testSymbol = 'X';
    }
    let opponentWinningMoves = this.getWinningMoves(grid, testSymbol);
    if(opponentWinningMoves.length > 0) {
      return opponentWinningMoves[0];
    }

    return this.randomMove(grid);

  }
}

let grid = [[' ',' ',' '],
            ['X',' ',' '],
            ['O',' ',' ']]

let smartMove = ComputerPlayer.getSmartMove(grid, 'X');
console.log(smartMove);


module.exports = ComputerPlayer;
