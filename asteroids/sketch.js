var asteroids = []
var lasers = []
var ship
var gameState = "gameOn"
var score = 0
var asteroidAdder

function setup() {
    createCanvas(windowWidth, windowHeight)
    fullscreen(true)
    
    ship = new Ship()
    for (var i = 0; i < 10; i++) {
      asteroids.push(newAsteroid())
    }
    asteroidAdder = setInterval(function() {
      if (gameState === 'gameOver') {
        clearInterval(asteroidAdder)
      } else {
        asteroids.push(newAsteroid())
      }
    }, 3000);
   
}

function draw() {
  if (gameState === "gameOn") {
    drawObjects()
    incrementGameState()
    textSize(32)
    textAlign(LEFT)
    stroke(128)
    fill(255)
    text("Score " + score, 20, height - 30)
  } else if (gameState === "gameOver") {
    textSize(32)
    textAlign(CENTER)
    stroke(128)
    fill(255)
    text("Game Over", width / 2, height / 2)
  }
}

function drawObjects() {
  background(0)
  noFill()
  stroke(255)
  strokeWeight(2)
 
  for (var i = 0; i < asteroids.length; i++) {
    asteroids[i].render()
    asteroids[i].update()
  }

  for (i = 0; i < lasers.length; i++) {
    lasers[i].render();
  }
  
  fill(0);
  ship.render()
  ship.update()
}

function incrementGameState() {
  for (var i = lasers.length - 1; i >= 0; i--) {
    if (lasers[i].update()) {
      lasers.splice(i, 1)
    } else {
      for (var j = asteroids.length - 1; j >= 0; j--) {
        if (p5.Vector.dist(lasers[i].pos, asteroids[j].pos) < asteroids[j].r) {
          // Laser hit asteroid
          asteroids = asteroids.concat(asteroids[j].split())
          asteroids.splice(j, 1)
          lasers.splice(i, 1)
          score ++;
          break;
        } 
      }
    }
  }
  for (var k = 0; k < asteroids.length; k++) {
    if (p5.Vector.dist(ship.pos, asteroids[k].pos) < asteroids[k].r) {
      // Asteroid hit ship
      gameState = "gameOver"
      break;
    } 
  }
}

function keyPressed() {
  if (keyCode === 32) {  // Space
    lasers.push(ship.fire())
    return false //Prevent default behaviours
  }
}