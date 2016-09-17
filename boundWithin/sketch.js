var pos, vel, r, ipos, ivel, ir

function setup() {
  createCanvas(400, 400)
  r = 50
  pos = createVector(random(r, width - r), random(r, height - r))
  vel = p5.Vector.random2D()
  
  ir = 20
  ipos = pos.copy()
  ivel = p5.Vector.random2D()
  noStroke()
}

function draw() {
  pos.add(vel)
  ipos.add(ivel)
  checkEdges()
  
  background(100)
  fill(255)
  ellipse(pos.x, pos.y, 2*r, 2*r)
  fill(0)
  ellipse(ipos.x, ipos.y, 2*ir, 2*ir)
}

function checkEdges() {
  if (pos.x <= r || width - r <= pos.x)  {
    vel.x *= -1
  }
  if (pos.y <= r || width - r <= pos.y) {
    vel.y *= -1
  }
  
  if (pos.dist(ipos) > (r - ir)) {
    var edgePoint = p5.Vector.sub(pos, ipos)
    edgePoint.limit(2 * (r - ir) - edgePoint.mag()) // Compensate for overshoot
    ipos = p5.Vector.sub(pos, edgePoint)
    ivel.add(p5.Vector.sub(pos, ipos).normalize())
  }
}