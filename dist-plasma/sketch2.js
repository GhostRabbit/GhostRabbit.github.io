// Run in p5.js

const TAU = 2 * Math.PI

let buffer
let state = {
  fadeTime: 3500,
  fadeIn: 3500,
  wait: 0,
  fadeOut: 0,
  fadeReset: 0,
}

function setup() {
  const cnv = createCanvas(windowWidth, windowHeight)
  cnv.style("display", "block") // Hack to hide scrollbars https://github.com/processing/p5.js/wiki/Positioning-your-canvas#making-the-canvas-fill-the-window

  createBuffer()
  updateBuffer()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  createBuffer()
  updateBuffer()
}

function createBuffer() {
  if (buffer) buffer.cnv.remove()

  const cnv = createGraphics(windowWidth, windowHeight)
  const ctx = cnv.canvas.getContext("2d")

  cnv.rect(0, 0, windowWidth, windowHeight)
  ctx.clip()

  buffer = { cnv: cnv, ctx: ctx }
}

function x(x0, d) {
  return x0 + random(-1, 1) * 0.1 * d
}
function y(y0, d) {
  return x(y0, d)
}
function r(r0) {
  return r0 //* random(0.95, 1.05)
}
function c(r0) {
  return r0 * random(0.8, 1.2)
}
function a(n) {
  return TAU / n + random(-0.15, 0.15) / n
}

function draw() {
  if (state.fadeIn > 0) {
    state.fadeIn -= deltaTime
    if (state.fadeIn <= 0) {
      state.wait = 2 * state.fadeTime
    }
    background(255)
    image(buffer.cnv, 0, 0)
    let a = lerp(0, 255, state.fadeIn / state.fadeTime)
    // console.log(a)
    fill(color(255, 255, 255, a))
    rect(0, 0, windowWidth, windowHeight)
  } else if (state.wait > 0) {
    state.wait -= deltaTime
    if (state.wait <= 0) {
      state.fadeOut = state.fadeTime
    }
  } else if (state.fadeOut > 0) {
    state.fadeOut -= deltaTime
    background(255)
    image(buffer.cnv, 0, 0)
    fill(color(255, 255, 255, lerp(255, 0, state.fadeOut / state.fadeTime)))
    rect(0, 0, windowWidth, windowHeight)
    if (state.fadeOut <= 0) {
      updateBuffer()
      state.fadeReset = 1
    }
  } else if (state.fadeReset > 0) {
    image(buffer.cnv, 0, 0)
    background(255)
    state.fadeReset = 0
    state.fadeIn = state.fadeTime
  }
}

function updateBuffer() {
  buffer.cnv.reset()
  buffer.cnv.background(255)

  let petals = Math.round(random(5, 12))
  buffer.ctx.translate(width / 2, height / 2)
  buffer.ctx.rotate(random(TAU))
  flower(0, 0, min(width, height) / 10, petals, true)
}

function flower(x0, y0, r0, petals, isFirst) {
  if (r0 < 2) return
  buffer.cnv.push()
  buffer.cnv.translate(x0, y0)

  // surrounding flowers
  buffer.cnv.push()
  buffer.cnv.rotate(a(TAU / petals) / 2)
  for (let i = 0; i < petals; i++) {
    buffer.cnv.rotate(a(petals))
    flower(0, r(3.5 * r0), r0 / 3, petals + random([-1, 0, 1]), false)
  }
  buffer.cnv.pop()

  if (isFirst) {
    buffer.cnv.push()
    buffer.cnv.scale(1.2)
    flower(0, 0, r0 / 3, petals, false)
    buffer.cnv.pop()
  } else {
    // 'double' petals
    if (random() < 0.5) {
      let red = random(50, 200)
      let green = random(50, 200)
      let blue = random(50, 200)
      buffer.cnv.strokeWeight(r0 / 20)
      for (let i = 0; i < petals; i++) {
        let x1 = x(0, r0)
        let y1 = y(r0, r0)
        let r1 = (5 / petals / 2) * r(r0)
        let r2 = (3 / 2) * r(r0)
        buffer.cnv.rotate(a(petals))
        buffer.cnv.stroke(color(c(red), c(green), c(blue), 100))
        buffer.cnv.fill(color(c(red), c(green), c(blue), 100))
        buffer.cnv.ellipse(x1, y1, r1, r2)
      }
      buffer.cnv.rotate(a(petals) / 2)
    }

    // petals
    drawPetals(r0, petals)

    // core
    drawCore(r0, petals)
  }

  buffer.cnv.pop()
}

function drawPetals(r0, petals) {
  buffer.cnv.push()
  strokeWeight(r0 / 10)
  let red = random(50, 200)
  let green = random(50, 200)
  let blue = random(50, 200)
  for (let i = 0; i < petals; i++) {
    let r1 = (5 / petals) * r(r0)
    let r2 = 2 * r(r0)
    buffer.cnv.rotate(a(petals))
    buffer.cnv.stroke(color("white"))
    buffer.cnv.fill(color("white"))
    buffer.cnv.ellipse(0, r0, r1, r2)
    buffer.cnv.stroke(color(c(red), c(green), c(blue), 200))
    buffer.cnv.fill(color(c(red), c(green), c(blue), 100))
    buffer.cnv.ellipse(0, r0, r1, r2)
  }
  buffer.cnv.pop()
}

function drawCore(r0, petals) {
  buffer.cnv.push()
  buffer.cnv.noStroke()
  let red = random(50, 200)
  let green = random(50, 200)
  let blue = random(50, 200)
  for (let i = 0; i < petals; i++) {
    let r1 = r(r0)
    buffer.cnv.stroke(color(c(red), c(green), c(blue), 100))
    buffer.cnv.fill(color(c(red), c(green), c(blue), 100))
    buffer.cnv.ellipse(0, r0 / 4, r1 / 3, r1 / 2)
    buffer.cnv.rotate(a(petals))
  }
  buffer.cnv.pop()
}
