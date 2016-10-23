var balls = []
var blocks = []

function setup() {
  createCanvas(windowWidth, windowHeight)
  for (var i = 0; i < 50; i++) balls.push(new Ball())
  for (var i = 0; i < 50; i++) balls.push(new Block())
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
    // If found offscreen, move towards screen
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

function Block() {
  this.pos = createVector(width / 2, height / 2)
  this.vel = p5.Vector.random2D().mult(random(0.5, 3))
  this.r = random(5, 20)
  this.a = 0
  this.aVel = random(-0.1, 0.1)
  this.c = randomColor()
  
  this.update = function() {
    this.pos.add(this.vel)
    this.a += this.aVel
    
    // If found offscreen, move towards screen
    if (this.pos.x < this.r) this.vel.x = abs(this.vel.x)
    if (this.pos.x > width - this.r) this.vel.x = -abs(this.vel.x)
    if (this.pos.y < this.r) this.vel.y = abs(this.vel.y)
    if (this.pos.y > height - this.r) this.vel.y = -abs(this.vel.y)
  }
  
  this.draw = function() {
    rectMode(CENTER)
    noStroke()
    fill(this.c)
    push()
    translate(this.pos.x, this.pos.y);
    rotate(this.a)
    rect(0, 0, this.r * 2, this.r * 2)
    pop()
  }
}
