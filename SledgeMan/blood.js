function Blood(pos) {
  this.delete = false
  this.pos = pos
  this.v = p5.Vector.random2D()
  this.timeToLive = 100
  
  this.render = function() {
    stroke(0, 255, 255)
    fill(0, 255, 255)
    ellipse(this.pos.x, this.pos.y, this.timeToLive / 10, this.timeToLive / 10)
  }
  
  this.update = function() {
    this.timeToLive--
    this.delete = this.timeToLive < 0
    this.v.y += 0.02
    this.pos.add(this.v)
  }
}
