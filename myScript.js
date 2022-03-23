const container = document.querySelector(".container");



function createGrid(num) {
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
}

createGrid(16);

const cells = Array.from(document.querySelectorAll(".cell"));
cells.forEach(cell => cell.addEventListener('mouseenter', function(event) {
    event.target.classList.add('newColor');
}))