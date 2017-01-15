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
    return this.x - this.w - space / 2
  }

  this.right = function() {
    return this.x + this.w + space / 2
  }
  
  this.top = function() {
    return this.y - this.h - space / 2
  }
  
  this.bottom = function() {
    return this.y + this.h + space / 2
  }
  
  this.closeToAny = function(shapes) {
    for (var i = 0; i < shapes.length; i++) {
      var other = shapes[i]
      if (other !== this) {
        if (collidesWith(this, other) ) {
          return true
        }
      }
    }
    return false
  }
  
  function collidesWith(a, b) {
   //Stolen from:   http://stackoverflow.com/questions/31022269/collision-detection-between-two-rectangles-in-java
    return a.left() < b.right() && a.right() > b.left() && a.top() < b.bottom() && a.bottom() > b.top() 
  }
  
  this.draw = function() {
    var h = map((this.x + dx) % width, 0, width, 0, 512)
    if (h > 255) h = 512 - h
    fill(h, 255, 255)
    rect(this.x, this.y, this.w*2, this.h*2)
  }
}