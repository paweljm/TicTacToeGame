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
    const playArea = document.querySelector('.container');
    const renderField = (board) => {
        for(let i = 0;i<board.length;i++){
            const divs = document.createElement('div');
            divs.setAttribute('id',i);
            divs.textContent = gameBoard.getIndex(i);
            divs.addEventListener('click', (e) => {
                makePlay(i);
            });
            playArea.appendChild(divs);
        }
    }
    const updateBoard = () => {
        for(let i = 0;i<9;i++){
            document.getElementById(i).textContent = gameBoard.getIndex(i);
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
            if (turnCount % 2 == 0) {
                gameBoard.setIndex(index,p1.getMarker());
                turnCount++;
            } else if (turnCount % 2 != 0) {
                gameBoard.setIndex(index,p2.getMarker());
                turnCount++;
            }
        }
    } 
    return {renderField,updateBoard,makePlay};
})();
const player = (name, marker) => {
    let Pname = name;
    const getName = () => Pname;
    const getMarker = () => marker;
    const setName = (input) => name = input;
    return {getName,getMarker};
};
displayController.renderField(gameBoard.getBoard());
let p1 = player('p1','x');
let p2 = player('p2','0');