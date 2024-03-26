let squareSize = 70; // Size of each square
let numCols, numRows; // Number of columns and rows
let previousHover = { x: -1, y: -1 }; // Tracks the last hovered square

function setup() {
  createCanvas(windowWidth, document.body.offsetHeight);
  calculateGridDimensions(); // Calculate the number of columns and rows
  noLoop(); // Static drawing, no need for a draw loop
}

function drawGrid() {
  for (let i = 0; i < numCols; i++) {
    for (let j = 0; j < numRows; j++) {
      let x = i * squareSize;
      let y = j * squareSize;
      if (previousHover.x === i && previousHover.y === j) {
        fillGradient(x, y); // Apply gradient fill if it's the previous hovered square
      } else {
        fill(255); // Default fill color (white)
      }
      stroke(200); // Set the stroke color to light grey
      rect(x, y, squareSize, squareSize);
    }
  }
}

function draw() {
  background(255); // Set background to white
  calculateGridDimensions(); // Recalculate grid dimensions based on canvas size
  drawGrid(); // Draw the grid with updated dimensions
}

function calculateGridDimensions() {
  numCols = ceil(width / squareSize); // Ensure that the number of columns covers the entire width
  numRows = ceil(height / squareSize); // Ensure that the number of rows covers the entire height
}

function mouseMoved() {
  let col = floor(mouseX / squareSize);
  let row = floor(mouseY / squareSize);

  // Check if the mouse is within the canvas
  if (col >= 0 && col < numCols && row >= 0 && row < numRows) {
    // Check if we moved to a new square
    if (col !== previousHover.x || row !== previousHover.y) {
      updateSquare(previousHover.x, previousHover.y, false); // Reset the previous hovered square
      updateSquare(col, row, true); // Highlight the new hovered square
      previousHover = { x: col, y: row }; // Update the previous hover position
    }
  } else {
    // If mouse moves outside canvas, reset the previous hovered square
    updateSquare(previousHover.x, previousHover.y, false);
    previousHover = { x: -1, y: -1 }; // Reset previous hover position
  }
}

// Function to update the appearance of a square
function updateSquare(col, row, highlight) {
  if (col >= 0 && col < numCols && row >= 0 && row < numRows) {
    let x = col * squareSize;
    let y = row * squareSize;

    // Choose fill style based on whether the square is highlighted
    if (highlight) {
      // If the square is being highlighted, fill it with gradient
      fillGradient(x, y);
    } else {
      // Otherwise, fill it with the default color
      fill(255);
    }
    stroke(200); // Set the stroke color to light grey
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
