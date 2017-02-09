var face

function setup() {
  createCanvas(640, 480)
  noFill()
  stroke(200)
  strokeWeight(4)
  face = new Face(320, 240)
}

function draw() {
  face.update()
  background(0)
  face.doDraw()
}