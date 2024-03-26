let squareSize = 70; // Size of each square
let numCols, numRows; // Number of rows
let grid = []; // 2D array to store the colors of each square
let previousHover = { col: -1, row: -1 }; // Tracks the previously hovered square

function setup() {
  createCanvas(windowWidth, document.body.offsetHeight);
  calculateGridDimensions();
  initializeGrid();
}

function draw() {
  background(255); // Clear background

  // Draw grid of squares
  stroke(235); // Set stroke color to black
  strokeWeight(.5);
  for (let i = 0; i < numCols; i++) {
    for (let j = 0; j < numRows; j++) {
      let x = i * squareSize;
      let y = j * squareSize;
      fill(grid[i][j]); // Set fill color based on the color in the grid
      rect(x, y, squareSize, squareSize); // Draw square
    }
  }
}

// Initialize grid with default colors
function initializeGrid() {
  for (let i = 0; i < numCols; i++) {
    grid[i] = [];
    for (let j = 0; j < numRows; j++) {
      grid[i][j] = color(255); // Default color (light grey)
    }
  }
}

function mouseMoved() {
  let col = floor(mouseX / squareSize);
  let row = floor(mouseY / squareSize);

  // Check if the mouse is within the grid
  if (col >= 0 && col < numCols && row >= 0 && row < numRows) {
    // If mouse moved to a new square, reset the previous square to its original color
    if (col !== previousHover.col || row !== previousHover.row) {
      resetPreviousSquare();
      // Change color of the square on hover
      let red = random(200, 256); // Random red value between 100 and 255
      let green = random(200, 256); // Random green value between 100 and 255
      let blue = random(200, 256); // Random blue value between 100 and 255
      grid[col][row] = color(red, green, blue); 
      previousHover = { col: col, row: row }; // Update previous hovered square
    }
  } else {
    // If mouse is outside the grid, reset the previous square
    resetPreviousSquare();
  }
}

function calculateGridDimensions() {
  numCols = ceil(width / squareSize); // Ensure that the number of columns covers the entire width
  numRows = ceil(height / squareSize); // Ensure that the number of rows covers the entire height
}

// Function to reset the color of the previously hovered square
function resetPreviousSquare() {
  if (previousHover.col !== -1 && previousHover.row !== -1) {
    grid[previousHover.col][previousHover.row] = color(255); // Reset to default color (light grey)
    previousHover = { col: -1, row: -1 }; // Reset previous hovered square
  }
}
