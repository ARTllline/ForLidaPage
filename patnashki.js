const rows = [
    document.getElementById('row1').children,
    document.getElementById('row2').children,
    document.getElementById('row3').children
]
const myBoard = document.getElementById('board')

const board = [
    [1, 2, 3],
    [5, 6, 8],
    [4, 0, 7],
]
const boardComplete = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
]

function drawAll(){
    for (let y = 0 ; y < 3; y++)
        for (let x = 0 ; x < 3; x++){
            rows[y][x].textContent = board[y][x] ? board[y][x] : '';
            rows[y][x].dataset.x = x;
            rows[y][x].dataset.y = y;

            if (board[y][x] === 0){
                rows[y][x].classList.add('empty')
            } else {
                rows[y][x].classList.remove('empty')
            }

        }
}

drawAll();

function getEmptyCellCoordinates(){
    let x = -1
    let y = -1
    for (let row = 0;  row < 3;  row++){
        y = row; // строка всегда соответсвует `y`
        x = board[row].indexOf(0) // x будет -1 если не найдена колонка с 0
        if (x != -1) break // нашли 0
    }
    return {y, x}
}

myBoard.addEventListener('click', (event)=> {
    if (event.target.tagName === 'BUTTON'){
        const from = {y: event.target.dataset.y, x: event.target.dataset.x};
        const to = getEmptyCellCoordinates();
        console.clear();
        console.log(`выбранная ячейка была ${from.y}, ${from.x}`);
        console.log(`пустая ячейка была: ${to.y}, ${to.x}`);
        move(from, to);
    }
}, false)

function validate(from, to) {
    if (Math.abs(from.x - to.x) + Math.abs(from.y - to.y) === 1) {
        return true; // Возвращаем true, если ход возможен
    }
    return false; // Возвращаем false, если ход невозможен
}

function move( from, to){
    if (validate(from, to)){
        const temp = board[from.y][from.x]
        board[from.y][from.x] = board[to.y][to.x]
        board[to.y][to.x] = temp
        // отрисовываем либо все либо только изменения
        drawAll() // в данном пример все (излишне)


        if (isGameFinished()) {
            document.getElementById('questionpNextLevel').style.display = 'block';
        }
    }
}

function isGameFinished() {
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            if (board[y][x] !== boardComplete[y][x]) {
                return false; // Возвращаем false, если найдена несовпадающая ячейка
            }
        }
    }
    return true; // Возвращаем true, если все ячейки совпадают
}


