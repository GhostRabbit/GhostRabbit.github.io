function Ship() {
  this.pos = createVector(width / 2, height / 2)
  this.vel = 0.0
  this.angle = TWO_PI - HALF_PI
  this.engineOn = false
  
  this.render = function() {
    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.angle)
    fill(0)
    triangle(12,  0,
            -12, -8,
            -12,  8)
    if (this.engineOn) {
      line(-12,3, -20, 5)
      line(-12,-3, -20, -5)
    }
    pop()
  }
  
  this.update = function() {
    if (this.pos.x < 0) this.pos.x = width
    else if (this.pos.x > width) this.pos.x = 0

    if (this.pos.y < 0) this.pos.y = height
    else if (this.pos.y > height) this.pos.y = 0
    
    this.engineOn = keyIsDown(UP_ARROW) || keyIsDown(87) // 'w'
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // 'a' 
      this.angle -= 0.05
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // 'd'
      this.angle += 0.05
    }
    
    if (this.engineOn) {
      this.vel += 0.1
    }
    this.vel *= 0.99
    
    this.pos.add(p5.Vector.fromAngle(this.angle).mult(this.vel))
  }
  
  this.fire = function() {
    return new Laser(this.pos.copy(), this.angle)
  }
}