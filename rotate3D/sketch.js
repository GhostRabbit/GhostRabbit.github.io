var angle = 0

function setup() {
  createCanvas(400, 400, WEBGL)  
}

function update()   {
  angle += 0.01
}

function draw() {
  update()
  
  background(50)
  
  translate(0, 0, map(constrain(mouseX, 0, 400), 100, 300, -100, 50)) // Zoom
  rotateX(angle)
  rotateY(angle * 0.6)
  
  torus(100)
}