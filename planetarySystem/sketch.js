var planets = []

function setup() {
  createCanvas(windowWidth, windowHeight)
  init(2)
}

function init(n) {  
  planets = []
  for (var i = 0; i < n; i++) {
    var pos = p5.Vector.fromAngle(i * TWO_PI / n).setMag(100)
    var v = p5.Vector.fromAngle(i * TWO_PI / n + HALF_PI).setMag(n / 2.0)
    planets.push(new Planet(pos, v))
  }
  setTimeout(function() {
    init(n + 1)  
  }, 10000);
}

function draw() {
  background(128)
  push()
  translate(width / 2, height / 2)
  update()

  for (var i = 0; i < planets.length; i++) {
    planets[i].render()
  }
  pop()
}

function update() {
  for (var i = 0; i < planets.length; i++) {
    for (var j = 0; j < planets.length; j++) {
      if (i != j) {
        var v = p5.Vector.sub(planets[i].pos, planets[j].pos)
        var r = v.mag()
        var f = 1000 / (r * r)
        planets[i].applyForce(v.setMag(-f))
      }
    }
  }
  for (var k = 0; k < planets.length; k++) {
    planets[k].update()
  }
}

function Planet(pos, v) {
  this.pos = pos
  this.v = v
  this.r = 5;
  this.force = createVector()
  
  this.render = function() {
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
  }
  
  this.update = function() {
    this.v.add(this.force)
    this.force = createVector()
    this.pos.add(v)
  }
  
  this.applyForce = function(f) {
    this.force.add(f)
  }
}