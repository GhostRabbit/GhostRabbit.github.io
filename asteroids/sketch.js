var asteroids = []
var lasers = []
var ship

function setup() {
    createCanvas(windowWidth, windowHeight)
    fullscreen()
    
    ship = new Ship()
    for (var i = 0; i < 10; i++)
      asteroids.push(newAsteroid())
}

function draw() {
  background(0)
  noFill()
  stroke(255)
  strokeWeight(2)
 
  for (var i = 0; i < asteroids.length; i++) {
    asteroids[i].render()
    asteroids[i].update()
  }

  for (var i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    if (lasers[i].update()) {
      lasers.splice(i, 1)
    }
  }

  fill(0);
  ship.render()
  ship.update()
}

function keyPressed() {
  if (keyCode === 32) {  // Space
    lasers.push(ship.fire())
  }
}