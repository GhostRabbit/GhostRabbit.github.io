// Run in p5.js

const np = 10
let ps = []

function setup() {
  createCanvas(250, 250)
  colorMode(RGB)
  for (let i = 0; i < np; i++) ps.push(new P())
}

function draw() {
  background(0)

  loadPixels()
  for (let i = 0; i < pixels.length; i += 4) {
    let d = width ** 2 + height ** 2
    let ix = (i / 4) % width
    let iy = i / 4 / width
    let ds =ps.map(p => p.dist(ix, iy)).sort((a,b)=> a-b)
    let d0=Math.sqrt(ds[0])
    let d1=Math.sqrt(ds[1])
    let c = color(d1,255-d1, d0)
    pixels[i] = red(c)
    pixels[i + 1] = green(c)
    pixels[i + 2] = blue(c)
  }
  updatePixels()

  ps.forEach((p) => p.tick())
  // ps.forEach((p) => p.draw())
  // noLoop()
}

class P {
  constructor() {
    this.x = random(width)
    this.y = random(height)
    this.dx = random(-2, 2)
    this.dy = random(-2, 2)
  }

  tick() {
    this.x += this.dx
    if (this.x < 0 || this.x > width) this.dx *= -1
    this.y += this.dy
    if (this.y < 0 || this.y > width) this.dy *= -1
  }
  dist(x, y) {
    return (x - this.x) ** 2 + (y - this.y) ** 2
  }

  draw() {
    circle(this.x, this.y, 20)
  }
}
