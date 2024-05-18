const Screen = require("./screen");
const Cursor = require("./cursor");
const ComputerPlayer = require("./computer-player");

class TTT {

  constructor(numPlayers) {

    this.numPlayers = numPlayers;
    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);


    // Replace this with real commands
    // Screen.addCommand('t', 'test command (remove)', TTT.testCommand);
    Screen.addCommand('up', 'move cursor up', TTT.upCommand.bind(this));
    Screen.addCommand('down', 'move cursor down', TTT.downCommand.bind(this));
    Screen.addCommand('left', 'move cursor left', TTT.leftCommand.bind(this));
    Screen.addCommand('right', 'move cursor right', TTT.rightCommand.bind(this));
    Screen.addCommand('space', 'set grid position to O or X', TTT.setCommand.bind(this));

    // Initialize the cursor position to the center square
    this.cursor.down();
    this.cursor.right();

    Screen.setMessage(`Current Player Turn: ${this.playerTurn}`);

    Screen.render();
  }

  static upCommand() {
    this.cursor.up();
    Screen.render();
  }

  static downCommand() {
    this.cursor.down();
    Screen.render();
  }

  static leftCommand() {
    this.cursor.left();
    Screen.render();
  }

  static rightCommand() {
    this.cursor.right();
    Screen.render();
  }

  static setCommand() {

    if (this.grid[this.cursor.row][this.cursor.col] === ' ') {
      Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);
      this.grid[this.cursor.row][this.cursor.col] = this.playerTurn;

      if (this.playerTurn === "O") {
        Screen.setTextColor(this.cursor.row, this.cursor.col, "red");
        this.cursor.cursorColor = "white";
        this.cursor.setBackgroundColor();
        this.playerTurn = "X";
      } else {
        Screen.setTextColor(this.cursor.row, this.cursor.col, "cyan");
        this.cursor.cursorColor = "yellow";
        this.cursor.setBackgroundColor();
        this.playerTurn = "O";
      }

      let checkWinVal = TTT.checkWin(this.grid);
      if(checkWinVal) {
        this.cursor.resetBackgroundColor();
        TTT.endGame(checkWinVal);
      }


      // Call CPU to move after player turn if user selected 1 player
      if(this.numPlayers == 1) {
        let cpuMove = ComputerPlayer.getSmartMove(this.grid, this.playerTurn);
        // Screen.setMessage(`Current Player Turn: ${cpuMove}`);
        Screen.setTextColor(cpuMove.row, cpuMove.col, "cyan");
        Screen.setGrid(cpuMove.row, cpuMove.col, this.playerTurn);
        this.grid[cpuMove.row][cpuMove.col] = this.playerTurn;

        Screen.setTextColor(this.cursor.row, this.cursor.col, "red");
        this.cursor.cursorColor = "yellow";
        this.cursor.setBackgroundColor();
        this.playerTurn = "O";

        // check for cpu win
        let checkCpuWin = TTT.checkWin(this.grid);
        if(checkCpuWin) {
          this.cursor.resetBackgroundColor();
          TTT.endGame(checkCpuWin);
        }
      }

      Screen.setMessage(`Current Player Turn: ${this.playerTurn}`);
      Screen.render();
    }
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

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }

    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
