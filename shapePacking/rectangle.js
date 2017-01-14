function Rectangle(x, y) {
  this.x = x
  this.y = y
  this.w = space / 2
  this.h = space / 2
  this.growing = true
  
  rectMode(CENTER)
  
  this.grow = function() {
    if (random(0, 1) < 0.5) {
      this.w++;      
    } else {
      this.h++;
    }
  }
  
  this.stopGrow = function(shapes) {
    return this.nearEdge() || this.closeToAny(shapes)
  }

  this.nearEdge = function() {
    return this.x - this.w <= space     ||
      this.x + this.w >= width - space  ||
      this.y - this.h <= space          ||
      this.y + this.h >= height - space
  }
  
  this.left = function() {
    return this.x - this.w - space
  }

  this.right = function() {
    return this.x + this.w + space
  }
  
  this.top = function() {
    return this.y - this.h - space
  }
  
  this.bottom = function() {
    return this.y + this.h + space
  }
  
  this.closeToAny = function(shapes) {
    for (var i = 0; i < shapes.length; i++) {
      var other = shapes[i]
      if (other !== this) {
        if  (anyPointIn(this, other) || anyPointIn(other, this)) {
          return true
        }
      }
    }
    return false
  }
  
  function anyPointIn(a, b) {
    return pointIn(a.left(),  a.top(), b) ||
           pointIn(a.right(), a.top(), b) ||
           pointIn(a.left(),  a.bottom(), b) ||
           pointIn(a.right(), a.bottom(), b)
  }
  
  function pointIn(x, y, b) {
    if (x > b.left() && x < b.right() &&
        y < b.bottom() && y > b.top()) {
      return true;
    }
    return false
  }
  
  this.draw = function() {
    var h = map((this.x + dx) % width, 0, width, 0, 512)
    if (h > 255) h = 512 - h
    fill(h, 255, 255)
    rect(this.x, this.y, this.w*2, this.h*2)
  }
}