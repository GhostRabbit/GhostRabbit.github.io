var img
var spots = []
var shapes = []

var space = 3
var shapesPerFrame = 8

var dx = 0

var shapeFactory

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
  shapeFactory = function(x, y) { return new Rectangle(x,y) }
  colorMode(HSB)
  createCanvas(img.width, img.height)
  preCalculateAvailableSpawningSpots(img, spots)
}

function preCalculateAvailableSpawningSpots(img, spots) {
  img.loadPixels()
  for (var i = 0; i < img.width; i += space) {
    for (var j = 0; j < img.height; j += space) {
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
  stroke(2)
  
  for (var i = 0; i < shapes.length; i++) {
    var shape = shapes[i]
    if (shape.growing()) {
      shape.grow(shapes)
    }
    shape.draw()
  }
  for (var j = 0; j < shapesPerFrame; j ++) {
    newShape(shapeFactory)
  }
  dx += 5
}

function newShape(factory) {
  while (spots.length > 0) {
    var spot = spots.splice(random(0, spots.length), 1)[0]
    var shape = factory(spot.x, spot.y)
    if (! shape.stopGrow(shapes)) {
      shapes.push(shape)
      return
    }
  }
}

