var balls = []

function setup() {
  createCanvas(windowWidth, windowHeight)
  for (var i = 0; i < 100; i++) balls.push(new Ball())
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}

function draw() {
  background(255)
  balls.forEach(function(ball) {
    ball.update()
    ball.draw()
  })
}

function randomColor() {
  return color(random(255), random(255), random(255), 100)
}

function Ball() {
  this.pos = createVector(width / 2, height / 2)
  this.vel = p5.Vector.random2D().mult(random(0.5, 3))
  this.r = random(5, 20)
  this.c = randomColor()
  
  this.update = function() {
    this.pos.add(this.vel)
    // If found offscreen, move towars screen
    if (this.pos.x < this.r) this.vel.x = abs(this.vel.x)
    if (this.pos.x > width - this.r) this.vel.x = -abs(this.vel.x)
    if (this.pos.y < this.r) this.vel.y = abs(this.vel.y)
    if (this.pos.y > height - this.r) this.vel.y = -abs(this.vel.y)
  }
  
  this.draw = function() {
    noStroke()
    fill(this.c)
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
  }
}

