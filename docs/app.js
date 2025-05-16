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