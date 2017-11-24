class Grid {
  constructor() {
    this.maxX = -1
    this.minX = 1
    this.maxY = -1
    this.minY = 1
    this.x = []
  }

  maxSquares() {
    if (this.maxX == -1 && this.maxY == -1) return 0
    return Math.max(this.maxX - this.minX, this.maxY - this.minY) + 1
  }

  add(x, y, v) {
    this.maxX = Math.max(x, this.maxX)
    this.minX = Math.min(x, this.minX)
    this.maxY = Math.max(y, this.maxY)
    this.minY = Math.min(y, this.minY)
    if (!this.x[x]) {
      this.x[x] = []
    }
    this.x[x][y] = v

    this.win = this.checkForWin(x, y, v)
  }

  get(x, y) {
    if (this.x[x]) return this.x[x][y]
  }

  checkForWin(x, y, v) {
    // Check X
    let lowX = x - 1
    while (this.get(lowX, y) === v) {
      lowX--
    }
    let highX = x + 1
    while (this.get(highX, y) === v) {
      highX++
    }
    if (highX - lowX >= 6) {
      return { x1: lowX + 1, y1: y, x2: highX - 1, y2: y }
    }

    // Check Y
    let lowY = y - 1
    while (this.get(x, lowY) === v) {
      lowY--
    }
    let highY = y + 1
    while (this.get(x, highY) === v) {
      highY++
    }
    if (highY - lowY >= 6) {
      return { x1: x, y1: lowY + 1, x2: x, y2: highY - 1 }
    }

    // Check diagonal
    lowX = x - 1
    lowY = y - 1
    while (this.get(lowX, lowY) === v) {
      lowX--
      lowY--
    }
    highX = x + 1
    highY = y + 1
    while (this.get(highX, highY) === v) {
      highX++
      highY++
    }
    if (highX - lowX >= 6) {
      return { x1: lowX + 1, y1: lowY + 1, x2: highX - 1, y2: highY - 1 }
    }

    // Check other diagonal
    lowX = x - 1
    highY = y + 1
    while (this.get(lowX, highY) === v) {
      lowX--
      highY++
    }
    highX = x + 1
    lowY = y - 1
    while (this.get(highX, lowY) === v) {
      highX++
      lowY--
    }
    if (highX - lowX >= 6) {
      return { x1: lowX + 1, y1: highY - 1, x2: highX - 1, y2: lowY + 1 }
    }
  }
}

// Exports necessary for mocha
if (typeof exports !== 'undefined') {
  exports.Grid = Grid
}
