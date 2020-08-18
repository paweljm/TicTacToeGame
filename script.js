const gameBoard = (()=>{
    let board = ['','','','','','','','',''];
    const getBoard = () => board;
    const getIndex = (index) => board[index];
    const setIndex = (index,marker) => {
        if(index < 9) {
            if(getIndex(index) != 'x'||getIndex(index) != '0') {
                board[index] = marker;
                displayController.updateBoard();
            } else {
                alert('invalid');
            }
        }
    } 
    return {getBoard,setIndex,getIndex};
})();
const displayController = (()=>{
    let turn = 'p1';
    const winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    const playArea = document.querySelector('.container');
    const renderField = (board) => {
        for(let i = 0;i<board.length;i++){
            const divs = document.createElement('div');
            divs.textContent = gameBoard.getIndex(i);
            playArea.appendChild(divs);
            divs.addEventListener('click', (e) => {DOM_Play(i);
            console.log(playArea.childNodes[i]);
            }
            );
        }
    }
    const updateBoard = () => {
        for(let i = 1;i<10;i++){
            playArea.childNodes[i].textContent = gameBoard.getIndex(i-1);
        }
        if (checkWin()==true) {
            console.log('win')
        }
    };
    const checkWin = () => {
        let board = gameBoard.getBoard();
        for(i=0; i<winningCombos.length;i++){
            let tempArr =[];
            for(j=0;j<3;j++){
                tempArr.push(board[winningCombos[i][j]]);
            }
            if (tempArr.every(x=> x =='x')) {
                return true;
            } else if (tempArr.every(x=> x =='0')) {
                return true;
            }
        }
        return false;
    }
    const DOM_Play = (input) => {
        if(turn == 'p1') {
            p1.makePlay(input);
            turn = 'p2';
        } else if (turn == 'p2'){
            p2.makePlay(input);
            turn = 'p1';
        }
    }
    const resetBoard = () => {
        for(let i=0;i<9;i++){
            gameBoard.setIndex(i,'');
        }
    }
    return {renderField,updateBoard,checkWin,resetBoard};
})();
const player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    const makePlay = (input) => {
        if (gameBoard.getIndex(input) == ''){
            gameBoard.setIndex(input, marker);
        } else {
            console.log('invalid')
        }
    }
    return {getName,getMarker,makePlay};
};
displayController.renderField(gameBoard.getBoard());

let p1 = player('p1','x');
let p2 = player('p2','0');