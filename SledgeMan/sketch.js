var gameState, player, sledge, monsters, animations
var maxSledgeSpeed = 15
var score

function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSB)
  strokeWeight(3)
  resetGame()
}

function draw() {
  if (gameState === "gameOn") {
    background(255, 0, 50)
    incrementGameState()
    renderObjects()
    renderScore()
  } else if (gameState === "gameOver") {
    renderGameOver()
  }
}

function mousePressed() {
  if (gameState === "gameOver") {
    resetGame()
  }
}

function resetGame() {
  gameState = "gameOn"
  score = 0
  player = new Player(width / 2, height / 2)
  sledge = new Sledge(width / 2 - 50, height / 2)
  monsters = []
  for (var i = 0; i < 15; i++) {
    monsters.push(spawnMonster())
  }
  animations = []
}

function incrementGameState() {
  player.update()
  sledge.update()
  var i = monsters.length
  while (i--) {
    monsters[i].update()
    if (monsters[i].delete) {
      monsters.splice(i, 1)
    }
  }
  if (random() < 0.05) {
    monsters.push(spawnMonster())
  }
  var j = animations.length
  while (j--) {
    animations[j].update()
    if (animations[j].delete) {
      animations.splice(j, 1)
    }
  }
}

function renderObjects() {
  animations.forEach(function(animation) {
    animation.render()
  })
  monsters.forEach(function(monster) {
    monster.render()
  })
  stroke(25)
  line(player.pos.x, player.pos.y, sledge.pos.x, sledge.pos.y)
  player.draw()
  sledge.render()
}

function renderScore() {
  textSize(32)
  textAlign(LEFT)
  stroke(50)
  fill(255)
  text("Score " + score, 20, height - 30)
}

function renderGameOver() {
  textSize(32)
  textAlign(CENTER)
  stroke(25)
  fill(128, 255, 255)
  text("Game Over, click to restart", width / 2, height / 2)
}
