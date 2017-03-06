var grid;
var player = true; // true: red O, false: green X
var squares, side; // Cached each frame at global level

function setup() {
  createCanvas(600, 600); // Assumed to be square
  grid = new Grid();
}

function draw() {
  background(200);
  noFill();
  squares = grid.maxSquares() + 2;
  side = width / (1 + squares);
  strokeWeight(side / 10);

  // Draw grid
  stroke(0);
  for (var i = 0; i <= squares + 1; i++) {
    var z = (i + 0.5) * side;
    line(z, 0, z, width);
    line(0, z, height, z);
  }
  
  // Store neighbours to draw later
  var O = [];
  var X = [];
  // Draw shapes
  stroke(0);
  for (var gridX = grid.minX; gridX <= grid.maxX; gridX++) {
    for (var gridY = grid.minY; gridY <= grid.maxY; gridY++) {
      var v = grid.get(gridX, gridY);
      if (v === "O") {
        drawO(gridX, gridY);
        addNeghbours(O, "O", gridX, gridY);
      } 
      else if (v === "X") {
        drawX(gridX, gridY);
        addNeghbours(X, "X", gridX, gridY);
      }
    }
  }
  
  // Draw neighbours lines
  stroke(playerColor(true, 128));
  O.forEach(drawLine);
  stroke(playerColor(false, 128));
  X.forEach(drawLine);
  
  // Mouse focus
  if (!grid.win) {
    stroke(0, 128);
    if (mouseOnBoard()) {
      var gridX = mouse2GridX();    
      var gridY = mouse2GridY();
      if (!grid.get(gridX, gridY)) {
          if (player) {
            drawO(gridX, gridY);
          } else {
            drawX(gridX, gridY);
          }
      }
    }
  }
  
  // Draw Winner
  if (grid.win) {
    strokeWeight(side / 2);
    stroke(playerColor(!player, 128));
    drawLine(grid.win);
    
    textAlign(CENTER);
    textSize(60);
    strokeWeight(3);
    stroke(50);
    // Drop shadow
    fill(playerColor(player));
    text(playerSign(!player) + " wins", width / 2 + 3, 3 * height / 4 + 3);
    fill(playerColor(!player, 255));
    text(playerSign(!player) + " wins", width / 2, 3 * height / 4);
  }
}

function drawLine(p) {
  line(grid2X(p.x1), grid2Y(p.y1), grid2X(p.x2), grid2Y(p.y2));
}
            
            
function grid2X(gridX) {
  return (gridX - grid.minX + 2) * side;
}

function grid2Y(gridY) {
  return (gridY - grid.minY + 2) * side;
}

function mouse2GridX() {
  var uiX = floor((mouseX - side / 2) / side);
  return uiX + grid.minX - 1;    
}

function mouse2GridY() {
  var uiY = floor((mouseY - side / 2) / side); 
  return uiY + grid.minY - 1;
}

function drawO(x, y) {
  ellipse(grid2X(x), grid2Y(y), side / 2, side / 2);
}

function drawX(x, y) {
  var xc = grid2X(x) - side / 4;
  var yc = grid2Y(y) - side / 4;
  line(xc, yc, xc + side / 2, yc + side / 2);
  line(xc + side / 2, yc, xc, yc + side / 2);
}

function addNeghbours(a, v, x, y) {
  // Enough to add half of the meighbours, the other half is handled by the neighbour
  if (grid.get(x - 1, y - 1) === v)
    a.push({x1: x, y1: y, x2: x - 1, y2: y - 1});
  if (grid.get(x, y - 1) === v)
    a.push({x1: x, y1: y, x2: x, y2: y - 1});
  if (grid.get(x + 1, y - 1) === v)
    a.push({x1: x, y1: y, x2: x + 1, y2: y - 1});
  if (grid.get(x - 1, y) === v)
    a.push({x1: x, y1: y, x2: x - 1, y2: y});       
}

function playerSign(b) {
  if (b) return "O";
  return "X";
}

function playerColor(player, alpha) {
  if (player) {
    return color(255, 0, 0, alpha);
  }
  return color(0, 255, 0, alpha);
}

function mouseOnBoard() {
  var margin = side / 2;
  return mouseX > margin && mouseX < width - margin &&
     mouseY > margin && mouseY < height - margin;
}
      
function mouseReleased() {
  if (!grid.win) {
    if (mouseOnBoard()) {
      var gridX =  mouse2GridX();
      var gridY = mouse2GridY();
      if (!grid.get(gridX, gridY)) {
        grid.add(gridX, gridY, playerSign(player));
        player = !player;
      }
    }
  }
}
