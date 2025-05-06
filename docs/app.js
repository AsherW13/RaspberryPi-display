const matrixContainer = document.getElementById('matrix');

// const socket = io('http://');

function createMatrix() {
  for (let i = 0; i < 64; i++) {
    const div = document.createElement('div');
    div.classList.add('pixel');
    matrixContainer.appendChild(div);
  }
}

socket.on('matrix_data', (pixels) => {
  const pixelDivs = document.querySelectorAll('.pixel');
  pixels.forEach((rgb, i) => {
    const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    pixelDivs[i].style.backgroundColor = color;
  });
});

socket.emit('get_matrix');
createMatrix();