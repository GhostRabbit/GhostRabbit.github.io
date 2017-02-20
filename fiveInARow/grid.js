function Grid() {
  this.xmax = -1;
  this.xmin = 1;
  this.ymax = -1;
  this.ymin = 1;
  this.x = [];
}

Grid.prototype.maxSquares = function() {
  if (this.xmax == -1) return -1;
  return max(this.xmax - this.xmin, this.ymax - this.ymin) + 1;
}

Grid.prototype.add = function(x, y, v) {
  this.xmax = max(x, this.xmax);
  this.xmin = min(x, this.xmin);
  this.ymax = max(y, this.ymax);
  this.ymin = min(y, this.ymin);
  if (this.x[x] === undefined) {
    this.x[x] = [];    
  }
  this.x[x][y] = v;
}

Grid.prototype.get = function(x, y) {
  if (this.x[x]) return this.x[x][y];
}
