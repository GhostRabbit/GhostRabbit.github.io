var pos, vel, r, h

function setup() {
  createCanvas(400, 400)
  colorMode(HSB, 255)
  pos = createVector(0, height / 2)
  vel = createVector(1, 1)
  h = 0
  noStroke()
}

function draw() {
  pos.add(vel)
  checkEdges()
  
  r = min(pos.x, width-pos.x, pos.y, height-pos.y)
  
  h = (h+0.5) % 255

  background(h, 255, 255)
  fill((h+128)%255, 255, 255)
  ellipse(pos.x, pos.y, 2*r, 2*r)
}

function checkEdges() {
  if (pos.x <= 0 || width <= pos.x)  {
    vel.x *= -1
  }
  if (pos.y <= 0 || width <= pos.y) {
    vel.y *= -1
  }
}