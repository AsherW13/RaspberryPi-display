const socket = io();
const grid = document.getElementById("grid");
const clearButton = document.getElementById("clearBoard");

for (let i = 0; i < 64; i++) {
  const pixel = document.createElement("div");
  pixel.classList.add("pixel");

  const x = i % 8;
  const y = Math.floor(i / 8);

  pixel.addEventListener("click", () => {
    const red = parseInt(redSlider.value);
    const green = parseInt(greenSlider.value);
    const blue = parseInt(blueSlider.value);
    const color = [red, green, blue];

    pixel.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

    socket.emit("pixel_update", {
      x, y, color
    });
  });

  pixel.addEventListener("dblclick", () => {
    pixel.style.backgroundColor = "white";
    socket.emit("pixel_update", {
      x, y, color: [255, 255, 255]
    });
  });
  grid.appendChild(pixel);
}

clearButton.addEventListener("click", async () => {
  const pixels = document.querySelectorAll(".pixel");

  for (let i = 0; i < pixels.length; i++) {
    const pixel = pixels[i];
    const x = i % 8;
    const y = Math.floor(i / 8);

    pixel.style.backgroundColor = "white";

    socket.emit("pixel_update", {
      x, y, color: [255, 255, 255]
    });

    // delay for the raspberry pi to keep up in its sense hat display state
    await new Promise(resolve => setTimeout(resolve, 20));
  }
});

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

const colorPicker = document.getElementById('colorPicker');

colorPicker.addEventListener('input', () => {
  const color = colorPicker.value;

  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5, 7), 16);

  redSlider.value = r;
  greenSlider.value = g;
  blueSlider.value = b;

  updateColor();
});

function updateColor() {
  const red = redSlider.value;
  const green = greenSlider.value;
  const blue = blueSlider.value;

  colorBox.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

  redValue.textContent = red;
  greenValue.textContent = green;
  blueValue.textContent = blue;

  const hex = `#${Number(red).toString(16).padStart(2, '0')}${Number(green).toString(16).padStart(2, '0')}${Number(blue).toString(16).padStart(2, '0')}`;
  colorPicker.value = hex;
}

redSlider.addEventListener('input', updateColor);
// THIS IS FOR FUN
// redSlider.addEventListener("input", () => {
//   const value = redSlider.value;
//   const angle = -(value / 150) * 90;
//   blueSlider.style.transform = `rotate(${angle}deg)`;
// });
greenSlider.addEventListener('input', updateColor);
// redSlider.addEventListener("input", () => {
//   const value = redSlider.value;
//   const angle = -(value / 150) * 90;
//   redSlider.style.transform = `rotate(${angle}deg)`;
// });
blueSlider.addEventListener('input', updateColor);
// blueSlider.addEventListener("input", () => {
//   const value = blueSlider.value;
//   const angle = -(value / 150) * 90;
//   blueSlider.style.transform = `rotate(${angle}deg)`;
// });

updateColor();
