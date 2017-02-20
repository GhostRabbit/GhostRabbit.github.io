var grid;
var active = true;

function setup() {
  createCanvas(600, 600);
  grid = new Grid();
  noFill();
}

function draw() {
  background(200);
  var squares = grid.maxSquares() + 2;
  var step = width / (2 + 2 * squares);
  
  // Grid
  stroke(0);
  for (var i = 0; i <= squares + 1; i++) {
    var z = (2 * i + 1) * step;
    line(z, 0, z, width);
    line(0, z, height, z);
  }
  
  var O = [];
  var X = [];
  // Shapes
  stroke(0);
  var w = 4 * step;
  for (var x = grid.xmin; x <= grid.xmax; x++) {
    var h = 4 * step;
    for (var y = grid.ymin; y <= grid.ymax; y++) {
      var v = grid.get(x, y);
      if (v === "o") {
        ellipse(w, h, step, step);
        addNeghbours(O, "o", x, y, w, h, step);
      } 
      else if (v === "x") {
        line(w - step / 2, h - step / 2,
            w + step / 2, h + step / 2);
        line(w + step / 2, h - step / 2,
            w - step / 2, h + step / 2);
        addNeghbours(X, "x", x, y, w, h, step);
      }
      h += 2 * step;
    }
    w += 2 * step;
  }
  
  stroke(255, 0, 0, 100);
  O.forEach(function(o) {
    line(o.x1, o.y1, o.x2, o.y2);
  });
  
  stroke(0, 255, 0, 100);
  X.forEach(function(x) {
    line(x.x1, x.y1, x.x2, x.y2);
  });
  
  // Mouse focus
  stroke(255);
  if (mouseX > step && mouseX < width - step &&
     mouseY > step && mouseY < height - step) {
    var x = floor((mouseX - step) / (2 * step));
    var y = floor((mouseY - step) / (2 * step)); 
    var gridX = x + grid.xmin - 1;    
    var gridY = y + grid.ymin - 1;
    if (grid.get(gridX, gridY) === undefined) {
        rect((2 * x + 1) * step, (2 * y + 1) * step, 2 * step, 2 * step);
    }
  }
}

function addNeghbours(a, v, x, y, w, h, step) {
  if (grid.get(x - 1, y - 1) === v)
    a.push({x1: w, y1: h, x2: w - 2*step, y2: h - 2*step});
  if (grid.get(x, y - 1) === v)
    a.push({x1: w, y1: h, x2: w, y2: h - 2* step});
  if (grid.get(x + 1, y - 1) === v)
    a.push({x1: w, y1: h, x2: w + 2*step, y2: h - 2*step});

  if (grid.get(x - 1, y) === v)
    a.push({x1: w, y1: h, x2: w - 2*step, y2: h});       
  if (grid.get(x + 1, y) === v)
    a.push({x1: w, y1: h, x2: w + 2*step, y2: h});       

  if (grid.get(x - 1, y + 1) === v)
    a.push({x1: w, y1: h, x2: w - 2*step, y2: h + 2*step});
  if (grid.get(x, y + 1) === v)
    a.push({x1: w, y1: h, x2: w, y2: h + 2* step});
  if (grid.get(x + 1, y + 1) === v)
    a.push({x1: w, y1: h, x2: w + 2*step, y2: h + 2*step});
}

function toSign(b) {
  if (b) return "o";
  return "x";
}
      
function mousePressed() {
  pressed = createVector(mouseX, mouseY);
  var squares = grid.maxSquares() + 2;
  var step = width / (2 + 2 * squares);
  if (mouseX > step && mouseX < width - step &&
     mouseY > step && mouseY < height - step) {
    var x = floor((mouseX - step) / (2 * step));
    var y = floor((mouseY - step) / (2 * step)); 
    var gridX = x + grid.xmin - 1;    
    var gridY = y + grid.ymin - 1;
    if (grid.get(gridX, gridY) === undefined) {
      grid.add(gridX, gridY, toSign(active));
      active = !active;
    }
  }
}