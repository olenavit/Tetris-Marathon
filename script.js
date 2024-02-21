const PLAYFIELD_COLLUMMNS = 10;
const PLAYFIELD_ROWS = 20;
const TETROMINO_NAMES = [
    'O', 'J', 'T', 'I', 'S', 'Z'
];

const TETROMINOES = {
    'O': [
        [1, 1],
        [1, 1]
    ],
    'J': [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    'T': [
        [1, 1, 1],
        [0, 1, 0],
        [0, 1, 0]
    ],
    'I': [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ],
    'S': [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    'Z': [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ]

}

function convertPositionToIndex(row, column) {
    return row * PLAYFIELD_COLLUMMNS + column;
}

let playfield;
let tetromino;

function generatePlayField() {
    for (let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLLUMMNS; i++) {
        const div = document.createElement('div');
        document.querySelector('.grid').append(div);
    }

    playfield = new Array(PLAYFIELD_ROWS).fill()
        .map(() => new Array(PLAYFIELD_COLLUMMNS).fill(0))
}

function generateTetromino() {

    const name = TETROMINO_NAMES[Math.floor(Math.random() * TETROMINO_NAMES.length)];
    const matrix = TETROMINOES[name];
    tetromino = {
        name,
        matrix,
        row: 0,
        column: PLAYFIELD_COLLUMMNS / 2 - 1
    }
}

generateTetromino();
generatePlayField();
const cells = document.querySelectorAll('.grid div');


function drawPlayField() {

    for (let row = 0; row < PLAYFIELD_ROWS; row++) {
        for (let column = 0; column < PLAYFIELD_COLLUMMNS; column++) {
            if (playfield[row][column] == 0) continue;
            const name = playfield[row][column];
            const cellIndex = convertPositionToIndex(row, column);
            cells[cellIndex].classList.add(name);
        }
    }
}

function drawTetromino() {
    const name = tetromino.name;
    const tetrominoMatrixSize = tetromino.matrix.length;
    for (let row = 0; row < tetrominoMatrixSize; row++) {
        for (let column = 0; column < tetrominoMatrixSize; column++) {
            if (!tetromino.matrix[row][column]) continue;
            const cellIndex = convertPositionToIndex(tetromino.row + row, tetromino.column + column);
            cells[cellIndex].classList.add(name);
        }
    }
}



function draw() {
    cells.forEach(cell => cell.removeAttribute('class'));
    drawTetromino();
    drawPlayField();
}
draw();

document.addEventListener('keydown', onKeyDown);
function onKeyDown(e) {
    switch (e.key) {
        case 'ArrowDown':
            moveTetrominoDown();
            break;
        case 'ArrowLeft':
            moveTetrominoLeft();
            break;
        case 'ArrowRight':
            moveTetrominoRight();
            break;
    }
    draw();
}

function moveTetrominoDown() {
    tetromino.row += 1;
}
function moveTetrominoLeft() {
    tetromino.column -= 1;
}
function moveTetrominoRight() {
    tetromino.column += 1;
}