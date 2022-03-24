const container = document.querySelector(".container");



function createGrid(e) {
    num = prompt('enter number of rows/columns:');
    // iteration over rows
    for (i=0; i<num; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        // iteration over columns
        for (j=0; j<num; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            // cell.textContent = `col${j+1}-row${i+1}`; 
            row.appendChild(cell);
        }
        
        container.appendChild(row);
    }
    const cells = Array.from(document.querySelectorAll(".cell"));
    cells.forEach(cell => cell.addEventListener('mouseenter', function(event) {
        event.target.classList.add('newColor');
    }))
}

function randomRGB(e) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const rgb = `rgb(${r},${g},${b})`;
    const cells = Array.from(document.querySelectorAll(".cell"));
    cells.forEach(cell => cell.addEventListener('mouseenter', function(e) {
        e.target.style.backgroundColor = rgb;
    }))
}

function changeMode(e) {
    let buttonID = e.target.getAttribute('id');
    if (buttonID === 'newGrid') {
        createGrid();
    }

    if (buttonID === 'randomColor') {
        randomRGB();
    }
}

const newGridButton = document.querySelector('#newGrid');
const randomRgbButton = document.querySelector('#randomColor');
const buttons = Array.from(document.querySelectorAll('button'));

buttons.forEach(button => button.addEventListener('click', changeMode));

// newGridButton.addEventListener('click', createGrid);
// randomRgbButton.addEventListener('click', randomRGB);

/* Make modes: default and rainbow
when button pressed => change mode function
inside change mode function => calls to functions default and rainbow
Function generating random rgb is separate and called for each cell

Later add :
1. button for choosing particular color;
2. btton for adjusting translucency;

Later: make color change only when mousedown AND mouseover
*/
