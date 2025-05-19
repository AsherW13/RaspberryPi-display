const socket = io("https://raspberrypi-display.onrender.com");
const grid = document.getElementById("grid");

for (let i = 0; i < 64; i++) {
  const pixel = document.createElement("div");
  pixel.classList.add("pixel");
  grid.appendChild(pixel);
}

socket.on("pixel_update", ({ x, y, color }) => {
  const index = y * 8 + x;
  const pixel = document.querySelectorAll(".pixel")[index];
  pixel.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
});

const redSlider = document.getElementById('red');
const greenSlider = document.getElementById('green');
const blueSlider = document.getElementById('blue');

const colorBox = document.getElementById('colorBox');

const redValue = document.getElementById('redValue');
const greenValue = document.getElementById('greenValue');
const blueValue = document.getElementById('blueValue');


function updateColor() {
  const red = redSlider.value;
  const green = greenSlider.value;
  const blue = blueSlider.value;

  colorBox.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

  redValue.textContent = red;
  greenValue.textContent = green;
  blueValue.textContent = blue;

}

redSlider.addEventListener('input', updateColor);
greenSlider.addEventListener('input', updateColor);
blueSlider.addEventListener('input', updateColor);

updateColor();