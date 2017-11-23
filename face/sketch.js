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
  face.draw()
}

class Face {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.v = p5.Vector.random2D()
    this.a = 0
    this.va = random(-0.1, 0.1)
  }

  update() {
    this.pos.add(this.v)
    this.a += this.va
  }

  draw() {
    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.a)

    ellipse(0, 0, 45, 45)
    point(-10, -10)
    point(10, -10)
    line(-10, 10, 10, 10)
    pop()
  }
}
