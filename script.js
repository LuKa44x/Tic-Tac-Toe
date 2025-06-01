startMenu();
// Game menu and start the game when the button is clicked.
// ritornare i due nomi player, cancellare tutto il body, 
function startMenu() {
    console.log("Game started!");
    const startGameButton = document.getElementById("startGame");
    
    
    startGameButton.addEventListener("click", function () {
        console.log("Button clicked! Starting the game...");

        const player1Name = document.getElementById("player1").value;
        const player2Name = document.getElementById("player2").value;
        const player1 = createPlayer(player1Name, "X");
        const player2 = createPlayer(player2Name, "O");
        document.body.innerHTML = "<h1>Game in Progress...</h1>";

        setTimeout(() => {
            document.body.innerHTML = "";
            startGame(player1, player2);
        }, 3000)
    });
}



function startGame(player1, player2) {
    let player1Turn = true; //da vedere se posso non renderla così globale
    createBoards();

    function createBoards() {

        const game = createGameBoardContainer();
        const player1Div = game.createPlayerBoard(player1);
        const gameCells = game.createGameCells();
        const player2Div = game.createPlayerBoard(player2);;
    }

    function createGameBoardContainer() {
        const gameContainer = document.createElement("div");
        gameContainer.classList.add("game-container");
        document.body.appendChild(gameContainer);

        return { createPlayerBoard, createGameCells };


        function createPlayerBoard(player) {
            const playerDiv = document.createElement("div");
            playerDiv.classList.add("player");
            playerDiv.textContent = player.name;
            gameContainer.appendChild(playerDiv);

            const playerScoreDiv = document.createElement("div");
            playerScoreDiv.classList.add("player-score");
            playerScoreDiv.textContent = `Score: ${player.getScore()}`;
            playerDiv.appendChild(playerScoreDiv);
            return {playerDiv, playerScoreDiv};
        }
        function createGameCells() {
            const gameBoard = document.createElement("div");
            gameBoard.classList.add("game-board");
            gameContainer.appendChild(gameBoard);

            const gameCells = [];
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.id = i;
                gameCells.push(cell);
                gameBoard.appendChild(cell);
                cell.addEventListener("click", () => { //da trasformare in funzione
                    if(cell.textContent === "") {
                        if(player1Turn===true) {
                        cell.textContent = player1.symbol;
                        player1Turn=false;
                        } else {
                        cell.textContent = player2.symbol;
                        player1Turn=true;
                        }
                    } else {
                        alert("Cell already taken! Choose another cell.");
                    }
                })
            }
            return gameCells;
        }
    }
    
}





//gameboard in an array inside gameboard object
//player stored in obj and another obj to control the flow of the game

// Function to create a player object with a name, symbol, and score
function createPlayer(name, symbol) {
    let score = 0;                        //Private variable to hold the score
    const getScore = () => score;
    const giveScore = () => ++score;
    return { name, symbol, getScore, giveScore,
        //play: playRound();
    };
}







