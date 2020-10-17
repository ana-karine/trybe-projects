// https://github.com/tryber/sd-07-block5-project-pixels-art/tree/Cainan6697-project-pixels-art
let defaultColor = 'black';

const selectColor = document.querySelector('.color-palette');
selectColor.addEventListener('click', function (event) {
  const select = document.querySelector('.selected');
  select.classList.remove('selected');
  event.target.className += ' selected';
  defaultColor = event.target.style.backgroundColor;
});

const selectPixel = document.querySelector('table');
selectPixel.addEventListener('click', function (event) {
  event.target.style.backgroundColor = defaultColor;
});
// ---------------------------------------------------------------------------------------------


// https://www.w3resource.com/javascript-exercises/javascript-math-exercise-40.php
const colors = document.querySelectorAll('.color');
for (let index = 0; index < colors.length; index += 1) {
  const x = Math.floor(Math.random() * 256);
  const y = Math.floor(Math.random() * 256);
  const z = Math.floor(Math.random() * 256);

  if (index === 0) {
    colors[index].style.backgroundColor = 'black';
  } else {
    colors[index].style.backgroundColor = `rgb(${x},${y},${z})`;
  }
}
// ---------------------------------------------------------------------------------------------


// github.com/susanschen/Pixel-Art-Maker/blob/master/index.html
const canvas = document.getElementById('pixel-board');
const size = document.getElementById('board-size');
const pixelBoard = document.getElementById('custom-board');


function clearGrid() {
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }
}

const cel = document.getElementsByClassName('pixel');
document.querySelector('#clear-board').addEventListener('click', function () {
  for (let index = 0; index < cel.length; index += 1) {
    cel[index].style.backgroundColor = 'white';
  }
});

function fillSquare() {
  this.setAttribute('style', `background-color: ${colors.value}`);
}

function makeGrid() {
  for (let r = 0; r < size.value; r += 1) {
    const row = canvas.insertRow(r);
    for (let c = 0; c < size.value; c += 1) {
      const cell = row.insertCell(c);
      cell.addEventListener('click', fillSquare);
      cell.className = 'pixel';
    }
  }
}


pixelBoard.onsubmit = function (event) {
  event.preventDefault();
  clearGrid();
  makeGrid();
};
// ---------------------------------------------------------------------------------------------


window.onload = function () {
  for (let r = 0; r < 5; r += 1) {
    const row = canvas.insertRow(r);
    for (let c = 0; c < 5; c += 1) {
      const cell = row.insertCell(c);
      cell.addEventListener('click', fillSquare);
      cell.className = 'pixel';
    }
  }
};


document.querySelector('#generate-board').addEventListener('click', function () {
  if (size.value === '') {
    alert('Board inválido!');
  } else if (size.value > 50) {
    size.value = 50;
  } else if (size.value < 5) {
    size.value = 5;
  }
});
