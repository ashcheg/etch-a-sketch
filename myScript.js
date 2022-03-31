const container = document.querySelector(".container");

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
        });
    }

    if (buttonID === 'translucency') {
        translucency = true;
        cells.forEach(cell => cell.onmouseenter = function(e) {
            // making sure that we haven't changed color and are still using translucency
            if (translucency) {
                if (cell.classList.contains('shade')) {
                    let opacity = cell.style.opacity;
                    console.log(opacity);
                    cell.style.opacity =(Number(opacity) + 0.1);
                    cell.style.backgroundColor = drawColor.value;
                    console.log('increased opacity');
                } else {
                    cell.classList.add('shade');
                    cell.setAttribute('style', 'opacity:0.1');
                    cell.style.backgroundColor = drawColor.value; 
                    console.log('added class shade');
                }
            }
        });
            
    }
}


//change drawing color
function startToDraw(cells) {
    console.log('started to draw');
    translucency = false;
    cells.forEach(cell => cell.onmouseenter = function(e) {
        e.target.style.backgroundColor = drawColor.value;
        e.target.classList.add('drawn');
    });
};

/*
    drawColor.oninput = function () {
        translucency = false;
        cells.forEach(cell => cell.onmouseenter = function(e) {
            e.target.style.backgroundColor = drawColor.value;
            e.target.classList.add('drawn');
        });
        */

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

/*
const drawColor = document.getElementById('colorPicker');
drawColor.oninput = function () {
    translucency = false;
    let cells = getCells();
    cells.forEach(cell => cell.addEventListener('mouseenter', function(e) {
        e.target.style.backgroundColor = drawColor.value;
        e.target.classList.add('drawn');
    }));
};
*/


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
Problems:
-after creating new grid drawing is stopped until new color is chosen: 
add draw and bg color to be the same as in color pickers


-- Button for adjusting transparency;
-- Make color change only when mousedown AND mouseover
*/
