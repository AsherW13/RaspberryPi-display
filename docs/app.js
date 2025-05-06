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