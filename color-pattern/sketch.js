// Run in p5.js

var particals = [];
var checkboxes = [];
var sliders = [];

function setup() {
  createCanvas(500, 500);
  rectMode(CENTER);
  init();
  var record = createButton("record");
  record.mousePressed(doRecord);
}

function doRecord() {
  saveGif("mySketch", 3);
}

function init() {
  console.log("init");
  particals = [];
  for (let i = 0; i < (width * height) / 1000; i++) {
    particals.push(new Partical(100, 100));
  }
}

function draw() {
  background(255);
  particals.forEach((p) => p.tick());
  particals.forEach((p) => p.draw());
}

class Partical {
  constructor(x, y) {
    this.size = 25;
    this.pos = createVector(width / 2, height / 2);
    this.v = createVector(random(-2, 2), random(-2, 2));
    this.c = color(random(255), random(255), random(255), 50);
  }

  tick() {
    this.pos.add(this.v);
    // check if x is out of bounds
    if (this.pos.x < 0) {
      this.pos.x *= -1;
      this.v.x *= -1;
    } else if (this.pos.x > width) {
      this.pos.x = 2 * width - this.pos.x;
      this.v.x *= -1;
    }
    // check if y is out of bounds
    if (this.pos.y < 0) {
      this.pos.y *= -1;
      this.v.y *= -1;
    } else if (this.pos.y > height) {
      this.pos.y = 2 * height - this.pos.y;
      this.v.y *= -1;
    }
  }

  draw() {
    noStroke();

    const left = lerpColor(color('red'), color('yellow'), this.pos.y / height);
    const right = lerpColor(color('green'), color('blue'), this.pos.y / height);
    const cPos = lerpColor(left, right, this.pos.x / width);

    fill(cPos);
    rect(this.pos.x, this.pos.y, this.size);
  }
}