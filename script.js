const gameBoard = (()=>{
    let board = ['','','','','','','','',''];
    const getBoard = () => board;
    const getIndex = (index) => board[index];
    const setIndex = (index,marker) => {
        if(index < 9) {
            board[index] = marker;
            displayController.updateBoard();
        }

    } 
    const resetBoard = () => {
        board = ['','','','','','','','',''];
        displayController.updateBoard();
    }
    return {getBoard,setIndex,getIndex,resetBoard};
})();
const displayController = (()=>{
    let turnCount = 0;
    let playState = true;
    const winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    const playArea = document.querySelector('.container');
    const renderField = (board) => {
        for(let i = 0;i<board.length;i++){
            const divs = document.createElement('div');
            divs.setAttribute('id',i);
            divs.textContent = gameBoard.getIndex(i);
            divs.classList.toggle('validSquare');
            divs.addEventListener('click', (e) => {
                if (playState == true){
                    makePlay(i);
                }
            });
            playArea.appendChild(divs);
        }
    }
    const updateBoard = () => {
        for(let i = 0;i<9;i++){
            document.getElementById(i).textContent = gameBoard.getIndex(i);
            if (document.getElementById(i).textContent !== ''){
                document.getElementById(i).classList.add('invalidSquare');
                document.getElementById(i).classList.remove('validSquare');
            }
        } 
    };
    const checkValid = (index) => {
        if(gameBoard.getIndex(index) != ""){
            return false;
        } else {
            return true;
        }
    }
    const makePlay = (index) => {
        if(checkValid(index) != true){
            //alert('invalid');
            return;
        } else {
            if (turnCount == 8 && checkWin(p1.getMarker() == false && checkWin(p2.getMarker()) == false)){
                showEnd('draw');
            }
            if (turnCount % 2 == 0) {
                gameBoard.setIndex(index,p1.getMarker());
                turnCount++;
                if (checkWin(p1.getMarker()) == true){
                    showEnd(p1.getName());
                }
            } else if (turnCount % 2 != 0) {
                gameBoard.setIndex(index,p2.getMarker());
                turnCount++;
                if (checkWin(p2.getMarker()) == true){
                    showEnd(p2.getName());
                }
            }
        }
    }
    const checkWin = (marker) => {
        let board = gameBoard.getBoard();
        for(i=0; i<winningCombos.length;i++){
            let tempArr =[];
            for(j=0;j<3;j++){
                tempArr.push(board[winningCombos[i][j]]);
            }
            if (tempArr.every(x=> x == marker)) {
                return true;
            }
        }
        return false;
    }
    showEnd = (player) => {
        playState = false; 
        const displayContainer = document.querySelector('.winScreen');
        const winDisplay = document.createElement('h2');
        const resetBtn = document.createElement('button');
        if (player == 'draw'){
            winDisplay.textContent = ('its a draw!');
        } else {
            winDisplay.textContent = (`${player} is the winner!`);
        }
        displayContainer.appendChild(winDisplay);
        resetBtn.textContent = 'Play Again';
        resetBtn.setAttribute('id','reset-button')
        displayContainer.appendChild(resetBtn);
        

    }
    gameControl = () => {

    }
    return {renderField,updateBoard,makePlay,gameControl};
})();
const player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    const setName = (input) => name = input;
    return {getName,getMarker,setName};
};
displayController.renderField(gameBoard.getBoard());
let p1 = player('Player 1','x');
let p2 = player('Player 2','0');