var pos, vel

function setup() {
  createCanvas(240, 180)
  pos = createVector(width/2, height/2)
  vel = p5.Vector.random2D()
}

function draw() {
  pos.add(vel)
  
  // Wrap around, and because mod in javascript is broken. see
  // http://stackoverflow.com/questions/4467539/javascript-modulo-not-behaving
  pos.x = ((pos.x%width)+width)%width
  pos.y = ((pos.y%height)+height)%height
  
  background(100)
  ellipse(pos.x, pos.y, 20, 20)
}