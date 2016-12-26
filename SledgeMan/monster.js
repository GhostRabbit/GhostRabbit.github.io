function spawnMonster() {
  var pos = p5.Vector.random2D()
    .setMag(sqrt(pow(width / 2, 2) + pow(height / 2, 2)) + 100)
    .add(createVector(width / 2, height / 2))
  var r = random(5, 20)
  var c = random(255)
  return new Monster(pos, r, c)
}

function Monster(pos, r, c) {
  this.pos = pos
  this.r = r
  this.c = c
  this.delete = false
  
  this.render = function() {
    stroke((c + 128) % 255, 255, 255)
    fill(c, 255, 255)
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
  }
  
  this.update = function() {
    if (p5.Vector.dist(this.pos, sledge.pos) < this.r + sledge.r) {
      this.die()
    }
    if (p5.Vector.dist(this.pos, player.pos) < this.r + player.r) {
      gameState = "gameOver"
    }
    this.pos.add(p5.Vector.sub(player.pos, this.pos).setMag(2))
  }
  
  this.die = function() {
      this.delete = true
      for (var i = 0; i < 5; i++) {
        animations.push(new Blood(this.pos.copy()))
      }
      score++
  }
}
