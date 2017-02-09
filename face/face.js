function Face(x, y) {
  var pos = createVector(x, y)
  var v = p5.Vector.random2D()
  var a = 0
  var va = random(-0.1, 0.1)  

  this.update = function() {
    pos.add(v)
    a = a + va
  }
  
    this.doDraw = function() {
    push()
    translate(pos.x, pos.y)
    rotate(a)

    ellipse(0, 0, 45, 45)
    point(-10, -10)
    point(10, -10)
    line(-10, 10, 10, 10)
    pop()
  }
}