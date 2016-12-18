function newAsteroid() {
  // Do not spawn too close to ship, give 20% margin
  var pos = createVector(random(width * 0.8), random(height * 0.8))
  var dx = 0.1 * width
  if (abs(pos.x - ship.pos.x) < dx) pos.x += dx * 2
  var dy = 0.1 * height
  if (abs(pos.y - ship.pos.y) < dy) pos.y += dy * 2
  return new Asteroid(40, pos)
}

function Asteroid(r, pos) {
  this.r = r
  this.pos = pos
  this.vel = p5.Vector.random2D()
  this.angle = 0
  this.angleVel = random(-0.05, 0.05)
  this.shape = []
  var points = random(5, 10)
  for (var i = 0; i < points; i++) {
    var p = p5.Vector.fromAngle(map(i, 0, points, 0, TWO_PI)).mult(this.r * random(0.5, 1.3))
    this.shape.push(p)
  }
  
  this.render = function() {
    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.angle)

    beginShape()
    for (var i = 0; i < this.shape.length; i++) {
      vertex(this.shape[i].x, this.shape[i].y)
    }
    endShape(CLOSE)
    pop()
  }
  
  this.update = function() {
    this.pos.add(this.vel)
    this.angle += this.angleVel
    
    if (this.pos.x < 0) this.pos.x = width
    else if (this.pos.x > width) this.pos.x = 0

    if (this.pos.y < 0) this.pos.y = height
    else if (this.pos.y > height) this.pos.y = 0
  }
  
  this.split = function() {
    if (r < 20) return []
    return [new Asteroid(this.r / 2, this.pos.copy()), new Asteroid(this.r / 2, this.pos.copy())]
  }
  
}




