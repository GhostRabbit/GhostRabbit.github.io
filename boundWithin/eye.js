function Eye(pos, r) {
  this.pos = pos.copy();
  this.ipos = pos.copy();
  this.vel = p5.Vector.random2D();
  this.ivel = p5.Vector.random2D();
  
  this.r = r;
  this.ir = 0.4 * r;
}

Eye.prototype.update = function (others) {
  this.pos.add(this.vel);
  this.ipos.add(this.ivel);
  
  this.edgeCollision();
  this.outsideCollision(others);
  this.internalCollision();
}

Eye.prototype.draw = function () {
  noStroke();
  fill(255);
  ellipse(this.pos.x, this.pos.y, 2*this.r, 2*this.r);
  fill(0);
  ellipse(this.ipos.x, this.ipos.y, 2*this.ir, 2*this.ir); 
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
        var away = p5.Vector.sub(self.pos, other.pos);
        away.setMag(self.vel.mag());
        self.vel = away;
      }
    }
  });
}

Eye.prototype.internalCollision = function() {
  if (this.pos.dist(this.ipos) > (this.r - this.ir)) {
    var edgePoint = p5.Vector.sub(this.pos, this.ipos);
    edgePoint.limit(2 * (this.r - this.ir) - edgePoint.mag()); // Compensate for overshoot
    this.ipos = p5.Vector.sub(this.pos, edgePoint);
    this.ivel.add(p5.Vector.sub(this.pos, this.ipos).normalize());
  }
}