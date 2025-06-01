startMenu();
// Game menu and start the game when the button is clicked.
function startMenu() {

    const startGameButton = document.getElementById("startGame");

    startGameButton.addEventListener("click", function () {
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
    const possiblyWinningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const game = createGameBoardContainer();
    const player1Div = game.createPlayerBoard(player1);
    const gameCells = game.createGameCells();      //value not used but maybe useful in future update
    const player2Div = game.createPlayerBoard(player2);


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
            return {  playerScoreDiv };    //return playerScore to update score later
        }
        function createGameCells() {
            const gameBoard = document.createElement("div");
            gameBoard.classList.add("game-board");
            gameContainer.appendChild(gameBoard);

            let player1Turn = true; // Variable to track whose turn it is
            const gameCells = [];

            for (let i = 0; i < 9; i++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.id = i;
                gameCells.push(cell);
                gameBoard.appendChild(cell);

                cell.addEventListener("click", () => { 
                    writeIntoCell(cell);
                    checkWinCondition(cell);
                    checkTieCondition(cell);
                })
            }
                function writeIntoCell(cell) {
                    if (cell.textContent === "") {
                        if (player1Turn === true) {
                            cell.textContent = player1.symbol;
                            player1Turn = false;
                        } else {
                            cell.textContent = player2.symbol;
                            player1Turn = true;
                        }
                    } else {
                        alert("Cell already taken! Choose another cell.");
                    }
                }
                // Check for a win condition
                function checkWinCondition(cell) {
                    possiblyWinningCombinations.forEach(combination => {
                        if (cell.textContent !== "") {
                            const [a, b, c] = combination;
                            if (gameCells[a].textContent === cell.textContent &&
                                gameCells[b].textContent === cell.textContent &&
                                gameCells[c].textContent === cell.textContent) {
                                alert(`${cell.textContent} wins!`);
                                if (cell.textContent === player1.symbol) {
                                    player1.giveScore();
                                    player1Div.playerScoreDiv.textContent = `Score: ${player1.getScore()}`;
                                } else {
                                    player2.giveScore();
                                    player2Div.playerScoreDiv.textContent = `Score: ${player2.getScore()}`;
                                }
                    
                                resetGameBoard();

                            }
                        }
                    }
                    );
                
            }
                function checkTieCondition(cell) {
                    // Check if all cells are filled
                    const allCellsFilled = gameCells.every(cell => cell.textContent !== "");
                    if (allCellsFilled) {
                        alert("It's a tie!");
                        resetGameBoard();
                    }
                }

                function resetGameBoard(){
                    gameCells.forEach(cell => cell.textContent = "");
                }
            return gameCells;  //not used but could be useful for future features
            
        }
        //turn display
    }

}

// Function to create a player object with a name, symbol, and score
function createPlayer(name, symbol) {
    let score = 0;                        //Private variable to hold the score
    const getScore = () => score;
    const giveScore = () => ++score;
    return {
        name, symbol, getScore, giveScore,
    };
}







