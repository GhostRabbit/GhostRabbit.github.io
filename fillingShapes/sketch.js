var img
var spots = []
var shapes = []

function preload() {
  img = loadImage("./data/linus.png",
  function() {
    console.log("loadImage success")
  },
  function() {
    console.log("loadImage failed")
  })
}

function setup() {
  colorMode(HSB)
  createCanvas(img.width, img.height)
  img.loadPixels()
  for (var i = 0; i < img.width; i++) {
    for (var j = 0; j < img.height; j++) {
      var loc = (i + j * img.width) * 4
      if (img.pixels[loc] + img.pixels[loc + 1] + img.pixels[loc + 2] > 500) {
        spots.push(createVector(i, j))
      }
    }
  }
}

function draw() {
  background(0)
  noFill()
  //strokeWeight(2)
  //stroke(255)
  noStroke()
  for (var i = 0; i < shapes.length; i++) {
    var shape = shapes[i]
    if (shape.growing) {
      shape.grow()
      if (shape.stopGrow(shapes)) {
        shape.growing = false;
      }
    }
    shape.draw()
  }
  for (var j = 0; j < 10; j ++) {
    newCircle()
  }
}

function newCircle() {
  while (spots.length > 0) {
    var spot = spots.splice(random(0, spots.length), 1)[0]
    var circle = new Circle(spot.x, spot.y)
    if (! circle.stopGrow(shapes)) {
      shapes.push(circle)
      return
    }
  }
}

function Circle(x, y) {
  this.x = x
  this.y = y
  this.r = 2
  this.growing = true
  
  this.grow = function() {
    this.r++
  }
  
  this.stopGrow = function(circles) {
    return this.nearEdge() || this.closeToAny(circles)
  }
  
  this.nearEdge = function() {
    return this.x - this.r <= 2    ||
      this.x + this.r >= width - 2 ||
      this.y - this.r <= 2         ||
      this.y + this.r >= height -2
  }
  
  this.closeToAny = function(circles) {
    for (var i = 0; i < circles.length; i++) {
      var other = circles[i]
      if (other !== this) {
        if (dist(this.x, this.y, other.x, other.y) < this.r + other.r + 4) {
          return true
        }
      }
    }
    return false
  }
  
  this.draw = function() {
    var h = map(this.x, 100, width-100, 0, 255)
    fill(h, 255, 255)
    ellipse(this.x, this.y, this.r*2, this.r*2)
  }
}