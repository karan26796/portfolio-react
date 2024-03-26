let unit = 40;
let count;
let mods = [];

function setup() {
  createCanvas(windowWidth, document.body.offsetHeight);
  noStroke();
  let wideCount = width / unit;
  let highCount = height / unit;
  count = wideCount * highCount;

  let index = 0;
  for (let y = 0; y < highCount; y++) {
    for (let x = 0; x < wideCount; x++) {
      mods[index++] = new Module(x * unit, y * unit, unit / 2, unit / 2, random(0.05, 0.8), unit);
    }
  }
}

function draw() {
  background(250);
  mods.forEach(mod => {
    mod.update();
    mod.display();
  });
}

class Module {
  constructor(xOffsetTemp, yOffsetTemp, xTemp, yTemp, speedTemp, tempUnit) {
    this.xOffset = xOffsetTemp;
    this.yOffset = yOffsetTemp;
    this.x = xTemp;
    this.y = yTemp;
    this.speed = speedTemp;
    this.unit = tempUnit;
    this.xDirection = 1;
    this.yDirection = 1;
  }

  update() {
    this.x = this.x + (this.speed * this.xDirection);
    if (this.x >= this.unit || this.x <= 0) {
      this.xDirection *= -1;
      this.x = this.x + (1 * this.xDirection);
      this.y = this.y + (1 * this.yDirection);
    }
    if (this.y >= this.unit || this.y <= 0) {
      this.yDirection *= -1;
      this.y = this.y + (1 * this.yDirection);
    }
  }

  display() {
    fill(240);
    ellipse(this.xOffset + this.x, this.yOffset + this.y, 6, 6);
  }
}
