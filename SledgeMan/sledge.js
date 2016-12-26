function Sledge(x, y) {
  this.pos = createVector(x, y)
  this.vel = createVector()
  this.r = 10

  this.render = function() {
    stroke(0)
    fill(0)
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
  }

  this.update = function() {
    this.vel.add(p5.Vector.sub(player.pos, this.pos).normalize())
    this.vel.limit(maxSledgeSpeed)
    this.pos.add(this.vel)
  }
  
}