const gameBoard = (()=>{
    let board = ['0','1','2','3','4','5','6','7','8'];
    const getBoard = () => board;
    const getIndex = (index) => board[index];
    const setIndex = (index,marker) => {
        if(index < 9) {
            if(getIndex(index) != 'x'||getIndex(index) != '0') {
                board[index] = marker;
                displayController.updateBoard();
            }
        }

    } 
    return {getBoard,setIndex,getIndex};
})();
const displayController = (()=>{
    const playArea = document.querySelector('.container');
    const renderField = (board) => {
        for(let i = 0;i<board.length;i++){
            const divs = document.createElement('div');
            divs.textContent = gameBoard.getIndex(i);
            playArea.appendChild(divs);
        }
    }
    const updateBoard = () => {
        for(let i = 1;i<10;i++){
            playArea.childNodes[i].textContent = gameBoard.getIndex(i-1);
        } 
    };
    return {renderField,updateBoard};
})();
const player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    const makePlay = () => {
        let input = prompt('play:')
        gameBoard.setIndex(input, marker);
    }
    return {getName,getMarker,makePlay};
};
displayController.renderField(gameBoard.getBoard());
let p1 = player('p1','x');
let p2 = player('p2','0');