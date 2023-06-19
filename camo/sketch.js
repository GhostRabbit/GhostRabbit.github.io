// Run in p5.js

const l = 40
const dl = l * 0.4
let gridx = []
let gridy = []

function setup() {
  const cnv = createCanvas(windowWidth, windowHeight)
  cnv.style("display", "block") // Hack to hide scrollbars https://github.com/processing/p5.js/wiki/Positioning-your-canvas#making-the-canvas-fill-the-window

  let x = []
  for (let i = 0; i <= width; i += l) x.push(i)
  for (let i = 0; i <= ceil(height / l); i++) gridx.push(x.slice())
  gridx.forEach((xa) => {
    for (let i = 1; i < xa.length - 1; i++) xa[i] += random(-dl, dl)
  })

  // console.log(gridx)

  let y = []
  for (let i = 0; i <= height; i += l) y.push(i)
  for (let i = 0; i <= ceil(width / l); i++) gridy.push(y.slice())
  gridy.forEach((ya) => {
    for (let i = 1; i < ya.length - 1; i++) ya[i] += random(-dl, dl)
  })

  // console.log(gridy)
}

function draw() {
  background(255)
  // for (let yi = 0; yi < gridx.length; yi++) {
  //   for (let xi = 0; xi < gridy.length - 1; xi++) {
  //     line(gridx[yi][xi], gridy[xi][yi], gridx[yi][xi + 1], gridy[xi+1][yi])
  //   }
  // }
  // for (let xi = 0; xi < gridy.length; xi++) {
  //   for (let yi = 0; yi < gridx.length - 1; yi++) {
  //     line(gridx[yi][xi], gridy[xi][yi], gridx[yi+1][xi], gridy[xi][yi + 1])
  //   }
  // }
  let dc = 5
  for (let yi = 0; yi < gridx.length - 1; yi++) {
    for (let xi = 0; xi < gridy.length - 1; xi++) {
      // line(gridx[yi][xi], gridy[xi][yi], gridx[yi][xi + 1], gridy[xi+1][yi])
      let c0 = random(50, 200)
      let c = color(
        c0 + random(-dc, dc),
        c0 + random(-dc, dc),
        c0 + random(-dc, dc)
      )
      fill(c)
      stroke(c)
      quad(
        gridx[yi][xi],
        gridy[xi][yi],
        gridx[yi][xi + 1],
        gridy[xi + 1][yi],
        gridx[yi + 1][xi + 1],
        gridy[xi + 1][yi + 1],
        gridx[yi + 1][xi],
        gridy[xi][yi + 1]
      )
    }
  }
  noLoop()
}
