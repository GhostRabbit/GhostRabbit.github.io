var stars = []
 
function setup() {
  createCanvas(displayWidth, displayHeight);
  createStarField()
}
 
function createStarField() {
  stars = []
  for (var i = 0; i < 50; i++) {
    stars.push(new Star(10 + random(width - 20), 
                        10 + random(height - 20)))
  }
  for (var i = 0; i < stars.length; i++) {
    var minD = [width + height, width + height, width + height]
    var nearest = []
    for (var j = 0; j < stars.length; j++) {
      if (i != j) {
        var d = stars[i].pos.dist(stars[j].pos)
        nearest.push({d: d, star: stars[j]})
      }
    }
    nearest.sort(function(a, b) {
      return a.d - b.d
    })
    stars[i].nearest = nearest.splice(0, 2)
  }
}
 
function draw() {
  background(0, 0, 10)
  stars.forEach(function(star) {
    star.show()
  })
}
 
function mouseReleased() {
  createStarField()
}
 
function Star(x, y) {
  this.pos = createVector(x, y)
  this.nearest = [];

  this.show = function() {
    strokeWeight(1)
    stroke(255, 100)
    this.nearest.forEach(function(other) {
      line(this.pos.x, this.pos.y, other.star.pos.x, other.star.pos.y)
     
    }.bind(this))
 
    noStroke()
    fill(255)
    ellipse(this.pos.x, this.pos.y, 4, 4)
  }
 
}