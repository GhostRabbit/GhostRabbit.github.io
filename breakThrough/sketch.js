var slider, ball, gameState = "gameOn"

function setup() {
  createCanvas(400, 300)
  slider = new Slider()
  ball = new Ball()
}

function draw() {
  background(200, 0, 200)
  if (gameState === "gameOver") {
    textAlign(CENTER)
    text("Game Over", width / 2, height / 2)
  } else {
    slider.update()
    ball.update()
    if (ball.delete) {
      gameState = "gameOver"
    }
  }

  slider.draw()
  ball.draw()
}

function Slider() {
  this.c = 255
  this.pos = createVector(width/2, 0)
  this.vel = createVector(5, 0)
  
  this.update = function() {
    if (mouseX < this.pos.x && this.pos.x > 50) this.pos.sub(this.vel)
    if (mouseX > this.pos.x && this.pos.x < width - 50) this.pos.add(this.vel)
  }
  
  this.draw = function() {
    fill(this.c)
    rect(-50 + this.pos.x, height - 15, 100, 10)
  }
  
  this.shouldBounce = function(ball) {
    var inX = -50 + this.pos.x < ball.pos.x && ball.pos.x < this.pos.x + 50
    var inY = height - 15 - ball.r < ball.pos.y && ball.pos.y > height - 25 - ball.r
    return inX && inY
  }
}

function Ball() {
  this.pos = createVector(width / 2, height / 2)
  this.vel = createVector(1, -1).setMag(3)
  this.r = 10
  this.delete = false;
  this.c = 255
  
  this.update = function() {
    this.pos.add(this.vel)
    if (this.pos.x - this.r < 0 || this.pos.x + this.r > width) this.vel.x *= -1
    if (this.pos.y - this.r < 0) this.vel.y *= -1
    if (this.pos.y + this.r > height) this.delete = true
    if (slider.shouldBounce(this)) {
      this.vel.y *= -1
      this.vel.x *= map(abs(this.pos.x - slider.pos.x), 0, 50, 0.5, 2.5) 
      this.vel.setMag(3)
    }
  }
  
  this.draw = function() {
    fill(255)
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
  }
}

function mousePressed() {
  if (gameState === "gameOver") {
    ball = new Ball();
    gameState = "gameOn"
  }
}