const nodeCount = 100
const nodes = []

function setup() {
  createCanvas(800, 800)
  textAlign(CENTER, CENTER)
  let ids = []
  for (let i = 0; i < nodeCount; i++) {
    ids[i] = "" + i
  }
  ids = shuffle(ids)
  for (let i = 0; i < nodeCount; i++) {
    const a = map(i, 0, nodeCount, 0, TWO_PI)
    const pos = createVector(375 * sin(a), 375 * cos(a))
    const node = new Node(ids[i], pos)
    nodes.push(node)
    node.neighbours.add((i + 1) % nodeCount) // Always add next neighbour
    while (node.neighbours.size < 5) {
      node.neighbours.add(random(0, nodeCount) | 0)
    }
  }
}

function draw() {
  background(51)
  translate(width / 2, height / 2)
  noFill()
  nodes.forEach(node => node.draw())
}

class Node {
  constructor(id, pos) {
    this.pos = pos
    this.r = 15
    this.id = id
    this.neighbours = new Set()
  }

  draw() {
    stroke(200, 200, 0)
    ellipse(this.pos.x, this.pos.y, 2 * this.r, 2 * this.r)
    stroke(200, 100)
    this.neighbours.forEach(i => line(this.pos.x, this.pos.y, nodes[i].pos.x, nodes[i].pos.y))
    stroke(200, 0, 200)
    text(this.id, this.pos.x, this.pos.y)
  }
}