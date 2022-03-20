const container = document.querySelector(".container");

function createGrid(num) {
    for (i=0; i<(num*num); i++) {
        const div = document.createElement('div');
        div.classList.add('box');
        div.textContent = `box ${i+1}`;
        container.appendChild(div);
    }
}

createGrid(3);
