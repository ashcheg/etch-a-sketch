const container = document.querySelector(".container");
let mode = 'original';

function getCells() {
    const cells = Array.from(document.querySelectorAll(".cell"));
    return cells;
}


// create grid using flexbox and block
function createGrid(num) {
    container.innerHTML = '';
    // iteration over rows
    for (i=0; i<num; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        // iteration over columns
        for (j=0; j<num; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);
        }
        
        container.appendChild(row);
    }
    startToDraw(getCells())
}

function randomRGB(e) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const rgb = `rgb(${r},${g},${b})`;
    return rgb;
}

function changeMode(e) {
    let cells = getCells();
    let buttonID = e.target.getAttribute('id');

    if (buttonID === 'newGrid') {
        num = prompt('enter number of rows/columns:');
        createGrid(num);
        cells = getCells();
    }

    if (buttonID === 'randomColor') {
        cells.forEach(cell => cell.onmouseenter = function(e) {
            e.target.style.backgroundColor = randomRGB();
            cell.classList.add('randomRGB');
            mode = 'randomRGB';
        });
    }

    if (buttonID === 'translucency') {
        translucency = true;
        cells.forEach(cell => cell.onmouseenter = function(e) {
            // making sure that we haven't changed color and are still using translucency
            if (translucency) {
                if (cell.classList.contains('shade')) {
                    let opacity = cell.style.opacity;
                    cell.style.opacity = (Number(opacity) + 0.1);
                    if (mode === 'randomRGB') {
                        cell.style.backgroundColor = randomRGB();
                    } else {
                        cell.style.backgroundColor = drawColor.value;
                    }
                } else {
                    cell.classList.add('shade');
                    cell.setAttribute('style', 'opacity:0.1');
                    if (mode === 'randomRGB') {
                        cell.style.backgroundColor = randomRGB();
                    } else {
                        cell.style.backgroundColor = drawColor.value;
                    } 
                }
            }
        });
            
    }
}


//change drawing color
function startToDraw(cells) {
    mode = 'original';
    translucency = false;
    cells.forEach(cell => cell.onmouseenter = function(e) {
        cell.style.opacity = 1;
        e.target.style.backgroundColor = drawColor.value;
        e.target.classList.add('drawn');
    });
};

const drawColor = document.getElementById('colorPicker');
const newGridButton = document.querySelector('#newGrid');
const randomRgbButton = document.querySelector('#randomColor');
const buttons = Array.from(document.querySelectorAll('button'));

//make translucency off by default
let translucency = false;

buttons.forEach(button => button.addEventListener('click', changeMode));

//default black and white grid
createGrid(30);

// change drawing color with colorpicker
drawColor.oninput = function() {
    startToDraw(getCells());
}

//change canvas background
const newBckgrnd = document.getElementById('bckgrndColor');
newBckgrnd.oninput = function () {
    translucency = false;
    let cells = getCells();
    cells.forEach(cell => {
        if (!(cell.classList.contains('drawn') || cell.classList.contains('shade')
        || cell.classList.contains('randomRGB'))) {
            cell.style.backgroundColor = newBckgrnd.value;
        };
    });
};
        

/* 
Things to improve:
-- Make color change only when mousedown AND mouseover;
-- add clear canvas button;
-- improve changeMode function;
-- make UI look pretty;
-- make a grid size a slider;
*/
