const faces = []
let winner
let pic

function preload() {
  pic = loadImage('resources/Lars2.PNG')
}

function setup() {
  createCanvas(640, 480)
  imageMode(CENTER)
  strokeWeight(4)

  for (var i = 0; i < 3; i++) {
    faces.push(newFace())
  }
  winner = new Face(320, 240, pic)
  winner.v.mult(0)
}

function newFace() {
  const x = map(random(1 / 4, 3 / 4), 0, 1, 0, width)
  const y = map(random(1 / 4, 3 / 4), 0, 1, 0, height)
  return new Face(x, y)
}

function draw() {
  background(200, 40, 40)
  stroke(200)
  fill(40, 100, 80)
  rect(50, 50, 540, 380)

  faces.forEach(face => {
    face.update()
    face.draw()
  })
  winner.update()
  winner.draw()

  for (var i = faces.length - 1; i >= 0; i--) {
    if (faces[i].edge()) {
      faces.splice(i, 1);
    }
  }

  if (random() < 0.02) {
    faces.push(newFace())
  }
}

class Face {
  constructor(x, y, pic) {
    this.pic = pic
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

    if (this.pic) {
      image(this.pic, 0, 0, 66, 90)
    } else {
      fill(255, 205, 148)
      stroke(0)
      ellipse(0, 0, 45, 45)
      point(-10, -10)
      point(10, -10)
      line(-10, 10, 10, 10)
    }
    pop()
  }

  edge() {
    return (
      this.pos.x < 0 ||
      this.pos.x > width ||
      this.pos.y < 0 ||
      this.pos.y > height)
  }
}
