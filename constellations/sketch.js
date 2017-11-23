let stars = []
let recreate

function setup() {
  createCanvas(windowWidth, windowHeight)
  recreate = true
}

function createStarField() {
  stars = []
  for (let i = 0; i < 50; i++) {
    stars.push(new Star(random(10, width - 20), random(10, height - 20)))
  }
  for (let i = 0; i < stars.length; i++) {
    const nearest = []
    for (let j = 0; j < stars.length; j++) {
      if (i != j) {
        var d = stars[i].pos.dist(stars[j].pos)
        nearest.push({ d: d, star: stars[j] })
      }
    }
    nearest.sort((a, b) => a.d - b.d)
    stars[i].nearest = nearest.splice(0, 2)
  }
}

function draw() {
  if (recreate) {
    createStarField()
    recreate = false
  }
  background(0, 0, 10)
  stars.forEach(star => star.show())
}

function mouseReleased() {
  recreate = true
  return false
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  recreate = true
}

class Star {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.nearest = []
  }

  show() {
    strokeWeight(1)
    stroke(100)
    this.nearest
      .filter(other => other.d < width / 6)
      .forEach(other => line(this.pos.x, this.pos.y, other.star.pos.x, other.star.pos.y))

    noStroke()
    fill(255)
    ellipse(this.pos.x, this.pos.y, 4, 4)
  }
}
