var eyes = [];

function setup() {
  createCanvas(400, 400);
  
  eyes.push(new Eye(createVector(100, 100), 50));
  eyes.push(new Eye(createVector(300, 100), 30));
  eyes.push(new Eye(createVector(100, 300), 60));
  eyes.push(new Eye(createVector(300, 300), 50));
}

function draw() {
  background(100);
  
  eyes.forEach(function(eye) {
    eye.update(eyes);
  });
  eyes.forEach(function(eye) {
    eye.draw();
  });
  
}
