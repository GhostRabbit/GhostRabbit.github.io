function Eye(pos, r) {
  this.pos = pos.copy();
  this.vel = p5.Vector.random2D();
  this.a = createVector(0, 0);
  this.r = r;
  
  this.ipos = pos.copy();
  this.ivel = p5.Vector.random2D();
  this.ia = createVector(0, 0);  
  this.ir = 0.4 * r;
}

Eye.prototype.update = function (others) {
  this.vel.add(this.a);
  this.a.mult(0);
  this.pos.add(this.vel);
  
  this.ivel.add(this.ia);
  this.ia.mult(0);
  this.ipos.add(this.ivel);
  
  this.edgeCollision();
  this.outsideCollision(others);
  this.internalCollision();
}

Eye.prototype.draw = function () {
  noStroke();
  fill(255);
  ellipse(this.pos.x, this.pos.y, 2*this.r, 2*this.r);
  fill(100);
  ellipse(this.ipos.x, this.ipos.y, 2*this.ir, 2*this.ir);   
  fill(0);
  ellipse(this.ipos.x, this.ipos.y, this.ir, this.ir); 
}

function inside(n, low, high) {
  return n >= low && n <= high;
}

Eye.prototype.edgeCollision = function() {
  if (!inside(this.pos.x, this.r, width - this.r))  {
    this.vel.x *= -1;
    this.pos.x = constrain(this.pos.x,    this.r, width - this.r);
  }
  if (!inside(this.pos.y, this.r, height - this.r)) {
    this.vel.y *= -1;
    this.pos.y = constrain(this.pos.y, this.r, height - this.r);
  }
}

Eye.prototype.outsideCollision = function(others) {
  var self = this;
  others.forEach(function(other) {
    if(self != other) {
      if (self.pos.dist(other.pos) < self.r + other.r) {
        var pointOfIntersection = p5.Vector.sub(other.pos, self.pos).mult(self.r / (self.r + other.r));
        // Vary force more then just a staticly scaled?
        self.a.add(p5.Vector.div(pointOfIntersection, -150));
        // Apply hard bound
        // But how?
      }
    }
  });
}

Eye.prototype.internalCollision = function() {
  var edgePoint = p5.Vector.sub(this.ipos, this.pos);
  if (edgePoint.mag() > (this.r - this.ir)) {
    // Vary force depending of magnitute of imapt? (Not only f == 1)
    this.ia.add(p5.Vector.sub(this.pos, this.ipos).normalize());
    edgePoint.limit(this.r - this.ir);
    // Apply a hard bound
    this.ipos = edgePoint.add(this.pos);
  }
}