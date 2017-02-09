function Face(x, y, pic) {
  this.pic = pic
  this.pos = createVector(x, y)
  this.v = p5.Vector.random2D()
  this.a = 0
  this.va = random(-0.1, 0.1)  

  this.update = function() {
    this.pos.add(this.v)
    this.a += this.va
  }
  
  this.doDraw = function() {
    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.a)

    if (this.pic) {
      image(this.pic, 0, 0, 66, 90)
    } else {
      fill(255,205,148)
      stroke(0)
      ellipse(0, 0, 45, 45)
      point(-10, -10)
      point(10, -10)
      line(-10, 10, 10, 10)
    }
    pop()
  }
  
  this.edge = function() {
    return (
      this.pos.x < 0 ||
      this.pos.x > width ||
      this.pos.y < 0 ||
      this.pos.y > height)
  }
}