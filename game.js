const readline = require("readline");
const TTT = require("./class/ttt");

const version = "0.2.0";

let ttt;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function initialize() {
    console.clear();
    console.log("\n--------------------------------------------------");
    console.log("                Tic-Tac-Toe " + version);
    console.log("--------------------------------------------------\n");
    queryNumPlayers();
}


function queryNumPlayers() {
    rl.question("Please choose the number of players (1 or 2): ", numPlayers => {
        if(isNaN(numPlayers) || numPlayers < 1 || numPlayers > 2) {
            initialize();
        } else {
            ttt = new TTT(numPlayers);
        }

    });

}

initialize();


// ttt = new TTT(1);
