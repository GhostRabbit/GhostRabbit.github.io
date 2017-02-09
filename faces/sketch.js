var faces = []
var winner
var pic

function preload() {
  pic = loadImage('resources/Lars2.PNG')
}

function setup() {
  createCanvas(640, 480)
  imageMode(CENTER)
  strokeWeight(4)
  
  for (var i = 0; i < 3; i++) {
    pushFace()
  }
  winner = new Face(320, 240, pic)
  winner.v.mult(0)
}

function pushFace() {
  var x = map(random(1/4, 3/4), 0, 1, 0, width)
  var y = map(random(1/4, 3/4), 0, 1, 0, height)
  faces.push(new Face(x, y))
}

function draw() {
  background(200, 40, 40)
  stroke(200)
  fill(40, 100, 80)
  rect(50, 50, 540, 380)
    
  faces.forEach(function(face) {
    face.update()
    face.doDraw()
  });
  winner.update()
  winner.doDraw()
  
  for (var i = faces.length - 1; i >= 0; i--) {
    if (faces[i].edge()) {
      faces.splice(i, 1);
    }
  }
  
  if (random() < 0.02) {
    pushFace()
  }
}
