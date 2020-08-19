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
    let playState = false;
    const playBtn = document.querySelector('#play');
    const winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    const playArea = document.querySelector('.container');
    const renderField = (board) => {
        for(let i = 0;i<board.length;i++){
            const divs = document.createElement('div');
            divs.setAttribute('id',i);
            divs.textContent = gameBoard.getIndex(i);
            divs.classList.add('validSquare');
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
            if (document.getElementById(i).textContent === '') {
                document.getElementById(i).classList.remove('invalidSquare');
                document.getElementById(i).classList.add('validSquare');
            } else if (document.getElementById(i).textContent !== ''){
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
                if (p2.getName() == 'AI') {
                    gameBoard.setIndex(randomValid(),p2.getMarker());
                    turnCount++;
                    if (checkWin(p2.getMarker()) == true){
                        showEnd(p2.getName());
                }
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
    const randomValid = () => {
        let randomNum = Math.floor(Math.random() * 9);
        if (checkValid(randomNum) == false) {
            randomValid();
        }
        return randomNum;
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
    const menuControl = (() =>{
        if (playState == false) {
            playBtn.onclick =()=> {
                playState = true;
                gameBoard.resetBoard();
                playBtn.setAttribute('disabled','disabled');
                turnCount = 0;
            }
            document.querySelector('#PC').onclick=()=>{
                p2.setName(document.querySelector('#p2-name').value = 'AI');
                if (document.querySelector('#p1-name').value !== ''){
                    p1.setName(document.querySelector('#p1-name').value);
                } else {p1.setName('Player 1') }
                document.querySelector('#p1-name').setAttribute('disabled','disabled');
                document.querySelector('#p2-name').setAttribute('disabled','disabled');
                document.querySelector('#PC').setAttribute('disabled','disabled');
                document.querySelector('#twoP').setAttribute('disabled','disabled');
            }
            document.querySelector('#twoP').onclick=()=>{
                if (document.querySelector('#p1-name').value !== ''){
                    p1.setName(document.querySelector('#p1-name').value);
                } else {p1.setName('Player 1') }
                if (document.querySelector('#p2-name').value !== ''){
                    p2.setName(document.querySelector('#p2-name').value);
                } else {p2.setName('Player 2') }
                document.querySelector('#p1-name').setAttribute('disabled','disabled');
                document.querySelector('#p2-name').setAttribute('disabled','disabled');
                document.querySelector('#PC').setAttribute('disabled','disabled');
                document.querySelector('#twoP').setAttribute('disabled','disabled');
            }
        }
    })();
    const showEnd = (player) => {
        playState = false; 
        const winText = document.querySelector('#winText');
        const resetButton = document.querySelector('#reset-button');
        if (player == 'draw'){
            winText.textContent = ('its a draw!');
        } else {
            winText.textContent = (`${player} is the winner!`);
        }
        resetButton.style.display = 'initial';
        resetButton.onclick = () =>{
            gameBoard.resetBoard();
            winText.textContent = '';
            resetButton.style.display = 'none';
            playState = false;
            playBtn.removeAttribute('disabled');
            document.querySelector('#p1-name').removeAttribute('disabled');
            document.querySelector('#p2-name').removeAttribute('disabled');
            document.querySelector('#PC').removeAttribute('disabled');
            document.querySelector('#twoP').removeAttribute('disabled');
        };
    }
    return {renderField,updateBoard,makePlay};
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