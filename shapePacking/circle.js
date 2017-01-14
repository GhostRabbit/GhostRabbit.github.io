function Circle(x, y) {
  this.x = x
  this.y = y
  this.r = space / 2
  this.growing = true
  
  this.grow = function() {
    this.r++
  }
  
  this.stopGrow = function(circles) {
    return this.nearEdge() || this.closeToAny(circles)
  }
  
  this.nearEdge = function() {
    return this.x - this.r <= space     ||
      this.x + this.r >= width - space  ||
      this.y - this.r <= space          ||
      this.y + this.r >= height - space
  }
  
  this.closeToAny = function(circles) {
    for (var i = 0; i < circles.length; i++) {
      var other = circles[i]
      if (other !== this) {
        if (dist(this.x, this.y, other.x, other.y) < this.r + other.r + space) {
          return true
        }
      }
    }
    return false
  }
  
  this.draw = function() {
    var h = map((this.x + dx) % width, 0, width, 0, 512)
    if (h > 255) h = 512 - h
    fill(h, 255, 255)
    ellipse(this.x, this.y, this.r*2, this.r*2)
  }
}