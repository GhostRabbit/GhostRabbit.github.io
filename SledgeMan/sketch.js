var gameState, player, sledge, monsters
var maxSledgeSpeed = 15

function setup() {
  createCanvas(800, 600)
  colorMode(HSB)
  strokeWeight(3)
  resetGame()
}

function draw() {
  if (gameState === "gameOn") {
    background(255, 0, 50)
    incrementGameState()
    drawObjects()
    if (random() < 0.1) {
      monsters.push(createMonster())
    }
  } else if (gameState === "gameOver") {
    textSize(32)
    textAlign(CENTER)
    fill(128, 255, 255)
    text("Game Over, click to restart", width / 2, height / 2)
  }
}

function mousePressed() {
  if (gameState === "gameOver") {
    resetGame()
  }
}

function resetGame() {
  gameState = "gameOn"
  player = new Player(width / 2, height / 2)
  sledge = new Sledge(width / 2 - 50, height / 2)
  monsters = []
  for (var i = 0; i < 15; i++) {
    monsters.push(createMonster())
  }
}

function createMonster() {
  var pos = p5.Vector.random2D().setMag(width + 100)
  var r = random(5, 20)
  var c = random(255)
  return new Monster(pos, r, c)
}

function incrementGameState() {
  player.update()
  sledge.update()
  var i = monsters.length;
  while (i--) {
    monsters[i].update()
    if (monsters[i].delete) {
      monsters.splice(i, 1)
    }
  }
}

function drawObjects() {
  monsters.forEach(function(monster) {
    monster.draw()
  })
  player.draw()
  sledge.draw()
}

function Player(x, y) {
  this.pos = createVector(x, y);
  this.r = 10
  this.maxSpeed = 8
  
  this.update = function() {
    var mPos = createVector(mouseX, mouseY)
    var vel = p5.Vector.sub(mPos, this.pos).limit(this.maxSpeed)  
    this.pos.add(vel)
  }
  
  this.draw = function() {
    stroke(0)
    fill(0, 255, 255)
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
  }
}

function Sledge(x, y) {
  this.pos = createVector(x, y)
  this.vel = createVector()
  this.r = 5

  this.update = function() {
    this.vel.add(p5.Vector.sub(player.pos, this.pos).normalize())
    this.vel.limit(maxSledgeSpeed)
    this.pos.add(this.vel)
  }
  
  this.draw = function() {
    stroke(0)
    fill(0)
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
  }
}

function Monster(pos, r, c) {
  this.pos = pos
  this.r = r
  this.c = c
  this.delete = false
  
  this.draw = function() {
    stroke((c + 128) % 255, 255, 255)
    fill(c, 255, 255)
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
  }
  
  this.update = function() {
    if (p5.Vector.dist(this.pos, sledge.pos) < this.r + sledge.r) {
      this.delete = true
    }
    if (p5.Vector.dist(this.pos, player.pos) < this.r + player.r) {
      gameState = "gameOver"
    }
    this.pos.add(p5.Vector.sub(player.pos, this.pos).setMag(2))
  }
}

