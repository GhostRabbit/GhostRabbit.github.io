var colors = []
var ball, velocity, cam, bandwidth

function setup() {
  colors.push(color(255,   0,   0))
  colors.push(color(255, 127,   0))
  colors.push(color(255, 255,   0))
  colors.push(color(  0, 255,   0))
  colors.push(color(  0,   0, 255))
  colors.push(color( 75,   0, 130))
  colors.push(color(139,   0, 255))
  createCanvas(480, 360)
  ball = createVector(0, height / 2)
  bandwidth = width / 3;
  wall = bandwidth * colors.length
  velocity = wall / 300
}

function draw() {
  // update ball
  ball.x += velocity
  if (ball.x < 0 || ball.x > wall) {
    velocity *= -1
    ball.x = constrain(ball.x, 0, wall)
  }
  
  // update camera position
  cam = constrain(-ball.x + width / 3, -wall + width, 0)
  push()
  translate(cam, 0)
  
  // draw background
  noStroke();
  for (var i = 0; i < colors.length; i++) {
    fill(colors[i]);
    rect(i * bandwidth, 0, bandwidth, height)
  }
  
  // draw ball
  stroke(0)
  fill(255)
  ellipse(ball.x, ball.y, 16, 16)
  pop()
}

