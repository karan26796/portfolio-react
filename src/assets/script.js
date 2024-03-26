let numCols = 10; // Number of columns
let numRows = 10; // Number of rows
let squareSize;
let previousHover = { x: -1, y: -1 }; // Tracks the last hovered square

function setup() {
  createCanvas(400, 400);
  squareSize = width / numCols; // Calculate the size of each square based on the canvas width
  noLoop(); // Static drawing, no need for a draw loop
}

function drawGrid() {
  for (let i = 0; i < numCols; i++) {
    for (let j = 0; j < numRows; j++) {
      let x = i * squareSize;
      let y = j * squareSize;
      fill(255); // Default fill color (white)
      stroke(200); // Set the stroke color to light grey
      rect(x, y, squareSize, squareSize);
    }
  }
}

function draw() {
  background(255); // Set background to white
  drawGrid(); // Draw the initial grid
}

function mouseMoved() {
  let col = Math.floor(mouseX / squareSize);
  let row = Math.floor(mouseY / squareSize);

  // Check if the mouse is within the canvas
  if (col >= 0 && col < numCols && row >= 0 && row < numRows) {
    // Check if we moved to a new square
    if (col !== previousHover.x || row !== previousHover.y) {
      updateSquare(previousHover.x, previousHover.y, false); // Reset the previous hovered square
      updateSquare(col, row, true); // Highlight the new hovered square
      previousHover = { x: col, y: row }; // Update the previous hover position
    }
  }
}

// Function to update the appearance of a square
function updateSquare(col, row, highlight) {
  if (col >= 0 && col < numCols && row >= 0 && row < numRows) {
    let x = col * squareSize;
    let y = row * squareSize;

    // Choose fill style based on whether the square is highlighted
    if (highlight) {
      fillGradient(x, y); // Apply gradient fill if highlighting
    } else {
      fill(255); // Reset to default fill color (white) otherwise
    }
    rect(x, y, squareSize, squareSize); // Redraw the square
  }
}

// Function to fill a square with a gradient
function fillGradient(x, y) {
  let gradient = drawingContext.createLinearGradient(x, y, x + squareSize, y + squareSize);
  gradient.addColorStop(0, 'rgba(0, 50, 200, .04)'); // Start color of gradient
  gradient.addColorStop(1, 'rgba(255, 255, 255, 1)'); // End color of gradient

  drawingContext.fillStyle = gradient;
  rect(x, y, squareSize, squareSize);
}
