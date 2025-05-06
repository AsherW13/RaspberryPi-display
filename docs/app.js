// const matrixContainer = document.getElementById('matrix');

// // const socket = io('http://');

// function createMatrix() {
//   for (let i = 0; i < 64; i++) {
//     const div = document.createElement('div');
//     div.classList.add('pixel');
//     matrixContainer.appendChild(div);
//   }
// }

// socket.on('matrix_data', (pixels) => {
//   const pixelDivs = document.querySelectorAll('.pixel');
//   pixels.forEach((rgb, i) => {
//     const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
//     pixelDivs[i].style.backgroundColor = color;
//   });
// });

// socket.emit('get_matrix');
// createMatrix();

const grid = document.getElementById("grid");

// Create 8x8 grid
for (let i = 0; i < 64; i++) {
  const pixel = document.createElement("div");
  pixel.classList.add("pixel");
  grid.appendChild(pixel);
}

// Example pattern — light up a smiley face
const smiley = [
  1, 1, 0, 0, 0, 0, 1, 1,
  1, 1, 0, 0, 0, 0, 1, 1,
  0, 0, 1, 0, 0, 1, 0, 0,
  0, 0, 1, 0, 0, 1, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  1, 0, 0, 0, 0, 0, 0, 1,
  0, 1, 0, 0, 0, 0, 1, 0,
  0, 0, 1, 1, 1, 1, 0, 0
];

document.querySelectorAll(".pixel").forEach((pixel, i) => {
  if (smiley[i]) pixel.classList.add("active");
});