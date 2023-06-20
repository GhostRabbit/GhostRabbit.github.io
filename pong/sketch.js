let leftP, rightP, ball;
let score = [0, 0];
let debries = [];
let shake = 0

function setup() {
  createCanvas(640, 480);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(width / 6);
  leftP = new Paddle(0, 'W'.charCodeAt(0), 'S'.charCodeAt(0));
  rightP = new Paddle(width, UP_ARROW, DOWN_ARROW);
  spawnNewBall();
}

function draw() {
  push()
  if (--shake >0)translate(random(-shake/10, shake/10), random(-shake/10, shake/10))
  background(0);
  leftP.tick();
  rightP.tick();
  let goal = ball.tick();
  if (goal) {
    score[0] += goal[0];
    score[1] += goal[1];
    spawnNewBall();
  }
  drawBoard();
  for (let i = debries.length - 1; i >= 0; i--) {
    debries[i].draw();
    if (debries[i].tick()) {
      debries.splice(i, 1);
    }
  }
  leftP.draw();
  rightP.draw();
  ball.draw();
  pop()
}

function setDashLine(def) {
  drawingContext.setLineDash(def);
}

function drawBoard() {
  stroke(255);
  strokeWeight(8);
  setDashLine([]);
  line(0, 0, width, 0);
  line(0, height, width, height);

  strokeWeight(2);
  setDashLine([1, 10]);
  line(leftP.width, 0, leftP.width, height);
  line(width / 2, 0, width / 2, height);
  line(width - rightP.width, 0, width - rightP.width, height);
  setDashLine([]);
  fill(255);
  text(score[0], width / 3, height / 3);
  text(score[1], 2 * width / 3, height / 3);
}

function spawnNewBall() {
  ball = new Ball();
}

function addSparks(n) {
  for (let i = 0; i < n; i++) debries.push(new Spark(ball.x, ball.y, i * TAU / n));
  shake =n*5
}

function keyPressed() {
  if (key === ' ') saveCanvas('pong');
  if (key === 'g') saveGif('pong',2);
}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.r = 20;
    this.vx = random([-3, 3]) * random(0.8, 1, 2);
    this.vy = random([-3, 3]) * random(0.8, 1, 2);
  }

  tick() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y <= this.r || height - this.r <= this.y) {
      this.vy *= -1;
      addSparks(4);
    }
    if (this.x <= this.r + leftP.width / 2) {
      if (this.y < leftP.y - leftP.height || this.y > leftP.y + leftP.height) {
        addSparks(16);
        return [0, 1];
      }
      this.vx *= -1;
      addSparks(8);
    }
    if (this.x >= width - this.r - rightP.width / 2) {
      if (this.y < rightP.y - rightP.height || this.y > rightP.y + rightP.height) {
        addSparks(16);
        return [1, 0];
      }
      this.vx *= -1;
      addSparks(8);
    }
  }

  draw() {
    stroke(0);
    fill(255);
    circle(this.x, this.y, this.r);
  }
}

class Paddle {
  constructor(x, up, down) {
    this.y = height / 2;
    this.x = x;
    this.height = 50;
    this.width = 20;
    this.up = up;
    this.down = down;
  }

  tick() {
    let v = 5;
    if (keyIsDown(this.up)) this.y -= v;
    if (keyIsDown(this.down)) this.y += v;
    this.y = constrain(this.y, this.height, height - this.height);
  }

  draw() {
    stroke(255);
    fill(255);
    rect(this.x, this.y, 2 * this.width, 2 * this.height);
  }
}

class Spark {
  constructor(x, y, a) {
    a *= random(0.8, 1.2);
    this.ttl = 255;
    this.x = x;
    this.dx = Math.cos(a);
    this.y = y;
    this.dy = Math.sin(a);
    this.a = random(TAU);
    this.da = random(-TAU / 36, TAU / 36);
  }

  tick() {
    this.x += this.dx;
    this.y += this.dy;
    this.a += this.da;
    this.ttl -= 2;
    this.dy += 0.05;
    return this.ttl <= 0;
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.a);
    strokeWeight(2);
    stroke(255, this.ttl);
    line(0, 0, 5, 0);
    pop();
  }
}