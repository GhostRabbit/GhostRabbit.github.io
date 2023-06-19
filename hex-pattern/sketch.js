const TAU = 2 * Math.PI
const grid = []

const r = 50
const t = r
const R = (2 * r) / Math.sqrt(3)
const dy2 = 2*(R - r)
const dq=r/2.5
const u=Math.sqrt(R*R-r*r)

function setup() {
  const cnv = createCanvas(windowWidth, windowHeight)
  cnv.style("display", "block") // Hack to hide scrollbars https://github.com/processing/p5.js/wiki/Positioning-your-canvas#making-the-canvas-fill-the-window

  let row = []
  row.push([0, 0])
  row.push([0, 0])
  for (let x = 0; x < width; x += r) {
    row.push([x, 0])
  }
  row.push([width, 0])
  row.push([width, 0])
  grid.push(row)

  let dy = -dy2
  for (let y = 0; y < height; y += R+u) {
    let row = []
    row.push([0, y])
    row.push([0, y])
    for (let x = 0; x < width; x += 2 * r) {
      row.push([q(x), q(y + dy)])
      row.push([q(x + r), q(y + -dy)])
    }
    row.push([width, y])
    row.push([width, y])
    grid.push(row)
    dy *= -1
  }

  row = []
  row.push([0, height])
  row.push([0, height])
  for (let x = 0; x < width; x += r) {
    row.push([x, height])
  }
  row.push([width, height])
  row.push([width, height])
  grid.push(row)
}

function q(n){
  return n +random(-dq,dq)
}

function draw() {
  console.log(r, t, R)
  console.log(grid)
  background(255)
  for (let y = 1; y < grid.length; y++) {
    for (let x = 2; x < grid[0].length; x+=2) {
      let c= color(random(50,200))
      fill(c)
      stroke(c)
      let xi = x - y%2
      beginShape()
      v(grid[y-1][xi+1])
      v(grid[y-1][xi])
      v(grid[y-1][xi-1])
      v(grid[y][xi-1])
      v(grid[y][xi])
      v(grid[y][xi+1])
      endShape(CLOSE)
    }
  }
  noLoop()
}

function v([x,y]){vertex(x,y)}
