var nodeCount = 100
var nodes = []

function setup() {
  createCanvas(800, 800)
  textAlign(CENTER, CENTER)
  var ids = []
  for (var i = 0; i < nodeCount; i++) {
    ids[i] = "" + i
  }
  ids = shuffle(ids)
  for (var i = 0; i < nodeCount; i++) {
    var a = map(i, 0, nodeCount, 0, TWO_PI)
    var pos = createVector(375 * sin(a), 375 * cos(a))
    var node = new Node(ids[i], pos)
    node.neighbours.push((i + 1) % nodeCount)
    nodes.push(node)
    while(node.neighbours.length < 5) {
      var neighbour = floor(random(0, nodeCount))
      if (node.neighbours.indexOf(neighbour) == -1) {
        node.neighbours.push(neighbour)
      }
    }
  }
}

function draw() {
  background(51)
  translate(width / 2, height / 2)
  noFill()
  nodes.forEach((node) =>  {
    node.draw()
  })
}

function Node(id, pos) {
  this.pos = pos
  this.r = 15
  this.id = id
  this.neighbours = []
} 

Node.prototype.draw = function() {
    push()
    translate(this.pos.x, this.pos.y)
    stroke(200, 200, 0)
    ellipse(0, 0, 2 * this.r, 2 * this.r)
    stroke(200, 100)
    this.neighbours.forEach((i) => {
      var v = p5.Vector.sub(nodes[i].pos, this.pos)
      line(0, 0, v.x, v.y)
    })
    stroke(200, 0, 200)
    text(this.id, 0, 0)
    pop()
}